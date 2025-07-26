"use client";

import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  message,
  Image,
  Spin,
  Alert,
  Tree,
  Typography,
} from "antd";
import { PictureOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector, connect } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchCategories } from "@/store/actions/categories";
import { createPost, updatePost } from "@/store/actions/posts";
import CustomQuill from "@/components/UI/CustomQuill";
import MediaLibraryModal from "@/components/UI/MediaLibraryModal";
import { getImageUrl } from "@/utils";

const { TextArea } = Input;
const { Title } = Typography;

// Types
interface PostFormValues {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: number;
  thumbnail?: string;
  categoryIds: number[];
  categories?: Array<{
    category: {
      id: number;
      name: string;
      slug: string;
    };
  }>;
}

interface Category {
  id: number;
  name: string;
  parentId?: number;
}

// Build tree for Tree/TreeSelect
function buildTree(flat: Category[], parentId: number | null = null): any[] {
  return flat
    .filter((cat) => {
      const catParentId =
        cat.parentId === null || cat.parentId === undefined
          ? null
          : cat.parentId;
      return catParentId === parentId;
    })
    .map((cat) => ({
      title: cat.name,
      value: cat.id,
      key: cat.id.toString(), // Ensure key is string
      children: buildTree(flat, cat.id),
    }));
}

// CategoryTreeSelector component to handle checkbox selection properly
interface CategoryTreeSelectorProps {
  treeData: any[];
  value?: number[];
  onChange?: (value: number[]) => void;
}

const CategoryTreeSelector: React.FC<CategoryTreeSelectorProps> = ({
  treeData,
  value = [],
  onChange,
}) => {
  const [internalCheckedKeys, setInternalCheckedKeys] = useState<string[]>([]);

  // Sync internal state with external value
  useEffect(() => {
    const stringKeys = (value || []).map((id) => id.toString());
    setInternalCheckedKeys(stringKeys);
  }, [value]);

  const handleCheck = (checkedKeysValue: any, info: any) => {
    let checkedStringKeys: string[] = [];

    if (Array.isArray(checkedKeysValue)) {
      // When checkStrictly is false (default), checkedKeys is an array
      checkedStringKeys = checkedKeysValue.map((key) => key.toString());
    } else if (checkedKeysValue?.checked) {
      // When checkStrictly is true, checkedKeys is an object with checked array
      checkedStringKeys = checkedKeysValue.checked.map((key: any) =>
        key.toString()
      );
    }

    // Update internal state
    setInternalCheckedKeys(checkedStringKeys);

    // Convert to numbers for form
    const checkedNumbers = checkedStringKeys
      .map((key) => parseInt(key, 10))
      .filter((num) => !isNaN(num));

    if (onChange) {
      onChange(checkedNumbers);
    }
  };

  return (
    <Tree
      checkable
      treeData={treeData}
      checkedKeys={internalCheckedKeys}
      onCheck={handleCheck}
      selectable={false}
      defaultExpandAll
      checkStrictly={false}
      style={{
        maxHeight: 300,
        overflow: "auto",
        padding: 8,
        border: "1px solid #d9d9d9",
        borderRadius: "6px",
      }}
    />
  );
};

// PostForm component
const PostForm: React.FC<{
  mode?: "create" | "edit";
  initialValues?: Partial<PostFormValues>;
  onSuccess?: () => void;
  postId?: number;
  createPost?: any;
  updatePost?: any;
}> = ({
  mode = "create",
  initialValues,
  onSuccess,
  postId,
  createPost,
  updatePost,
}) => {
  const [form] = Form.useForm<PostFormValues>();
  const [loading, setLoading] = useState(false);
  const [isModalMediaOpen, setIsModalMediaOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // Redux categories state
  const {
    list: categories,
    loading: loadingCategories,
    error: errorCategories,
  } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories({ itemsPerPage: 9999 }));
  }, [dispatch]);

  useEffect(() => {

    if (initialValues?.thumbnail && initialValues.thumbnail.trim() !== "") {
      setSelectedImage({ slug: initialValues.thumbnail });
    }

    // Extract category IDs from the nested structure and set form values
    if (
      (initialValues as any)?.categories &&
      Array.isArray((initialValues as any).categories)
    ) {
      const categoryIds = (initialValues as any).categories
        .map((cat: any) => cat.category?.id)
        .filter(Boolean);

      form.setFieldsValue({
        title: initialValues?.title || "",
        slug: initialValues?.slug || "",
        excerpt: initialValues?.excerpt || "",
        content: initialValues?.content || "",
        status: initialValues?.status ?? 1,
        thumbnail: initialValues?.thumbnail || "",
        categoryIds: categoryIds,
      });
    }
  }, [initialValues, form]);

  const treeData: any[] = buildTree(categories);

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

  const onFinish = async (values: PostFormValues) => {
    setLoading(true);
    try {
      const payload = {
        title: values.title,
        content: values.content,
        excerpt: values.excerpt,
        slug: values.slug,
        status: values.status,
        thumbnail: values.thumbnail || "",
        categoryIds: Array.isArray(values.categoryIds)
          ? values.categoryIds.map(Number)
          : [],
      };
      if (mode === "edit" && postId && updatePost) {
        await updatePost(postId, payload);
      } else if (createPost) {
        await createPost(payload);
      }
      message.success(
        mode === "edit"
          ? "Post updated successfully!"
          : "Post created successfully!"
      );
      form.resetFields();
      setSelectedImage(null);
      if (onSuccess) onSuccess();
      router.push("/admin/post/list");
    } catch (error) {
      message.error(
        mode === "edit" ? "Failed to update post" : "Failed to create post"
      );
    } finally {
      setLoading(false);
    }
  };

  const onSaveDraft = () => {
    form.setFieldsValue({ status: 0 });
    form.submit();
  };

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
          onFinish={onFinish}
          initialValues={{
            title: initialValues?.title || "",
            slug: initialValues?.slug || "",
            excerpt: initialValues?.excerpt || "",
            content: initialValues?.content || "",
            status: initialValues?.status ?? 1,
            thumbnail: initialValues?.thumbnail || "",
            categoryIds: (initialValues as any)?.categories
              ? (initialValues as any).categories
                  .map((cat: any) => cat.category?.id)
                  .filter(Boolean)
              : initialValues?.categoryIds || [],
          }}
        >
          <div className="flex gap-8">
            {/* Main Content Area */}
            <div className="flex-1">
              <div className="space-y-6">
                {/* Title Input */}
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
                <div>
                  <h3 className="text-sm font-semibold text-gray-700">
                    Permalink
                  </h3>
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
                      addonBefore={process.env.NEXT_PUBLIC_LINK}
                    />
                  </Form.Item>
                </div>
                {/* Content Editor */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700">
                    Content
                  </h3>
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
                  </div>
                </div>
                {/* Featured Image Box */}
                <div className="border border-gray-300 rounded-sm bg-white">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-300">
                    <h3 className="text-sm font-semibold text-gray-700">
                      Featured Image
                    </h3>
                  </div>
                  <div className="p-4">
                    {selectedImage ? (
                      <div className="space-y-3">
                        <div className="relative">
                          <Image
                            src={getImageUrl(selectedImage.slug)}
                            alt={selectedImage.title || "Featured Image"}
                            className="w-full h-32 object-cover rounded"
                          />
                          <div className="absolute top-1 right-1">
                            <Button
                              type="text"
                              icon={<DeleteOutlined />}
                              onClick={handleRemoveImage}
                              size="small"
                            />
                          </div>
                        </div>
                        <Button
                          type="primary"
                          size="small"
                          icon={<PictureOutlined />}
                          onClick={() => setIsModalMediaOpen(true)}
                        >
                          Replace Image
                        </Button>
                      </div>
                    ) : (
                      <Button
                        type="primary"
                        size="large"
                        icon={<PictureOutlined />}
                        onClick={() => setIsModalMediaOpen(true)}
                        className="w-full"
                      >
                        Set Featured Image
                      </Button>
                    )}
                  </div>
                </div>
                {/* Categories Box */}
                <div className="border border-gray-300 rounded-sm bg-white">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-300">
                    <h3 className="text-sm font-semibold text-gray-700">
                      Categories
                    </h3>
                  </div>
                  <div className="p-4">
                    {loadingCategories ? (
                      <div className="flex justify-center items-center h-16">
                        <Spin />
                      </div>
                    ) : errorCategories ? (
                      <Alert type="error" message={errorCategories} showIcon />
                    ) : (
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
                        <CategoryTreeSelector
                          treeData={treeData}
                          value={form.getFieldValue("categoryIds")}
                          onChange={(value) =>
                            form.setFieldsValue({ categoryIds: value })
                          }
                        />
                      </Form.Item>
                    )}
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

// Main page component
const CreatePostPage: React.FC = (props: any) => {
  const { createPost, updatePost } = props;
  const router = useRouter();
  return (
    <PostForm
      mode="create"
      onSuccess={() => router.push("/admin/post/list")}
      createPost={createPost}
      updatePost={updatePost}
    />
  );
};

const mapDispatchToProps = {
  createPost: createPost,
  updatePost: updatePost,
};

export { PostForm };
export default connect(null, mapDispatchToProps)(CreatePostPage);
