"use client";

import React, { useState, useEffect } from "react";
import { Button, Tag, Avatar, Space, message } from "antd";
import {
  UserOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import CustomTable from "@/components/UI/CustomTable";
import { CustomShowConfirmModal } from "@/components/UI/CustomModal";
import { RoleBadge } from "@/components/UI/RoleBadge";
import { StatusBadge } from "@/components/UI/StatusBadge";
import { AdminButton } from "@/components/UI/AdminButton";

import { User } from "@/types";

const UserListPage: React.FC = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  // Mock data for demonstration
  const mockUsers: User[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
      status: "active",
      createdAt: "2024-01-15",
      lastLogin: "2024-01-20",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "editor",
      status: "active",
      createdAt: "2024-01-14",
      lastLogin: "2024-01-19",
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "user",
      status: "inactive",
      createdAt: "2024-01-13",
      lastLogin: "2024-01-18",
    },
    {
      id: "4",
      name: "Alice Brown",
      email: "alice@example.com",
      role: "editor",
      status: "pending",
      createdAt: "2024-01-12",
    },
  ];

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUsers(mockUsers);
    } catch (error) {
      message.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: User) => {
    router.push(`/admin/user/edit/${user.id}`);
  };

  const handleDelete = (user: User) => {
    CustomShowConfirmModal({
      title: "Delete User",
      content: `Are you sure you want to delete user "${user.name}"? This action cannot be undone.`,
      onConfirm: async () => {
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 500));
          setUsers(users.filter((u) => u.id !== user.id));
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

  const columns = [
    {
      title: "User",
      key: "user",
      render: (_: any, record: User) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />} src={record.avatar} />
          <div>
            <div className="font-medium">{record.name}</div>
            <div className="text-sm text-gray-500">{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => <RoleBadge role={role as any} />,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <StatusBadge status={status as any} />,
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Last Login",
      dataIndex: "lastLogin",
      key: "lastLogin",
      render: (date?: string) =>
        date ? new Date(date).toLocaleDateString() : "Never",
    },
  ];

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
          colorScheme="primary"
          style={{ height: "48px", fontSize: "16px" }}
        >
          Add User
        </AdminButton>
      </div>

      <CustomTable
        columns={columns}
        data={users}
        loading={loading}
        onRefresh={loadUsers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        searchable
        exportable
        title="All Users"
      />
    </div>
  );
};

export default UserListPage;
