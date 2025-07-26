"use client";

import React, { useState, useEffect } from "react";
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
  Alert,
} from "antd";
import {
  InboxOutlined,
  DeleteOutlined,
  EyeOutlined,
  ArrowLeftOutlined,
  CloudUploadOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import type { UploadProps, UploadFile } from "antd";
import { useSession } from "next-auth/react";
import { connect } from "react-redux";
import { uploadMedia } from "@/store/actions/media";

const { Dragger } = Upload;
const { Title, Text } = Typography;

interface UploadedFile extends UploadFile {
  size?: number;
  type?: string;
  status?: "uploading" | "done" | "error" | "removed";
  percent?: number;
  uploadedUrl?: string; // URL của ảnh đã upload thành công
}

const MediaCreatePage: React.FC = (props: any) => {
  const { uploadMedia, uploadLoading, uploadError, uploadMessage } = props;
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

  // Auto redirect when all files are uploaded successfully
  useEffect(() => {
    const allFilesUploaded =
      fileList.length > 0 && fileList.every((file) => file.status === "done");
    const hasUploadedFiles = uploadedFiles.length > 0;

    if (allFilesUploaded && hasUploadedFiles) {
      // Wait a bit to show success message
      setTimeout(() => {
        message.success(
          "All files uploaded successfully! Redirecting to Media Library..."
        );
        setTimeout(() => {
          router.push("/admin/media/list");
        }, 1500);
      }, 1000);
    }
  }, [fileList, uploadedFiles, router]);

  const uploadProps: UploadProps = {
    name: "files",
    multiple: false, // Chỉ cho phép chọn 1 file
    fileList,
    beforeUpload: (file) => {
      // Check file size (10MB limit)
      const isLt10M = file.size! / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error("File must be smaller than 10MB!");
        return false;
      }

      // Only allow images and GIF
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/svg+xml",
      ];

      if (!allowedTypes.includes(file.type!)) {
        message.error(
          "Only image files (JPG, PNG, GIF, WebP, SVG) are allowed!"
        );
        return false;
      }

      return false; // Prevent auto upload
    },
    onChange(info) {
      setFileList(info.fileList);

      // Auto upload file mới được chọn
      const newFile = info.fileList.find(
        (file) => file.status === undefined && file.originFileObj
      );

      if (newFile) {
        handleUpload(newFile);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  // Upload function - chỉ upload 1 file
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

      // Update file status to done and add uploaded URL
      setFileList((prev) =>
        prev.map((f) =>
          f.uid === file.uid
            ? {
                ...f,
                status: "done",
                percent: 100,
                uploadedUrl: result?.data?.url || result?.url, // Lấy URL từ response
              }
            : f
        )
      );

      // Add to uploaded files list
      if (result?.data) {
        setUploadedFiles((prev) => [...prev, result.data]);
      }

      // Toast notification khi upload thành công
      message.success(`${file.name} uploaded successfully!`);
    } catch (error) {
      // Update file status to error
      setFileList((prev) =>
        prev.map((f) =>
          f.uid === file.uid ? { ...f, status: "error", percent: 0 } : f
        )
      );

      // Toast notification khi upload thất bại
      message.error(`Failed to upload ${file.name}`);
    }
  };

  const handleRemove = (file: UploadedFile) => {
    const newFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(newFileList);
  };

  const handlePreview = (file: UploadedFile) => {
    // Nếu file đã upload thành công, dùng URL từ server
    if (file.uploadedUrl) {
      window.open(file.uploadedUrl, "_blank");
    } else if (file.type?.startsWith("image/")) {
      // Nếu chưa upload, dùng URL local
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
    if (type.includes("word")) return "📝";
    if (type.includes("excel")) return "📊";
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

  const handleClearAll = () => {
    setFileList([]);
    setUploadedFiles([]);
  };

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
                Only JPG, PNG, GIF, WebP, and SVG files are supported. File will
                be uploaded immediately when selected.
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
                <List
                  dataSource={fileList}
                  renderItem={(file, index) => (
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
                        avatar={
                          <div className="text-2xl">
                            {getFileIcon(file.type)}
                          </div>
                        }
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
                            {/* Preview ảnh đã upload thành công */}
                            {file.status === "done" && file.uploadedUrl && (
                              <div className="mt-2">
                                <Image
                                  src={file.uploadedUrl}
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
                  )}
                />
              </div>
            )}
          </Card>
        </div>

        {/* Upload Info */}
        <div className="lg:col-span-1">
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
                  <div>• Single file upload</div>
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
        </div>
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
  uploadMedia: uploadMedia,
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaCreatePage);
