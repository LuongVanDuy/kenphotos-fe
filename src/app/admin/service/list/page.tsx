"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  Tag,
  message,
  Select,
  Table,
  Dropdown,
  Modal,
  Input,
} from "antd";
import {
  PlusOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  RestOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchServices,
  deleteService,
  restoreService,
  permanentDeleteService,
} from "@/store/actions/services";
import { useSession } from "next-auth/react";
import { AppDispatch, RootState } from "@/store/store";

const { Option } = Select;

// Types
interface Service {
  id: number;
  title: string;
  type: number;
  originalPrice: number;
  discountedPrice: number;
  rating: number;
  orderCount: number;
  status: number;
  createdTime: string;
  deleteFlg: number;
}

interface QueryParams {
  search: string;
  status?: number;
  type?: number;
  deleteFlg: number;
  page: number;
  itemsPerPage: number;
  sortBy: string;
  sortDesc: boolean;
}

// Constants
const STATUS_MAP: Record<number, { label: string; color: string }> = {
  0: { label: "Draft", color: "orange" },
  1: { label: "Published", color: "green" },
};

const TYPE_MAP: Record<number, { label: string; color: string }> = {
  0: { label: "Basic", color: "blue" },
  1: { label: "Premium", color: "purple" },
  2: { label: "Enterprise", color: "gold" },
};

const SORT_FIELDS = [
  { value: "createdTime", label: "Created Time" },
  { value: "title", label: "Title" },
  { value: "price", label: "Price" },
  { value: "rating", label: "Rating" },
];

const DEFAULT_PAGE_SIZE = 10;

const ServiceListPage: React.FC = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // Redux state
  const {
    list: serviceList = [],
    total: serviceTotal = 0,
    loading: serviceLoading = false,
  } = useSelector((state: RootState) => state.services || {});

  // Local state
  const [filters, setFilters] = useState({
    status: "all",
    type: "all",
    deleteFlg: 0,
    sortBy: "createdTime",
    sortDesc: true,
    keyword: "",
  });
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const [selection, setSelection] = useState({
    selectedRowKeys: [] as React.Key[],
    selectedServices: [] as Service[],
  });

  // Memoized query function
  const handleQuery = useCallback(
    (keyword: string, page = 1, itemsPerPage = DEFAULT_PAGE_SIZE) => {
      const queryParams: QueryParams = {
        search: keyword,
        status: filters.status === "all" ? undefined : parseInt(filters.status),
        type: filters.type === "all" ? undefined : parseInt(filters.type),
        deleteFlg: filters.deleteFlg,
        page,
        itemsPerPage,
        sortBy: filters.sortBy,
        sortDesc: filters.sortDesc,
      };

      dispatch(fetchServices(queryParams, session?.accessToken || "") as any);
      setPagination({ pageNumber: page, pageSize: itemsPerPage });
    },
    [dispatch, session?.accessToken, filters]
  );

  // Effects
  useEffect(() => {
    if (session?.accessToken) {
      handleQuery(filters.keyword);
    }
  }, [session?.accessToken, filters, handleQuery]);

  // Callback functions
  const onSuccess = useCallback(() => {
    message.success("Operation completed successfully");
    setSelection({ selectedRowKeys: [], selectedServices: [] });
    handleQuery(filters.keyword, pagination.pageNumber, pagination.pageSize);
  }, [
    handleQuery,
    filters.keyword,
    pagination.pageNumber,
    pagination.pageSize,
  ]);

  const onFailure = useCallback((error: any) => {
    message.error(error || "Operation failed");
  }, []);

  const handleServiceAction = useCallback(
    (action: string, service: Service) => {
      const actionMap = {
        delete: {
          title: "Confirm",
          content: `Are you sure you want to move "${service.title}" to trash?`,
          okText: "Move to Trash",
          action: () =>
            deleteService(
              { ids: [service.id] },
              session?.accessToken || "",
              onSuccess,
              onFailure
            ),
        },
        restore: {
          title: "Confirm Restore",
          content: `Are you sure you want to restore "${service.title}"?`,
          okText: "Restore",
          action: () =>
            restoreService(
              { ids: [service.id] },
              session?.accessToken || "",
              onSuccess,
              onFailure
            ),
        },
        permanentDelete: {
          title: "Permanent Delete",
          content: `Are you sure you want to permanently delete "${service.title}"? This action cannot be undone.`,
          okText: "Delete Permanently",
          action: () =>
            permanentDeleteService(
              { ids: [service.id] },
              session?.accessToken || "",
              onSuccess,
              onFailure
            ),
        },
      };

      const config = actionMap[action as keyof typeof actionMap];
      if (!config) return;

      Modal.confirm({
        title: config.title,
        content: config.content,
        okText: config.okText,
        okType:
          action === "permanentDelete"
            ? "danger"
            : action === "restore"
            ? "primary"
            : "danger",
        cancelText: "Cancel",
        onOk: () => dispatch(config.action as any),
      });
    },
    [dispatch, session?.accessToken, onSuccess, onFailure]
  );

  const handleBulkAction = useCallback(
    (action: string) => {
      if (selection.selectedServices.length === 0) {
        message.warning(`Please select services to ${action}`);
        return;
      }

      const ids = selection.selectedServices.map((service) => service.id);
      const actionMap = {
        delete: {
          title: "Bulk Delete",
          content: `Are you sure you want to move ${selection.selectedServices.length} service(s) to trash?`,
          okText: "Move to Trash",
          action: () =>
            deleteService(
              { ids },
              session?.accessToken || "",
              onSuccess,
              onFailure
            ),
        },
        restore: {
          title: "Bulk Restore",
          content: `Are you sure you want to restore ${selection.selectedServices.length} service(s)?`,
          okText: "Restore",
          action: () =>
            restoreService(
              { ids },
              session?.accessToken || "",
              onSuccess,
              onFailure
            ),
        },
        permanentDelete: {
          title: "Bulk Permanent Delete",
          content: `Are you sure you want to permanently delete ${selection.selectedServices.length} service(s)? This action cannot be undone.`,
          okText: "Delete Permanently",
          action: () =>
            permanentDeleteService(
              { ids },
              session?.accessToken || "",
              onSuccess,
              onFailure
            ),
        },
      };

      const config = actionMap[action as keyof typeof actionMap];
      if (!config) return;

      Modal.confirm({
        title: config.title,
        content: config.content,
        okText: config.okText,
        okType: action === "permanentDelete" ? "danger" : "primary",
        cancelText: "Cancel",
        onOk: () => dispatch(config.action as any),
      });
    },
    [
      selection.selectedServices,
      dispatch,
      session?.accessToken,
      onSuccess,
      onFailure,
    ]
  );

  const handleFilterChange = useCallback((key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    if (key === "deleteFlg") {
      setSelection({ selectedRowKeys: [], selectedServices: [] });
    }
    setPagination((prev) => ({ ...prev, pageNumber: 1 }));
  }, []);

  const handleSearch = useCallback(
    (value: string) => {
      setFilters((prev) => ({ ...prev, keyword: value }));
      setPagination((prev) => ({ ...prev, pageNumber: 1 }));
      handleQuery(value, 1, pagination.pageSize);
    },
    [handleQuery, pagination.pageSize]
  );

  const handlePaginationChange = useCallback(
    (page: number, pageSize: number) => {
      handleQuery(filters.keyword, page, pageSize);
    },
    [handleQuery, filters.keyword]
  );

  const handleSelectionChange = useCallback(
    (selectedRowKeys: React.Key[], selectedRows: Service[]) => {
      setSelection({ selectedRowKeys, selectedServices: selectedRows });
    },
    []
  );

  // Navigation handlers
  const handleEdit = useCallback(
    (service: Service) => {
      router.push(`/admin/service/edit/${service.id}`);
    },
    [router]
  );

  const handleView = useCallback(
    (service: Service) => {
      router.push(`/admin/service/${service.id}`);
    },
    [router]
  );

  const handleCreate = useCallback(() => {
    router.push("/admin/service/create");
  }, [router]);

  // Table columns
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title: string) => <span className="font-medium">{title}</span>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: number) => (
        <Tag color={TYPE_MAP[type]?.color || "default"}>
          {TYPE_MAP[type]?.label || type}
        </Tag>
      ),
    },
    {
      title: "Price",
      key: "price",
      render: (record: Service) => (
        <div>
          {record.discountedPrice > 0 ? (
            <div>
              <span className="text-red-600 font-medium">
                ${record.discountedPrice}
              </span>
              <span className="text-gray-400 line-through ml-2">
                ${record.originalPrice}
              </span>
            </div>
          ) : (
            <span className="font-medium">${record.originalPrice}</span>
          )}
        </div>
      ),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => (
        <div className="flex items-center">
          <span className="text-yellow-500">★</span>
          <span className="ml-1">{rating?.toFixed(1)}</span>
        </div>
      ),
    },
    {
      title: "Orders",
      dataIndex: "orderCount",
      key: "orderCount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: number) => (
        <Tag color={STATUS_MAP[status]?.color || "default"}>
          {STATUS_MAP[status]?.label || status}
        </Tag>
      ),
    },
    {
      title: "Created",
      dataIndex: "createdTime",
      key: "createdTime",
      render: (date: string) => (
        <div>
          <div className="text-sm">{new Date(date).toLocaleDateString()}</div>
          <div className="text-xs text-gray-500">
            {new Date(date).toLocaleTimeString()}
          </div>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_: any, record: Service) => {
        const isDeleted = record.deleteFlg === 1;

        const menuItems = isDeleted
          ? [
              {
                key: "restore",
                label: "Restore",
                icon: <RestOutlined />,
                onClick: () => handleServiceAction("restore", record),
              },
              {
                key: "permanent-delete",
                label: "Delete Permanently",
                icon: <DeleteFilled />,
                onClick: () => handleServiceAction("permanentDelete", record),
                danger: true,
              },
            ]
          : [
              {
                key: "view",
                label: "View",
                icon: <EyeOutlined />,
                onClick: () => handleView(record),
              },
              {
                key: "edit",
                label: "Edit",
                icon: <EditOutlined />,
                onClick: () => handleEdit(record),
              },
              {
                key: "delete",
                label: "Move to Trash",
                icon: <DeleteOutlined />,
                onClick: () => handleServiceAction("delete", record),
              },
            ];

        return (
          <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
            <Button type="text" icon={<MoreOutlined />} />
          </Dropdown>
        );
      },
    },
  ];

  const isTrashView = filters.deleteFlg === 1;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-5">
        {isTrashView ? "Trash" : "Services"}
      </h1>

      {/* Filters and Actions */}
      <div className="flex flex-wrap gap-2 mb-6 items-center justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          <Input.Search
            placeholder="Search services"
            allowClear
            value={filters.keyword}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, keyword: e.target.value }))
            }
            onSearch={handleSearch}
            style={{ width: 200 }}
          />

          <Select
            value={filters.status}
            onChange={(value) => handleFilterChange("status", value)}
            className="w-[120px] !h-[40px]"
          >
            <Option value="all">All Status</Option>
            <Option value={0}>Draft</Option>
            <Option value={1}>Published</Option>
          </Select>

          <Select
            value={filters.deleteFlg}
            onChange={(value) => handleFilterChange("deleteFlg", value)}
            className="w-[120px] !h-[40px]"
          >
            <Option value={0}>Active Services</Option>
            <Option value={1}>Trash</Option>
          </Select>

          <Select
            value={filters.type}
            onChange={(value) => handleFilterChange("type", value)}
            className="w-[120px] !h-[40px]"
          >
            <Option value="all">All Types</Option>
            <Option value={0}>Basic</Option>
            <Option value={1}>Premium</Option>
            <Option value={2}>Enterprise</Option>
          </Select>

          <Select
            value={filters.sortBy}
            onChange={(value) => handleFilterChange("sortBy", value)}
            className="w-[150px] !h-[40px]"
          >
            {SORT_FIELDS.map((field) => (
              <Option key={field.value} value={field.value}>
                {field.label}
              </Option>
            ))}
          </Select>

          <Select
            value={filters.sortDesc}
            onChange={(value) => handleFilterChange("sortDesc", value)}
            className="w-[120px] !h-[40px]"
          >
            <Option value={false}>Ascending</Option>
            <Option value={true}>Descending</Option>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {isTrashView ? (
            <>
              <Button
                type="default"
                icon={<RestOutlined />}
                onClick={() => handleBulkAction("restore")}
                disabled={selection.selectedServices.length === 0}
              >
                Restore Selected ({selection.selectedServices.length})
              </Button>
              <Button
                type="primary"
                danger
                icon={<DeleteFilled />}
                onClick={() => handleBulkAction("permanentDelete")}
                disabled={selection.selectedServices.length === 0}
              >
                Delete Permanently ({selection.selectedServices.length})
              </Button>
            </>
          ) : (
            <>
              <Button
                type="default"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleBulkAction("delete")}
                disabled={selection.selectedServices.length === 0}
              >
                Move to Trash ({selection.selectedServices.length})
              </Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleCreate}
              >
                Add New Service
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={serviceList}
        loading={serviceLoading}
        rowKey="id"
        rowSelection={{
          selectedRowKeys: selection.selectedRowKeys,
          onChange: handleSelectionChange,
        }}
        pagination={{
          current: pagination.pageNumber,
          pageSize: pagination.pageSize,
          total: serviceTotal,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          onChange: handlePaginationChange,
        }}
      />
    </div>
  );
};

export default ServiceListPage;
