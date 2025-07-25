"use client";

import React, { useState, useEffect } from "react";
import { Card, Row, Col, Image, Button, Space, Tag, Dropdown, Input, Select, message, Modal, Typography, Tooltip } from "antd";
import {
  PlusOutlined,
  DownloadOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SearchOutlined,
  FilterOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { CustomShowConfirmModal } from "@/components/Admin/UI/CustomModal";
import { Media } from "@/types";
import CustomTable from "@/components/Admin/UI/CustomTable";

const { Search } = Input;
const { Option } = Select;
const { Text } = Typography;

const MediaListPage: React.FC = () => {
  const router = useRouter();
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  // Mock data for demonstration
  const mockMedia: Media[] = [
    {
      id: "1",
      filename: "hero-image.jpg",
      originalName: "hero-image.jpg",
      mimeType: "image/jpeg",
      size: 1024000,
      url: "/images/hero-image.jpg",
      thumbnailUrl: "/images/hero-image-thumb.jpg",
      alt: "Hero image",
      caption: "Main hero image for homepage",
      uploadedBy: {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "admin",
        status: "active",
        createdAt: "2024-01-15",
      },
      createdAt: "2024-01-15",
    },

    {
      id: "2",
      filename: "product-1.png",
      originalName: "product-showcase.png",
      mimeType: "image/png",
      size: 2048000,
      url: "/images/product-1.png",
      thumbnailUrl: "/images/product-1-thumb.png",
      alt: "Product showcase",
      uploadedBy: {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "editor",
        status: "active",
        createdAt: "2024-01-14",
      },
      createdAt: "2024-01-14",
    },
    {
      id: "3",
      filename: "document.pdf",
      originalName: "user-manual.pdf",
      mimeType: "application/pdf",
      size: 5120000,
      url: "/documents/document.pdf",
      uploadedBy: {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "admin",
        status: "active",
        createdAt: "2024-01-15",
      },
      createdAt: "2024-01-13",
    },
  ];

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMedia(mockMedia);
    } catch (error) {
      message.error("Failed to load media");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (mediaItem: Media) => {
    CustomShowConfirmModal({
      title: "Delete Media",
      content: `Are you sure you want to delete "${mediaItem.originalName}"? This action cannot be undone.`,
      onConfirm: async () => {
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 500));
          setMedia(media.filter((m) => m.id !== mediaItem.id));
          message.success("Media deleted successfully");
        } catch (error) {
          message.error("Failed to delete media");
        }
      },
      type: "error",
      okText: "Delete",
      cancelText: "Cancel",
    });
  };

  const handleEdit = (mediaItem: Media) => {
    router.push(`/admin/media/${mediaItem.id}`);
  };

  const handlePreview = (mediaItem: Media) => {
    if (mediaItem.mimeType.startsWith("image/")) {
      setPreviewImage(mediaItem.url);
      setPreviewVisible(true);
    } else {
      window.open(mediaItem.url, "_blank");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith("image/")) return "🖼️";
    if (mimeType.startsWith("video/")) return "🎥";
    if (mimeType.startsWith("audio/")) return "🎵";
    if (mimeType === "application/pdf") return "📄";
    return "📁";
  };

  const renderGridView = () => (
    <Row gutter={[16, 16]}>
      {media.map((item) => (
        <Col xs={24} sm={12} md={8} lg={6} xl={4} key={item.id}>
          <Card
            hoverable
            cover={
              item.mimeType.startsWith("image/") ? (
                <div className="h-48 overflow-hidden">
                  <Image
                    alt={item.alt || item.originalName}
                    src={item.thumbnailUrl || item.url}
                    preview={false}
                    className="w-full h-full object-cover"
                    onClick={() => handlePreview(item)}
                  />
                </div>
              ) : (
                <div className="h-48 flex items-center justify-center bg-gray-100">
                  <div className="text-center">
                    <div className="text-4xl mb-2">{getFileIcon(item.mimeType)}</div>
                    <Text className="text-sm">{item.mimeType}</Text>
                  </div>
                </div>
              )
            }
            actions={[
              <Tooltip title="Preview" key="preview">
                <Button type="text" icon={<EyeOutlined />} onClick={() => handlePreview(item)} />
              </Tooltip>,
              <Tooltip title="Edit" key="edit">
                <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(item)} />
              </Tooltip>,
              <Tooltip title="Delete" key="delete">
                <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(item)} />
              </Tooltip>,
            ]}
          >
            <Card.Meta
              title={
                <Tooltip title={item.originalName}>
                  <div className="truncate">{item.originalName}</div>
                </Tooltip>
              }
              description={
                <div>
                  <div className="text-xs text-gray-500 mb-1">{formatFileSize(item.size)}</div>
                  <div className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</div>
                </div>
              }
            />
          </Card>
        </Col>
      ))}
    </Row>
  );

  const tableColumns = [
    {
      title: "Preview",
      key: "preview",
      width: 80,
      render: (_: any, record: Media) =>
        record.mimeType.startsWith("image/") ? (
          <Image
            width={50}
            height={50}
            src={record.thumbnailUrl || record.url}
            alt={record.alt || record.originalName}
            className="object-cover rounded"
            preview={false}
            onClick={() => handlePreview(record)}
          />
        ) : (
          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded">
            <span className="text-lg">{getFileIcon(record.mimeType)}</span>
          </div>
        ),
    },
    {
      title: "Name",
      dataIndex: "originalName",
      key: "originalName",
      render: (text: string, record: Media) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-sm text-gray-500">{record.filename}</div>
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "mimeType",
      key: "mimeType",
      render: (mimeType: string) => <Tag>{mimeType.split("/")[1].toUpperCase()}</Tag>,
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      render: (size: number) => formatFileSize(size),
    },
    {
      title: "Uploaded By",
      key: "uploadedBy",
      render: (_: any, record: Media) => record.uploadedBy.name,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Media Library</h1>
          <p className="text-gray-600">Manage your media files and assets</p>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => router.push("/admin/media/create")}>
          Upload Media
        </Button>
      </div>

      <Card className="mb-4">
        <div className="flex justify-between items-center">
          <Space>
            <Search placeholder="Search media..." allowClear style={{ width: 300 }} />
            <Select defaultValue="all" style={{ width: 120 }}>
              <Option value="all">All Types</Option>
              <Option value="image">Images</Option>
              <Option value="video">Videos</Option>
              <Option value="document">Documents</Option>
            </Select>
          </Space>

          <Space>
            <Button.Group>
              <Button type={viewMode === "grid" ? "primary" : "default"} icon={<AppstoreOutlined />} onClick={() => setViewMode("grid")} />
              <Button type={viewMode === "list" ? "primary" : "default"} icon={<UnorderedListOutlined />} onClick={() => setViewMode("list")} />
            </Button.Group>
          </Space>
        </div>
      </Card>

      {viewMode === "grid" ? (
        renderGridView()
      ) : (
        <CustomTable
          columns={tableColumns}
          data={media}
          loading={loading}
          onRefresh={loadMedia}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handlePreview}
          searchable={false}
          exportable
        />
      )}

      <Modal open={previewVisible} title="Image Preview" footer={null} onCancel={() => setPreviewVisible(false)} width="80%" style={{ top: 20 }}>
        <Image alt="preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default MediaListPage;
