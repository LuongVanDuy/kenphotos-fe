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
  Space,
  Avatar,
} from "antd";
import {
  PlusOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  RestOutlined,
  DeleteFilled,
  PictureOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  deletePost,
  restorePost,
  permanentDeletePost,
} from "@/store/actions/posts";
import { useSession } from "next-auth/react";
import { AppDispatch, RootState } from "@/store/store";
import { getImageUrl } from "@/utils";

const { Option } = Select;

const statusMap: Record<number, { label: string; color: string }> = {
  0: { label: "Draft", color: "orange" },
  1: { label: "Published", color: "green" },
  2: { label: "Archived", color: "default" },
};
const deleteFlgMap: Record<number, { label: string; color: string }> = {
  0: { label: "Active", color: "blue" },
  1: { label: "Deleted", color: "red" },
};
const sortFields = [
  { value: "createdTime", label: "Created Time" },
  { value: "title", label: "Title" },
];

const PostListPage: React.FC = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // Get state from Redux store
  const postList = useSelector((state: RootState) => state.posts.list);
  const postTotal = useSelector((state: RootState) => state.posts.total);
  const postLoading = useSelector((state: RootState) => state.posts.loading);
  const [status, setStatus] = useState<string>("all");
  const [deleteFlg, setDeleteFlg] = useState<number>(0); // 0: Active, 1: Deleted
  const [sortBy, setSortBy] = useState<string>("createdTime");
  const [sortDesc, setSortDesc] = useState<boolean>(true);
  const [keyword, setKeyword] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedPosts, setSelectedPosts] = useState<any[]>([]);

  function handleQuery(keyword: string, page = 1, itemsPerPage = 10) {
    const queryParams = {
      search: keyword,
      status: status === "all" ? undefined : parseInt(status),
      deleteFlg,
      page,
      itemsPerPage,
      sortBy,
      sortDesc,
    };

    dispatch(fetchPosts(queryParams, session?.accessToken || "") as any);
    setPageNumber(page);
    setPageSize(itemsPerPage);
  }

  useEffect(() => {
    if (session?.accessToken) {
      handleQuery(keyword);
    }
  }, [session?.accessToken, deleteFlg]);

  const handleEdit = (post: any) => {
    router.push(`/admin/post/edit/${post.id}`);
  };

  const onSuccess = () => {
    message.success("Operation completed successfully");
    setSelectedRowKeys([]);
    setSelectedPosts([]);
    handleQuery(keyword, pageNumber, pageSize);
  };

  const onFailure = (error: any) => {
    message.error(error);
    message.error(error || "Failed to delete user");
  };

  const handleDelete = (post: any) => {
    Modal.confirm({
      title: "Confirm",
      content: `Are you sure you want to move "${post.title}" to trash?`,
      okText: "Move to Trash",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        dispatch(
          deletePost(
            { ids: [post.id] },
            session?.accessToken || "",
            onSuccess,
            onFailure
          ) as any
        );
      },
    });
  };

  const handleRestore = (post: any) => {
    Modal.confirm({
      title: "Confirm Restore",
      content: `Are you sure you want to restore "${post.title}"?`,
      okText: "Restore",
      okType: "primary",
      cancelText: "Cancel",
      onOk() {
        dispatch(
          restorePost(
            { ids: [post.id] },
            session?.accessToken || "",
            onSuccess,
            onFailure
          ) as any
        );
      },
    });
  };

  const handlePermanentDelete = (post: any) => {
    Modal.confirm({
      title: "Permanent Delete",
      content: `Are you sure you want to permanently delete "${post.title}"? This action cannot be undone.`,
      okText: "Delete Permanently",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        dispatch(
          permanentDeletePost(
            { ids: [post.id] },
            session?.accessToken || "",
            onSuccess,
            onFailure
          ) as any
        );
      },
    });
  };

  const handleBulkDelete = () => {
    if (selectedPosts.length === 0) {
      message.warning("Please select posts to delete");
      return;
    }

    Modal.confirm({
      title: "Bulk Delete",
      content: `Are you sure you want to move ${selectedPosts.length} post(s) to trash?`,
      okText: "Move to Trash",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        const ids = selectedPosts.map((post) => post.id);
        dispatch(
          deletePost(
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
    if (selectedPosts.length === 0) {
      message.warning("Please select posts to restore");
      return;
    }

    Modal.confirm({
      title: "Bulk Restore",
      content: `Are you sure you want to restore ${selectedPosts.length} post(s)?`,
      okText: "Restore",
      okType: "primary",
      cancelText: "Cancel",
      onOk() {
        const ids = selectedPosts.map((post) => post.id);
        dispatch(
          restorePost(
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
    if (selectedPosts.length === 0) {
      message.warning("Please select posts to delete permanently");
      return;
    }

    Modal.confirm({
      title: "Bulk Permanent Delete",
      content: `Are you sure you want to permanently delete ${selectedPosts.length} post(s)? This action cannot be undone.`,
      okText: "Delete Permanently",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        const ids = selectedPosts.map((post) => post.id);
        dispatch(
          permanentDeletePost(
            { ids },
            session?.accessToken || "",
            onSuccess,
            onFailure
          ) as any
        );
      },
    });
  };

  const handleView = (post: any) => {
    router.push(`/admin/post/${post.id}`);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Post",
      key: "post",
      render: (_: any, record: any) => (
        <Space>
          {record.thumbnail ? (
            <Avatar
              size={40}
              src={getImageUrl(record.thumbnail)}
              style={{ width: 60, height: 40, objectFit: "cover" }}
            />
          ) : (
            <Avatar size={40} icon={<PictureOutlined />} />
          )}
          <div>
            <div className="font-medium">{record.title}</div>
            <div className="text-sm text-gray-500">{record.slug}</div>
          </div>
        </Space>
      ),
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
      title: "Deleted",
      dataIndex: "deleteFlg",
      key: "deleteFlg",
      render: (deleteFlg: number) => (
        <Tag color={deleteFlgMap[deleteFlg]?.color || "default"}>
          {deleteFlgMap[deleteFlg]?.label || deleteFlg}
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
        {deleteFlg === 1 ? "Trash" : "Posts"}
      </h1>

      <div className="flex flex-wrap gap-2 mb-6 items-center justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          <Input.Search
            placeholder="Search posts"
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
                disabled={selectedPosts.length === 0}
              >
                Restore Selected ({selectedPosts.length})
              </Button>
              <Button
                type="primary"
                danger
                icon={<DeleteFilled />}
                onClick={handleBulkPermanentDelete}
                disabled={selectedPosts.length === 0}
              >
                Delete Permanently ({selectedPosts.length})
              </Button>
            </>
          ) : (
            <>
              <Button
                type="default"
                danger
                icon={<DeleteOutlined />}
                onClick={handleBulkDelete}
                disabled={selectedPosts.length === 0}
              >
                Move to Trash ({selectedPosts.length})
              </Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => router.push("/admin/post/create")}
              >
                Add New Post
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
              setSelectedPosts([]);
              handleQuery(keyword, 1, pageSize);
            }}
          >
            Active Posts
          </Button>
          <Button
            type={deleteFlg === 1 ? "primary" : "default"}
            onClick={() => {
              setDeleteFlg(1);
              setSelectedRowKeys([]);
              setSelectedPosts([]);
              handleQuery(keyword, 1, pageSize);
            }}
          >
            Trash
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={postList}
        loading={postLoading}
        rowKey="id"
        rowSelection={{
          selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
            setSelectedPosts(selectedRows);
          },
        }}
        pagination={{
          current: pageNumber,
          pageSize,
          total: postTotal,
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

export default PostListPage;
