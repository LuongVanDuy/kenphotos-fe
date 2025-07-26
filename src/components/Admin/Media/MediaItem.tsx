import React from "react";
import { Card, Image, Button, Tooltip, Typography } from "antd";
import {
  EyeOutlined,
  FileImageOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  FileExcelOutlined,
  FileZipOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Media } from "@/types";

const { Text } = Typography;

interface MediaItemProps {
  item: Media;
  onPreview: (item: Media) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ item, onPreview }) => {
  // Get file icon based on extension
  const getFileIcon = (filename: string) => {
    const ext = filename?.split(".")?.pop()?.toLowerCase();
    switch (ext) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "webp":
      case "svg":
        return <FileImageOutlined className="text-blue-500" />;
      case "pdf":
        return <FilePdfOutlined className="text-red-500" />;
      case "doc":
      case "docx":
        return <FileWordOutlined className="text-blue-600" />;
      case "xls":
      case "xlsx":
        return <FileExcelOutlined className="text-green-600" />;
      case "zip":
      case "rar":
        return <FileZipOutlined className="text-purple-500" />;
      default:
        return <FileTextOutlined className="text-gray-500" />;
    }
  };

  // Check if file is image
  const isImageFile = (filename: string) => {
    return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(filename);
  };

  // Get image URL with environment variable
  const getImageUrl = (item: Media) => {
    if (isImageFile(item.name)) {
      return `${process.env.NEXT_PUBLIC_IMAGE_URL}${item.slug}`;
    }
    // For non-image files, use the full URL if it's a relative path
    return item.slug.startsWith("http")
      ? item.slug
      : `${process.env.NEXT_PUBLIC_IMAGE_URL}${item.slug}`;
  };

  return (
    <div className="media-item w-48 h-48 relative overflow-hidden rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
      {isImageFile(item.name) ? (
        <Image
          alt={item.name}
          src={getImageUrl(item)}
          preview={false}
          className="w-full h-full object-cover"
          onClick={() => onPreview(item)}
        />
      ) : (
        <div className="flex items-center justify-center h-full bg-gray-50">
          <div className="text-center">
            <div className="text-4xl text-gray-400">
              {getFileIcon(item.name)}
            </div>
          </div>
        </div>
      )}

      <div className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity">
        <Tooltip title="Preview">
          <Button
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => onPreview(item)}
            className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default MediaItem;
