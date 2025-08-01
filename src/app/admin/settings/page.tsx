"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  Tabs,
  Form,
  message,
  Divider,
  Typography,
  Button,
  Input,
  Select,
  Upload,
  Space,
  Tooltip,
  Modal,
} from "antd";
import {
  SaveOutlined,
  GlobalOutlined,
  MailOutlined,
  PictureOutlined,
  DeleteOutlined,
  EyeOutlined,
  UploadOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useSession } from "next-auth/react";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchSetting, upsertSetting } from "@/store/actions/settings";
import { getImageUrl } from "@/utils";
import Image from "next/image";
import MediaLibraryModal from "@/components/UI/MediaLibraryModal";

const { Title, Text } = Typography;
const { TextArea } = Input;

const SettingsPage: React.FC = (props: any) => {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  const settingData = useSelector((state: RootState) => state.settings.detail);
  const settingLoading = useSelector(
    (state: RootState) => state.settings.loading
  );

  const [generalForm] = Form.useForm();
  const [emailForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [formField, setFormField] = useState<any | undefined>();
  const [isModalMediaOpen, setIsModalMediaOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [previewVisible, setPreviewVisible] = useState(false);

  useEffect(() => {
    if (session?.accessToken) {
      dispatch(fetchSetting(activeTab, session?.accessToken));
    }
  }, [activeTab, session?.accessToken]);

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
          siteLogo: formField.siteLogo,
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
    message.success("Settings saved successfully!");
    setLoading(false);
  };

  const onFailure = (error: any) => {
    message.error(`Save failed: ${error}`);
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

    dispatch(
      upsertSetting(payload, session?.accessToken || "", onSuccess, onFailure)
    );
  };

  const handleMediaSelect = (media: any) => {
    generalForm.setFieldsValue({ siteLogo: media.slug });
    setSelectedImage(media);
    setIsModalMediaOpen(false);
    message.success("Logo selected successfully!");
  };

  const handleRemoveLogo = () => {
    Modal.confirm({
      title: "Remove Logo",
      content:
        "Are you sure you want to remove the current logo? This action cannot be undone.",
      okText: "Remove",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        generalForm.setFieldsValue({ siteLogo: "" });
        setSelectedImage(null);
        message.success("Logo removed successfully!");
      },
    });
  };

  const handlePreviewLogo = () => {
    setPreviewVisible(true);
  };

  const getCurrentLogo = () => {
    const logoValue = generalForm.getFieldValue("siteLogo");
    return logoValue || formField?.siteLogo;
  };

  const getLogoInfo = () => {
    const currentLogo = getCurrentLogo();
    if (!currentLogo) return null;

    // Try to get logo info from selected image or form field
    const logoInfo = selectedImage || formField?.logoInfo;
    return {
      name: logoInfo?.name || "Logo",
      size: logoInfo?.size || "Unknown",
      dimensions: logoInfo?.dimensions || "Unknown",
      type: logoInfo?.mimeType || "image/*",
    };
  };

  const generalSettings = (
    <Card loading={settingLoading}>
      <Form
        form={generalForm}
        layout="vertical"
        onFinish={(values) => handleSaveSettings(values, "general")}
      >
        <Form.Item
          name="siteLogo"
          label={
            <Space>
              <span>Site Logo</span>
              <Tooltip title="Recommended size: 200x200px, Max file size: 2MB. Supported formats: JPG, PNG, SVG">
                <InfoCircleOutlined style={{ color: "#1890ff" }} />
              </Tooltip>
            </Space>
          }
          className="max-w-[500px]"
        >
          <div className="space-y-4">
            {/* Logo Preview Section */}
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <div className="flex items-start gap-6">
                {/* Logo Preview */}
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    {getCurrentLogo() ? (
                      <div className="relative">
                        <Image
                          src={getImageUrl(getCurrentLogo())}
                          alt="Site Logo"
                          width={120}
                          height={120}
                          className="rounded-lg border-2 border-gray-200 object-contain bg-white"
                        />
                        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          Active
                        </div>
                      </div>
                    ) : (
                      <div className="w-[120px] h-[120px] bg-gray-200 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                        <div className="text-center">
                          <PictureOutlined className="text-3xl text-gray-400 mb-2" />
                          <div className="text-gray-500 text-sm">No logo</div>
                        </div>
                      </div>
                    )}
                  </div>
                  <Text className="text-xs text-gray-500 text-center">
                    Logo Preview
                  </Text>
                </div>

                {/* Browser Preview */}
                <div className="flex-1">
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    {/* Browser Header */}
                    <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="flex-1 bg-white rounded px-3 py-1 mx-2 text-xs text-gray-600">
                        {formField?.siteUrl || "example.com"}
                      </div>
                    </div>

                    {/* Browser Content */}
                    <div className="p-4">
                      <div className="flex items-center gap-3">
                        {getCurrentLogo() ? (
                          <Image
                            src={getImageUrl(getCurrentLogo())}
                            alt="Site Logo"
                            width={32}
                            height={32}
                            className="rounded object-contain"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gray-300 rounded"></div>
                        )}
                        <div>
                          <div className="font-semibold text-gray-800">
                            {formField?.siteName || "Site Name"}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formField?.siteDescription || "Site description"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Text className="text-xs text-gray-500 mt-2 block">
                    Browser Tab Preview
                  </Text>
                </div>
              </div>
            </div>

            {/* Logo Actions */}
            <div className="flex gap-3">
              <Button
                type="primary"
                icon={<PictureOutlined />}
                onClick={() => setIsModalMediaOpen(true)}
                className="flex-1"
              >
                {getCurrentLogo() ? "Change Logo" : "Select Logo"}
              </Button>

              {getCurrentLogo() && (
                <>
                  <Tooltip title="Preview logo">
                    <Button
                      icon={<EyeOutlined />}
                      onClick={handlePreviewLogo}
                    />
                  </Tooltip>

                  <Tooltip title="Remove logo">
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      onClick={handleRemoveLogo}
                    />
                  </Tooltip>
                </>
              )}
            </div>
          </div>
        </Form.Item>

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
        <Form.Item
          name="SMTP_HOST"
          label="SMTP Host"
          rules={[{ required: true, message: "Please enter SMTP host" }]}
        >
          <Input placeholder="smtp.gmail.com" />
        </Form.Item>

        <Form.Item
          name="SMTP_PORT"
          label="SMTP Port"
          rules={[{ required: true, message: "Please enter SMTP port" }]}
        >
          <Input placeholder="587" />
        </Form.Item>

        <Form.Item
          name="SMTP_SECURITY"
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
          name="SMTP_USERNAME"
          label="SMTP Username"
          rules={[{ required: true, message: "Please enter SMTP username" }]}
        >
          <Input placeholder="your-email@gmail.com" />
        </Form.Item>

        <Form.Item
          name="SMTP_PASSWORD"
          label="SMTP Password"
          rules={[{ required: true, message: "Please enter SMTP password" }]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Divider />

        <Title level={4}>Email Settings</Title>
        {/* 
        <Form.Item name="ADMIN_EMAIL" label="Admin Email" rules={[{ required: true, message: "Please enter admin email" }]}>
          <Input placeholder="admin@example.com" />
        </Form.Item> */}

        <Form.Item
          name="FROM_EMAIL"
          label="From Email"
          rules={[{ required: true, message: "Please enter from email" }]}
        >
          <Input placeholder="noreply@example.com" />
        </Form.Item>

        <Form.Item
          name="FROM_NAME"
          label="From Name"
          rules={[{ required: true, message: "Please enter from name" }]}
        >
          <Input placeholder="Your Site Name" />
        </Form.Item>

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
      <h1 className="text-4xl font-bold ">Settings</h1>

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

      {/* Logo Preview Modal */}
      {previewVisible && getCurrentLogo() && (
        <Modal
          title="Logo Preview"
          open={previewVisible}
          onCancel={() => setPreviewVisible(false)}
          footer={[
            <Button key="close" onClick={() => setPreviewVisible(false)}>
              Close
            </Button>,
          ]}
          width={600}
          centered
        >
          <div className="text-center space-y-4">
            <div className="bg-gray-50 p-6 rounded-lg">
              <Image
                src={getImageUrl(getCurrentLogo())}
                alt="Site Logo Preview"
                width={300}
                height={300}
                className="mx-auto object-contain"
              />
            </div>
            <div className="text-sm text-gray-600">
              <p>This is how your logo will appear on your website.</p>
              <p>
                For best results, ensure your logo has a transparent background.
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SettingsPage;
