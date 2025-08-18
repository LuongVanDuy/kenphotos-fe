// SortableMenuItem.tsx
import React from "react";
import { Button, Divider, Tooltip, Popconfirm } from "antd";
import {
  DragOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FlatMenuItem, MenuItem } from "@/types";

interface SortableMenuItemProps {
  item: FlatMenuItem;
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string) => void;
  onAddChild: (parentId: string) => void;
  onPromote: (id: string) => void;
  onDemote: (id: string) => void;
  canPromote: boolean;
  canDemote: boolean;
}

const SortableMenuItem: React.FC<SortableMenuItemProps> = ({
  item,
  onEdit,
  onDelete,
  onAddChild,
  onPromote,
  onDemote,
  canPromote,
  canDemote,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // Dynamic margin based on level
  const getMarginClass = (level: number) => {
    const margins: Record<number, string> = {
      0: "",
      1: "ml-6",
      2: "ml-12",
      3: "ml-18",
    };
    return margins[level] || `ml-${level * 6}`;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white border border-gray-200 rounded-lg p-3 mb-2 ${getMarginClass(
        item.level
      )}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab hover:bg-gray-100 p-1 rounded"
          >
            <DragOutlined className="text-gray-400" />
          </div>
          <div className="flex-1">
            <div className="font-medium text-gray-800">{item.name}</div>
            <div className="text-sm text-gray-500">{item.slug}</div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {/* Level Controls */}
          <Tooltip title="Promote to higher level">
            <Button
              type="text"
              size="small"
              icon={<ArrowLeftOutlined />}
              onClick={() => onPromote(item.id)}
              disabled={!canPromote}
              className={!canPromote ? "opacity-50" : ""}
            />
          </Tooltip>
          <Tooltip title="Demote to lower level">
            <Button
              type="text"
              size="small"
              icon={<ArrowRightOutlined />}
              onClick={() => onDemote(item.id)}
              disabled={!canDemote}
              className={!canDemote ? "opacity-50" : ""}
            />
          </Tooltip>

          <Divider type="vertical" />

          <Tooltip title="Add sub-menu">
            <Button
              type="text"
              size="small"
              icon={<PlusOutlined />}
              onClick={() => onAddChild(item.id)}
            />
          </Tooltip>
          <Tooltip title="Edit menu item">
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => onEdit(item)}
            />
          </Tooltip>
          <Popconfirm
            title="Delete menu item"
            description="Are you sure you want to delete this menu item and all its children?"
            onConfirm={() => onDelete(item.id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete menu item">
              <Button
                type="text"
                size="small"
                danger
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </Popconfirm>
        </div>
      </div>
    </div>
  );
};

export default SortableMenuItem;
