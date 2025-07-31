import React, { useState, useEffect, useCallback } from "react";
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
  Image,
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
import { getImageUrl } from "@/utils";
import { slugify } from "@/utils/slugify";

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
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [slugDebounceTimer, setSlugDebounceTimer] =
    useState<NodeJS.Timeout | null>(null);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (slugDebounceTimer) {
        clearTimeout(slugDebounceTimer);
      }
    };
  }, [slugDebounceTimer]);

  // Auto-generate slug from title (WordPress style)
  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const title = e.target.value;

      // Clear existing timer
      if (slugDebounceTimer) {
        clearTimeout(slugDebounceTimer);
      }

      // Set new timer for debounced slug generation
      const timer = setTimeout(() => {
        if (!isSlugManuallyEdited && title) {
          const generatedSlug = slugify(title);
          form.setFieldsValue({ slug: generatedSlug });
        }
      }, 500); // 500ms debounce

      setSlugDebounceTimer(timer);
    },
    [form, isSlugManuallyEdited, slugDebounceTimer]
  );

  // Handle manual slug editing
  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const slug = e.target.value;
    setIsSlugManuallyEdited(true);

    // Clean the slug input (remove special characters, convert to lowercase)
    const cleanedSlug = slugify(slug);
    if (cleanedSlug !== slug) {
      form.setFieldsValue({ slug: cleanedSlug });
    }
  };

  // Reset slug manual edit flag when form is reset
  useEffect(() => {
    if (mode === "create") {
      setIsSlugManuallyEdited(false);
    }
  }, [mode]);

  const statusOptions = [
    { value: 0, label: "Draft" },
    { value: 1, label: "Published" },
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
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-4xl font-bold ">
            {mode === "edit" ? "Edit Service" : "Add New Service"}
          </h1>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{
            status: 1, // Published by default
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
          <div className="flex gap-8">
            <div className="flex-1">
              <div className="space-y-6">
                <div>
                  <Form.Item
                    name="title"
                    label="Title"
                    labelCol={{ style: { width: "100%" } }}
                    rules={[
                      { required: true, message: "Please enter the title" },
                    ]}
                    className="!mb-0"
                  >
                    <Input
                      placeholder="Add service title"
                      style={{ fontSize: "24px", fontWeight: "400" }}
                      onChange={handleTitleChange}
                    />
                  </Form.Item>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700">
                    Permalink
                  </h3>
                  <Form.Item
                    name="slug"
                    labelCol={{ style: { width: "100%" } }}
                    rules={[
                      { required: true, message: "Please enter the slug" },
                    ]}
                    className="!mb-0"
                  >
                    <Input
                      placeholder="service-url-slug"
                      size="small"
                      addonBefore={process.env.NEXT_PUBLIC_LINK}
                      onChange={handleSlugChange}
                      suffix={
                        !isSlugManuallyEdited && (
                          <span className="text-xs text-gray-400">
                            Auto-generated from title
                          </span>
                        )
                      }
                    />
                  </Form.Item>
                  {!isSlugManuallyEdited && (
                    <p className="text-xs text-gray-500 mt-1">
                      The slug will be automatically generated from the title.
                      You can edit it manually if needed.
                    </p>
                  )}
                </div>

                <div className="rounded-sm">
                  <div className="bg-gray-50 px-4 py-3 border-t border-x border-gray-300 border ">
                    <h3 className="text-sm font-semibold text-gray-700">
                      Content
                    </h3>
                  </div>
                  <div className="bg-white ">
                    <Form.Item
                      name="content"
                      labelCol={{ style: { width: "100%" } }}
                      rules={[
                        { required: true, message: "Please enter the content" },
                      ]}
                      className="!mb-0 bg-white"
                    >
                      <CustomQuill
                        placeholder="Start writing service content..."
                        style={{ minHeight: "400px" }}
                        className="quill-editor"
                        onChange={(value) =>
                          form.setFieldsValue({ content: value })
                        }
                      />
                    </Form.Item>
                  </div>
                </div>

                <div className="border border-gray-300 rounded-sm">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-300">
                    <h3 className="text-sm font-semibold text-gray-700">
                      Service Images
                    </h3>
                  </div>
                  <div className="bg-white p-4">
                    <Form.Item
                      name="images"
                      label="Images"
                      labelCol={{ style: { width: "100%" } }}
                      className="!mb-0"
                    >
                      <div>
                        <Button
                          type="primary"
                          size="large"
                          icon={<UploadOutlined />}
                          onClick={() => setIsModalMediaOpen(true)}
                          className="w-full"
                        >
                          Add Images
                        </Button>

                        {selectedImages.length > 0 && (
                          <div className="grid grid-cols-3 gap-4 mt-4">
                            {selectedImages.map((image, index) => (
                              <div key={index} className="relative">
                                <Image
                                  src={getImageUrl(image.url || image.slug)}
                                  alt={image.title || `Image ${index + 1}`}
                                  className="w-full h-24 object-cover rounded"
                                />
                                <div className="absolute top-1 right-1">
                                  <Button
                                    type="text"
                                    icon={<DeleteOutlined />}
                                    onClick={() => handleRemoveImage(index)}
                                    size="small"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </Form.Item>
                  </div>
                </div>

                {/* Các trường động đều label width 100% */}
                <div className="border border-gray-300 rounded-sm">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-300">
                    <h3 className="text-sm font-semibold text-gray-700">
                      Styles
                    </h3>
                  </div>
                  <div className="bg-white p-4">
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
                                    labelCol={{ style: { width: "100%" } }}
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
                                    labelCol={{ style: { width: "100%" } }}
                                  >
                                    <Input placeholder="Style description" />
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
                  </div>
                </div>
                <div className="border border-gray-300 rounded-sm">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-300">
                    <h3 className="text-sm font-semibold text-gray-700">
                      Service Steps
                    </h3>
                  </div>
                  <div className="bg-white p-4">
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
                                    labelCol={{ style: { width: "100%" } }}
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
                                    labelCol={{ style: { width: "100%" } }}
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
                                labelCol={{ style: { width: "100%" } }}
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
                  </div>
                </div>
                <div className="border border-gray-300 rounded-sm">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-300">
                    <h3 className="text-sm font-semibold text-gray-700">
                      Ideal For
                    </h3>
                  </div>
                  <div className="bg-white p-4">
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
                                labelCol={{ style: { width: "100%" } }}
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
                  </div>
                </div>
                <div className="border border-gray-300 rounded-sm">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-300">
                    <h3 className="text-sm font-semibold text-gray-700">
                      What's Included
                    </h3>
                  </div>
                  <div className="bg-white p-4">
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
                                labelCol={{ style: { width: "100%" } }}
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
                  </div>
                </div>
                <div className="border border-gray-300 rounded-sm">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-300">
                    <h3 className="text-sm font-semibold text-gray-700">
                      Add-ons
                    </h3>
                  </div>
                  <div className="bg-white p-4">
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
                                    labelCol={{ style: { width: "100%" } }}
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
                                    labelCol={{ style: { width: "100%" } }}
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
                                labelCol={{ style: { width: "100%" } }}
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
                  </div>
                </div>
              </div>
            </div>

            <div className="w-80 flex-shrink-0">
              <div className="space-y-6">
                <div className="border border-gray-300 rounded-sm bg-white">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-300">
                    <h3 className="text-sm font-semibold text-gray-700">
                      Publish
                    </h3>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Status:</span>
                      <Form.Item
                        name="status"
                        labelCol={{ style: { width: "100%" } }}
                        rules={[
                          { required: true, message: "Please select status" },
                        ]}
                        className="!mb-0"
                      >
                        <Select
                          size="small"
                          style={{ width: 120 }}
                          options={statusOptions}
                        />
                      </Form.Item>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Type:</span>
                      <Form.Item
                        name="type"
                        labelCol={{ style: { width: "100%" } }}
                        rules={[
                          { required: true, message: "Please select type" },
                        ]}
                        className="!mb-0"
                      >
                        <Select
                          size="small"
                          style={{ width: 120 }}
                          options={typeOptions}
                        />
                      </Form.Item>
                    </div>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      block
                    >
                      {mode === "edit" ? "Update" : "Publish"}
                    </Button>
                  </div>
                </div>
                <div className="border border-gray-300 rounded-sm bg-white">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-300">
                    <h3 className="text-sm font-semibold text-gray-700">
                      Pricing
                    </h3>
                  </div>
                  <div className="p-4 space-y-4">
                    <Form.Item
                      name="originalPrice"
                      label="Original Price"
                      labelCol={{ style: { width: "100%" } }}
                      rules={[
                        {
                          required: true,
                          message: "Please enter original price",
                        },
                      ]}
                      className="!mb-0"
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
                    <Form.Item
                      name="discountedPrice"
                      label="Discounted Price"
                      labelCol={{ style: { width: "100%" } }}
                      className="!mb-0"
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
                  </div>
                </div>
                <div className="border border-gray-300 rounded-sm bg-white">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-300">
                    <h3 className="text-sm font-semibold text-gray-700">
                      Statistics
                    </h3>
                  </div>
                  <div className="p-4 space-y-4">
                    <Form.Item
                      name="rating"
                      label="Rating"
                      labelCol={{ style: { width: "100%" } }}
                      className="!mb-0"
                    >
                      <InputNumber
                        min={0}
                        max={5}
                        step={0.1}
                        placeholder="0.0"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                    <Form.Item
                      name="orderCount"
                      label="Order Count"
                      labelCol={{ style: { width: "100%" } }}
                      className="!mb-0"
                    >
                      <InputNumber
                        min={0}
                        placeholder="0"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
