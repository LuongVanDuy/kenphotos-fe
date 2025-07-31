"use client";

import React, { useEffect, useState } from "react";
import { Button, Tag, message, Select, Table, Dropdown, Modal, Input } from "antd";
import { PlusOutlined, MoreOutlined, EditOutlined, DeleteOutlined, EyeOutlined, RestOutlined, DeleteFilled } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { AppDispatch, RootState } from "@/store/store";
import { deleteOrder, fetchOrders, permanentDeleteOrder, restoreOrder } from "@/store/actions/orders";

const { Option } = Select;

const statusMap: Record<number, { label: string; color: string }> = {
  0: { label: "Pending", color: "orange" },
  1: { label: "Processing", color: "blue" },
  2: { label: "Completed", color: "green" },
  3: { label: "Cancelled", color: "red" },
};

const OrderListPage: React.FC = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const orderList = useSelector((state: RootState) => state.orders?.list);
  const orderTotal = useSelector((state: RootState) => state.orders?.total);
  const orderLoading = useSelector((state: RootState) => state.orders?.loading);

  const [status, setStatus] = useState<string>("all");
  const [deleteFlg, setDeleteFlg] = useState<number>(0);
  const [sortDesc, setSortDesc] = useState<boolean>(true);
  const [keyword, setKeyword] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedOrders, setSelectedOrders] = useState<any[]>([]);

  function handleQuery(keyword: string, page = 1, itemsPerPage = 10) {
    const queryParams = {
      search: keyword,
      status: status === "all" ? undefined : parseInt(status),
      deleteFlg,
      page,
      itemsPerPage,
      sortDesc,
    };

    dispatch(fetchOrders(queryParams, session?.accessToken || "") as any);
    setPageNumber(page);
    setPageSize(itemsPerPage);
  }

  useEffect(() => {
    if (session?.accessToken) {
      handleQuery(keyword, pageNumber, pageSize);
    }
  }, [session?.accessToken, deleteFlg, status, pageNumber, pageSize, sortDesc]);

  const handleEdit = (order: any) => {
    router.push(`/admin/order/edit/${order.id}`);
  };

  const onSuccess = () => {
    message.success("Operation completed successfully");
    setSelectedRowKeys([]);
    setSelectedOrders([]);
    handleQuery(keyword, pageNumber, pageSize);
  };

  const onFailure = (error: any) => {
    message.error(error || "Failed to delete order");
  };

  const handleDelete = (order: any) => {
    Modal.confirm({
      title: "Confirm",
      content: `Are you sure you want to move "${order.title}" to trash?`,
      okText: "Move to Trash",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        dispatch(deleteOrder({ ids: [order.id] }, session?.accessToken || "", onSuccess, onFailure) as any);
      },
    });
  };

  const handleRestore = (order: any) => {
    Modal.confirm({
      title: "Confirm Restore",
      content: `Are you sure you want to restore "${order.title}"?`,
      okText: "Restore",
      okType: "primary",
      cancelText: "Cancel",
      onOk() {
        dispatch(restoreOrder({ ids: [order.id] }, session?.accessToken || "", onSuccess, onFailure) as any);
      },
    });
  };

  const handlePermanentDelete = (order: any) => {
    Modal.confirm({
      title: "Permanent Delete",
      content: `Are you sure you want to permanently delete "${order.title}"? This action cannot be undone.`,
      okText: "Delete Permanently",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        dispatch(permanentDeleteOrder({ ids: [order.id] }, session?.accessToken || "", onSuccess, onFailure) as any);
      },
    });
  };

  const handleBulkDelete = () => {
    if (selectedOrders.length === 0) {
      message.warning("Please select orders to delete");
      return;
    }

    Modal.confirm({
      title: "Bulk Delete",
      content: `Are you sure you want to move ${selectedOrders.length} order(s) to trash?`,
      okText: "Move to Trash",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        const ids = selectedOrders.map((order) => order.id);
        dispatch(deleteOrder({ ids }, session?.accessToken || "", onSuccess, onFailure) as any);
      },
    });
  };

  const handleBulkRestore = () => {
    if (selectedOrders.length === 0) {
      message.warning("Please select orders to restore");
      return;
    }

    Modal.confirm({
      title: "Bulk Restore",
      content: `Are you sure you want to restore ${selectedOrders.length} order(s)?`,
      okText: "Restore",
      okType: "primary",
      cancelText: "Cancel",
      onOk() {
        const ids = selectedOrders.map((order) => order.id);
        dispatch(restoreOrder({ ids }, session?.accessToken || "", onSuccess, onFailure) as any);
      },
    });
  };

  const handleBulkPermanentDelete = () => {
    if (selectedOrders.length === 0) {
      message.warning("Please select orders to delete permanently");
      return;
    }

    Modal.confirm({
      title: "Bulk Permanent Delete",
      content: `Are you sure you want to permanently delete ${selectedOrders.length} order(s)? This action cannot be undone.`,
      okText: "Delete Permanently",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        const ids = selectedOrders.map((order) => order.id);
        dispatch(permanentDeleteOrder({ ids }, session?.accessToken || "", onSuccess, onFailure) as any);
      },
    });
  };

  const handleView = (order: any) => {
    router.push(`/admin/order/${order.id}`);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Customer",
      key: "name",
      render: (record: any) => (
        <div>
          <div className="font-medium">{record.name}</div>
          <div className="text-sm text-gray-500">{record.email}</div>
        </div>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Services",
      key: "items",
      render: (record: any) => (
        <div>
          {record.items?.map((item: any) => (
            <div key={item.id}>
              • {item.service?.title} × {item.quantity}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: number) => <Tag color={statusMap[status]?.color || "default"}>{statusMap[status]?.label || status}</Tag>,
    },
    {
      title: "Created",
      dataIndex: "createdTime",
      key: "createdTime",
      render: (date: string) => (
        <div>
          <div className="text-sm">{new Date(date).toLocaleDateString()}</div>
          <div className="text-xs text-gray-500">{new Date(date).toLocaleTimeString()}</div>
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
      <h1 className="text-4xl font-bold mb-5">{deleteFlg === 1 ? "Trash" : "Orders"}</h1>

      <div className="flex flex-wrap gap-2 mb-6 items-center justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          <Input.Search
            placeholder="Search orders"
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
          <Select value={status} onChange={setStatus} className="w-[120px] !h-[40px]">
            <Option value="all">All Status</Option>
            <Option value={0}>Pending</Option>
            <Option value={1}>Processing</Option>
            <Option value={2}>Completed</Option>
            <Option value={3}>Cancelled</Option>
          </Select>

          <Select
            value={deleteFlg}
            onChange={(value) => {
              setDeleteFlg(value);
              setSelectedRowKeys([]);
              setSelectedOrders([]);
              handleQuery(keyword, 1, pageSize);
            }}
            className="w-[120px] !h-[40px]"
          >
            <Option value={0}>Active</Option>
            <Option value={1}>Trash</Option>
          </Select>
          <Select value={sortDesc} onChange={(v) => setSortDesc(v)} className="w-[120px] !h-[40px]">
            <Option value={false}>Ascending</Option>
            <Option value={true}>Descending</Option>
          </Select>
        </div>
        <div className="flex gap-2">
          {deleteFlg === 1 ? (
            <>
              <Button type="default" icon={<RestOutlined />} onClick={handleBulkRestore} disabled={selectedOrders.length === 0}>
                Restore Selected ({selectedOrders.length})
              </Button>
              <Button type="primary" danger icon={<DeleteFilled />} onClick={handleBulkPermanentDelete} disabled={selectedOrders.length === 0}>
                Delete Permanently ({selectedOrders.length})
              </Button>
            </>
          ) : (
            <>
              <Button type="default" danger icon={<DeleteOutlined />} onClick={handleBulkDelete} disabled={selectedOrders.length === 0}>
                Move to Trash ({selectedOrders.length})
              </Button>
              <Button type="primary" icon={<PlusOutlined />} onClick={() => router.push("/admin/order/create")}>
                Add New Order
              </Button>
            </>
          )}
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={orderList}
        loading={orderLoading}
        rowKey="id"
        rowSelection={{
          selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
            setSelectedOrders(selectedRows);
          },
        }}
        pagination={{
          current: pageNumber,
          pageSize,
          total: orderTotal,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          onChange: (page, pageSize) => {
            handleQuery(keyword, page, pageSize);
          },
        }}
      />
    </div>
  );
};

export default OrderListPage;
