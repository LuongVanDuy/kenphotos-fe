"use client";

import React, { useState } from "react";
import { Form, Card, message, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { CustomInput } from "@/components/Admin/UI/CustomInput";
import { CustomSelect } from "@/components/Admin/UI/CustomSelect";
import { CustomSwitch } from "@/components/Admin/UI/CustomSwitch";
import FormActions from "@/components/Admin/UI/FormActions";
import UploadField from "@/components/Admin/UI/UploadField";
import { User } from "@/types";

const CreateUserPage: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const roleOptions = [
    { value: "admin", label: "Administrator" },
    { value: "editor", label: "Editor" },
    { value: "user", label: "User" },
  ];

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
  ];

  const handleSubmit = async (values: any) => {
    console.log(values);
  };

  const handleCancel = () => {
    router.push("/admin/user/list");
  };

  return (
    <div>
      <div className="mb-6">
        <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => router.back()} className="mb-4">
          Back to Users
        </Button>
        <h1 className="text-2xl font-bold">Create New User</h1>
        <p className="text-gray-600">Add a new user to the system</p>
      </div>

      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            role: "user",
            status: "active",
            emailNotifications: true,
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div style={{ marginBottom: 16 }}>
                <label htmlFor="name" style={{ fontWeight: 500 }}>
                  Full Name
                </label>
                <CustomInput id="name" placeholder="Enter full name" />
                <div style={{ color: "#888", fontSize: 12 }}>The user's display name</div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label htmlFor="email" style={{ fontWeight: 500 }}>
                  Email Address
                </label>
                <CustomInput id="email" placeholder="Enter email address" type="text" />
                <div style={{ color: "#888", fontSize: 12 }}>This will be used for login and notifications</div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label htmlFor="password" style={{ fontWeight: 500 }}>
                  Password
                </label>
                <CustomInput id="password" placeholder="Enter password" type="password" />
                <div style={{ color: "#888", fontSize: 12 }}>Set a secure password for the user</div>
              </div>
            </div>
            <div>
              <div style={{ marginBottom: 16 }}>
                <label htmlFor="role" style={{ fontWeight: 500 }}>
                  Role
                </label>
                <CustomSelect options={roleOptions} style={{ width: "100%" }} />
                <div style={{ color: "#888", fontSize: 12 }}>Assign a role to the user</div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label htmlFor="status" style={{ fontWeight: 500 }}>
                  Status
                </label>
                <CustomSelect options={statusOptions} style={{ width: "100%" }} />
                <div style={{ color: "#888", fontSize: 12 }}>Set the user's account status</div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <CustomSwitch />
                <span style={{ marginLeft: 8 }}>Email Notifications</span>
                <div style={{ color: "#888", fontSize: 12 }}>Enable email notifications for this user</div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <UploadField
                  name="avatar"
                  label="Avatar"
                  description="Upload a profile picture"
                  accept="image/*"
                  listType="picture-card"
                  maxCount={1}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t">
            <FormActions loading={loading} onCancel={handleCancel} submitText="Create User" cancelText="Cancel" />
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default CreateUserPage;
