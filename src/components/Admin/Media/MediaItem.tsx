import React from "react";
import { Card, Image, Button, Tooltip, Typography, Checkbox } from "antd";
import {
  EyeOutlined,
  FileImageOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Media } from "@/types";

const { Text } = Typography;

interface MediaItemProps {
  item: Media;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({
  item,
  selected = false,
  onSelect,
}) => {
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
    <div
      className={`media-item w-full h-full relative overflow-hidden rounded-lg border transition-all ${
        selected
          ? "border-blue-500 bg-blue-50 shadow-lg"
          : "border-gray-200 hover:shadow-lg"
      }`}
    >
      {/* Checkbox for selection */}
      {onSelect && (
        <div className="absolute top-2 left-2 z-10">
          <Checkbox
            checked={selected}
            onChange={(e) => onSelect(e.target.checked)}
            className=" rounded shadow-sm"
          />
        </div>
      )}

      {isImageFile(item.name) ? (
        <div className="aspect-square w-full">
          <Image
            alt="preview"
            style={{ width: "100%", height: "100%" }}
            src={getImageUrl(item)}
            className="border border-gray-300 rounded-lg shadow-sm object-cover"
          />
        </div>
      ) : (
        <div className="aspect-square w-full flex items-center justify-center bg-gray-50">
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
