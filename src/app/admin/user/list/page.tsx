"use client";

import React, { useState, useEffect } from "react";
import { Button, Tag, Avatar, Space, message } from "antd";
import { UserOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import CustomTable from "@/components/Admin/UI/CustomTable";
import { CustomShowConfirmModal } from "@/components/Admin/UI/CustomModal";
import { RoleBadge } from "@/components/Admin/UI/RoleBadge";
import { StatusBadge } from "@/components/Admin/UI/StatusBadge";
import { AdminButton } from "@/components/Admin/UI/AdminButton";

import { User } from "@/types";
import { connect } from "react-redux";
import { fetchUsers } from "@/store/actions/users";
import { useSession } from "next-auth/react";

const UserListPage: React.FC = (props: any) => {
  const { fetchUsers, userList, userTotal, userLoading } = props;
  const router = useRouter();
  const { data: session } = useSession();
  const [keyword, setKeyword] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  function handleQuery(keyword: string, page = 1, itemsPerPage = 10) {
    const queryParams = {
      search: keyword,
      page,
      itemsPerPage,
    };

    fetchUsers(session?.accessToken, queryParams);
    setPageNumber(page);
    setPageSize(itemsPerPage);
  }

  useEffect(() => {
    if (session?.accessToken) {
      handleQuery(keyword);
    }
  }, [session?.accessToken]);

  const columns = [
    {
      title: "User",
      key: "user",
      render: (_: any, record: User) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />} src={record.avatar} />
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
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => <RoleBadge role={role} />,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: number) => {
        let label: "active" | "deactive" | "rejected" = "rejected";
        if (status === 1) label = "active";
        else if (status === 0) label = "deactive";
        return <StatusBadge status={label} />;
      },
    },
    {
      title: "Created",
      dataIndex: "createdTime",
      key: "createdTime",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ];

  const handleEdit = (user: User) => {
    router.push(`/admin/user/edit/${user.id}`);
  };

  const handleDelete = (user: User) => {
    CustomShowConfirmModal({
      title: "Delete User",
      content: `Are you sure you want to delete user "${user.firstName}"? This action cannot be undone.`,
      onConfirm: async () => {
        try {
          await new Promise((resolve) => setTimeout(resolve, 500));

          message.success("User deleted successfully");
        } catch (error) {
          message.error("Failed to delete user");
        }
      },
      type: "error",
      okText: "Delete",
      cancelText: "Cancel",
    });
  };

  const handleView = (user: User) => {
    router.push(`/admin/user/${user.id}`);
  };

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#1F2937" }}>
            Users
          </h1>
          <p className="text-lg" style={{ color: "#4B5563" }}>
            Manage user accounts and permissions
          </p>
        </div>
        <AdminButton
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => router.push("/admin/user/create")}
          style={{ height: "48px", fontSize: "16px" }}
        >
          Add User
        </AdminButton>
      </div>

      <CustomTable
        columns={columns}
        data={userList}
        loading={userLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        searchable
        exportable
        title="All Users"
        pagination={{
          current: pageNumber,
          pageSize,
          total: userTotal,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(UserListPage);
