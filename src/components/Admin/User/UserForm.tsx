import { Button, Col, Form, FormInstance, Input, Row, Select } from "antd";
import { Option } from "antd/es/mentions";
import { useRouter } from "next/navigation";

interface UserFormProps {
  form?: FormInstance;
  onFinish: (values: any) => void;
  mode: "create" | "edit";
  loading: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ form, onFinish, mode, loading }) => {
  const router = useRouter();

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

  return (
    <>
      <div className="bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Form form={form} layout="vertical" onFinish={onFinish}>
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
                >
                  <Input placeholder="Enter first name" className="h-10" />
                </Form.Item>

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
                  <Input placeholder="Enter business name" className="h-10" />
                </Form.Item>

                <Form.Item
                  name="country"
                  label={
                    <div>
                      <div>Country</div>
                      <div className="text-xs text-gray-500 font-normal">Country of your bank. Used by Stripe for payouts.</div>
                    </div>
                  }
                  rules={[{ required: true, message: "Please select country" }]}
                >
                  <Select placeholder="Select country" className="h-10" suffixIcon={<span className="text-gray-400">▼</span>}>
                    {countryOptions.map((option) => (
                      <Option key={option.value} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item name="timezone" label="Timezone" rules={[{ required: true, message: "Please select timezone" }]}>
                  <Select placeholder="Select timezone" className="h-10">
                    {timezoneOptions.map((option) => (
                      <Option key={option.value} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item name="businessWebsite" label="Business Website" rules={[{ type: "url", message: "Please enter valid URL" }]}>
                  <Input placeholder="https://my-website.com" className="h-10" />
                </Form.Item>
              </Col>

              {/* Column 2 */}
              <Col span={12}>
                <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: "Please enter last name" }]}>
                  <Input placeholder="Enter last name" className="h-10" />
                </Form.Item>

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
                  <Input placeholder="Enter email address" className="h-10" />
                </Form.Item>

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
                  <Input placeholder="Enter phone number" className="h-10" prefix={<span className="text-gray-400">+1</span>} />
                </Form.Item>

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
                  <Input placeholder="Enter postal code" className="h-10" />
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
                <Input.Password placeholder="Enter password" className="h-10" />
              </Form.Item>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <Button type="primary" htmlType="submit" loading={loading} className="bg-black border-black hover:bg-gray-800 h-10 px-6">
                Save
              </Button>
              <Button onClick={() => router.back()} className="h-10 px-6">
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default UserForm;
