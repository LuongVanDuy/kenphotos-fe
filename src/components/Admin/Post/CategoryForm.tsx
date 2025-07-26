import React, { useEffect, useState } from "react";
import { Form, Input, TreeSelect, Button, message, Modal } from "antd";
import type { DataNode } from "antd/es/tree";
import { useDispatch } from "react-redux";
import {
  createCategory,
  updateCategory,
  fetchCategoryDetail,
} from "@/store/actions/categories";
import { AppDispatch } from "@/store/store";

export interface CategoryFormValues {
  name: string;
  slug: string;
  description: string;
  parentId?: number;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  parentId?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface CategoryFormProps {
  categories: Category[];
  mode?: "create" | "edit";
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
  editingId?: number | null;
}

function buildTree(
  flat: Category[],
  parentId: number | null = null
): DataNode[] {
  return flat
    .filter((cat) => (cat.parentId ?? null) === parentId)
    .map((cat) => ({
      title: cat.name,
      value: cat.id,
      key: cat.id,
      children: buildTree(flat, cat.id),
    }));
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  categories,
  mode = "create",
  open,
  setOpen,
  onSuccess,
  editingId,
}) => {
  const [form] = Form.useForm();
  const treeData = buildTree(categories);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Fetch category detail when in edit mode
  useEffect(() => {
    if (open && mode === "edit" && editingId) {
      fetchCategoryData();
    } else if (open && mode === "create") {
      // Reset form for create mode
      form.resetFields();
      setEditingCategory(null);
    }
  }, [open, mode, editingId]);

  const fetchCategoryData = async () => {
    if (!editingId) return;

    setLoadingDetail(true);
    try {
      const response = await dispatch(fetchCategoryDetail(editingId) as any);

      const categoryData = response;
      setEditingCategory(categoryData);

      form.setFieldsValue({
        name: categoryData.name,
        slug: categoryData.slug,
        description: categoryData.description,
        parentId: categoryData.parentId || undefined,
      });
    } catch (err: any) {
      message.error(err.message || "Failed to load category details");
      setOpen(false);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleSubmit = async (values: CategoryFormValues) => {
    setLoading(true);
    try {
      // Prepare payload - only include parentId if it has a value
      const payload: any = {
        name: values.name,
        slug: values.slug,
        description: values.description,
      };

      // Only add parentId if it has a value and is not 0
      if (values.parentId && values.parentId > 0) {
        payload.parentId = values.parentId;
      }

      if (mode === "edit" && editingCategory) {
        // Update category
        await dispatch(updateCategory(editingCategory.id, payload) as any);
        message.success("Category updated successfully");
      } else {
        // Create category
        await dispatch(createCategory(payload) as any);
        message.success("Category created successfully");
      }

      setOpen(false);
      form.resetFields();
      setEditingCategory(null);

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      message.error(err.message || `Failed to ${mode} category`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={`${mode === "edit" ? "Edit" : "Add"} Category`}
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      destroyOnClose
      maskClosable={false}
      centered
      confirmLoading={loadingDetail}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>

        <Form.Item
          label="Slug"
          name="slug"
          rules={[{ required: true, message: "Slug is required" }]}
        >
          <Input placeholder="Enter category slug" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Description is required" }]}
        >
          <Input.TextArea placeholder="Enter category description" rows={3} />
        </Form.Item>

        <Form.Item label="Parent Category" name="parentId">
          <TreeSelect
            style={{ width: "100%" }}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            treeData={treeData}
            placeholder="Select parent category (optional)"
            allowClear
            treeDefaultExpandAll
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            {mode === "edit" ? "Update" : "Create"} Category
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryForm;
