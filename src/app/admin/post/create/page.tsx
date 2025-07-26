"use client";

import React, { useState } from "react";
import {
  Form,
  Button,
  message,
  Upload,
  Input,
  Select,
  Space,
  Divider,
  Typography,
} from "antd";
import {
  ArrowLeftOutlined,
  PlusOutlined,
  EyeOutlined,
  SaveOutlined,
  SendOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import CustomQuill from "@/components/UI/CustomQuill";

const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

const CreatePostPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const statusOptions = [
    { value: 0, label: "Draft" },
    { value: 1, label: "Published" },
    { value: 2, label: "Archived" },
  ];

  const categoryOptions = [
    { value: 1, label: "Web Development" },
    { value: 2, label: "Tutorial" },
    { value: 3, label: "Programming" },
    { value: 4, label: "TypeScript" },
    { value: 5, label: "UI/UX" },
    { value: 6, label: "Design" },
    { value: 7, label: "State Management" },
  ];

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success("Post created successfully!");
      router.push("/admin/post/list");
    } catch (error) {
      message.error("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  const onSaveDraft = () => {
    form.setFieldsValue({ status: 0 });
    form.submit();
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center space-x-4">
          <Title level={4} className="!mb-0">
            Add New Post
          </Title>
        </div>
        <div className="flex items-center space-x-2">
          <Button type="default" onClick={onSaveDraft} disabled={loading}>
            Save Draft
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            onClick={() => form.submit()}
          >
            Publish
          </Button>
        </div>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          title: "",
          slug: "",
          excerpt: "",
          content: "",
          status: 1,
          password: "",
          categoryIds: [],
        }}
      >
        <div className="flex gap-8">
          {/* Main Content Area */}
          <div className="flex-1">
            <div className="space-y-6">
              {/* Title Input - WordPress style */}
              <div>
                <Form.Item
                  name="title"
                  rules={[
                    { required: true, message: "Please enter the title" },
                  ]}
                  className="!mb-0"
                >
                  <Input
                    placeholder="Add title"
                    style={{ fontSize: "24px", fontWeight: "400" }}
                  />
                </Form.Item>
              </div>

              {/* Permalink Box */}
              <div className="">
                <h3 className="text-sm font-semibold text-gray-700">
                  Permalink
                </h3>
                <div className="">
                  <Form.Item
                    name="slug"
                    rules={[
                      { required: true, message: "Please enter the slug" },
                    ]}
                    className="!mb-0"
                  >
                    <Input
                      placeholder="post-url-slug"
                      size="small"
                      addonBefore="https://example.com/"
                    />
                  </Form.Item>
                </div>
              </div>

              {/* Content Editor with CustomQuill */}
              <div className="">
                <h3 className="text-sm font-semibold text-gray-700">Content</h3>
                <div className="bg-white">
                  <Form.Item
                    name="content"
                    rules={[
                      { required: true, message: "Please enter the content" },
                    ]}
                    className="!mb-0"
                  >
                    <CustomQuill
                      placeholder="Start writing or type / to choose a block..."
                      style={{ minHeight: "400px" }}
                      className="quill-editor"
                      onChange={(value) =>
                        form.setFieldsValue({ content: value })
                      }
                    />
                  </Form.Item>
                </div>
              </div>

              {/* Excerpt Box */}
              <div className="border border-gray-300 rounded-sm">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-300">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Excerpt
                  </h3>
                </div>
                <div className="bg-white p-4">
                  <Form.Item
                    name="excerpt"
                    rules={[
                      { required: true, message: "Please enter the excerpt" },
                    ]}
                    className="!mb-0"
                  >
                    <TextArea
                      placeholder="Write an excerpt (optional)"
                      rows={4}
                      size="small"
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="space-y-6">
              {/* Publish Box */}
              <div className="border border-gray-300 rounded-sm">
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
                    <span className="text-sm text-gray-600">Visibility:</span>
                    <span className="text-sm text-gray-800">Public</span>
                  </div>
                </div>
              </div>

              {/* Categories Box */}
              <div className="border border-gray-300 rounded-sm">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-300">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Categories
                  </h3>
                </div>
                <div className="p-4">
                  <Form.Item
                    name="categoryIds"
                    rules={[
                      { required: true, message: "Please select categories" },
                    ]}
                    className="!mb-0"
                  >
                    <Select
                      mode="multiple"
                      placeholder="Select categories"
                      options={categoryOptions}
                      size="small"
                    />
                  </Form.Item>
                </div>
              </div>

              {/* Featured Image Box */}
              <div className="border border-gray-300 rounded-sm">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-300">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Featured Image
                  </h3>
                </div>
                <div className="p-4">
                  <Form.Item
                    name="thumbnail"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[
                      { required: true, message: "Please upload a thumbnail" },
                    ]}
                    className="!mb-0"
                  >
                    <Upload
                      name="thumbnail"
                      listType="picture-card"
                      maxCount={1}
                      beforeUpload={() => false}
                      className="!w-full"
                    >
                      <div className="text-center">
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Set featured image</div>
                      </div>
                    </Upload>
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CreatePostPage;
