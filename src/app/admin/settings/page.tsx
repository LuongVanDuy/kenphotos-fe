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
import {
  TextField,
  TextAreaField,
  SelectField,
  SwitchField,
  FormActions,
  UploadField,
} from "@/components/Admin/UI";

const { Title, Text } = Typography;

const SettingsPage: React.FC = () => {
  const [generalForm] = Form.useForm();
  const [emailForm] = Form.useForm();
  const [securityForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
        onFinish={(values) => handleSaveSettings(values, 'general')}
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
        
        <TextField
          name="siteName"
          label="Site Name"
          placeholder="Enter site name"
          required
          description="The name of your website"
        />

        <TextAreaField
          name="siteDescription"
          label="Site Description"
          placeholder="Enter site description"
          rows={3}
          description="Brief description of your website"
        />

        <TextField
          name="siteUrl"
          label="Site URL"
          placeholder="https://example.com"
          type="url"
          description="The main URL of your website"
        />

        <UploadField
          name="siteLogo"
          label="Site Logo"
          description="Upload your site logo"
          accept="image/*"
          listType="picture-card"
          maxCount={1}
        />

        <Divider />

        <Title level={4}>Localization</Title>

        <SelectField
          name="timezone"
          label="Timezone"
          options={timezoneOptions}
          required
          description="Default timezone for the site"
        />

        <SelectField
          name="language"
          label="Default Language"
          options={languageOptions}
          required
          description="Default language for the interface"
        />

        <Divider />

        <Title level={4}>Site Settings</Title>

        <SwitchField
          name="maintenanceMode"
          label="Maintenance Mode"
          description="Enable maintenance mode to temporarily disable the site"
        />

        <SwitchField
          name="allowRegistration"
          label="Allow User Registration"
          description="Allow new users to register accounts"
        />

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
        onFinish={(values) => handleSaveSettings(values, 'email')}
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

        <TextField
          name="smtpHost"
          label="SMTP Host"
          placeholder="smtp.gmail.com"
          required
          description="SMTP server hostname"
        />

        <TextField
          name="smtpPort"
          label="SMTP Port"
          placeholder="587"
          required
          description="SMTP server port (usually 587 for TLS or 465 for SSL)"
        />

        <SelectField
          name="smtpSecurity"
          label="Security"
          options={[
            { value: "none", label: "None" },
            { value: "tls", label: "TLS" },
            { value: "ssl", label: "SSL" },
          ]}
          required
          description="Email encryption method"
        />

        <TextField
          name="smtpUsername"
          label="SMTP Username"
          placeholder="your-email@gmail.com"
          required
          description="SMTP authentication username"
        />

        <TextField
          name="smtpPassword"
          label="SMTP Password"
          placeholder="Enter password"
          type="password"
          required
          description="SMTP authentication password"
        />

        <Divider />

        <Title level={4}>Email Settings</Title>

        <TextField
          name="adminEmail"
          label="Admin Email"
          placeholder="admin@example.com"
          type="email"
          required
          description="Primary admin email address"
        />

        <TextField
          name="fromEmail"
          label="From Email"
          placeholder="noreply@example.com"
          type="email"
          description="Default 'from' email address for outgoing emails"
        />

        <TextField
          name="fromName"
          label="From Name"
          placeholder="Your Site Name"
          description="Default 'from' name for outgoing emails"
        />

        <SwitchField
          name="emailNotifications"
          label="Enable Email Notifications"
          description="Send email notifications for various events"
        />

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
        onFinish={(values) => handleSaveSettings(values, 'security')}
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

        <TextField
          name="sessionTimeout"
          label="Session Timeout (hours)"
          placeholder="24"
          required
          description="How long user sessions remain active"
        />

        <TextField
          name="maxLoginAttempts"
          label="Max Login Attempts"
          placeholder="5"
          required
          description="Maximum failed login attempts before account lockout"
        />

        <SwitchField
          name="requireStrongPasswords"
          label="Require Strong Passwords"
          description="Enforce strong password requirements"
        />

        <SwitchField
          name="twoFactorAuth"
          label="Two-Factor Authentication"
          description="Enable 2FA for enhanced security"
        />

        <Divider />

        <Title level={4}>Access Control</Title>

        <SwitchField
          name="ipWhitelist"
          label="IP Whitelist"
          description="Restrict access to specific IP addresses"
        />

        <TextAreaField
          name="allowedIps"
          label="Allowed IP Addresses"
          placeholder="192.168.1.1&#10;10.0.0.1"
          rows={4}
          description="One IP address per line (only if IP whitelist is enabled)"
        />

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
            <div><strong>Node.js:</strong> v18.17.0</div>
            <div><strong>Next.js:</strong> v14.2.30</div>
            <div><strong>React:</strong> v18.0.0</div>
            <div><strong>Database:</strong> PostgreSQL 15.0</div>
            <div><strong>Server:</strong> Vercel</div>
          </div>
        </div>

        <Divider />

        <Space>
          <Button type="primary" icon={<DatabaseOutlined />}>
            Backup Database
          </Button>
          <Button icon={<SettingOutlined />}>
            Clear Cache
          </Button>
        </Space>
      </div>
    </Card>
  );

  const tabItems = [
    {
      key: 'general',
      label: 'General',
      icon: <GlobalOutlined />,
      children: generalSettings,
    },
    {
      key: 'email',
      label: 'Email',
      icon: <MailOutlined />,
      children: emailSettings,
    },
    {
      key: 'security',
      label: 'Security',
      icon: <SecurityScanOutlined />,
      children: securitySettings,
    },
    {
      key: 'system',
      label: 'System',
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
