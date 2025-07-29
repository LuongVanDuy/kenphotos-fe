import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  InputNumber,
  Card,
  Space,
  Divider,
  Typography,
  Row,
  Col,
  Upload,
  message,
} from "antd";
import {
  PlusOutlined,
  MinusCircleOutlined,
  UploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import CustomQuill from "@/components/UI/CustomQuill";
import MediaLibraryModal from "@/components/UI/MediaLibraryModal";
import Title from "antd/es/typography/Title";

const { TextArea } = Input;
const { Option } = Select;
const { Title: AntTitle } = Typography;

interface ServiceFormProps {
  form?: any;
  onFinish: (values: any) => void;
  onSaveDraft: (values: any) => void;
  mode: "create" | "edit";
  loading: boolean;
  initialValues?: any;
}

const ServiceForm: React.FC<ServiceFormProps> = ({
  form,
  onFinish,
  onSaveDraft,
  mode,
  loading,
  initialValues,
}) => {
  const [isModalMediaOpen, setIsModalMediaOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<any[]>([]);

  const statusOptions = [
    { value: 0, label: "Draft" },
    { value: 1, label: "Published" },
    { value: 2, label: "Archived" },
  ];

  const typeOptions = [
    { value: 0, label: "Basic" },
    { value: 1, label: "Premium" },
    { value: 2, label: "Enterprise" },
  ];

  const handleMediaSelect = (media: any) => {
    const newImages = [...selectedImages, media];
    setSelectedImages(newImages);
    form.setFieldsValue({ images: newImages });
    setIsModalMediaOpen(false);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    form.setFieldsValue({ images: newImages });
  };

  const handleFinish = (values: any) => {
    // Validate required arrays
    if (!values.images || values.images.length === 0) {
      message.error("Please add at least one image");
      return;
    }
    onFinish(values);
  };

  const handleDraft = (values: any) => {
    onSaveDraft(values);
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-7">
          <div className="flex items-center space-x-4">
            <AntTitle level={4} className="!mb-0">
              {mode === "edit" ? "Edit Service" : "Add New Service"}
            </AntTitle>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              type="default"
              onClick={() => form.submit()}
              disabled={loading}
            >
              Save Draft
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              onClick={() => form.submit()}
            >
              {mode === "edit" ? "Update" : "Publish"}
            </Button>
          </div>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{
            status: 0,
            type: 0,
            rating: 0,
            orderCount: 0,
            originalPrice: 0,
            discountedPrice: 0,
            images: [],
            styles: [],
            steps: [],
            idealFors: [],
            includes: [],
            addOns: [],
            ...initialValues,
          }}
        >
          <Row gutter={24}>
            {/* Main Content */}
            <Col span={16}>
              <Space
                direction="vertical"
                size="large"
                style={{ width: "100%" }}
              >
                {/* Basic Information */}
                <Card title="Basic Information" size="small">
                  <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                      { required: true, message: "Please enter the title" },
                    ]}
                  >
                    <Input placeholder="Enter service title" />
                  </Form.Item>

                  <Form.Item
                    name="slug"
                    label="Slug"
                    rules={[
                      { required: true, message: "Please enter the slug" },
                    ]}
                  >
                    <Input placeholder="service-url-slug" />
                  </Form.Item>

                  <Form.Item
                    name="content"
                    label="Content"
                    rules={[
                      { required: true, message: "Please enter the content" },
                    ]}
                  >
                    <CustomQuill
                      placeholder="Start writing service content..."
                      style={{ minHeight: "300px" }}
                      className="quill-editor"
                      onChange={(value) =>
                        form.setFieldsValue({ content: value })
                      }
                    />
                  </Form.Item>
                </Card>

                {/* Images */}
                <Card title="Service Images" size="small">
                  <Form.Item name="images" label="Images">
                    <div>
                      <Button
                        type="dashed"
                        icon={<UploadOutlined />}
                        onClick={() => setIsModalMediaOpen(true)}
                        style={{ width: "100%", marginBottom: 16 }}
                      >
                        Add Images
                      </Button>

                      {selectedImages.length > 0 && (
                        <div className="grid grid-cols-3 gap-4">
                          {selectedImages.map((image, index) => (
                            <div key={index} className="relative">
                              <img
                                src={image.url || image.slug}
                                alt={image.title || `Image ${index + 1}`}
                                className="w-full h-32 object-cover rounded"
                              />
                              <Button
                                type="text"
                                icon={<DeleteOutlined />}
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-1 right-1 bg-white"
                                size="small"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Form.Item>
                </Card>

                {/* Styles */}
                <Card title="Styles" size="small">
                  <Form.List name="styles">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <div
                            key={key}
                            className="border border-gray-200 p-4 rounded mb-4"
                          >
                            <Row gutter={16}>
                              <Col span={12}>
                                <Form.Item
                                  {...restField}
                                  name={[name, "name"]}
                                  label="Style Name"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing style name",
                                    },
                                  ]}
                                >
                                  <Input placeholder="Style name" />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item
                                  {...restField}
                                  name={[name, "description"]}
                                  label="Description"
                                >
                                  <TextArea
                                    placeholder="Style description"
                                    rows={2}
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                            <Button
                              type="text"
                              icon={<MinusCircleOutlined />}
                              onClick={() => remove(name)}
                              danger
                            >
                              Remove Style
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          icon={<PlusOutlined />}
                          style={{ width: "100%" }}
                        >
                          Add Style
                        </Button>
                      </>
                    )}
                  </Form.List>
                </Card>

                {/* Steps */}
                <Card title="Service Steps" size="small">
                  <Form.List name="steps">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <div
                            key={key}
                            className="border border-gray-200 p-4 rounded mb-4"
                          >
                            <Row gutter={16}>
                              <Col span={8}>
                                <Form.Item
                                  {...restField}
                                  name={[name, "stepNumber"]}
                                  label="Step Number"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing step number",
                                    },
                                  ]}
                                >
                                  <InputNumber
                                    min={1}
                                    placeholder="1"
                                    style={{ width: "100%" }}
                                  />
                                </Form.Item>
                              </Col>
                              <Col span={16}>
                                <Form.Item
                                  {...restField}
                                  name={[name, "title"]}
                                  label="Step Title"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing step title",
                                    },
                                  ]}
                                >
                                  <Input placeholder="Step title" />
                                </Form.Item>
                              </Col>
                            </Row>
                            <Form.Item
                              {...restField}
                              name={[name, "description"]}
                              label="Description"
                            >
                              <TextArea
                                placeholder="Step description"
                                rows={3}
                              />
                            </Form.Item>
                            <Button
                              type="text"
                              icon={<MinusCircleOutlined />}
                              onClick={() => remove(name)}
                              danger
                            >
                              Remove Step
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          icon={<PlusOutlined />}
                          style={{ width: "100%" }}
                        >
                          Add Step
                        </Button>
                      </>
                    )}
                  </Form.List>
                </Card>

                {/* Ideal For */}
                <Card title="Ideal For" size="small">
                  <Form.List name="idealFors">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <div
                            key={key}
                            className="border border-gray-200 p-4 rounded mb-4"
                          >
                            <Form.Item
                              {...restField}
                              name={[name, "description"]}
                              label="Ideal For"
                              rules={[
                                {
                                  required: true,
                                  message: "Missing description",
                                },
                              ]}
                            >
                              <TextArea
                                placeholder="Who is this service ideal for?"
                                rows={2}
                              />
                            </Form.Item>
                            <Button
                              type="text"
                              icon={<MinusCircleOutlined />}
                              onClick={() => remove(name)}
                              danger
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          icon={<PlusOutlined />}
                          style={{ width: "100%" }}
                        >
                          Add Ideal For
                        </Button>
                      </>
                    )}
                  </Form.List>
                </Card>

                {/* Includes */}
                <Card title="What's Included" size="small">
                  <Form.List name="includes">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <div
                            key={key}
                            className="border border-gray-200 p-4 rounded mb-4"
                          >
                            <Form.Item
                              {...restField}
                              name={[name, "item"]}
                              label="Included Item"
                              rules={[
                                { required: true, message: "Missing item" },
                              ]}
                            >
                              <Input placeholder="What's included in this service?" />
                            </Form.Item>
                            <Button
                              type="text"
                              icon={<MinusCircleOutlined />}
                              onClick={() => remove(name)}
                              danger
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          icon={<PlusOutlined />}
                          style={{ width: "100%" }}
                        >
                          Add Included Item
                        </Button>
                      </>
                    )}
                  </Form.List>
                </Card>

                {/* Add-ons */}
                <Card title="Add-ons" size="small">
                  <Form.List name="addOns">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <div
                            key={key}
                            className="border border-gray-200 p-4 rounded mb-4"
                          >
                            <Row gutter={16}>
                              <Col span={12}>
                                <Form.Item
                                  {...restField}
                                  name={[name, "name"]}
                                  label="Add-on Name"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing add-on name",
                                    },
                                  ]}
                                >
                                  <Input placeholder="Add-on name" />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item
                                  {...restField}
                                  name={[name, "price"]}
                                  label="Price"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing price",
                                    },
                                  ]}
                                >
                                  <InputNumber
                                    min={0}
                                    placeholder="0.00"
                                    style={{ width: "100%" }}
                                    formatter={(value) =>
                                      `$ ${value}`.replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ","
                                      )
                                    }
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                            <Form.Item
                              {...restField}
                              name={[name, "description"]}
                              label="Description"
                            >
                              <TextArea
                                placeholder="Add-on description"
                                rows={2}
                              />
                            </Form.Item>
                            <Button
                              type="text"
                              icon={<MinusCircleOutlined />}
                              onClick={() => remove(name)}
                              danger
                            >
                              Remove Add-on
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          icon={<PlusOutlined />}
                          style={{ width: "100%" }}
                        >
                          Add Add-on
                        </Button>
                      </>
                    )}
                  </Form.List>
                </Card>
              </Space>
            </Col>

            {/* Sidebar */}
            <Col span={8}>
              <Space
                direction="vertical"
                size="large"
                style={{ width: "100%" }}
              >
                {/* Publish Settings */}
                <Card title="Publish" size="small">
                  <Form.Item
                    name="status"
                    label="Status"
                    rules={[
                      { required: true, message: "Please select status" },
                    ]}
                  >
                    <Select options={statusOptions} />
                  </Form.Item>

                  <Form.Item
                    name="type"
                    label="Service Type"
                    rules={[{ required: true, message: "Please select type" }]}
                  >
                    <Select options={typeOptions} />
                  </Form.Item>
                </Card>

                {/* Pricing */}
                <Card title="Pricing" size="small">
                  <Form.Item
                    name="originalPrice"
                    label="Original Price"
                    rules={[
                      {
                        required: true,
                        message: "Please enter original price",
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      placeholder="0.00"
                      style={{ width: "100%" }}
                      formatter={(value) =>
                        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>

                  <Form.Item name="discountedPrice" label="Discounted Price">
                    <InputNumber
                      min={0}
                      placeholder="0.00"
                      style={{ width: "100%" }}
                      formatter={(value) =>
                        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                </Card>

                {/* Statistics */}
                <Card title="Statistics" size="small">
                  <Form.Item name="rating" label="Rating">
                    <InputNumber
                      min={0}
                      max={5}
                      step={0.1}
                      placeholder="0.0"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>

                  <Form.Item name="orderCount" label="Order Count">
                    <InputNumber
                      min={0}
                      placeholder="0"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Card>
              </Space>
            </Col>
          </Row>
        </Form>
      </div>
      <MediaLibraryModal
        isOpen={isModalMediaOpen}
        onCancel={() => setIsModalMediaOpen(false)}
        onSelect={handleMediaSelect}
        accept="image/*"
      />
    </>
  );
};

export default ServiceForm;
