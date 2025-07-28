"use client";

import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button, message, Image, Spin, Alert, Typography, Card, Row, Col, Switch, DatePicker, Upload } from "antd";
import { UserOutlined, UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector, connect } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { createUser, updateUser } from "@/store/actions/users";
import { getImageUrl } from "@/utils";
import { useSession } from "next-auth/react";

const { Title } = Typography;
const { Option } = Select;

// Types
interface UserFormValues {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  businessName: string;
  country: string;
  timezone: string;
  postalCode: string;
  businessWebsite: string;
}

// UserForm component
const UserForm: React.FC<{
  mode?: "create" | "edit";
  initialValues?: Partial<UserFormValues>;
  onSuccess?: () => void;
  userId?: number;
  createUser?: any;
  updateUser?: any;
}> = ({ mode = "create", initialValues, onSuccess, userId, createUser, updateUser }) => {
  const [form] = Form.useForm<UserFormValues>();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        email: initialValues?.email || "",
        password: initialValues?.password || "",
        firstName: initialValues?.firstName || "",
        lastName: initialValues?.lastName || "",
        phoneNumber: initialValues?.phoneNumber || "",
        businessName: initialValues?.businessName || "",
        country: initialValues?.country || "",
        timezone: initialValues?.timezone || "",
        postalCode: initialValues?.postalCode || "",
        businessWebsite: initialValues?.businessWebsite || "",
      });
    }
  }, [initialValues, form]);

  const countryOptions = [
    { value: "US", label: "United States" },
    { value: "CA", label: "Canada" },
    { value: "UK", label: "United Kingdom" },
    { value: "AU", label: "Australia" },
    { value: "DE", label: "Germany" },
    { value: "FR", label: "France" },
    { value: "JP", label: "Japan" },
    { value: "CN", label: "China" },
    { value: "IN", label: "India" },
    { value: "BR", label: "Brazil" },
  ];

  const timezoneOptions = [
    { value: "UTC", label: "UTC" },
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "Europe/London", label: "London (GMT)" },
    { value: "Europe/Paris", label: "Paris (CET)" },
    { value: "Asia/Tokyo", label: "Tokyo (JST)" },
    { value: "Asia/Shanghai", label: "Shanghai (CST)" },
    { value: "Australia/Sydney", label: "Sydney (AEDT)" },
  ];

  const onFinish = async (values: UserFormValues) => {
    setLoading(true);

    const payload = {
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      businessName: values.businessName,
      country: values.country,
      timezone: values.timezone,
      postalCode: values.postalCode,
      businessWebsite: values.businessWebsite,
    };

    createUser(payload, console.log(1), console.log(2));

    // try {
    //   const payload = {
    //     email: values.email,
    //     password: values.password,
    //     firstName: values.firstName,
    //     lastName: values.lastName,
    //     phoneNumber: values.phoneNumber,
    //     businessName: values.businessName,
    //     country: values.country,
    //     timezone: values.timezone,
    //     postalCode: values.postalCode,
    //     businessWebsite: values.businessWebsite,
    //   };

    //   if (mode === "edit" && userId && updateUser) {
    //     await updateUser(userId, payload);
    //   } else if (createUser) {
    //     await createUser(payload);
    //   }
    //   message.success(
    //     mode === "edit"
    //       ? "User updated successfully!"
    //       : "User created successfully!"
    //   );

    //   form.resetFields();
    //   if (onSuccess) onSuccess();
    //   router.push("/admin/user/list");
    // } catch (error) {
    //   console.error("Submit error:", error);
    //   message.error(
    //     mode === "edit" ? "Failed to update user" : "Failed to create user"
    //   );
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-7">
          <div className="flex items-center space-x-4">
            <Title level={4} className="!mb-0">
              {mode === "edit" ? "Edit User" : "Add New User"}
            </Title>
          </div>
          <div className="flex items-center space-x-2">
            <Button type="primary" htmlType="submit" loading={loading} onClick={() => form.submit()}>
              {mode === "edit" ? "Update" : "Create User"}
            </Button>
          </div>
        </div>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            email: initialValues?.email || "",
            password: initialValues?.password || "",
            firstName: initialValues?.firstName || "",
            lastName: initialValues?.lastName || "",
            phoneNumber: initialValues?.phoneNumber || "",
            businessName: initialValues?.businessName || "",
            country: initialValues?.country || "",
            timezone: initialValues?.timezone || "",
            postalCode: initialValues?.postalCode || "",
            businessWebsite: initialValues?.businessWebsite || "",
          }}
        >
          <div className="flex gap-8">
            {/* Main Content Area */}
            <div className="flex-1">
              <div className="space-y-6">
                {/* Personal Information */}
                <Card title="Personal Information" className="mb-6">
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="firstName"
                        label="First Name"
                        rules={[
                          {
                            required: true,
                            message: "Please enter first name",
                          },
                        ]}
                      >
                        <Input placeholder="Enter first name" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: "Please enter last name" }]}>
                        <Input placeholder="Enter last name" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                          { required: true, message: "Please enter email" },
                          {
                            type: "email",
                            message: "Please enter valid email",
                          },
                        ]}
                      >
                        <Input placeholder="Enter email address" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="phoneNumber"
                        label="Phone Number"
                        rules={[
                          {
                            required: true,
                            message: "Please enter phone number",
                          },
                        ]}
                      >
                        <Input placeholder="Enter phone number" />
                      </Form.Item>
                    </Col>
                  </Row>
                  {mode === "create" && (
                    <Form.Item
                      name="password"
                      label="Password"
                      rules={[
                        { required: true, message: "Please enter password" },
                        {
                          min: 6,
                          message: "Password must be at least 6 characters",
                        },
                      ]}
                    >
                      <Input.Password placeholder="Enter password" />
                    </Form.Item>
                  )}
                </Card>

                {/* Business Information */}
                <Card title="Business Information" className="mb-6">
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="businessName"
                        label="Business Name"
                        rules={[
                          {
                            required: true,
                            message: "Please enter business name",
                          },
                        ]}
                      >
                        <Input placeholder="Enter business name" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="businessWebsite"
                        label="Business Website"
                        rules={[
                          {
                            required: false,
                            message: "Please enter business website",
                          },
                          { type: "url", message: "Please enter valid URL" },
                        ]}
                      >
                        <Input placeholder="https://example.com" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item name="country" label="Country" rules={[{ required: true, message: "Please select country" }]}>
                        <Select placeholder="Select country">
                          {countryOptions.map((option) => (
                            <Option key={option.value} value={option.value}>
                              {option.label}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="postalCode"
                        label="Postal Code"
                        rules={[
                          {
                            required: true,
                            message: "Please enter postal code",
                          },
                        ]}
                      >
                        <Input placeholder="Enter postal code" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item name="timezone" label="Timezone" rules={[{ required: true, message: "Please select timezone" }]}>
                    <Select placeholder="Select timezone">
                      {timezoneOptions.map((option) => (
                        <Option key={option.value} value={option.value}>
                          {option.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Card>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

// Main page component
const CreateUserPage: React.FC = (props: any) => {
  const { createUser, updateUser } = props;
  const router = useRouter();
  return <UserForm mode="create" onSuccess={() => router.push("/admin/user/list")} createUser={createUser} updateUser={updateUser} />;
};

const mapDispatchToProps = {
  createUser: createUser,
  updateUser: updateUser,
};

export { UserForm };
export default connect(null, mapDispatchToProps)(CreateUserPage);
