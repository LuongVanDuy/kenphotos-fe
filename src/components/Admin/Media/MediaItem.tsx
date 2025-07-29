import React from "react";
import { Card, Image, Button, Tooltip, Typography } from "antd";
import {
  EyeOutlined,
  FileImageOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Media } from "@/types";

const { Text } = Typography;

interface MediaItemProps {
  item: Media;
}

const MediaItem: React.FC<MediaItemProps> = ({ item }) => {
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
          alt="preview"
          style={{ width: "100%" }}
          src={getImageUrl(item)}
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
    </div>
  );
};

export default MediaItem;
