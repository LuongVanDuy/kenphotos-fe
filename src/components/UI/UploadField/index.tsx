import React from "react";
import { Upload, Typography } from "antd";
import type { UploadProps } from "antd";

export default function UploadField({
  name,
  label,
  description,
  accept,
  listType = "picture-card",
  maxCount = 1,
  ...rest
}: {
  name: string;
  label?: string;
  description?: string;
  accept?: string;
  listType?: UploadProps["listType"];
  maxCount?: number;
} & UploadProps) {
  return (
    <div>
      {label && <div style={{ fontWeight: 500, marginBottom: 4 }}>{label}</div>}
      <Upload
        name={name}
        accept={accept}
        listType={listType}
        maxCount={maxCount}
        {...rest}
      >
        <div>Upload</div>
      </Upload>
      {description && (
        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
          {description}
        </Typography.Text>
      )}
    </div>
  );
}
