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
} from "antd";
import {
  SaveOutlined,
  SettingOutlined,
  GlobalOutlined,
  MailOutlined,
  SecurityScanOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import { CustomInput, CustomTextarea } from "@/components/UI/CustomInput";
import { CustomSelect } from "@/components/UI/CustomSelect";
import { CustomSwitch } from "@/components/UI/CustomSwitch";
import FormActions from "@/components/UI/FormActions";
import UploadField from "@/components/UI/UploadField";

const { Title, Text } = Typography;

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

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="siteName" style={{ fontWeight: 500 }}>
            Site Name
          </label>
          <CustomInput id="siteName" placeholder="Enter site name" />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="siteDescription" style={{ fontWeight: 500 }}>
            Site Description
          </label>
          <CustomTextarea
            id="siteDescription"
            placeholder="Enter site description"
            rows={3}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="siteUrl" style={{ fontWeight: 500 }}>
            Site URL
          </label>
          <CustomInput id="siteUrl" placeholder="https://example.com" />
        </div>
        <UploadField
          name="siteLogo"
          accept="image/*"
          listType="picture-card"
          maxCount={1}
        />

        <Divider />

        <Title level={4}>Localization</Title>

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="timezone" style={{ fontWeight: 500 }}>
            Timezone
          </label>
          <CustomSelect options={timezoneOptions} style={{ width: "100%" }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="language" style={{ fontWeight: 500 }}>
            Language
          </label>
          <CustomSelect options={languageOptions} style={{ width: "100%" }} />
        </div>

        <Divider />

        <Title level={4}>Site Settings</Title>

        <div style={{ marginBottom: 16 }}>
          <CustomSwitch />
          <span style={{ marginLeft: 8 }}>Maintenance Mode</span>
        </div>
        <div style={{ marginBottom: 16 }}>
          <CustomSwitch />
          <span style={{ marginLeft: 8 }}>Allow Registration</span>
        </div>

        <FormActions
          loading={loading}
          submitText="Save General Settings"
          showCancel={false}
        />
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

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="smtpHost" style={{ fontWeight: 500 }}>
            SMTP Host
          </label>
          <CustomInput id="smtpHost" placeholder="smtp.gmail.com" />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="smtpPort" style={{ fontWeight: 500 }}>
            SMTP Port
          </label>
          <CustomInput id="smtpPort" placeholder="587" />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="smtpSecurity" style={{ fontWeight: 500 }}>
            Security
          </label>
          <CustomSelect
            options={[
              { value: "none", label: "None" },
              { value: "tls", label: "TLS" },
              { value: "ssl", label: "SSL" },
            ]}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="smtpUsername" style={{ fontWeight: 500 }}>
            SMTP Username
          </label>
          <CustomInput id="smtpUsername" placeholder="your-email@gmail.com" />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="smtpPassword" style={{ fontWeight: 500 }}>
            SMTP Password
          </label>
          <CustomInput
            id="smtpPassword"
            placeholder="Enter password"
            type="password"
          />
        </div>

        <Divider />

        <Title level={4}>Email Settings</Title>

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="adminEmail" style={{ fontWeight: 500 }}>
            Admin Email
          </label>
          <CustomInput id="adminEmail" placeholder="admin@example.com" />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="fromEmail" style={{ fontWeight: 500 }}>
            From Email
          </label>
          <CustomInput id="fromEmail" placeholder="noreply@example.com" />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="fromName" style={{ fontWeight: 500 }}>
            From Name
          </label>
          <CustomInput id="fromName" placeholder="Your Site Name" />
        </div>

        <div style={{ marginBottom: 16 }}>
          <CustomSwitch />
          <span style={{ marginLeft: 8 }}>Enable Email Notifications</span>
        </div>

        <FormActions
          loading={loading}
          submitText="Save Email Settings"
          showCancel={false}
        />
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

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="sessionTimeout" style={{ fontWeight: 500 }}>
            Session Timeout (hours)
          </label>
          <CustomInput id="sessionTimeout" placeholder="24" />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="maxLoginAttempts" style={{ fontWeight: 500 }}>
            Max Login Attempts
          </label>
          <CustomInput id="maxLoginAttempts" placeholder="5" />
        </div>

        <div style={{ marginBottom: 16 }}>
          <CustomSwitch />
          <span style={{ marginLeft: 8 }}>Require Strong Passwords</span>
        </div>

        <div style={{ marginBottom: 16 }}>
          <CustomSwitch />
          <span style={{ marginLeft: 8 }}>Two-Factor Authentication</span>
        </div>

        <Divider />

        <Title level={4}>Access Control</Title>

        <div style={{ marginBottom: 16 }}>
          <CustomSwitch />
          <span style={{ marginLeft: 8 }}>IP Whitelist</span>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="allowedIps" style={{ fontWeight: 500 }}>
            Allowed IP Addresses
          </label>
          <CustomTextarea
            id="allowedIps"
            placeholder="192.168.1.1&#10;10.0.0.1"
            rows={4}
          />
        </div>

        <FormActions
          loading={loading}
          submitText="Save Security Settings"
          showCancel={false}
        />
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
