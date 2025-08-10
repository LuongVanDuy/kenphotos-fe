import { getImageUrl } from "@/utils";
import { slugify } from "@/utils/slugify";
import { DeleteOutlined, PictureOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";
import MediaLibraryModal from "@/components/Admin/Common/MediaLibraryModal";
import CategoryTreeSelector from "./CategoryTreeSelector";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import CustomQuill from "../Common/CustomQuill";

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
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [slugDebounceTimer, setSlugDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  const categoryList = useSelector((state: RootState) => state.categories.list);

  useEffect(() => {
    if (mode === "create" && categoryList && categoryList.length > 0) {
      const defaultCat = categoryList.find((cat: any) => cat.isDefault);
      if (defaultCat) {
        form?.setFieldsValue({ categoryIds: [defaultCat.id] });
      }
    }
  }, [mode, categoryList, form]);

  useEffect(() => {
    if (mode === "create") {
      setIsSlugManuallyEdited(false);
    }
  }, [mode]);

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

      if (slugDebounceTimer) {
        clearTimeout(slugDebounceTimer);
      }

      const timer = setTimeout(() => {
        if (!isSlugManuallyEdited && title) {
          const generatedSlug = slugify(title);
          form.setFieldsValue({ slug: generatedSlug });
        }
      }, 500);

      setSlugDebounceTimer(timer);
    },
    [form, isSlugManuallyEdited, slugDebounceTimer]
  );

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const slug = e.target.value;
    setIsSlugManuallyEdited(true);

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
  ];

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-2xl md:text-4xl font-bold">{mode === "edit" ? "Edit Post" : "Add New Post"}</h1>
        </div>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            status: 1,
            ...initialValues,
          }}
        >
          <Form.Item name="thumbnail" style={{ display: "none" }}>
            <Input />
          </Form.Item>
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            <div className="flex-1 min-w-0">
              <div className="space-y-4 lg:space-y-6">
                <div>
                  <Form.Item
                    name="title"
                    labelCol={{ style: { width: "100%" } }}
                    rules={[{ required: true, message: "Please enter the title" }]}
                    className="!mb-0"
                  >
                    <Input
                      placeholder="Add title"
                      className="!rounded-lg"
                      style={{ fontSize: "18px", fontWeight: "400" }}
                      onChange={handleTitleChange}
                    />
                  </Form.Item>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700">Permalink</h3>
                  <Form.Item
                    name="slug"
                    labelCol={{ style: { width: "100%" } }}
                    rules={[{ required: true, message: "Please enter the slug" }]}
                    className="!mb-0"
                  >
                    <Input
                      placeholder="post-url-slug"
                      size="small"
                      className="!rounded-lg"
                      addonBefore={process.env.NEXT_PUBLIC_LINK}
                      onChange={handleSlugChange}
                      suffix={!isSlugManuallyEdited && <span className="text-xs text-gray-400 hidden sm:inline">Auto-generated from title</span>}
                    />
                  </Form.Item>
                  {!isSlugManuallyEdited && (
                    <p className="text-xs text-gray-500 mt-1">
                      The slug will be automatically generated from the title. You can edit it manually if needed.
                    </p>
                  )}
                </div>

                <div className="rounded-lg border border-gray-300 overflow-hidden">
                  <div className="bg-gray-50 px-3 lg:px-4 py-2 lg:py-3 border-b border-gray-300">
                    <h3 className="text-sm font-semibold text-gray-700">Content</h3>
                  </div>
                  <div className="bg-white">
                    <Form.Item
                      name="content"
                      labelCol={{ style: { width: "100%" } }}
                      rules={[{ required: true, message: "Please enter the content" }]}
                      className="!mb-0 bg-white"
                    >
                      <CustomQuill
                        placeholder="Start writing or type / to choose a block..."
                        style={{ minHeight: "300px" }}
                        className="quill-editor"
                        onChange={(value) => form.setFieldsValue({ content: value })}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-3 lg:px-4 py-2 lg:py-3 border-b border-gray-300">
                    <h3 className="text-sm font-semibold text-gray-700">Excerpt</h3>
                  </div>
                  <div className="bg-white p-3 lg:p-4">
                    <Form.Item
                      name="excerpt"
                      label="Excerpt"
                      labelCol={{ style: { width: "100%" } }}
                      rules={[{ required: true, message: "Please enter the excerpt" }]}
                      className="!mb-0"
                    >
                      <TextArea placeholder="Write an excerpt (optional)" rows={4} size="small" className="!rounded-lg" />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-80 flex-shrink-0">
              <div className="space-y-4 lg:space-y-6">
                <div className="border border-gray-300 rounded-lg bg-white overflow-hidden">
                  <div className="bg-gray-50 px-3 lg:px-4 py-2 lg:py-3 border-b border-gray-300">
                    <h3 className="text-sm font-semibold text-gray-700">Publish</h3>
                  </div>
                  <div className="p-3 lg:p-4 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <span className="text-sm text-gray-600">Status:</span>
                      <Form.Item
                        name="status"
                        labelCol={{ style: { width: "100%" } }}
                        rules={[{ required: true, message: "Please select status" }]}
                        className="!mb-0"
                      >
                        <Select size="small" style={{ width: "100%", maxWidth: "120px" }} options={statusOptions} />
                      </Form.Item>
                    </div>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                      {mode === "edit" ? "Update" : "Publish"}
                    </Button>
                  </div>
                </div>
                <div className="border border-gray-300 rounded-lg bg-white overflow-hidden">
                  <div className="bg-gray-50 px-3 lg:px-4 py-2 lg:py-3 border-b border-gray-300">
                    <h3 className="text-sm font-semibold text-gray-700">Featured Image</h3>
                  </div>
                  <div className="p-3 lg:p-4">
                    {selectedImage ? (
                      <div className="space-y-3">
                        <div className="relative">
                          <div className="relative w-full h-24 sm:h-32">
                            <Image
                              src={getImageUrl(selectedImage.slug)}
                              alt={selectedImage.title || "Featured Image"}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                          <div className="absolute top-1 right-1">
                            <Button type="text" icon={<DeleteOutlined />} onClick={handleRemoveImage} size="small" />
                          </div>
                        </div>
                        <Button type="primary" size="small" icon={<PictureOutlined />} onClick={() => setIsModalMediaOpen(true)} block>
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
                <div className="border border-gray-300 rounded-lg bg-white overflow-hidden">
                  <div className="bg-gray-50 px-3 lg:px-4 py-2 lg:py-3 border-b border-gray-300">
                    <h3 className="text-sm font-semibold text-gray-700">Categories</h3>
                  </div>
                  <div className="p-3 lg:p-4">
                    <Form.Item
                      name="categoryIds"
                      label="Categories"
                      labelCol={{ style: { width: "100%" } }}
                      rules={[
                        {
                          required: true,
                          message: "Please select categories",
                        },
                      ]}
                      className="!mb-0"
                    >
                      <CategoryTreeSelector
                        renderCategoryLabel={(cat) =>
                          cat.isDefault ? <span style={{ color: "#1677ff", fontWeight: 600 }}>{cat.name} (Default)</span> : cat.name
                        }
                      />
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
