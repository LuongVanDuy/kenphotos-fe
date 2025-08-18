// MenuForm.tsx
import React, { useEffect } from "react";
import { Modal, Form, Input, Typography } from "antd";
import { MenuFormData, MenuItem } from "@/types";

const { Text } = Typography;

interface MenuFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: MenuFormData) => void;
  initialValues?: MenuItem;
  parentId?: string;
}

const MenuForm: React.FC<MenuFormProps> = ({
  visible,
  onCancel,
  onSubmit,
  initialValues,
  parentId,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && initialValues) {
      form.setFieldsValue({
        name: initialValues.name,
        slug: initialValues.slug,
      });
    } else if (visible) {
      form.resetFields();
    }
  }, [visible, initialValues, form]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit({
          ...values,
          order: initialValues?.order || 0,
          children: initialValues?.children || [],
        });
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  return (
    <Modal
      title={initialValues ? "Edit Menu Item" : "Add Menu Item"}
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      okText={initialValues ? "Update" : "Add"}
      cancelText="Cancel"
      width={500}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Menu Name"
          rules={[{ required: true, message: "Please enter menu name" }]}
        >
          <Input placeholder="Enter menu name" />
        </Form.Item>
        <Form.Item name="slug" label="Menu Slug">
          <Input placeholder="Enter menu slug (e.g., about-us)" />
        </Form.Item>
        {parentId && (
          <div className="mb-4 p-3 bg-blue-50 rounded">
            <Text type="secondary">
              This item will be added as a sub-menu item.
            </Text>
          </div>
        )}
      </Form>
    </Modal>
  );
};

export default MenuForm;
