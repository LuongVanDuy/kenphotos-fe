import React, { useEffect, useState } from "react";
import { Form, Input, TreeSelect, Button, message, Modal, Spin } from "antd";
import type { DataNode } from "antd/es/tree";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  fetchCategory,
  updateCategory,
} from "@/store/actions/categories";
import { AppDispatch, RootState } from "@/store/store";
import { useSession } from "next-auth/react";

export interface CategoryFormValues {
  name: string;
  slug: string;
  description: string;
  parentId?: number;
}

interface CategoryFormProps {
  categories: any[];
  mode?: "create" | "edit";
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
  editingId?: number | null;
  fetchCategory?: any;
}

function buildTree(flat: any[], parentId: number | null = null): DataNode[] {
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
  const { data: session } = useSession();
  const categoryDetail = useSelector(
    (state: RootState) => state.categories.detail
  );
  const [loading, setLoading] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);

  useEffect(() => {
    if (open && mode === "edit" && editingId && session?.accessToken) {
      setLoadingDetail(true);
      dispatch(fetchCategory(editingId, session.accessToken) as any);
    }
    // eslint-disable-next-line
  }, [open, mode, editingId, session?.accessToken]);

  useEffect(() => {
    if (
      open &&
      mode === "edit" &&
      categoryDetail &&
      categoryDetail.id === editingId
    ) {
      form.setFieldsValue({
        name: categoryDetail.name,
        slug: categoryDetail.slug,
        description: categoryDetail.description,
        parentId: categoryDetail.parentId || undefined,
      });
      setLoadingDetail(false); // detail đã về, tắt loading
    }
    // eslint-disable-next-line
  }, [categoryDetail, open, mode, editingId]);

  const handleSubmit = (values: CategoryFormValues) => {
    setLoading(true);

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

    const handleSuccess = () => {
      message.success(
        mode === "edit"
          ? "Category updated successfully"
          : "Category created successfully"
      );
      setOpen(false);
      form.resetFields();

      if (onSuccess) {
        onSuccess();
      }
      setLoading(false);
    };

    const handleFailure = (error: string) => {
      message.error(error || `Failed to ${mode} category`);
      setLoading(false);
    };

    if (mode === "edit" && editingId) {
      // Update category
      dispatch(
        updateCategory(
          { id: editingId, data: payload },
          session?.accessToken || "",
          handleSuccess,
          handleFailure
        ) as any
      );
    } else {
      // Create category
      dispatch(
        createCategory(
          payload,
          session?.accessToken || "",
          handleSuccess,
          handleFailure
        ) as any
      );
    }
  };

  return (
    <Modal
      title={`${mode === "edit" ? "Edit" : "Add"} Category`}
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      maskClosable={false}
      centered
      width="90%"
      style={{ maxWidth: 500 }}
      // confirmLoading={loadingDetail} // ĐÃ BỎ
    >
      <Spin spinning={loadingDetail}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input placeholder="Enter category name" size="middle" />
          </Form.Item>

          <Form.Item
            label="Slug"
            name="slug"
            rules={[{ required: true, message: "Slug is required" }]}
          >
            <Input placeholder="Enter category slug" size="middle" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Description is required" }]}
          >
            <Input.TextArea
              placeholder="Enter category description"
              rows={3}
              size="middle"
            />
          </Form.Item>

          <Form.Item label="Parent Category" name="parentId">
            <TreeSelect
              style={{ width: "100%" }}
              treeData={treeData}
              placeholder="Select parent category (optional)"
              allowClear
              treeDefaultExpandAll
              size="middle"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="middle"
            >
              {mode === "edit" ? "Update" : "Create"} Category
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default CategoryForm;
