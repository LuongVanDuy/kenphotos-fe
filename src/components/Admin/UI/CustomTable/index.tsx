"use client";

import React, { useState } from "react";
import { Table, Input, Button, Space, Dropdown, Tag, Popconfirm, message, Card, Row, Col, Select, Typography, Tooltip, DatePicker } from "antd";
import { MoreOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import type { ColumnsType, TableProps } from "antd/es/table";

const { Text } = Typography;

interface DataTableProps<T> extends Omit<TableProps<T>, "columns" | "title"> {
  columns: ColumnsType<T>;
  data: T[];
  loading?: boolean;
  searchable?: boolean;
  filterable?: boolean;
  exportable?: boolean;
  refreshable?: boolean;
  onSearch?: (value: string) => void;
  onRefresh?: () => void;
  onExport?: () => void;
  onEdit?: (record: T) => void;
  onDelete?: (record: T) => void;
  onView?: (record: T) => void;
  title?: string;
  showActions?: boolean;
  actionColumn?: {
    width?: number;
    fixed?: "left" | "right";
  };
}

function CustomTable<T extends { id: string | number }>({
  columns,
  data,
  loading = false,
  searchable = true,
  filterable = false,
  exportable = false,
  refreshable = true,
  onSearch,
  onRefresh,
  onExport,
  onEdit,
  onDelete,
  onView,
  title,
  showActions = true,
  actionColumn = { width: 120, fixed: "right" },
  ...tableProps
}: DataTableProps<T>) {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  React.useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearch = (value: string) => {
    setSearchText(value);
    if (onSearch) {
      onSearch(value);
    } else {
      // Default local search
      const filtered = data.filter((item) => Object.values(item).some((val) => String(val).toLowerCase().includes(value.toLowerCase())));
      setFilteredData(filtered);
    }
  };

  const handleDelete = (record: T) => {
    if (onDelete) {
      onDelete(record);
      message.success("Item deleted successfully");
    }
  };

  const getActionItems = (record: T) => [
    ...(onView
      ? [
          {
            key: "view",
            icon: <EyeOutlined />,
            label: "View",
            onClick: () => onView(record),
          },
        ]
      : []),
    ...(onEdit
      ? [
          {
            key: "edit",
            icon: <EditOutlined />,
            label: "Edit",
            onClick: () => onEdit(record),
          },
        ]
      : []),
    ...(onDelete
      ? [
          {
            type: "divider" as const,
          },
          {
            key: "delete",
            icon: <DeleteOutlined />,
            label: "Delete",
            danger: true,
            onClick: () => handleDelete(record),
          },
        ]
      : []),
  ];

  const actionColumnConfig =
    showActions && (onView || onEdit || onDelete)
      ? [
          {
            title: "Actions",
            key: "actions",
            width: actionColumn.width,
            fixed: actionColumn.fixed,
            render: (_: any, record: T) => (
              <Dropdown
                menu={{
                  items: getActionItems(record),
                }}
                trigger={["click"]}
              >
                <Button type="text" icon={<MoreOutlined />} size="small" />
              </Dropdown>
            ),
          },
        ]
      : [];

  const finalColumns = [...columns, ...actionColumnConfig];

  return (
    <div>
      {title && (
        <Text
          style={{
            fontSize: 18,
            fontWeight: 600,
            marginBottom: 16,
            display: "block",
          }}
        >
          {title}
        </Text>
      )}
      <Table
        columns={finalColumns}
        dataSource={filteredData}
        loading={loading}
        rowKey="id"
        scroll={{ x: "max-content" }}
        style={{
          borderRadius: 8,
        }}
        className="admin-table"
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => (
            <Text style={{ color: "#595959" }}>
              Showing {range[0]}-{range[1]} of {total} items
            </Text>
          ),
          pageSizeOptions: ["10", "20", "50", "100"],
          size: "default",
          style: {
            marginTop: "24px",
            paddingTop: "16px",
            borderTop: `1px solid #d9d9d9`,
          },
        }}
        {...tableProps}
      />
    </div>
  );
}

export default CustomTable;
