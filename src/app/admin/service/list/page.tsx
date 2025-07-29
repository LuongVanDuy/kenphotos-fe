"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Tag,
  message,
  Select,
  Table,
  Dropdown,
  Modal,
  Input,
  Checkbox,
  Space,
  Tooltip,
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

const statusMap: Record<number, { label: string; color: string }> = {
  0: { label: "Draft", color: "orange" },
  1: { label: "Published", color: "green" },
  2: { label: "Archived", color: "default" },
};

const typeMap: Record<number, { label: string; color: string }> = {
  0: { label: "Basic", color: "blue" },
  1: { label: "Premium", color: "purple" },
  2: { label: "Enterprise", color: "gold" },
};

const sortFields = [
  { value: "createdTime", label: "Created Time" },
  { value: "title", label: "Title" },
  { value: "price", label: "Price" },
  { value: "rating", label: "Rating" },
];

const ServiceListPage: React.FC = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // Get state from Redux store
  const serviceList = useSelector(
    (state: RootState) => state.services?.list || []
  );
  const serviceTotal = useSelector(
    (state: RootState) => state.services?.total || 0
  );
  const serviceLoading = useSelector(
    (state: RootState) => state.services?.loading || false
  );

  const [status, setStatus] = useState<string>("all");
  const [type, setType] = useState<string>("all");
  const [deleteFlg, setDeleteFlg] = useState<number>(0); // 0: Active, 1: Deleted
  const [sortBy, setSortBy] = useState<string>("createdTime");
  const [sortDesc, setSortDesc] = useState<boolean>(true);
  const [keyword, setKeyword] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedServices, setSelectedServices] = useState<any[]>([]);

  function handleQuery(keyword: string, page = 1, itemsPerPage = 10) {
    const queryParams = {
      search: keyword,
      status: status === "all" ? undefined : parseInt(status),
      type: type === "all" ? undefined : parseInt(type),
      deleteFlg,
      page,
      itemsPerPage,
      sortBy,
      sortDesc,
    };

    dispatch(fetchServices(queryParams, session?.accessToken || "") as any);
    setPageNumber(page);
    setPageSize(itemsPerPage);
  }

  useEffect(() => {
    if (session?.accessToken) {
      handleQuery(keyword);
    }
  }, [session?.accessToken, deleteFlg]);

  const handleEdit = (service: any) => {
    router.push(`/admin/service/edit/${service.id}`);
  };

  const onSuccess = () => {
    message.success("Operation completed successfully");
    setSelectedRowKeys([]);
    setSelectedServices([]);
    handleQuery(keyword, pageNumber, pageSize);
  };

  const onFailure = (error: any) => {
    message.error(error || "Failed to delete service");
  };

  const handleDelete = (service: any) => {
    Modal.confirm({
      title: "Confirm",
      content: `Are you sure you want to move "${service.title}" to trash?`,
      okText: "Move to Trash",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        dispatch(
          deleteService(
            { ids: [service.id] },
            session?.accessToken || "",
            onSuccess,
            onFailure
          ) as any
        );
      },
    });
  };

  const handleRestore = (service: any) => {
    Modal.confirm({
      title: "Confirm Restore",
      content: `Are you sure you want to restore "${service.title}"?`,
      okText: "Restore",
      okType: "primary",
      cancelText: "Cancel",
      onOk() {
        dispatch(
          restoreService(
            { ids: [service.id] },
            session?.accessToken || "",
            onSuccess,
            onFailure
          ) as any
        );
      },
    });
  };

  const handlePermanentDelete = (service: any) => {
    Modal.confirm({
      title: "Permanent Delete",
      content: `Are you sure you want to permanently delete "${service.title}"? This action cannot be undone.`,
      okText: "Delete Permanently",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        dispatch(
          permanentDeleteService(
            { ids: [service.id] },
            session?.accessToken || "",
            onSuccess,
            onFailure
          ) as any
        );
      },
    });
  };

  const handleBulkDelete = () => {
    if (selectedServices.length === 0) {
      message.warning("Please select services to delete");
      return;
    }

    Modal.confirm({
      title: "Bulk Delete",
      content: `Are you sure you want to move ${selectedServices.length} service(s) to trash?`,
      okText: "Move to Trash",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        const ids = selectedServices.map((service) => service.id);
        dispatch(
          deleteService(
            { ids },
            session?.accessToken || "",
            onSuccess,
            onFailure
          ) as any
        );
      },
    });
  };

  const handleBulkRestore = () => {
    if (selectedServices.length === 0) {
      message.warning("Please select services to restore");
      return;
    }

    Modal.confirm({
      title: "Bulk Restore",
      content: `Are you sure you want to restore ${selectedServices.length} service(s)?`,
      okText: "Restore",
      okType: "primary",
      cancelText: "Cancel",
      onOk() {
        const ids = selectedServices.map((service) => service.id);
        dispatch(
          restoreService(
            { ids },
            session?.accessToken || "",
            onSuccess,
            onFailure
          ) as any
        );
      },
    });
  };

  const handleBulkPermanentDelete = () => {
    if (selectedServices.length === 0) {
      message.warning("Please select services to delete permanently");
      return;
    }

    Modal.confirm({
      title: "Bulk Permanent Delete",
      content: `Are you sure you want to permanently delete ${selectedServices.length} service(s)? This action cannot be undone.`,
      okText: "Delete Permanently",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        const ids = selectedServices.map((service) => service.id);
        dispatch(
          permanentDeleteService(
            { ids },
            session?.accessToken || "",
            onSuccess,
            onFailure
          ) as any
        );
      },
    });
  };

  const handleView = (service: any) => {
    router.push(`/admin/service/${service.id}`);
  };

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
        <Tag color={typeMap[type]?.color || "default"}>
          {typeMap[type]?.label || type}
        </Tag>
      ),
    },
    {
      title: "Price",
      key: "price",
      render: (record: any) => (
        <div>
          {record.discountedPrice > 0 ? (
            <div>
              <span className="text-red-600 font-medium">
                ${record?.discountedPrice}
              </span>
              <span className="text-gray-400 line-through ml-2">
                ${record?.originalPrice}
              </span>
            </div>
          ) : (
            <span className="font-medium">${record?.originalPrice}</span>
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
      render: (count: number) => <span>{count}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: number) => (
        <Tag color={statusMap[status]?.color || "default"}>
          {statusMap[status]?.label || status}
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
      render: (_: any, record: any) => {
        const isDeleted = record.deleteFlg === 1;

        const menuItems = isDeleted
          ? [
              {
                key: "restore",
                label: "Restore",
                icon: <RestOutlined />,
                onClick: () => handleRestore(record),
              },
              {
                key: "permanent-delete",
                label: "Delete Permanently",
                icon: <DeleteFilled />,
                onClick: () => handlePermanentDelete(record),
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
                onClick: () => handleDelete(record),
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

  return (
    <div>
      <h1 className="text-4xl font-bold mb-5">
        {deleteFlg === 1 ? "Trash" : "Services"}
      </h1>

      <div className="flex flex-wrap gap-2 mb-6 items-center justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          <Input.Search
            placeholder="Search services"
            allowClear
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onSearch={(value) => {
              setKeyword(value);
              setPageNumber(1);
              handleQuery(value, 1, pageSize);
            }}
            style={{ width: 200 }}
          />
          <Select
            value={status}
            onChange={setStatus}
            className="w-[120px] !h-[40px]"
          >
            <Option value="all">All Status</Option>
            <Option value={0}>Draft</Option>
            <Option value={1}>Published</Option>
            <Option value={2}>Archived</Option>
          </Select>
          <Select
            value={type}
            onChange={setType}
            className="w-[120px] !h-[40px]"
          >
            <Option value="all">All Types</Option>
            <Option value={0}>Basic</Option>
            <Option value={1}>Premium</Option>
            <Option value={2}>Enterprise</Option>
          </Select>
          <Select
            value={sortBy}
            onChange={setSortBy}
            className="w-[150px] !h-[40px]"
          >
            {sortFields.map((f) => (
              <Option key={f.value} value={f.value}>
                {f.label}
              </Option>
            ))}
          </Select>
          <Select
            value={sortDesc}
            onChange={(v) => setSortDesc(v)}
            className="w-[120px] !h-[40px]"
          >
            <Option value={false}>Ascending</Option>
            <Option value={true}>Descending</Option>
          </Select>
        </div>
        <div className="flex gap-2">
          {deleteFlg === 1 ? (
            <>
              <Button
                type="default"
                icon={<RestOutlined />}
                onClick={handleBulkRestore}
                disabled={selectedServices.length === 0}
              >
                Restore Selected ({selectedServices.length})
              </Button>
              <Button
                type="primary"
                danger
                icon={<DeleteFilled />}
                onClick={handleBulkPermanentDelete}
                disabled={selectedServices.length === 0}
              >
                Delete Permanently ({selectedServices.length})
              </Button>
            </>
          ) : (
            <>
              <Button
                type="default"
                danger
                icon={<DeleteOutlined />}
                onClick={handleBulkDelete}
                disabled={selectedServices.length === 0}
              >
                Move to Trash ({selectedServices.length})
              </Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => router.push("/admin/service/create")}
              >
                Add New Service
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Trash/Active Toggle */}
      <div className="mb-4">
        <Space>
          <Button
            type={deleteFlg === 0 ? "primary" : "default"}
            onClick={() => {
              setDeleteFlg(0);
              setSelectedRowKeys([]);
              setSelectedServices([]);
              handleQuery(keyword, 1, pageSize);
            }}
          >
            Active Services
          </Button>
          <Button
            type={deleteFlg === 1 ? "primary" : "default"}
            onClick={() => {
              setDeleteFlg(1);
              setSelectedRowKeys([]);
              setSelectedServices([]);
              handleQuery(keyword, 1, pageSize);
            }}
          >
            Trash
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={serviceList}
        loading={serviceLoading}
        rowKey="id"
        rowSelection={{
          selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
            setSelectedServices(selectedRows);
          },
        }}
        pagination={{
          current: pageNumber,
          pageSize,
          total: serviceTotal,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          onChange: (page, pageSize) => {
            handleQuery(keyword, page, pageSize);
          },
        }}
      />
    </div>
  );
};

export default ServiceListPage;
