import CustomQuill from "@/components/UI/CustomQuill";
import { PostFormData } from "@/types";
import { getImageUrl } from "@/utils";
import { DeleteOutlined, PictureOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Select, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import MediaLibraryModal from "@/components/UI/MediaLibraryModal";
import CategoryTreeSelector from "./CategoryTreeSelector";

interface PostFormProps {
  form?: any;
  onFinish: (values: any) => void;
  onSaveDraft: (values: any) => void;
  mode: "create" | "edit";
  loading: boolean;
  initialValues?: any;
}

const PostForm: React.FC<PostFormProps> = ({ form, onFinish, onSaveDraft, mode, loading, initialValues }) => {
  const [isModalMediaOpen, setIsModalMediaOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const thumbnail = form.getFieldValue("thumbnail");
      if (thumbnail && !selectedImage) {
        setSelectedImage({
          slug: thumbnail,
          title: "Featured Image",
        });
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [form, selectedImage]);

  const handleMediaSelect = (media: any) => {
    form.setFieldsValue({ thumbnail: media.slug });
    setSelectedImage(media);
    setIsModalMediaOpen(false);
  };

  const handleRemoveImage = () => {
    form.setFieldsValue({ thumbnail: "" });
    setSelectedImage(null);
  };

  const statusOptions = [
    { value: 0, label: "Draft" },
    { value: 1, label: "Published" },
    { value: 2, label: "Archived" },
  ];

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-7">
          <div className="flex items-center space-x-4">
            <Title level={4} className="!mb-0">
              {mode === "edit" ? "Edit Post" : "Add New Post"}
            </Title>
          </div>
          <div className="flex items-center space-x-2">
            <Button type="default" onClick={onSaveDraft} disabled={loading}>
              Save Draft
            </Button>
            <Button type="primary" htmlType="submit" loading={loading} onClick={() => form.submit()}>
              {mode === "edit" ? "Update" : "Publish"}
            </Button>
          </div>
        </div>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="thumbnail" style={{ display: "none" }}>
            <Input />
          </Form.Item>

          <div className="flex gap-8">
            <div className="flex-1">
              <div className="space-y-6">
                <div>
                  <Form.Item name="title" rules={[{ required: true, message: "Please enter the title" }]} className="!mb-0">
                    <Input placeholder="Add title" style={{ fontSize: "24px", fontWeight: "400" }} />
                  </Form.Item>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700">Permalink</h3>
                  <Form.Item name="slug" rules={[{ required: true, message: "Please enter the slug" }]} className="!mb-0">
                    <Input placeholder="post-url-slug" size="small" addonBefore={process.env.NEXT_PUBLIC_LINK} />
                  </Form.Item>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700">Content</h3>
                  <Form.Item name="content" rules={[{ required: true, message: "Please enter the content" }]} className="!mb-0 bg-white">
                    <CustomQuill
                      placeholder="Start writing or type / to choose a block..."
                      style={{ minHeight: "400px" }}
                      className="quill-editor"
                      onChange={(value) => form.setFieldsValue({ content: value })}
                    />
                  </Form.Item>
                </div>

                <div className="border border-gray-300 rounded-sm">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-300">
                    <h3 className="text-sm font-semibold text-gray-700">Excerpt</h3>
                  </div>
                  <div className="bg-white p-4">
                    <Form.Item name="excerpt" rules={[{ required: true, message: "Please enter the excerpt" }]} className="!mb-0">
                      <TextArea placeholder="Write an excerpt (optional)" rows={4} size="small" />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-80 flex-shrink-0">
              <div className="space-y-6">
                <div className="border border-gray-300 rounded-sm bg-white">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-300">
                    <h3 className="text-sm font-semibold text-gray-700">Publish</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Status:</span>
                      <Form.Item name="status" rules={[{ required: true, message: "Please select status" }]} className="!mb-0">
                        <Select size="small" style={{ width: 120 }} options={statusOptions} />
                      </Form.Item>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-300 rounded-sm bg-white">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-300">
                    <h3 className="text-sm font-semibold text-gray-700">Featured Image</h3>
                  </div>
                  <div className="p-4">
                    {selectedImage ? (
                      <div className="space-y-3">
                        <div className="relative">
                          <div className="relative w-full h-32">
                            <Image
                              src={getImageUrl(selectedImage.slug)}
                              alt={selectedImage.title || "Featured Image"}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <div className="absolute top-1 right-1">
                            <Button type="text" icon={<DeleteOutlined />} onClick={handleRemoveImage} size="small" />
                          </div>
                        </div>
                        <Button type="primary" size="small" icon={<PictureOutlined />} onClick={() => setIsModalMediaOpen(true)}>
                          Replace Image
                        </Button>
                      </div>
                    ) : (
                      <Button type="primary" size="large" icon={<PictureOutlined />} onClick={() => setIsModalMediaOpen(true)} className="w-full">
                        Set Featured Image
                      </Button>
                    )}
                  </div>
                </div>
                <div className="border border-gray-300 rounded-sm bg-white">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-300">
                    <h3 className="text-sm font-semibold text-gray-700">Categories</h3>
                  </div>
                  <div className="p-4">
                    <Form.Item
                      name="categoryIds"
                      rules={[
                        {
                          required: true,
                          message: "Please select categories",
                        },
                      ]}
                      className="!mb-0"
                    >
                      <CategoryTreeSelector />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
      <MediaLibraryModal isOpen={isModalMediaOpen} onCancel={() => setIsModalMediaOpen(false)} onSelect={handleMediaSelect} accept="image/*" />
    </>
  );
};

export default PostForm;
