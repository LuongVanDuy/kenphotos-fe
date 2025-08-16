"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Avatar,
  Space,
  message,
  Select,
  Input,
  Table,
  Dropdown,
  Modal,
} from "antd";
import {
  UserOutlined,
  PlusOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUsers } from "@/store/actions/users";
import { useSession } from "next-auth/react";
import { AppDispatch, RootState } from "@/store/store";
import { getImageUrl } from "@/utils/imageUrl";

const { Option } = Select;

const sortFields = [
  { value: "createdTime", label: "Created Time" },
  { value: "firstName", label: "First Name" },
  { value: "lastName", label: "Last Name" },
  { value: "email", label: "Email" },
  { value: "businessName", label: "Business Name" },
];

const UserListPage: React.FC = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 640);
    }
  }, []);

  // Get state from Redux store
  const userList = useSelector((state: RootState) => state.users.list);
  const userTotal = useSelector((state: RootState) => state.users.total);
  const userLoading = useSelector((state: RootState) => state.users.loading);
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

    dispatch(fetchUsers(queryParams, session?.accessToken || "") as any);
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
    message.success("User deleted successfully");
    handleQuery(keyword, pageNumber, pageSize);
  };

  const onFailure = (error: any) => {
    message.error(error);
    message.error(error || "Failed to delete user");
  };

  const handleDelete = async (user: any) => {
    Modal.confirm({
      title: "Delete User",
      content: `Are you sure you want to delete "${user.firstName} ${user.lastName}"? This action cannot be undone.`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        dispatch(
          deleteUser(
            user.id,
            session?.accessToken || "",
            onSuccess,
            onFailure
          ) as any
        );
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
        <Space direction="vertical" size="small" className="w-full">
          <div className="flex items-center gap-2">
            {record.avatarUrl ? (
              <Avatar
                src={getImageUrl(record.avatarUrl)}
                style={{ width: 50, height: 50 }}
              />
            ) : (
              <Avatar
                style={{ width: 50, height: 50 }}
                icon={<UserOutlined />}
              />
            )}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm lg:text-base truncate">
                {record.firstName} {record.lastName}
              </div>
              <div className="text-xs lg:text-sm text-gray-500 truncate">
                {record.email}
              </div>
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: "Business",
      key: "business",
      render: (_: any, record: any) => (
        <div>
          <div className="font-medium text-sm truncate">
            {record.businessName}
          </div>
          <div className="text-xs text-gray-500">{record.country}</div>
        </div>
      ),
    },
    {
      title: "Contact",
      key: "contact",
      render: (_: any, record: any) => (
        <div>
          <div className="text-sm">{record.phoneNumber}</div>
          <div className="text-xs text-gray-500 truncate">
            {record.timezone}
          </div>
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
          <div className="text-xs text-gray-500">
            {new Date(date).toLocaleTimeString()}
          </div>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 80,
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
          <Button type="text" icon={<MoreOutlined />} size="small" />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl md:text-4xl font-bold mb-4 lg:mb-5">Users</h1>

      <div className="flex flex-col lg:flex-row gap-3 lg:gap-2 mb-4 lg:mb-6 items-start lg:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center w-full lg:w-auto">
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
            style={{ width: "100%", maxWidth: "300px" }}
            size="middle"
          />
          <Select
            value={sortBy}
            onChange={setSortBy}
            className="flex-1 sm:flex-none"
            style={{ minWidth: "150px" }}
            size="middle"
          >
            {sortFields.map((f) => (
              <Option key={f.value} value={f.value}>
                {f.label}
              </Option>
            ))}
          </Select>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => router.push("/admin/user/create")}
          size="middle"
          block={isMobile}
        >
          Add New User
        </Button>
      </div>

      <div className="overflow-x-auto">
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
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            onChange: (page, pageSize) => {
              handleQuery(keyword, page, pageSize);
            },
            responsive: true,
            size: "small",
          }}
          scroll={{ x: 800 }}
        />
      </div>
    </div>
  );
};

export default UserListPage;
