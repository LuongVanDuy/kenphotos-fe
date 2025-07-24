"use client";

import React, { useState } from "react";
import {
  Card,
  Upload,
  Button,
  message,
  Progress,
  List,
  Image,
  Space,
  Tag,
  Typography,
  Divider,
} from "antd";
import {
  InboxOutlined,
  DeleteOutlined,
  EyeOutlined,
  ArrowLeftOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import type { UploadProps, UploadFile } from "antd";
import UploadField from "@/components/UI/UploadField";

const { Dragger } = Upload;
const { Title, Text } = Typography;

interface UploadedFile extends UploadFile {
  size?: number;
  type?: string;
}

const MediaCreatePage: React.FC = () => {
  const router = useRouter();
  const [fileList, setFileList] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const uploadProps: UploadProps = {
    name: "file",
    multiple: true,
    action: "/api/upload", // This would be your actual upload endpoint
    fileList,
    onChange(info) {
      const { status } = info.file;

      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }

      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }

      setFileList(info.fileList);
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    beforeUpload: (file) => {
      // Check file size (10MB limit)
      const isLt10M = file.size! / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error("File must be smaller than 10MB!");
        return false;
      }

      // Check file type
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "video/mp4",
        "video/webm",
        "application/pdf",
        "text/plain",
      ];

      if (!allowedTypes.includes(file.type!)) {
        message.error("File type not supported!");
        return false;
      }

      return true;
    },
    showUploadList: false, // We'll create our own list
  };

  const handleRemove = (file: UploadedFile) => {
    const newFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(newFileList);
  };

  const handlePreview = (file: UploadedFile) => {
    if (file.type?.startsWith("image/")) {
      // Open image preview
      const url = file.url || URL.createObjectURL(file.originFileObj!);
      window.open(url, "_blank");
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (type?: string) => {
    if (!type) return "📁";
    if (type.startsWith("image/")) return "🖼️";
    if (type.startsWith("video/")) return "🎥";
    if (type.startsWith("audio/")) return "🎵";
    if (type === "application/pdf") return "📄";
    return "📁";
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "done":
        return "green";
      case "uploading":
        return "blue";
      case "error":
        return "red";
      default:
        return "default";
    }
  };

  const handleUploadAll = async () => {
    if (fileList.length === 0) {
      message.warning("Please select files to upload");
      return;
    }

    setUploading(true);
    try {
      // Simulate upload process
      for (let i = 0; i < fileList.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Update file status
        setFileList((prev) =>
          prev.map((file, index) =>
            index === i ? { ...file, status: "done" } : file
          )
        );
      }

      message.success("All files uploaded successfully!");
      setTimeout(() => {
        router.push("/admin/media/list");
      }, 1500);
    } catch (error) {
      message.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => router.back()}
        className="mb-4"
      >
        Back to Media Library
      </Button>

      <div className="mb-6">
        <Title level={2}>Upload Media</Title>
        <Text type="secondary">
          Upload images, videos, documents and other media files to your library
        </Text>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Area */}
        <div className="lg:col-span-2">
          <Card title="Select Files" className="mb-6">
            <Dragger {...uploadProps} className="mb-4">
              <p className="ant-upload-drag-icon">
                <InboxOutlined style={{ fontSize: "48px", color: "#1890ff" }} />
              </p>
              <p className="ant-upload-text">
                Click or drag files to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for single or bulk upload. Maximum file size: 10MB.
                <br />
                Supported formats: Images (JPEG, PNG, GIF, WebP), Videos (MP4,
                WebM), Documents (PDF, TXT)
              </p>
            </Dragger>

            {fileList.length > 0 && (
              <div>
                <Divider />
                <div className="flex justify-between items-center mb-4">
                  <Text strong>Selected Files ({fileList.length})</Text>
                  <Button
                    type="primary"
                    icon={<CloudUploadOutlined />}
                    loading={uploading}
                    onClick={handleUploadAll}
                  >
                    Upload All
                  </Button>
                </div>

                <List
                  dataSource={fileList}
                  renderItem={(file) => (
                    <List.Item
                      actions={[
                        file.type?.startsWith("image/") && (
                          <Button
                            type="text"
                            icon={<EyeOutlined />}
                            onClick={() => handlePreview(file)}
                            key="preview"
                          />
                        ),
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleRemove(file)}
                          key="delete"
                        />,
                      ].filter(Boolean)}
                    >
                      <List.Item.Meta
                        avatar={
                          file.type?.startsWith("image/") && file.thumbUrl ? (
                            <Image
                              width={40}
                              height={40}
                              src={file.thumbUrl}
                              alt={file.name}
                              className="object-cover rounded"
                              preview={false}
                            />
                          ) : (
                            <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded">
                              <span className="text-lg">
                                {getFileIcon(file.type)}
                              </span>
                            </div>
                          )
                        }
                        title={
                          <div className="flex items-center space-x-2">
                            <span>{file.name}</span>
                            <Tag color={getStatusColor(file.status)}>
                              {file.status || "ready"}
                            </Tag>
                          </div>
                        }
                        description={
                          <div>
                            <div className="text-sm text-gray-500">
                              {formatFileSize(file.size)} • {file.type}
                            </div>
                            {file.status === "uploading" && file.percent && (
                              <Progress
                                percent={file.percent}
                                size="small"
                                className="mt-1"
                              />
                            )}
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </div>
            )}
          </Card>
        </div>

        {/* Upload Guidelines */}
        <div>
          <Card title="Upload Guidelines" size="small">
            <div className="space-y-4">
              <div>
                <Text strong className="block mb-2">
                  Supported Formats:
                </Text>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <span className="mr-2">🖼️</span>
                    <Text className="text-sm">
                      Images: JPEG, PNG, GIF, WebP
                    </Text>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">🎥</span>
                    <Text className="text-sm">Videos: MP4, WebM</Text>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">📄</span>
                    <Text className="text-sm">Documents: PDF, TXT</Text>
                  </div>
                </div>
              </div>

              <Divider />

              <div>
                <Text strong className="block mb-2">
                  File Size Limits:
                </Text>
                <div className="space-y-1">
                  <Text className="text-sm block">
                    • Maximum: 10MB per file
                  </Text>
                  <Text className="text-sm block">
                    • Recommended: Under 5MB
                  </Text>
                </div>
              </div>

              <Divider />

              <div>
                <Text strong className="block mb-2">
                  Best Practices:
                </Text>
                <div className="space-y-1">
                  <Text className="text-sm block">
                    • Use descriptive filenames
                  </Text>
                  <Text className="text-sm block">
                    • Optimize images before upload
                  </Text>
                  <Text className="text-sm block">• Check file quality</Text>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MediaCreatePage;
