"use client";

import React, { useState } from "react";
import {
  Form,
  Card,
  Row,
  Col,
  Button,
  message,
  Upload,
  Image,
  Divider,
  Space,
  Tag,
} from "antd";
import {
  ArrowLeftOutlined,
  PlusOutlined,
  EyeOutlined,
  SaveOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import {
  TextField,
  TextAreaField,
  SelectField,
  SwitchField,
  FormActions,
  UploadField,
} from "@/components/Admin/UI";

const CreatePostPage: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const statusOptions = [
    { value: "draft", label: "Draft" },
    { value: "published", label: "Published" },
    { value: "archived", label: "Archived" },
  ];

  const categoryOptions = [
    { value: "web-development", label: "Web Development" },
    { value: "tutorial", label: "Tutorial" },
    { value: "programming", label: "Programming" },
    { value: "typescript", label: "TypeScript" },
    { value: "ui-ux", label: "UI/UX" },
    { value: "design", label: "Design" },
    { value: "state-management", label: "State Management" },
  ];

  const tagOptions = [
    { value: "nextjs", label: "Next.js" },
    { value: "react", label: "React" },
    { value: "typescript", label: "TypeScript" },
    { value: "antd", label: "Ant Design" },
    { value: "redux", label: "Redux" },
    { value: "tutorial", label: "Tutorial" },
    { value: "advanced", label: "Advanced" },
    { value: "patterns", label: "Patterns" },
    { value: "ui", label: "UI" },
    { value: "responsive", label: "Responsive" },
  ];

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log("Creating post:", values);
      message.success("Post created successfully!");
      router.push("/admin/post/list");
    } catch (error) {
      message.error("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    const values = await form.validateFields();
    values.status = "draft";
    handleSubmit(values);
  };

  const handlePublish = async () => {
    const values = await form.validateFields();
    values.status = "published";
    handleSubmit(values);
  };

  const handlePreview = () => {
    form.validateFields().then(values => {
      setFormData(values);
      setPreviewMode(true);
    });
  };

  const handleCancel = () => {
    router.push("/admin/post/list");
  };

  if (previewMode) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => setPreviewMode(false)}
          >
            Back to Editor
          </Button>
          <Space>
            <Button onClick={handleSaveDraft} icon={<SaveOutlined />}>
              Save Draft
            </Button>
            <Button type="primary" onClick={handlePublish} icon={<SendOutlined />}>
              Publish
            </Button>
          </Space>
        </div>

        <Card>
          <article className="prose max-w-none">
            {formData.featuredImage && (
              <div className="mb-6">
                <Image
                  src={formData.featuredImage}
                  alt={formData.title}
                  className="w-full h-64 object-cover rounded"
                />
              </div>
            )}

            <h1 className="text-3xl font-bold mb-4">{formData.title}</h1>

            {formData.excerpt && (
              <p className="text-lg text-gray-600 mb-6 italic">
                {formData.excerpt}
              </p>
            )}

            <div className="mb-6">
              {formData.categories?.map((category: string) => (
                <Tag key={category} color="blue" className="mb-2">
                  {categoryOptions.find(opt => opt.value === category)?.label || category}
                </Tag>
              ))}
            </div>

            <div className="prose prose-lg">
              {formData.content?.split('\n').map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <Divider />

            <div className="flex flex-wrap gap-2">
              {formData.tags?.map((tag: string) => (
                <Tag key={tag}>
                  {tagOptions.find(opt => opt.value === tag)?.label || tag}
                </Tag>
              ))}
            </div>
          </article>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => router.back()}
        className="mb-4"
      >
        Back to Posts
      </Button>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Create New Post</h1>
          <p className="text-gray-600">Write and publish a new blog post</p>
        </div>
        <Space>
          <Button onClick={handlePreview} icon={<EyeOutlined />}>
            Preview
          </Button>
          <Button onClick={handleSaveDraft} icon={<SaveOutlined />}>
            Save Draft
          </Button>
          <Button type="primary" onClick={handlePublish} icon={<SendOutlined />}>
            Publish
          </Button>
        </Space>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          status: "draft",
          allowComments: true,
          featured: false,
        }}
      >
        <Row gutter={24}>
          {/* Main Content */}
          <Col xs={24} lg={16}>
            <Card title="Post Content" className="mb-6">
              <TextField
                name="title"
                label="Title"
                placeholder="Enter post title"
                required
                description="The main title of your post"
                maxLength={100}
              />

              <TextField
                name="slug"
                label="URL Slug"
                placeholder="post-url-slug"
                description="URL-friendly version of the title (auto-generated if empty)"
              />

              <TextAreaField
                name="excerpt"
                label="Excerpt"
                placeholder="Brief description of the post"
                rows={3}
                maxLength={300}
                description="Short summary that appears in post previews"
              />

              <TextAreaField
                name="content"
                label="Content"
                placeholder="Write your post content here..."
                rows={20}
                required
                description="The main content of your post (supports Markdown)"
              />
            </Card>
          </Col>

          {/* Sidebar */}
          <Col xs={24} lg={8}>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              {/* Publish Settings */}
              <Card title="Publish Settings" size="small">
                <SelectField
                  name="status"
                  label="Status"
                  options={statusOptions}
                  required
                  description="Current status of the post"
                />

                <SwitchField
                  name="featured"
                  label="Featured Post"
                  description="Mark this post as featured"
                />

                <SwitchField
                  name="allowComments"
                  label="Allow Comments"
                  description="Enable comments for this post"
                />
              </Card>

              {/* Featured Image */}
              <Card title="Featured Image" size="small">
                <UploadField
                  name="featuredImage"
                  label="Upload Image"
                  description="Main image for the post"
                  accept="image/*"
                  listType="picture-card"
                  maxCount={1}
                />
              </Card>

              {/* Categories */}
              <Card title="Categories" size="small">
                <SelectField
                  name="categories"
                  label="Categories"
                  placeholder="Select categories"
                  options={categoryOptions}
                  mode="multiple"
                  description="Organize your post into categories"
                />
              </Card>

              {/* Tags */}
              <Card title="Tags" size="small">
                <SelectField
                  name="tags"
                  label="Tags"
                  placeholder="Select or add tags"
                  options={tagOptions}
                  mode="tags"
                  description="Add relevant tags for better discoverability"
                />
              </Card>

              {/* SEO Settings */}
              <Card title="SEO Settings" size="small">
                <TextField
                  name="metaTitle"
                  label="Meta Title"
                  placeholder="SEO title"
                  maxLength={60}
                  description="Title for search engines (60 chars max)"
                />

                <TextAreaField
                  name="metaDescription"
                  label="Meta Description"
                  placeholder="SEO description"
                  rows={3}
                  maxLength={160}
                  description="Description for search engines (160 chars max)"
                />
              </Card>
            </Space>
          </Col>
        </Row>

        <div className="mt-8 pt-6 border-t">
          <FormActions
            loading={loading}
            onCancel={handleCancel}
            submitText="Save Post"
            cancelText="Cancel"
            showCancel={false}
          />
        </div>
      </Form>
    </div>
  );
};

export default CreatePostPage;
