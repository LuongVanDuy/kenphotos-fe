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
  Divider,
} from "antd";
import { Option } from "antd/es/mentions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  UploadOutlined,
  UserOutlined,
  CameraOutlined,
  LockOutlined,
} from "@ant-design/icons";
import MediaLibraryModal from "@/components/UI/MediaLibraryModal";
import { getImageUrl } from "@/utils";
import Title from "antd/es/typography/Title";
import { useDispatch } from "react-redux";
import { changePassword } from "@/store/actions/users";
import { customMessage } from "@/utils/messageHelper";
import { getAccessToken } from "@/utils/getAccessToken";

const { Title: AntTitle, Text } = Typography;

interface UserFormProps {
  form?: FormInstance;
  onFinish: (values: any) => void;
  mode: "create" | "edit";
  loading: boolean;
  userId?: number;
}

const UserForm: React.FC<UserFormProps> = ({
  form,
  onFinish,
  mode,
  loading,
  userId,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

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
    form?.setFieldsValue({ avatarUrl: media.slug });
    setIsMediaModalOpen(false);
  };

  const handlePasswordChange = async (values: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    if (!userId) {
      customMessage.error("User ID is required");
      return;
    }

    if (values.newPassword !== values.confirmPassword) {
      customMessage.error("Passwords do not match");
      return;
    }

    setPasswordLoading(true);
    try {
      const accessToken = await getAccessToken();

      dispatch(
        changePassword(
          userId,
          {
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword,
          },
          accessToken,
          () => {
            customMessage.success("Password changed successfully");
            setShowPasswordChange(false);
            form?.setFieldsValue({ newPassword: "", confirmPassword: "" });
            setPasswordLoading(false);
          },
          (error: string) => {
            customMessage.error(error || "Failed to change password");
            setPasswordLoading(false);
          }
        ) as any
      );
    } catch (error) {
      customMessage.error("Authentication required");
      setPasswordLoading(false);
    }
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-4xl font-bold ">
            {mode === "create" ? "Create New User" : "Edit User Profile"}
          </h1>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div className="flex gap-8">
            <div className="flex-1">
              <div className="space-y-6">
                <div className="border border-gray-300 rounded-sm bg-white ">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-300">
                    <h3 className="text-sm font-semibold text-gray-700">
                      Basic Information
                    </h3>
                  </div>

                  <div className=" flex flex-col gap-5 p-8">
                    <div className="">
                      <Row gutter={24}>
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
                            className="!mb-0"
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
                            label="Last Name"
                            rules={[
                              {
                                required: true,
                                message: "Please enter last name",
                              },
                            ]}
                            className="!mb-0"
                          >
                            <Input
                              placeholder="Enter last name"
                              className="!h-[40px] border-gray-300 hover:border-blue-400 focus:border-blue-500 rounded-lg transition-colors"
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </div>

                    <div className=" space-y-4">
                      <Row gutter={24}>
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
                            className="!mb-0"
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
                            label="Email"
                            rules={[
                              { required: true, message: "Please enter email" },
                              {
                                type: "email",
                                message: "Please enter valid email",
                              },
                            ]}
                            className="!mb-0"
                          >
                            <Input
                              placeholder="Enter email address"
                              className="!h-[40px] border-gray-300 hover:border-blue-400 focus:border-blue-500 rounded-lg transition-colors"
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={24}>
                        <Col span={12}>
                          <Form.Item
                            name="country"
                            label="Country"
                            rules={[
                              {
                                required: true,
                                message: "Please select country",
                              },
                            ]}
                            className="!mb-0"
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
                            label="Phone Number"
                            rules={[
                              {
                                required: true,
                                message: "Please enter phone number",
                              },
                            ]}
                            className="!mb-0"
                          >
                            <Input
                              placeholder="Enter phone number"
                              className="!h-[40px] border-gray-300 hover:border-blue-400 focus:border-blue-500 rounded-lg transition-colors"
                              prefix={<span className="text-gray-400">+1</span>}
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={24}>
                        <Col span={12}>
                          <Form.Item
                            name="timezone"
                            label="Timezone"
                            rules={[
                              {
                                required: true,
                                message: "Please select timezone",
                              },
                            ]}
                            className="!mb-0"
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
                            label="Postal Code"
                            rules={[
                              {
                                required: true,
                                message: "Please enter postal code",
                              },
                            ]}
                            className="!mb-0"
                          >
                            <Input
                              placeholder="Enter postal code"
                              className="!h-[40px] border-gray-300 hover:border-blue-400 focus:border-blue-500 rounded-lg transition-colors"
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item
                        name="businessWebsite"
                        label="Business Website"
                        rules={[
                          { type: "url", message: "Please enter valid URL" },
                        ]}
                        className="!mb-0"
                      >
                        <Input
                          placeholder="https://my-website.com"
                          className="!h-[40px] border-gray-300 hover:border-blue-400 focus:border-blue-500 rounded-lg transition-colors"
                        />
                      </Form.Item>
                    </div>

                    {mode === "create" && (
                      <div className="">
                        <Form.Item
                          name="password"
                          label="Password"
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
                          className="!mb-0"
                        >
                          <Input.Password
                            placeholder="Enter password"
                            className="!h-[40px] border-gray-300 hover:border-blue-400 focus:border-blue-500 rounded-lg transition-colors"
                          />
                        </Form.Item>
                      </div>
                    )}

                    {mode === "edit" && (
                      <div className="">
                        <Divider />
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <LockOutlined className="text-gray-600" />
                            <Text className="text-gray-700 font-medium">
                              Password Management
                            </Text>
                          </div>
                          <Button
                            type="default"
                            size="small"
                            onClick={() =>
                              setShowPasswordChange(!showPasswordChange)
                            }
                            className="!h-[32px] px-4 rounded-lg font-medium border-gray-300 hover:border-blue-400 transition-colors"
                          >
                            {showPasswordChange ? "Cancel" : "Change Password"}
                          </Button>
                        </div>

                        {showPasswordChange && (
                          <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <Row gutter={24}>
                              <Col span={12}>
                                <Form.Item
                                  name="newPassword"
                                  label="New Password"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please enter new password",
                                    },
                                    {
                                      min: 6,
                                      message:
                                        "Password must be at least 6 characters",
                                    },
                                  ]}
                                  className="!mb-0"
                                >
                                  <Input.Password
                                    placeholder="Enter new password"
                                    className="!h-[40px] border-gray-300 hover:border-blue-400 focus:border-blue-500 rounded-lg transition-colors"
                                  />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item
                                  name="confirmPassword"
                                  label="Confirm Password"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please confirm password",
                                    },
                                    ({ getFieldValue }) => ({
                                      validator(_, value) {
                                        if (
                                          !value ||
                                          getFieldValue("newPassword") === value
                                        ) {
                                          return Promise.resolve();
                                        }
                                        return Promise.reject(
                                          new Error("Passwords do not match")
                                        );
                                      },
                                    }),
                                  ]}
                                  className="!mb-0"
                                >
                                  <Input.Password
                                    placeholder="Confirm new password"
                                    className="!h-[40px] border-gray-300 hover:border-blue-400 focus:border-blue-500 rounded-lg transition-colors"
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                            <div className="flex justify-end">
                              <Button
                                type="primary"
                                loading={passwordLoading}
                                onClick={() => {
                                  const newPassword =
                                    form?.getFieldValue("newPassword");
                                  const confirmPassword =
                                    form?.getFieldValue("confirmPassword");
                                  if (newPassword && confirmPassword) {
                                    handlePasswordChange({
                                      newPassword,
                                      confirmPassword,
                                    });
                                  } else {
                                    customMessage.error(
                                      "Please fill in both password fields"
                                    );
                                  }
                                }}
                                className="bg-blue-600 border-blue-600 hover:bg-blue-700 !h-[40px] px-6 rounded-lg font-medium shadow-sm transition-colors"
                              >
                                {passwordLoading
                                  ? "Changing..."
                                  : "Change Password"}
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <Form.Item name="avatarUrl" hidden>
                  <Input />
                </Form.Item>
              </div>
            </div>

            <div className="w-80 flex-shrink-0">
              <div className="space-y-6">
                <div className="border border-gray-300 rounded-sm bg-white">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-300">
                    <h3 className="text-sm font-semibold text-gray-700">
                      Profile Picture
                    </h3>
                  </div>
                  <div className="p-4">
                    <div className="text-center">
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
                </div>
                <div className="border border-gray-300 rounded-sm bg-white">
                  <div className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => router.back()}
                        className="!h-[40px] flex-1 px-8 rounded-lg font-medium border-gray-300 hover:border-gray-400 transition-colors"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        onClick={() => form?.submit()}
                        className="bg-blue-600 flex-1 border-blue-600 hover:bg-blue-700 !h-[40px] px-8 rounded-lg font-medium shadow-sm transition-colors"
                      >
                        {loading ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
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
