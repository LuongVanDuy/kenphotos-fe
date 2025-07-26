"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { connect } from "react-redux";
import {
  Card,
  Upload,
  Button,
  message,
  Progress,
  List,
  Image,
  Typography,
  Divider,
  Alert,
  Tag,
} from "antd";
import {
  InboxOutlined,
  DeleteOutlined,
  EyeOutlined,
  ArrowLeftOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import type { UploadProps, UploadFile } from "antd";
import { uploadMedia } from "@/store/actions/media";
import { getImageUrl } from "@/utils";

const { Dragger } = Upload;
const { Title, Text } = Typography;

// Constants
const FILE_SIZE_LIMIT = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
];

const FILE_ICONS = {
  image: "🖼️",
  video: "🎥",
  audio: "🎵",
  pdf: "📄",
  word: "📝",
  excel: "📊",
  default: "📁",
};

const STATUS_COLORS = {
  done: "green",
  uploading: "blue",
  error: "red",
  default: "default",
} as const;

// Types
interface UploadedFile extends UploadFile {
  size?: number;
  type?: string;
  status?: "uploading" | "done" | "error" | "removed";
  percent?: number;
  uploadedUrl?: string;
}

interface MediaCreatePageProps {
  uploadMedia: (token: string, formData: FormData) => Promise<any>;
  uploadLoading: boolean;
  uploadError: boolean;
  uploadMessage: string;
}

// Utility functions
const formatFileSize = (bytes?: number): string => {
  if (!bytes) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const getFileIcon = (type?: string): string => {
  if (!type) return FILE_ICONS.default;
  if (type.startsWith("image/")) return FILE_ICONS.image;
  if (type.startsWith("video/")) return FILE_ICONS.video;
  if (type.startsWith("audio/")) return FILE_ICONS.audio;
  if (type === "application/pdf") return FILE_ICONS.pdf;
  if (type.includes("word")) return FILE_ICONS.word;
  if (type.includes("excel")) return FILE_ICONS.excel;
  return FILE_ICONS.default;
};

const getStatusColor = (status?: string): string => {
  return (
    STATUS_COLORS[status as keyof typeof STATUS_COLORS] || STATUS_COLORS.default
  );
};

const MediaCreatePage: React.FC<MediaCreatePageProps> = ({
  uploadMedia,
  uploadLoading,
  uploadError,
  uploadMessage,
}) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [fileList, setFileList] = useState<UploadedFile[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  // Handle upload success/error from Redux
  useEffect(() => {
    if (uploadMessage) {
      if (uploadError) {
        message.error(uploadMessage);
      } else {
        message.success(uploadMessage);
      }
    }
  }, [uploadMessage, uploadError]);

  // Auto redirect when file is uploaded successfully
  useEffect(() => {
    const fileUploaded = fileList.length > 0 && fileList[0].status === "done";
    const hasUploadedFiles = uploadedFiles.length > 0;

    if (fileUploaded && hasUploadedFiles) {
      setTimeout(() => {
        message.success(
          "File uploaded successfully! Redirecting to Media Library..."
        );
        setTimeout(() => {
          router.push("/admin/media/list");
        }, 1500);
      }, 1000);
    }
  }, [fileList, uploadedFiles, router]);

  const validateFile = (file: File): boolean => {
    // Check file size
    if (file.size > FILE_SIZE_LIMIT) {
      message.error("File must be smaller than 10MB!");
      return false;
    }

    // Check file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      message.error("Only image files (JPG, PNG, GIF, WebP, SVG) are allowed!");
      return false;
    }

    return true;
  };

  const handleUpload = async (file: UploadedFile) => {
    if (!session?.accessToken) {
      message.error("Authentication required");
      return;
    }

    // Update file status to uploading
    setFileList((prev) =>
      prev.map((f) =>
        f.uid === file.uid ? { ...f, status: "uploading", percent: 0 } : f
      )
    );

    try {
      const formData = new FormData();
      formData.append("files", file.originFileObj!);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setFileList((prev) =>
          prev.map((f) =>
            f.uid === file.uid
              ? { ...f, percent: Math.min((f.percent || 0) + 10, 90) }
              : f
          )
        );
      }, 200);

      // Call Redux action
      const result = await uploadMedia(session.accessToken, formData);
      clearInterval(progressInterval);

      // Update file status to done
      setFileList((prev) =>
        prev.map((f) =>
          f.uid === file.uid
            ? {
                ...f,
                status: "done",
                percent: 100,
                uploadedUrl: result?.data?.url || result?.url,
              }
            : f
        )
      );

      // Add to uploaded files list
      if (result?.data) {
        setUploadedFiles((prev) => [...prev, result.data]);
      }
    } catch (error) {
      // Update file status to error
      setFileList((prev) =>
        prev.map((f) =>
          f.uid === file.uid ? { ...f, status: "error", percent: 0 } : f
        )
      );
      message.error(`Failed to upload ${file.name}`);
    }
  };

  const handleRemove = (file: UploadedFile) => {
    const newFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(newFileList);
  };

  const handlePreview = (file: UploadedFile) => {
    if (file.uploadedUrl) {
      const fullUrl = getImageUrl(file.uploadedUrl);
      window.open(fullUrl, "_blank");
    } else if (file.type?.startsWith("image/")) {
      const url = file.url || URL.createObjectURL(file.originFileObj!);
      window.open(url, "_blank");
    }
  };

  const handleClearAll = () => {
    setFileList([]);
    setUploadedFiles([]);
  };

  const uploadProps: UploadProps = {
    name: "files",
    multiple: false,
    fileList,
    beforeUpload: (file) => {
      if (!validateFile(file)) {
        return false;
      }

      // Clear previous files when new file is selected
      setFileList([]);
      setUploadedFiles([]);
      return false; // Prevent auto upload
    },
    onChange(info) {
      // Only keep the latest file
      const latestFile = info.fileList[info.fileList.length - 1];
      setFileList(latestFile ? [latestFile] : []);

      // Auto upload new file
      if (
        latestFile &&
        latestFile.status === undefined &&
        latestFile.originFileObj
      ) {
        handleUpload(latestFile);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const renderFileItem = (file: UploadedFile) => (
    <List.Item
      key={file.uid}
      actions={[
        <Button
          key="preview"
          type="text"
          icon={<EyeOutlined />}
          onClick={() => handlePreview(file)}
          disabled={!file.type?.startsWith("image/")}
        />,
        <Button
          key="remove"
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleRemove(file)}
        />,
      ]}
    >
      <List.Item.Meta
        avatar={<div className="text-2xl">{getFileIcon(file.type)}</div>}
        title={
          <div className="flex items-center gap-2">
            <span>{file.name}</span>
            {file.status === "done" && (
              <CheckCircleOutlined className="text-green-500" />
            )}
            {file.status === "error" && (
              <CloseCircleOutlined className="text-red-500" />
            )}
          </div>
        }
        description={
          <div>
            <div className="text-sm text-gray-500">
              {formatFileSize(file.size)} • {file.type}
            </div>
            {file.status === "uploading" && (
              <Progress
                percent={file.percent || 0}
                size="small"
                status="active"
              />
            )}
            {file.status === "done" && file.uploadedUrl && (
              <div className="mt-2">
                <Image
                  src={getImageUrl(file.uploadedUrl)}
                  alt={file.name}
                  width={100}
                  height={100}
                  style={{
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                  preview={false}
                />
              </div>
            )}
          </div>
        }
      />
    </List.Item>
  );

  const renderUploadInfo = () => (
    <Card title="Upload Information">
      <div className="space-y-4">
        <div>
          <Text strong>Supported Formats:</Text>
          <div className="mt-2 space-y-1">
            <Tag color="blue">Images (JPG, PNG, GIF, WebP, SVG)</Tag>
          </div>
        </div>

        <Divider />

        <div>
          <Text strong>File Limits:</Text>
          <div className="mt-2 text-sm text-gray-600">
            <div>• Maximum file size: 10MB</div>
            <div>• Only one file at a time</div>
            <div>• Auto upload on selection</div>
            <div>• Drag & drop enabled</div>
          </div>
        </div>

        <Divider />

        <div>
          <Text strong>Upload Status:</Text>
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <Text className="text-sm">Ready to upload</Text>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <Text className="text-sm">Uploaded successfully</Text>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <Text className="text-sm">Upload failed</Text>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => router.back()}
        className="mb-4"
      >
        Back to Media Library
      </Button>

      <div className="mb-6">
        <Title level={2}>Upload Images</Title>
        <Text type="secondary">
          Select image files to upload automatically. Only JPG, PNG, GIF, WebP,
          and SVG files are supported.
        </Text>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Area */}
        <div className="lg:col-span-2">
          <Card>
            <Dragger {...uploadProps} className="block h-auto">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag image file to this area to upload automatically
              </p>
              <p className="ant-upload-hint">
                Only JPG, PNG, GIF, WebP, and SVG files are supported. Only one
                file at a time.
              </p>
            </Dragger>

            {/* Upload Controls */}
            <div className="mt-4 flex gap-2">
              <Button
                onClick={handleClearAll}
                disabled={fileList.length === 0}
                size="large"
              >
                Clear All
              </Button>
            </div>

            {/* Upload Progress & Preview */}
            {fileList.length > 0 && (
              <div className="mt-4">
                <Title level={4}>Upload Status</Title>
                <List dataSource={fileList} renderItem={renderFileItem} />
              </div>
            )}
          </Card>
        </div>

        {/* Upload Info */}
        <div className="lg:col-span-1">{renderUploadInfo()}</div>
      </div>

      {uploadMessage && uploadError && (
        <Alert
          message="Upload Failed"
          description={uploadMessage}
          type="error"
          showIcon
          className="mt-4"
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  uploadLoading: state.media.uploadLoading,
  uploadError: state.media.uploadError,
  uploadMessage: state.media.uploadMessage,
});

const mapDispatchToProps = {
  uploadMedia,
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaCreatePage);
