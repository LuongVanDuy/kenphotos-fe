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
  Typography,
  Tag,
} from "antd";
import {
  InboxOutlined,
  DeleteOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import type { UploadProps, UploadFile } from "antd";
import { uploadMedia } from "@/store/actions/media";
import { getImageUrl } from "@/utils";
import { AppDispatch } from "@/store/store";
import Image from "next/image";

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

  const handleCopyUrl = async (fileItem: UploadedFile) => {
    if (fileItem.uploadedUrl) {
      const fullUrl = getImageUrl(fileItem.uploadedUrl);
      try {
        await navigator.clipboard.writeText(fullUrl);
        message.success("URL copied to clipboard!");
      } catch (err) {
        message.error("Failed to copy URL");
      }
    } else {
      message.warning("File not uploaded yet");
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
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
      {/* Thumbnail */}
      <div className="flex-shrink-0">
        {fileItem.status === "done" && fileItem.uploadedUrl ? (
          <Image
            src={getImageUrl(fileItem.uploadedUrl)}
            alt={fileItem.name}
            width={100}
            height={100}
            className="rounded"
            style={{ objectFit: "cover" }}
          />
        ) : fileItem.type?.startsWith("image/") && fileItem.originFileObj ? (
          <Image
            src={URL.createObjectURL(fileItem.originFileObj)}
            alt={fileItem.name}
            width={100}
            height={100}
            className="rounded"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="w-[100px] h-[100px] bg-gray-200 rounded flex items-center justify-center">
            <span className="text-2xl">🖼️</span>
          </div>
        )}
      </div>

      {/* File Info */}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-900 truncate">
          {fileItem.name?.replace(/\.[^/.]+$/, "")}
        </div>
        <div className="text-sm text-gray-500">{fileItem.name}</div>
        {fileItem.status === "uploading" && (
          <Progress
            percent={fileItem.percent || 0}
            size="small"
            status="active"
            className="mt-2"
          />
        )}
        {fileItem.status === "done" && (
          <div className="mt-3">
            <Button
              type="default"
              size="small"
              icon={<CopyOutlined />}
              onClick={() => handleCopyUrl(fileItem)}
              disabled={fileItem.status !== "done"}
              className="border-blue-300 text-blue-600 hover:border-blue-400 hover:text-blue-700"
            >
              Copy URL to clipboard
            </Button>
          </div>
        )}
        {fileItem.status === "error" && (
          <div className="flex items-center gap-1 mt-1">
            <CloseCircleOutlined className="text-red-500 text-sm" />
            <span className="text-xs text-red-600">Upload failed</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
    </div>
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

        {file && <div className="mt-4">{renderFileItem(file)}</div>}
      </Card>
    </div>
  );
};

export default MediaCreatePage;
