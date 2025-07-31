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
  Tabs,
} from "antd";
import {
  PlusOutlined,
  MinusCircleOutlined,
  UploadOutlined,
  DeleteOutlined,
  UserOutlined,
  CheckCircleOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import CustomQuill from "@/components/UI/CustomQuill";
import MediaLibraryModal from "@/components/UI/MediaLibraryModal";
import { getImageUrl } from "@/utils";
import { slugify } from "@/utils/slugify";

const { TextArea } = Input;

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
  const [currentImageType, setCurrentImageType] = useState<"before" | "after">(
    "before"
  );
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(-1);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (slugDebounceTimer) {
        clearTimeout(slugDebounceTimer);
      }
    };
  }, [slugDebounceTimer]);

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

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const slug = e.target.value;
    setIsSlugManuallyEdited(true);

    // Clean the slug input (remove special characters, convert to lowercase)
    const cleanedSlug = slugify(slug);
    if (cleanedSlug !== slug) {
      form.setFieldsValue({ slug: cleanedSlug });
    }
  };

  useEffect(() => {
    if (mode === "create") {
      setIsSlugManuallyEdited(false);
    }
  }, [mode]);

  useEffect(() => {
    if (initialValues?.images && mode === "edit") {
      setSelectedImages(initialValues.images);
    } else if (mode === "create") {
      setSelectedImages([{ beforeUrl: "", afterUrl: "" }]);
      form.setFieldsValue({ images: [{ beforeUrl: "", afterUrl: "" }] });
    }
  }, [initialValues, mode, form]);

  const statusOptions = [
    { value: 0, label: "Draft" },
    { value: 1, label: "Published" },
  ];

  const typeOptions = [
    { value: 0, label: "1" },
    { value: 1, label: "2" },
    { value: 2, label: "3" },
  ];

  const handleMediaSelect = (media: any) => {
    const newImages = [...selectedImages];

    // Updating existing image
    if (currentImageType === "before") {
      newImages[currentImageIndex].beforeUrl = media.url || media.slug;
    } else {
      newImages[currentImageIndex].afterUrl = media.url || media.slug;
    }

    setSelectedImages(newImages);
    form.setFieldsValue({ images: newImages });
    setIsModalMediaOpen(false);
    setCurrentImageIndex(-1);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    form.setFieldsValue({ images: newImages });
  };

  const handleSelectImage = (type: "before" | "after", index: number) => {
    setCurrentImageType(type);
    setCurrentImageIndex(index);
    setIsModalMediaOpen(true);
  };

  const handleAddImagePair = () => {
    const newImages = [...selectedImages, { beforeUrl: "", afterUrl: "" }];
    setSelectedImages(newImages);
    form.setFieldsValue({ images: newImages });
  };

  const handleFinish = (values: any) => {
    // Validate required arrays
    if (!values.images || values.images.length === 0) {
      message.error("Please add at least one image pair");
      return;
    }

    // Validate that at least one image pair has both before and after images
    const hasValidImagePair = values.images.some(
      (image: any) => image.beforeUrl && image.afterUrl
    );

    if (!hasValidImagePair) {
      message.error(
        "Please add at least one complete image pair (both before and after images)"
      );
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
            status: 1,
            type: 0,
            rating: 0,
            orderCount: "",
            originalPrice: 0,
            discountedPrice: 0,
            images: [],
            idealFors: [{ label: "" }],
            includes: [{ label: "" }],
            addOns: [{ title: "", description: "" }],
            ...initialValues,
          }}
        >
          <div className="flex gap-8">
            <div className="flex-1">
              <div className="space-y-6">
                <div>
                  <Form.Item
                    name="title"
                    labelCol={{ style: { width: "100%" } }}
                    rules={[
                      { required: true, message: "Please enter the title" },
                    ]}
                    className="!mb-0 "
                  >
                    <Input
                      placeholder="Add service title"
                      style={{ fontSize: "24px", fontWeight: "400" }}
                      className="!rounded-none"
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
                      className="!rounded-none"
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
                  <div className="bg-white p-6">
                    <Form.Item
                      name="images"
                      labelCol={{ style: { width: "100%" } }}
                      className="!mb-0"
                    >
                      <div>
                        <div className="grid grid-cols-2 gap-6">
                          {selectedImages.map((image, index) => (
                            <div key={index} className={`p-5 border-2`}>
                              <div className="flex items-center justify-between mb-4 ">
                                <h4 className="text-lg font-semibold text-gray-700">
                                  Image Pair {index + 1}
                                </h4>
                                {selectedImages.length > 1 && (
                                  <Button
                                    type="text"
                                    icon={<DeleteOutlined />}
                                    onClick={() => handleRemoveImage(index)}
                                    size="small"
                                    className="ml-2 text-gray-400 hover:text-red-500"
                                    style={{ marginTop: 2 }}
                                  />
                                )}
                              </div>

                              <div className="grid grid-cols-2 gap-6">
                                {/* Before Image */}
                                <div className="bg-white rounded-lg">
                                  <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-medium text-gray-600">
                                      Before Image
                                    </span>
                                    <Button
                                      type="primary"
                                      size="small"
                                      onClick={() =>
                                        handleSelectImage("before", index)
                                      }
                                      className="text-blue-600 hover:text-blue-700"
                                    >
                                      Select Image
                                    </Button>
                                  </div>
                                  {image.beforeUrl ? (
                                    <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                                      <Image
                                        src={getImageUrl(image.beforeUrl)}
                                        alt={`Before Image ${index + 1}`}
                                        className="object-cover w-full h-full"
                                        sizes="(max-width: 768px) 100px, (max-width: 1024px) 120px, 150px"
                                      />
                                    </div>
                                  ) : (
                                    <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                                      <div className="text-center">
                                        <div className="text-gray-400 mb-2">
                                          <UploadOutlined className="text-2xl" />
                                        </div>
                                        <span className="text-xs text-gray-500">
                                          No image selected
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {/* After Image */}
                                <div className="bg-white rounded-lg ">
                                  <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-medium text-gray-600">
                                      After Image
                                    </span>
                                    <Button
                                      type="primary"
                                      size="small"
                                      onClick={() =>
                                        handleSelectImage("after", index)
                                      }
                                      className="text-blue-600 hover:text-blue-700"
                                    >
                                      Select Image
                                    </Button>
                                  </div>
                                  {image.afterUrl ? (
                                    <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                                      <Image
                                        src={getImageUrl(image.afterUrl)}
                                        alt={`After Image ${index + 1}`}
                                        className="object-cover w-full h-full"
                                        sizes="(max-width: 768px) 100px, (max-width: 1024px) 120px, 150px"
                                      />
                                    </div>
                                  ) : (
                                    <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                                      <div className="text-center">
                                        <div className="text-gray-400 mb-2">
                                          <UploadOutlined className="text-2xl" />
                                        </div>
                                        <span className="text-xs text-gray-500">
                                          No image selected
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-center items-center mt-6">
                          <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={handleAddImagePair}
                            className="hover:border-blue-500"
                            size="large"
                          >
                            Add Image Pair
                          </Button>
                        </div>
                      </div>
                    </Form.Item>
                  </div>
                </div>

                <div className="border border-gray-300 rounded-sm">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-300">
                    <h3 className="text-sm font-semibold text-gray-700">
                      Service Details
                    </h3>
                  </div>
                  <div className="bg-white">
                    <Tabs
                      defaultActiveKey="idealFor"
                      tabPosition="left"
                      style={{ minHeight: 400 }}
                      className="service-details-tabs"
                      items={[
                        {
                          key: "idealFor",
                          label: (
                            <span>
                              <UserOutlined className="mr-2" /> Ideal For
                            </span>
                          ),
                          children: (
                            <div className="rounded-r-lg h-full relative p-5">
                              <Form.List name="idealFors">
                                {(fields, { add, remove }) => (
                                  <div className="space-y-5">
                                    {fields.map(
                                      ({ key, name, ...restField }, idx) => (
                                        <div
                                          key={key}
                                          className="  bg-white rounded  flex items-start group"
                                        >
                                          <Form.Item
                                            {...restField}
                                            name={[name, "label"]}
                                            className="flex-1 !mb-0"
                                            rules={[
                                              {
                                                required: true,
                                                message: "Required",
                                              },
                                            ]}
                                          >
                                            <TextArea
                                              placeholder="Who is this service ideal for?"
                                              rows={2}
                                              className="resize-none"
                                            />
                                          </Form.Item>
                                          <Button
                                            type="text"
                                            icon={<DeleteOutlined />}
                                            onClick={() => remove(name)}
                                            size="small"
                                            className="ml-2 text-gray-400 hover:text-red-500"
                                            style={{ marginTop: 2 }}
                                          />
                                        </div>
                                      )
                                    )}
                                  </div>
                                )}
                              </Form.List>

                              <div className="flex justify-end mt-5">
                                <Button
                                  type="primary"
                                  icon={<PlusOutlined />}
                                  onClick={() =>
                                    form.getFieldValue("idealFors")?.length <
                                      10 &&
                                    form.getFieldValue("idealFors").length >=
                                      0 &&
                                    form.setFieldsValue({
                                      idealFors: [
                                        ...(form.getFieldValue("idealFors") ||
                                          []),
                                        { label: "" },
                                      ],
                                    })
                                  }
                                  className="ml-2 hover:border-blue-500"
                                  size="large"
                                >
                                  Add
                                </Button>
                              </div>
                            </div>
                          ),
                        },
                        {
                          key: "includes",
                          label: (
                            <span>
                              <CheckCircleOutlined className="mr-2" /> What's
                              Included
                            </span>
                          ),
                          children: (
                            <div className="rounded-r-lg h-full relative p-5">
                              <Form.List name="includes">
                                {(fields, { add, remove }) => (
                                  <div className="space-y-5">
                                    {fields.map(
                                      ({ key, name, ...restField }, idx) => (
                                        <div
                                          key={key}
                                          className="  bg-white rounded  flex items-start group"
                                        >
                                          <Form.Item
                                            {...restField}
                                            name={[name, "label"]}
                                            className="flex-1 !mb-0"
                                            rules={[
                                              {
                                                required: true,
                                                message: "Required",
                                              },
                                            ]}
                                          >
                                            <TextArea
                                              placeholder="What's included in this service?"
                                              rows={2}
                                              className="resize-none"
                                            />
                                          </Form.Item>
                                          <Button
                                            type="text"
                                            icon={<DeleteOutlined />}
                                            onClick={() => remove(name)}
                                            size="small"
                                            className="ml-2 text-gray-400 hover:text-red-500"
                                            style={{ marginTop: 2 }}
                                          />
                                        </div>
                                      )
                                    )}
                                  </div>
                                )}
                              </Form.List>

                              <div className="flex justify-end items-center mt-5">
                                <Button
                                  type="primary"
                                  icon={<PlusOutlined />}
                                  onClick={() =>
                                    form.getFieldValue("includes")?.length <
                                      10 &&
                                    form.getFieldValue("includes").length >=
                                      0 &&
                                    form.setFieldsValue({
                                      includes: [
                                        ...(form.getFieldValue("includes") ||
                                          []),
                                        { label: "" },
                                      ],
                                    })
                                  }
                                  className="ml-2 hover:border-blue-500"
                                  size="large"
                                >
                                  Add
                                </Button>
                              </div>
                            </div>
                          ),
                        },
                        {
                          key: "addOns",
                          label: (
                            <span>
                              <GiftOutlined className="mr-2" /> Add-ons
                            </span>
                          ),
                          children: (
                            <div className="rounded-r-lg h-full relative p-5">
                              <Form.List name="addOns">
                                {(fields, { add, remove }) => (
                                  <div className="space-y-5">
                                    {fields.map(
                                      ({ key, name, ...restField }, idx) => (
                                        <div
                                          key={key}
                                          className="flex items-center gap-3  bg-white rounded  flex items-start group"
                                        >
                                          <Row gutter={16} className="flex-1">
                                            <Col span={12}>
                                              <Form.Item
                                                {...restField}
                                                name={[name, "title"]}
                                                labelCol={{
                                                  style: { width: "100%" },
                                                }}
                                                className="flex-1 !mb-0"
                                                rules={[
                                                  {
                                                    required: true,
                                                    message: "Required",
                                                  },
                                                ]}
                                              >
                                                <TextArea
                                                  placeholder="Add-on name"
                                                  rows={2}
                                                />
                                              </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                              <Form.Item
                                                {...restField}
                                                name={[name, "description"]}
                                                labelCol={{
                                                  style: { width: "100%" },
                                                }}
                                                className="flex-1 !mb-0"
                                              >
                                                <TextArea
                                                  placeholder="Add-on description"
                                                  rows={2}
                                                />
                                              </Form.Item>
                                            </Col>
                                          </Row>

                                          <Button
                                            type="text"
                                            icon={<DeleteOutlined />}
                                            onClick={() => remove(name)}
                                            size="small"
                                            className="text-gray-400 hover:text-red-500 mt-5"
                                          />
                                        </div>
                                      )
                                    )}
                                  </div>
                                )}
                              </Form.List>

                              <div className="flex justify-end items-center mb-4">
                                <Button
                                  type="primary"
                                  icon={<PlusOutlined />}
                                  onClick={() =>
                                    form.getFieldValue("addOns")?.length < 10 &&
                                    form.getFieldValue("addOns").length >= 0 &&
                                    form.setFieldsValue({
                                      addOns: [
                                        ...(form.getFieldValue("addOns") || []),
                                        {
                                          title: "",
                                          price: 0,
                                          description: "",
                                        },
                                      ],
                                    })
                                  }
                                  className="mt-5"
                                  size="large"
                                >
                                  Add
                                </Button>
                              </div>
                            </div>
                          ),
                        },
                      ]}
                    />
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
                      <Input
                        placeholder="Order count"
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
