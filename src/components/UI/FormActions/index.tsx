import React from "react";
import { Space } from "antd";
import { CustomButton } from "../CustomButton";

export default function FormActions({
  loading,
  onCancel,
  submitText = "Save",
  cancelText = "Cancel",
  showCancel = true,
}: {
  loading?: boolean;
  onCancel?: () => void;
  submitText?: string;
  cancelText?: string;
  showCancel?: boolean;
}) {
  return (
    <Space>
      <CustomButton htmlType="submit" isLoading={loading} type="primary">
        {submitText}
      </CustomButton>
      {showCancel && (
        <CustomButton type="default" onClick={onCancel} htmlType="button">
          {cancelText}
        </CustomButton>
      )}
    </Space>
  );
}
