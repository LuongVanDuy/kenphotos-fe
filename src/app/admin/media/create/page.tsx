"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import {
  Card,
  Upload,
  Button,
  message,
  Progress,
  List,
  Image,
  Typography,
  Tag,
} from "antd";
import {
  InboxOutlined,
  DeleteOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import type { UploadProps, UploadFile } from "antd";
import { uploadMedia } from "@/store/actions/media";
import { getImageUrl } from "@/utils";
import { AppDispatch } from "@/store/store";

const { Dragger } = Upload;
const { Title, Text } = Typography;

const FILE_SIZE_LIMIT = 2 * 1024 * 1024;
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
];

interface UploadedFile extends UploadFile {
  uploadedUrl?: string;
}

interface MediaCreatePageProps {
  uploadMedia: typeof uploadMedia;
  single?: boolean;
}

const MediaCreatePage: React.FC = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const [file, setFile] = useState<UploadedFile | null>(null);

  const validateFile = (file: File): boolean => {
    if (file.size > FILE_SIZE_LIMIT) {
      message.error("File must be smaller than 2MB!");
      return false;
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      message.error("Only image files are allowed!");
      return false;
    }
    return true;
  };

  const handleUpload = async (uploadFile: UploadedFile) => {
    if (!session?.accessToken) {
      message.error("Authentication required");
      return;
    }

    setFile({ ...uploadFile, status: "uploading", percent: 0 });

    const formData = new FormData();
    formData.append("files", uploadFile.originFileObj!);

    const progressInterval = setInterval(() => {
      setFile((prev) =>
        prev
          ? { ...prev, percent: Math.min((prev.percent || 0) + 10, 90) }
          : null
      );
    }, 200);

    dispatch(
      uploadMedia(
        formData,
        session?.accessToken || "",
        (response: any) => {
          clearInterval(progressInterval);

          setFile((prev) =>
            prev
              ? {
                  ...prev,
                  status: "done",
                  percent: 100,
                  uploadedUrl: response?.url,
                  id: response?.id,
                }
              : null
          );
          message.success("Upload successful!");
        },
        (error: any) => {
          clearInterval(progressInterval);
          setFile((prev) =>
            prev ? { ...prev, status: "error", percent: 0 } : null
          );
          message.error(`Upload failed: ${error}`);
        }
      ) as any
    );
  };

  const handleRemove = () => {
    setFile(null);
  };

  const handlePreview = (previewFile: UploadedFile) => {
    if (previewFile.uploadedUrl) {
      window.open(getImageUrl(previewFile.uploadedUrl), "_blank");
    } else if (
      previewFile.type?.startsWith("image/") &&
      previewFile.originFileObj
    ) {
      const url = URL.createObjectURL(previewFile.originFileObj);
      window.open(url, "_blank");
    }
  };

  const uploadProps: UploadProps = {
    fileList: file ? [file] : [],
    multiple: false,
    beforeUpload: (uploadFile) => {
      if (!validateFile(uploadFile)) return false;
      setFile(null);
      return false;
    },
    onChange(info) {
      const latestFile = info.fileList[info.fileList.length - 1];
      setFile(latestFile || null);

      if (latestFile?.status === undefined && latestFile?.originFileObj) {
        handleUpload(latestFile);
      }
    },
  };

  const renderFileItem = (fileItem: UploadedFile) => (
    <List.Item
      key={fileItem.uid}
      actions={[
        <Button
          key="preview"
          type="text"
          icon={<EyeOutlined />}
          onClick={() => handlePreview(fileItem)}
          disabled={!fileItem.type?.startsWith("image/")}
        />,
        <Button
          key="remove"
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={handleRemove}
        />,
      ]}
    >
      <List.Item.Meta
        avatar={<span className="text-2xl">🖼️</span>}
        title={
          <div className="flex items-center gap-2">
            <span>{fileItem.name}</span>
            {fileItem.status === "done" && (
              <CheckCircleOutlined className="text-green-500" />
            )}
            {fileItem.status === "error" && (
              <CloseCircleOutlined className="text-red-500" />
            )}
          </div>
        }
        description={
          <div>
            <div className="text-sm text-gray-500">
              {Math.round((fileItem.size || 0) / 1024)} KB • {fileItem.type}
            </div>
            {fileItem.status === "uploading" && (
              <Progress
                percent={fileItem.percent || 0}
                size="small"
                status="active"
              />
            )}
            {fileItem.status === "done" && fileItem.uploadedUrl && (
              <Image
                src={getImageUrl(fileItem.uploadedUrl)}
                alt={fileItem.name}
                width={100}
                height={100}
                className="mt-2 rounded"
                style={{ objectFit: "cover" }}
                preview={false}
              />
            )}
          </div>
        }
      />
    </List.Item>
  );

  return (
    <div className="">
      <div className="mb-6">
        <Title level={2}>Upload Images</Title>
        <Text type="secondary">
          Drag & drop or click to upload. JPG, PNG, GIF, WebP, SVG supported.
          Max 2MB.
        </Text>
      </div>

      <Card>
        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag image to upload</p>
          <p className="ant-upload-hint">
            Only image files supported. Max 2MB.
          </p>
        </Dragger>

        {file && (
          <div className="mt-4">
            <Button onClick={() => setFile(null)}>Clear</Button>
            <List
              dataSource={[file]}
              renderItem={renderFileItem}
              className="mt-4"
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default MediaCreatePage;
