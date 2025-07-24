"use client";

import React, { useState } from "react";
import {
  Table,
  Input,
  Button,
  Space,
  Dropdown,
  Tag,
  Popconfirm,
  message,
  Card,
  Row,
  Col,
  Select,
  Typography,
  Tooltip,
  DatePicker,
} from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  DownloadOutlined,
  ReloadOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  ClearOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { ColumnsType, TableProps } from "antd/es/table";
import { AdminCard, AdminButton } from "./StyledComponents";
import { designTokens } from "./theme";

const { Search } = Input;
const { Option } = Select;
const { Text } = Typography;

interface DataTableProps<T> extends Omit<TableProps<T>, 'columns'> {
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
    fixed?: 'left' | 'right';
  };
}

function DataTable<T extends { id: string | number }>({
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
  actionColumn = { width: 120, fixed: 'right' },
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
      const filtered = data.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(value.toLowerCase())
        )
      );
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

  const actionColumnConfig = showActions && (onView || onEdit || onDelete)
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
    <AdminCard
      style={{
        background: '#ffffff',
        border: `1px solid ${designTokens.colors.neutral[200]}`,
        borderRadius: designTokens.borderRadius.xl,
        boxShadow: designTokens.boxShadow.md,
      }}
    >
      {/* Modern Header with title and actions */}
      {(title || searchable || filterable || exportable || refreshable) && (
        <div className="mb-6">
          <Row justify="space-between" align="middle" className="mb-4">
            {title && (
              <Col>
                <div>
                  <Text
                    style={{
                      fontSize: '20px',
                      fontWeight: 600,
                      color: designTokens.colors.neutral[800],
                      display: 'block',
                    }}
                  >
                    {title}
                  </Text>
                  <Text
                    style={{
                      fontSize: '14px',
                      color: designTokens.colors.neutral[500],
                      marginTop: '4px',
                      display: 'block',
                    }}
                  >
                    Manage and organize your data
                  </Text>
                </div>
              </Col>
            )}
            <Col>
              <Space size="middle">
                {searchable && (
                  <Search
                    placeholder="Search records..."
                    allowClear
                    onSearch={handleSearch}
                    onChange={(e) => {
                      if (!e.target.value) {
                        handleSearch("");
                      }
                    }}
                    style={{
                      width: 280,
                      borderRadius: designTokens.borderRadius.lg,
                    }}
                    size="large"
                  />
                )}

                {/* Filter Button */}
                {filterable && (
                  <AdminButton
                    icon={<FilterOutlined />}
                    size="middle"
                    colorScheme="neutral"
                    style={{
                      height: '40px',
                      borderRadius: designTokens.borderRadius.lg,
                    }}
                  >
                    Filters
                  </AdminButton>
                )}

                {/* Export Button */}
                {exportable && (
                  <AdminButton
                    icon={<DownloadOutlined />}
                    onClick={onExport}
                    size="middle"
                    colorScheme="neutral"
                    style={{
                      height: '40px',
                      borderRadius: designTokens.borderRadius.lg,
                    }}
                  >
                    Export
                  </AdminButton>
                )}

                {/* Refresh Button */}
                {refreshable && (
                  <Tooltip title="Refresh data">
                    <AdminButton
                      icon={<ReloadOutlined />}
                      onClick={onRefresh}
                      size="middle"
                      colorScheme="neutral"
                      style={{
                        height: '40px',
                        width: '40px',
                        borderRadius: designTokens.borderRadius.lg,
                      }}
                    />
                  </Tooltip>
                )}
              </Space>
            </Col>
          </Row>
        </div>
      )}

      {/* Modern Table */}
      <Table
        columns={finalColumns}
        dataSource={filteredData}
        loading={loading}
        rowKey="id"
        scroll={{ x: 'max-content' }}
        style={{
          borderRadius: designTokens.borderRadius.lg,
        }}
        className="admin-table"
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => (
            <Text style={{ color: designTokens.colors.neutral[600] }}>
              Showing {range[0]}-{range[1]} of {total} items
            </Text>
          ),
          pageSizeOptions: ["10", "20", "50", "100"],
          size: "default",
          style: {
            marginTop: '24px',
            paddingTop: '16px',
            borderTop: `1px solid ${designTokens.colors.neutral[200]}`,
          },
        }}
        {...tableProps}
      />
    </AdminCard>
  );
}

export default DataTable;
