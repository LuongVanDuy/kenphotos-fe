"use client";

import React, { useState } from "react";
import {
  Card,
  Tabs,
  Form,
  message,
  Divider,
  Typography,
  Space,
  Button,
  Alert,
  Input,
  Select,
  Switch,
  Upload,
} from "antd";
import {
  SaveOutlined,
  SettingOutlined,
  GlobalOutlined,
  MailOutlined,
  SecurityScanOutlined,
  DatabaseOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { TextArea } = Input;

const SettingsPage: React.FC = () => {
  const [generalForm] = Form.useForm();
  const [emailForm] = Form.useForm();
  const [securityForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

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
  ];

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "zh", label: "Chinese" },
    { value: "ja", label: "Japanese" },
  ];

  const handleSaveSettings = async (values: any, formType: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log(`Saving ${formType} settings:`, values);
      message.success(`${formType} settings saved successfully!`);
    } catch (error) {
      message.error(`Failed to save ${formType} settings`);
    } finally {
      setLoading(false);
    }
  };

  const generalSettings = (
    <Card>
      <Form
        form={generalForm}
        layout="vertical"
        onFinish={(values) => handleSaveSettings(values, "general")}
        initialValues={{
          siteName: "My Admin Panel",
          siteDescription: "A comprehensive admin dashboard",
          timezone: "UTC",
          language: "en",
          maintenanceMode: false,
          allowRegistration: true,
        }}
      >
        <Title level={4}>Site Information</Title>

        <Form.Item
          name="siteName"
          label="Site Name"
          rules={[{ required: true, message: "Please enter site name" }]}
        >
          <Input placeholder="Enter site name" />
        </Form.Item>

        <Form.Item
          name="siteDescription"
          label="Site Description"
          rules={[{ required: true, message: "Please enter site description" }]}
        >
          <TextArea placeholder="Enter site description" rows={3} />
        </Form.Item>

        <Form.Item
          name="siteUrl"
          label="Site URL"
          rules={[{ required: true, message: "Please enter site URL" }]}
        >
          <Input placeholder="https://example.com" />
        </Form.Item>

        <Form.Item name="siteLogo" label="Site Logo">
          <Upload
            name="logo"
            listType="picture-card"
            maxCount={1}
            beforeUpload={() => false}
          >
            <div>
              <UploadOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Divider />

        <Title level={4}>Localization</Title>

        <Form.Item
          name="timezone"
          label="Timezone"
          rules={[{ required: true, message: "Please select timezone" }]}
        >
          <Select options={timezoneOptions} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="language"
          label="Language"
          rules={[{ required: true, message: "Please select language" }]}
        >
          <Select options={languageOptions} style={{ width: "100%" }} />
        </Form.Item>

        <Divider />

        <Title level={4}>Site Settings</Title>

        <Form.Item name="maintenanceMode" valuePropName="checked">
          <Switch />
        </Form.Item>
        <div style={{ marginBottom: 16 }}>
          <span style={{ marginLeft: 8 }}>Maintenance Mode</span>
        </div>

        <Form.Item name="allowRegistration" valuePropName="checked">
          <Switch />
        </Form.Item>
        <div style={{ marginBottom: 16 }}>
          <span style={{ marginLeft: 8 }}>Allow Registration</span>
        </div>

        <div style={{ marginTop: 24 }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            icon={<SaveOutlined />}
          >
            Save General Settings
          </Button>
        </div>
      </Form>
    </Card>
  );

  const emailSettings = (
    <Card>
      <Form
        form={emailForm}
        layout="vertical"
        onFinish={(values) => handleSaveSettings(values, "email")}
        initialValues={{
          smtpHost: "",
          smtpPort: 587,
          smtpSecurity: "tls",
          emailNotifications: true,
          adminEmail: "admin@example.com",
        }}
      >
        <Alert
          message="Email Configuration"
          description="Configure SMTP settings to enable email notifications and communications."
          type="info"
          showIcon
          className="mb-6"
        />

        <Title level={4}>SMTP Configuration</Title>

        <Form.Item
          name="smtpHost"
          label="SMTP Host"
          rules={[{ required: true, message: "Please enter SMTP host" }]}
        >
          <Input placeholder="smtp.gmail.com" />
        </Form.Item>

        <Form.Item
          name="smtpPort"
          label="SMTP Port"
          rules={[{ required: true, message: "Please enter SMTP port" }]}
        >
          <Input placeholder="587" />
        </Form.Item>

        <Form.Item
          name="smtpSecurity"
          label="Security"
          rules={[{ required: true, message: "Please select security type" }]}
        >
          <Select
            options={[
              { value: "none", label: "None" },
              { value: "tls", label: "TLS" },
              { value: "ssl", label: "SSL" },
            ]}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name="smtpUsername"
          label="SMTP Username"
          rules={[{ required: true, message: "Please enter SMTP username" }]}
        >
          <Input placeholder="your-email@gmail.com" />
        </Form.Item>

        <Form.Item
          name="smtpPassword"
          label="SMTP Password"
          rules={[{ required: true, message: "Please enter SMTP password" }]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Divider />

        <Title level={4}>Email Settings</Title>

        <Form.Item
          name="adminEmail"
          label="Admin Email"
          rules={[{ required: true, message: "Please enter admin email" }]}
        >
          <Input placeholder="admin@example.com" />
        </Form.Item>

        <Form.Item
          name="fromEmail"
          label="From Email"
          rules={[{ required: true, message: "Please enter from email" }]}
        >
          <Input placeholder="noreply@example.com" />
        </Form.Item>

        <Form.Item
          name="fromName"
          label="From Name"
          rules={[{ required: true, message: "Please enter from name" }]}
        >
          <Input placeholder="Your Site Name" />
        </Form.Item>

        <Form.Item name="emailNotifications" valuePropName="checked">
          <Switch />
        </Form.Item>
        <div style={{ marginBottom: 16 }}>
          <span style={{ marginLeft: 8 }}>Enable Email Notifications</span>
        </div>

        <div style={{ marginTop: 24 }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            icon={<SaveOutlined />}
          >
            Save Email Settings
          </Button>
        </div>
      </Form>
    </Card>
  );

  const securitySettings = (
    <Card>
      <Form
        form={securityForm}
        layout="vertical"
        onFinish={(values) => handleSaveSettings(values, "security")}
        initialValues={{
          sessionTimeout: 24,
          maxLoginAttempts: 5,
          requireStrongPasswords: true,
          twoFactorAuth: false,
          ipWhitelist: false,
        }}
      >
        <Alert
          message="Security Settings"
          description="Configure security policies and authentication settings."
          type="warning"
          showIcon
          className="mb-6"
        />

        <Title level={4}>Authentication</Title>

        <Form.Item
          name="sessionTimeout"
          label="Session Timeout (hours)"
          rules={[{ required: true, message: "Please enter session timeout" }]}
        >
          <Input placeholder="24" />
        </Form.Item>

        <Form.Item
          name="maxLoginAttempts"
          label="Max Login Attempts"
          rules={[
            { required: true, message: "Please enter max login attempts" },
          ]}
        >
          <Input placeholder="5" />
        </Form.Item>

        <Form.Item name="requireStrongPasswords" valuePropName="checked">
          <Switch />
        </Form.Item>
        <div style={{ marginBottom: 16 }}>
          <span style={{ marginLeft: 8 }}>Require Strong Passwords</span>
        </div>

        <Form.Item name="twoFactorAuth" valuePropName="checked">
          <Switch />
        </Form.Item>
        <div style={{ marginBottom: 16 }}>
          <span style={{ marginLeft: 8 }}>Two-Factor Authentication</span>
        </div>

        <Divider />

        <Title level={4}>Access Control</Title>

        <Form.Item name="ipWhitelist" valuePropName="checked">
          <Switch />
        </Form.Item>
        <div style={{ marginBottom: 16 }}>
          <span style={{ marginLeft: 8 }}>IP Whitelist</span>
        </div>

        <Form.Item name="allowedIps" label="Allowed IP Addresses">
          <TextArea
            placeholder="192.168.1.1&#10;10.0.0.1"
            rows={4}
          />
        </Form.Item>

        <div style={{ marginTop: 24 }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            icon={<SaveOutlined />}
          >
            Save Security Settings
          </Button>
        </div>
      </Form>
    </Card>
  );

  const systemInfo = (
    <Card>
      <Title level={4}>System Information</Title>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card size="small">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">v1.0.0</div>
              <div className="text-sm text-gray-500">Application Version</div>
            </div>
          </Card>

          <Card size="small">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">Online</div>
              <div className="text-sm text-gray-500">System Status</div>
            </div>
          </Card>

          <Card size="small">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">2.4 GB</div>
              <div className="text-sm text-gray-500">Storage Used</div>
            </div>
          </Card>

          <Card size="small">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">1,234</div>
              <div className="text-sm text-gray-500">Total Users</div>
            </div>
          </Card>
        </div>

        <Divider />

        <div>
          <Title level={5}>Environment Information</Title>
          <div className="space-y-2 text-sm">
            <div>
              <strong>Node.js:</strong> v18.17.0
            </div>
            <div>
              <strong>Next.js:</strong> v14.2.30
            </div>
            <div>
              <strong>React:</strong> v18.0.0
            </div>
            <div>
              <strong>Database:</strong> PostgreSQL 15.0
            </div>
            <div>
              <strong>Server:</strong> Vercel
            </div>
          </div>
        </div>

        <Divider />

        <Space>
          <Button type="primary" icon={<DatabaseOutlined />}>
            Backup Database
          </Button>
          <Button icon={<SettingOutlined />}>Clear Cache</Button>
        </Space>
      </div>
    </Card>
  );

  const tabItems = [
    {
      key: "general",
      label: "General",
      icon: <GlobalOutlined />,
      children: generalSettings,
    },
    {
      key: "email",
      label: "Email",
      icon: <MailOutlined />,
      children: emailSettings,
    },
    {
      key: "security",
      label: "Security",
      icon: <SecurityScanOutlined />,
      children: securitySettings,
    },
    {
      key: "system",
      label: "System",
      icon: <DatabaseOutlined />,
      children: systemInfo,
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <Title level={2}>Settings</Title>
        <Text type="secondary">
          Configure your application settings and preferences
        </Text>
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        size="large"
      />
    </div>
  );
};

export default SettingsPage;
