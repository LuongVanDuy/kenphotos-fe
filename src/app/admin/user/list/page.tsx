"use client";

import React, { useEffect, useState } from "react";
import { Button, Avatar, Space, message, Select, Input, Table, Dropdown, Modal } from "antd";
import { UserOutlined, PlusOutlined, MoreOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { connect } from "react-redux";
import { deleteUser, fetchUsers } from "@/store/actions/users";
import { useSession } from "next-auth/react";

const { Option } = Select;

const sortFields = [
  { value: "createdTime", label: "Created Time" },
  { value: "firstName", label: "First Name" },
  { value: "lastName", label: "Last Name" },
  { value: "email", label: "Email" },
  { value: "businessName", label: "Business Name" },
];

const UserListPage: React.FC = (props: any) => {
  const { fetchUsers, userList, userTotal, userLoading, deleteUser } = props;
  const { data: session } = useSession();
  const router = useRouter();
  const [sortBy, setSortBy] = useState<string>("createdTime");
  const [sortDesc, setSortDesc] = useState<boolean>(true);
  const [keyword, setKeyword] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  function handleQuery(keyword: string, page = 1, itemsPerPage = 10) {
    const queryParams = {
      search: keyword,
      sortBy,
      sortDesc,
      page,
      itemsPerPage,
    };

    fetchUsers(queryParams, session?.accessToken);
    setPageNumber(page);
    setPageSize(itemsPerPage);
  }

  useEffect(() => {
    if (session?.accessToken) {
      handleQuery(keyword);
    }
  }, [session?.accessToken]);

  const handleEdit = (user: any) => {
    router.push(`/admin/user/edit/${user.id}`);
  };

  const onSuccess = () => {
    message.success("Post deleted successfully");
    handleQuery(keyword, pageNumber, pageSize);
  };

  const onFailure = (error: any) => {
    message.error(error);
    message.error(error || "Failed to delete post");
  };

  const handleDelete = async (user: any) => {
    Modal.confirm({
      title: "Delete User",
      content: `Are you sure you want to delete "${user.firstName} ${user.lastName}"? This action cannot be undone.`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        deleteUser(user.id, session?.accessToken, onSuccess, onFailure);
      },
    });
  };

  const handleView = (user: any) => {
    router.push(`/admin/user/${user.id}`);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "User",
      key: "user",
      render: (_: any, record: any) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />} />
          <div>
            <div className="font-medium">
              {record.firstName} {record.lastName}
            </div>
            <div className="text-sm text-gray-500">{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: "Business",
      key: "business",
      render: (_: any, record: any) => (
        <div>
          <div className="font-medium">{record.businessName}</div>
          <div className="text-sm text-gray-500">{record.country}</div>
        </div>
      ),
    },
    {
      title: "Contact",
      key: "contact",
      render: (_: any, record: any) => (
        <div>
          <div className="text-sm">{record.phoneNumber}</div>
          <div className="text-xs text-gray-500">{record.timezone}</div>
        </div>
      ),
    },
    {
      title: "Created",
      dataIndex: "createdTime",
      key: "createdTime",
      render: (date: string) => (
        <div>
          <div className="text-sm">{new Date(date).toLocaleDateString()}</div>
          <div className="text-xs text-gray-500">{new Date(date).toLocaleTimeString()}</div>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_: any, record: any) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "view",
                label: "View",
                icon: <EyeOutlined />,
                onClick: () => handleView(record),
              },
              {
                key: "edit",
                label: "Edit",
                icon: <EditOutlined />,
                onClick: () => handleEdit(record),
              },
              {
                key: "delete",
                label: "Delete",
                icon: <DeleteOutlined />,
                onClick: () => handleDelete(record),
              },
            ],
          }}
          trigger={["click"]}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold mb-5">Users</h1>

      <div className="flex flex-wrap gap-2 mb-6 items-center justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          <Input.Search
            placeholder="Search users"
            allowClear
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onSearch={(value) => {
              setKeyword(value);
              setPageNumber(1);
              handleQuery(value, 1, pageSize);
            }}
            style={{ width: 200 }}
          />
          <Select value={sortBy} onChange={setSortBy} style={{ width: 150 }}>
            {sortFields.map((f) => (
              <Option key={f.value} value={f.value}>
                {f.label}
              </Option>
            ))}
          </Select>
          <Select value={sortDesc} onChange={(v) => setSortDesc(v)} style={{ width: 120 }}>
            <Option value={false}>Ascending</Option>
            <Option value={true}>Descending</Option>
          </Select>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => router.push("/admin/user/create")}>
          Add New User
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={userList}
        loading={userLoading}
        rowKey="id"
        pagination={{
          current: pageNumber,
          pageSize,
          total: userTotal,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          onChange: (page, pageSize) => {
            handleQuery(keyword, page, pageSize);
          },
        }}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  userList: state.users.list,
  userTotal: state.users.total,
  userLoading: state.users.loading,
});

const mapDispatchToProps = {
  fetchUsers: fetchUsers,
  deleteUser: deleteUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserListPage);
