"use client";

import React, { useEffect, useState } from "react";
import { Card, Tabs, Form, message, Divider, Typography, Button, Input, Select, Upload } from "antd";
import { SaveOutlined, GlobalOutlined, MailOutlined, UploadOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { fetchSetting, upsertSetting } from "@/store/actions/settings";

const { Title, Text } = Typography;
const { TextArea } = Input;

const SettingsPage: React.FC = (props: any) => {
  const { fetchSetting, upsertSetting, settingData, settingLoading } = props;

  const [generalForm] = Form.useForm();
  const [emailForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [formField, setFormField] = useState<any | undefined>();

  useEffect(() => {
    fetchSetting(activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (settingData) {
      setFormField(settingData);
    }
  }, [settingData]);

  useEffect(() => {
    if (formField && Object.keys(formField).length) {
      if (activeTab === "general") {
        generalForm.setFieldsValue({
          siteName: formField.siteName,
          siteDescription: formField.siteDescription,
          siteUrl: formField.siteUrl,
        });
      } else {
        emailForm.setFieldsValue({
          SMTP_HOST: formField.SMTP_HOST,
          SMTP_PORT: formField.SMTP_PORT,
          SMTP_SECURITY: formField.SMTP_SECURITY,
          SMTP_USERNAME: formField.SMTP_USERNAME,
          SMTP_PASSWORD: formField.SMTP_PASSWORD,
          FROM_EMAIL: formField.FROM_EMAIL,
          FROM_NAME: formField.FROM_NAME,
        });
      }
    }
  }, [formField]);

  const onSuccess = () => {
    message.success("Upsert successful!");
    setLoading(false);
  };

  const onFailure = (error: any) => {
    message.error(`Upsert failed: ${error}`);
    setLoading(false);
  };

  const handleSaveSettings = async (values: any, formType: string) => {
    setLoading(true);

    const settingsArray = Object.entries(values).map(([key, value]) => ({
      key,
      value,
    }));

    const payload = {
      namespace: formType,
      data: {
        settings: settingsArray,
      },
    };

    upsertSetting(payload, onSuccess, onFailure);
  };

  const generalSettings = (
    <Card loading={settingLoading}>
      <Form form={generalForm} layout="vertical" onFinish={(values) => handleSaveSettings(values, "general")}>
        <Title level={4}>Site Information</Title>

        <Form.Item name="siteName" label="Site Name" rules={[{ required: true, message: "Please enter site name" }]}>
          <Input placeholder="Enter site name" />
        </Form.Item>

        <Form.Item name="siteDescription" label="Site Description" rules={[{ required: true, message: "Please enter site description" }]}>
          <TextArea placeholder="Enter site description" rows={3} />
        </Form.Item>

        <Form.Item name="siteUrl" label="Site URL" rules={[{ required: true, message: "Please enter site URL" }]}>
          <Input placeholder="https://example.com" />
        </Form.Item>

        {/* <Form.Item name="siteLogo" label="Site Logo">
          <Upload name="logo" listType="picture-card" maxCount={1} beforeUpload={() => false}>
            <div>
              <UploadOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item> */}
        <div style={{ marginTop: 24 }}>
          <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />}>
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
        <Title level={4}>SMTP Configuration</Title>

        <Form.Item name="SMTP_HOST" label="SMTP Host" rules={[{ required: true, message: "Please enter SMTP host" }]}>
          <Input placeholder="smtp.gmail.com" />
        </Form.Item>

        <Form.Item name="SMTP_PORT" label="SMTP Port" rules={[{ required: true, message: "Please enter SMTP port" }]}>
          <Input placeholder="587" />
        </Form.Item>

        <Form.Item name="SMTP_SECURITY" label="Security" rules={[{ required: true, message: "Please select security type" }]}>
          <Select
            options={[
              { value: "none", label: "None" },
              { value: "tls", label: "TLS" },
              { value: "ssl", label: "SSL" },
            ]}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item name="SMTP_USERNAME" label="SMTP Username" rules={[{ required: true, message: "Please enter SMTP username" }]}>
          <Input placeholder="your-email@gmail.com" />
        </Form.Item>

        <Form.Item name="SMTP_PASSWORD" label="SMTP Password" rules={[{ required: true, message: "Please enter SMTP password" }]}>
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Divider />

        <Title level={4}>Email Settings</Title>
        {/* 
        <Form.Item name="ADMIN_EMAIL" label="Admin Email" rules={[{ required: true, message: "Please enter admin email" }]}>
          <Input placeholder="admin@example.com" />
        </Form.Item> */}

        <Form.Item name="FROM_EMAIL" label="From Email" rules={[{ required: true, message: "Please enter from email" }]}>
          <Input placeholder="noreply@example.com" />
        </Form.Item>

        <Form.Item name="FROM_NAME" label="From Name" rules={[{ required: true, message: "Please enter from name" }]}>
          <Input placeholder="Your Site Name" />
        </Form.Item>

        <div style={{ marginTop: 24 }}>
          <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />}>
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
        <Text type="secondary">Configure your application settings and preferences</Text>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} size="large" />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  settingData: state.settings.detail,
  settingLoading: state.settings.loading,
});

const mapDispatchToProps = {
  fetchSetting: fetchSetting,
  upsertSetting: upsertSetting,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
