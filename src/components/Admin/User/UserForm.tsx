import {
  Button,
  Col,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  Avatar,
  Upload,
  Modal,
  Checkbox,
  Typography,
} from "antd";
import { Option } from "antd/es/mentions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  UploadOutlined,
  UserOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import MediaLibraryModal from "@/components/UI/MediaLibraryModal";
import { getImageUrl } from "@/utils";

const { Title, Text } = Typography;

interface UserFormProps {
  form?: FormInstance;
  onFinish: (values: any) => void;
  mode: "create" | "edit";
  loading: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  form,
  onFinish,
  mode,
  loading,
}) => {
  const router = useRouter();
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  const countryOptions = [
    { value: "AI", label: "AI Anguilla" },
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

  const handleAvatarSelect = (media: any) => {
    const imageUrl = getImageUrl(media.slug);
    setAvatarUrl(imageUrl);
    form?.setFieldsValue({ avatar: media.slug });
    setIsMediaModalOpen(false);
  };

  return (
    <>
      <div className=" bg-white">
        <div className=" mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-8">
            <Title level={2} className="text-gray-800 mb-2">
              {mode === "create" ? "Create New User" : "Edit User Profile"}
            </Title>
            <Text className="text-gray-600">
              {mode === "create"
                ? "Add a new user to your system"
                : "Update user information and preferences"}
            </Text>
          </div>

          <div className="">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              className="p-8"
            >
              <Row gutter={48} align="top">
                {/* Left Column - Avatar */}
                <Col span={4}>
                  <div className="text-center">
                    <div className="mb-6">
                      <div className="relative inline-block">
                        <div
                          className="w-36 h-36 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center bg-gray-50 hover:border-blue-400 transition-colors duration-200 cursor-pointer"
                          onClick={() => setIsMediaModalOpen(true)}
                        >
                          {avatarUrl ? (
                            <Avatar
                              size={140}
                              src={avatarUrl}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-center">
                              <CameraOutlined className="text-5xl text-gray-400 mb-2" />
                              <Text className="text-gray-500 text-sm block">
                                Click to upload
                              </Text>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>

                {/* Right Column - Form Fields */}
                <Col span={20}>
                  <div className="space-y-2">
                    {/* Row 1: First Name & Last Name */}
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item
                          name="firstName"
                          label={
                            <span className="text-gray-700 font-medium">
                              First Name
                            </span>
                          }
                          rules={[
                            {
                              required: true,
                              message: "Please enter first name",
                            },
                          ]}
                        >
                          <Input
                            placeholder="Enter first name"
                            className="!h-[40px] border-gray-300 hover:border-blue-400 focus:border-blue-500 rounded-lg transition-colors"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="lastName"
                          label={
                            <span className="text-gray-700 font-medium">
                              Last Name
                            </span>
                          }
                          rules={[
                            {
                              required: true,
                              message: "Please enter last name",
                            },
                          ]}
                        >
                          <Input
                            placeholder="Enter last name"
                            className="!h-[40px] border-gray-300 hover:border-blue-400 focus:border-blue-500 rounded-lg transition-colors"
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    {/* Row 2: Business Name & Email */}
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item
                          name="businessName"
                          label={
                            <span className="text-gray-700 font-medium">
                              Business Name
                            </span>
                          }
                          rules={[
                            {
                              required: true,
                              message: "Please enter business name",
                            },
                          ]}
                        >
                          <Input
                            placeholder="Enter business name"
                            className="!h-[40px] border-gray-300 hover:border-blue-400 focus:border-blue-500 rounded-lg transition-colors"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="email"
                          label={
                            <span className="text-gray-700 font-medium">
                              Email
                            </span>
                          }
                          rules={[
                            { required: true, message: "Please enter email" },
                            {
                              type: "email",
                              message: "Please enter valid email",
                            },
                          ]}
                        >
                          <Input
                            placeholder="Enter email address"
                            className="!h-[40px] border-gray-300 hover:border-blue-400 focus:border-blue-500 rounded-lg transition-colors"
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    {/* Row 3: Country & Phone Number */}
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item
                          name="country"
                          label={
                            <div>
                              <span className="text-gray-700 font-medium">
                                Country
                              </span>
                            </div>
                          }
                          rules={[
                            {
                              required: true,
                              message: "Please select country",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Select country"
                            className="!h-[40px]"
                            suffixIcon={
                              <span className="text-gray-400">▼</span>
                            }
                            dropdownClassName="rounded-lg"
                          >
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
                          name="phoneNumber"
                          label={
                            <span className="text-gray-700 font-medium">
                              Phone Number
                            </span>
                          }
                          rules={[
                            {
                              required: true,
                              message: "Please enter phone number",
                            },
                          ]}
                        >
                          <Input
                            placeholder="Enter phone number"
                            className="!h-[40px] border-gray-300 hover:border-blue-400 focus:border-blue-500 rounded-lg transition-colors"
                            prefix={<span className="text-gray-400">+1</span>}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    {/* Row 4: Timezone & Postal Code */}
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item
                          name="timezone"
                          label={
                            <span className="text-gray-700 font-medium">
                              Timezone
                            </span>
                          }
                          rules={[
                            {
                              required: true,
                              message: "Please select timezone",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Select timezone"
                            className="!h-[40px]"
                            suffixIcon={
                              <span className="text-gray-400">▼</span>
                            }
                            dropdownClassName="rounded-lg"
                          >
                            {timezoneOptions.map((option) => (
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
                          label={
                            <span className="text-gray-700 font-medium">
                              Postal Code
                            </span>
                          }
                          rules={[
                            {
                              required: true,
                              message: "Please enter postal code",
                            },
                          ]}
                        >
                          <Input
                            placeholder="Enter postal code"
                            className="!h-[40px] border-gray-300 hover:border-blue-400 focus:border-blue-500 rounded-lg transition-colors"
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    {/* Row 5: Business Website */}
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item
                          name="businessWebsite"
                          label={
                            <span className="text-gray-700 font-medium">
                              Business Website
                            </span>
                          }
                          rules={[
                            { type: "url", message: "Please enter valid URL" },
                          ]}
                        >
                          <Input
                            placeholder="https://my-website.com"
                            className="!h-[40px] border-gray-300 hover:border-blue-400 focus:border-blue-500 rounded-lg transition-colors"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>{/* Empty column for alignment */}</Col>
                    </Row>

                    {/* Hidden avatar field */}
                    <Form.Item name="avatar" hidden>
                      <Input />
                    </Form.Item>

                    {mode === "create" && (
                      <div className="pt-4 border-t border-gray-100">
                        <Form.Item
                          name="password"
                          label={
                            <span className="text-gray-700 font-medium">
                              Password
                            </span>
                          }
                          rules={[
                            {
                              required: true,
                              message: "Please enter password",
                            },
                            {
                              min: 6,
                              message: "Password must be at least 6 characters",
                            },
                          ]}
                        >
                          <Input.Password
                            placeholder="Enter password"
                            className="!h-[40px] border-gray-300 hover:border-blue-400 focus:border-blue-500 rounded-lg transition-colors"
                          />
                        </Form.Item>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-6 border-t border-gray-100">
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className="bg-blue-600 border-blue-600 hover:bg-blue-700 !h-[40px] px-8 rounded-lg font-medium shadow-sm transition-colors"
                      >
                        {loading ? "Saving..." : "Save Changes"}
                      </Button>
                      <Button
                        onClick={() => router.back()}
                        className="!h-[40px] px-8 rounded-lg font-medium border-gray-300 hover:border-gray-400 transition-colors"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>

      {/* Media Library Modal */}
      <MediaLibraryModal
        isOpen={isMediaModalOpen}
        onCancel={() => setIsMediaModalOpen(false)}
        onSelect={handleAvatarSelect}
        title="Select Avatar"
        accept="image/*"
      />
    </>
  );
};

export default UserForm;
