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
  Image,
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
import MediaLibraryModal from "@/components/UI/MediaLibraryModal";
import { Media } from "@/types";
import { getImageUrl } from "@/utils";

const { Title, Text } = Typography;
const { TextArea } = Input;

const SettingsPage: React.FC = () => {
  const [generalForm] = Form.useForm();
  const [emailForm] = Form.useForm();
  const [securityForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [isModalMediaOpen, setIsModalMediaOpen] = useState(false);
  const [selectedSiteIcon, setSelectedSiteIcon] = useState<Media | null>(null);

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

  const handleMediaSelect = (media: Media) => {
    setSelectedSiteIcon(media);
    generalForm.setFieldsValue({ siteIcon: media });
  };

  const handleRemoveSiteIcon = () => {
    setSelectedSiteIcon(null);
    generalForm.setFieldsValue({ siteIcon: undefined });
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

        <Title level={4}>Site Icon</Title>
        <Text type="secondary" style={{ display: "block", marginBottom: 16 }}>
          The Site Icon is what you see in browser tabs, bookmark bars, and
          within the mobile app
        </Text>

        <Form.Item name="siteIcon" label="Site Icon">
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 80,
                height: 80,
                border: "1px solid #d9d9d9",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#fafafa",
                overflow: "hidden",
              }}
            >
              {selectedSiteIcon ? (
                <Image
                  src={getImageUrl(selectedSiteIcon.slug)}
                  alt={selectedSiteIcon.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  preview={false}
                />
              ) : (
                <UploadOutlined style={{ fontSize: 24, color: "#999" }} />
              )}
            </div>
            <div style={{ flex: 1 }}>
              <Button
                type="default"
                style={{ marginBottom: 8 }}
                onClick={() => setIsModalMediaOpen(true)}
              >
                Change Site Icon
              </Button>
              <br />
              <Button
                type="text"
                danger
                size="small"
                onClick={handleRemoveSiteIcon}
                disabled={!selectedSiteIcon}
              >
                Remove Site Icon
              </Button>
            </div>
          </div>
        </Form.Item>

        <Divider />

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

      <MediaLibraryModal
        isOpen={isModalMediaOpen}
        onCancel={() => setIsModalMediaOpen(false)}
        onSelect={handleMediaSelect}
        accept="image/*"
      />
    </div>
  );
};

export default SettingsPage;
