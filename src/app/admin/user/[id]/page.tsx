"use client";

import React, { useState, useEffect } from "react";
import { 
  Card, 
  Tabs, 
  Button, 
  Avatar, 
  Tag, 
  Descriptions, 
  Space, 
  Divider, 
  Table,
  message,
  Skeleton,
} from "antd";
import { 
  UserOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  ArrowLeftOutlined,
  LockOutlined,
  HistoryOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { showConfirmModal } from "@/components/Admin/UI";
import { User } from "@/types";

interface UserDetailsProps {
  params: {
    id: string;
  };
}

const UserDetailsPage: React.FC<UserDetailsProps> = ({ params }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, [params.id]);

  const loadUser = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const mockUser: User = {
        id: params.id,
        name: "John Doe",
        email: "john@example.com",
        role: "admin",
        status: "active",
        createdAt: "2024-01-15",
        lastLogin: "2024-01-20",
      };
      
      setUser(mockUser);
    } catch (error) {
      message.error("Failed to load user details");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    router.push(`/admin/user/edit/${params.id}`);
  };

  const handleDelete = () => {
    showConfirmModal({
      title: "Delete User",
      content: "Are you sure you want to delete this user? This action cannot be undone.",
      onConfirm: async () => {
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          message.success("User deleted successfully");
          router.push("/admin/user/list");
        } catch (error) {
          message.error("Failed to delete user");
        }
      },
      type: "error",
      okText: "Delete",
      cancelText: "Cancel",
    });
  };

  const handleResetPassword = () => {
    showConfirmModal({
      title: "Reset Password",
      content: "Are you sure you want to reset this user's password? They will receive an email with instructions.",
      onConfirm: async () => {
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          message.success("Password reset email sent");
        } catch (error) {
          message.error("Failed to reset password");
        }
      },
      type: "warning",
      okText: "Reset Password",
      cancelText: "Cancel",
    });
  };

  // Mock activity data
  const activityData = [
    {
      id: "1",
      action: "Login",
      timestamp: "2024-01-20T10:30:00Z",
      ipAddress: "192.168.1.1",
      userAgent: "Chrome/Windows",
    },
    {
      id: "2",
      action: "Updated profile",
      timestamp: "2024-01-19T14:45:00Z",
      ipAddress: "192.168.1.1",
      userAgent: "Chrome/Windows",
    },
    {
      id: "3",
      action: "Created post",
      timestamp: "2024-01-18T09:15:00Z",
      ipAddress: "192.168.1.1",
      userAgent: "Chrome/Windows",
    },
  ];

  const activityColumns = [
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
    {
      title: "Date & Time",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (timestamp: string) => new Date(timestamp).toLocaleString(),
    },
    {
      title: "IP Address",
      dataIndex: "ipAddress",
      key: "ipAddress",
    },
    {
      title: "User Agent",
      dataIndex: "userAgent",
      key: "userAgent",
    },
  ];

  const tabItems = [
    {
      key: "profile",
      label: "Profile",
      children: (
        <div>
          {loading ? (
            <Skeleton active avatar paragraph={{ rows: 6 }} />
          ) : user ? (
            <Descriptions bordered column={{ xs: 1, sm: 2, md: 2 }}>
              <Descriptions.Item label="Full Name">{user.name}</Descriptions.Item>
              <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
              <Descriptions.Item label="Role">
                <Tag color={user.role === "admin" ? "red" : user.role === "editor" ? "blue" : "default"}>
                  {user.role.toUpperCase()}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={user.status === "active" ? "green" : user.status === "inactive" ? "red" : "orange"}>
                  {user.status.toUpperCase()}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Created">{new Date(user.createdAt).toLocaleDateString()}</Descriptions.Item>
              <Descriptions.Item label="Last Login">
                {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Never"}
              </Descriptions.Item>
            </Descriptions>
          ) : (
            <div>User not found</div>
          )}
        </div>
      ),
    },
    {
      key: "activity",
      label: "Activity Log",
      icon: <HistoryOutlined />,
      children: (
        <Table
          dataSource={activityData}
          columns={activityColumns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      ),
    },
    {
      key: "settings",
      label: "Settings",
      icon: <SettingOutlined />,
      children: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Account Settings</h3>
            <div className="space-y-2">
              <Button type="primary" onClick={handleResetPassword} icon={<LockOutlined />}>
                Reset Password
              </Button>
            </div>
          </div>
          
          <Divider />
          
          <div>
            <h3 className="text-lg font-medium mb-2 text-red-500">Danger Zone</h3>
            <div className="space-y-2">
              <Button danger type="primary" onClick={handleDelete} icon={<DeleteOutlined />}>
                Delete User
              </Button>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Button 
        type="text" 
        icon={<ArrowLeftOutlined />} 
        onClick={() => router.push("/admin/user/list")}
        className="mb-4"
      >
        Back to Users
      </Button>

      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {loading ? (
              <Skeleton.Avatar active size={64} shape="circle" />
            ) : (
              <Avatar size={64} icon={<UserOutlined />} src={user?.avatar} />
            )}
            <div className="ml-4">
              {loading ? (
                <Skeleton active paragraph={{ rows: 1 }} title={{ width: 150 }} />
              ) : (
                <>
                  <h1 className="text-2xl font-bold">{user?.name}</h1>
                  <p className="text-gray-600">{user?.email}</p>
                </>
              )}
            </div>
          </div>
          
          {!loading && (
            <Space>
              <Button 
                type="primary" 
                icon={<EditOutlined />} 
                onClick={handleEdit}
              >
                Edit
              </Button>
            </Space>
          )}
        </div>
      </div>

      <Card>
        <Tabs defaultActiveKey="profile" items={tabItems} />
      </Card>
    </div>
  );
};

export default UserDetailsPage;
