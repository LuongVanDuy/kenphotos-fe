"use client";

import React, { useState } from "react";
import { Form, Card, message, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import {
  TextField,
  SelectField,
  SwitchField,
  FormActions,
  UploadField,
} from "@/components/Admin/UI";
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
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Creating user:", values);
      message.success("User created successfully!");
      router.push("/admin/user/list");
    } catch (error) {
      message.error("Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/admin/user/list");
  };

  return (
    <div>
      <div className="mb-6">
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />} 
          onClick={() => router.back()}
          className="mb-4"
        >
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
              <TextField
                name="name"
                label="Full Name"
                placeholder="Enter full name"
                required
                description="The user's display name"
              />

              <TextField
                name="email"
                label="Email Address"
                placeholder="Enter email address"
                type="email"
                required
                description="This will be used for login and notifications"
              />

              <TextField
                name="password"
                label="Password"
                placeholder="Enter password"
                type="password"
                required
                description="Minimum 8 characters"
              />

              <TextField
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm password"
                type="password"
                required
                description="Must match the password above"
              />
            </div>

            <div>
              <SelectField
                name="role"
                label="Role"
                placeholder="Select user role"
                options={roleOptions}
                required
                description="Determines user permissions and access level"
              />

              <SelectField
                name="status"
                label="Status"
                placeholder="Select user status"
                options={statusOptions}
                required
                description="Current status of the user account"
              />

              <UploadField
                name="avatar"
                label="Profile Picture"
                description="Upload a profile picture (optional)"
                accept="image/*"
                listType="picture-card"
                maxCount={1}
              />

              <SwitchField
                name="emailNotifications"
                label="Email Notifications"
                description="Send email notifications to this user"
                checkedChildren="On"
                unCheckedChildren="Off"
              />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t">
            <FormActions
              loading={loading}
              onCancel={handleCancel}
              submitText="Create User"
              cancelText="Cancel"
            />
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default CreateUserPage;
