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
} from "antd";
import {
  PlusOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost } from "@/store/actions/posts";
import { useSession } from "next-auth/react";
import { AppDispatch, RootState } from "@/store/store";

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
  const [deleteFlg, setDeleteFlg] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("createdTime");
  const [sortDesc, setSortDesc] = useState<boolean>(true);
  const [keyword, setKeyword] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  function handleQuery(keyword: string, page = 1, itemsPerPage = 10) {
    const queryParams = {
      search: keyword,
      status: 1,
      page,
      itemsPerPage,
    };

    dispatch(fetchPosts(queryParams, session?.accessToken || "") as any);
    setPageNumber(page);
    setPageSize(itemsPerPage);
  }

  useEffect(() => {
    if (session?.accessToken) {
      handleQuery(keyword);
    }
  }, [session?.accessToken]);

  const handleEdit = (post: any) => {
    router.push(`/admin/post/edit/${post.id}`);
  };

  const onSuccess = () => {
    message.success("User deleted successfully");
    handleQuery(keyword, pageNumber, pageSize);
  };

  const onFailure = (error: any) => {
    message.error(error);
    message.error(error || "Failed to delete user");
  };

  const handleDelete = (post: any) => {
    Modal.confirm({
      title: "Confirm",
      content: `Are you sure you want to delete the post "${post.title}"? This action cannot be undone.`,
      okText: "Delete",
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
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title: string) => <span className="font-medium">{title}</span>,
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
      render: (_: any, record: any) => (
        <Dropdown
          menu={{
            items: [
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
                label: "Delete",
                icon: <DeleteOutlined />,
                onClick: () => handleDelete(record),
              },
            ],
          }}
          trigger={["click"]}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold mb-5">Posts</h1>

      <div className="flex flex-wrap gap-2 mb-6 items-center justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          <Input.Search
            placeholder="Search users"
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
          <Select value={status} onChange={setStatus} style={{ width: 120 }}>
            <Option value="all">All Status</Option>
            <Option value={0}>Draft</Option>
            <Option value={1}>Published</Option>
            <Option value={2}>Archived</Option>
          </Select>
          <Select
            value={deleteFlg}
            onChange={setDeleteFlg}
            style={{ width: 120 }}
          >
            <Option value="all">All</Option>
            <Option value={0}>Active</Option>
            <Option value={1}>Deleted</Option>
          </Select>
          <Select value={sortBy} onChange={setSortBy} style={{ width: 150 }}>
            {sortFields.map((f) => (
              <Option key={f.value} value={f.value}>
                {f.label}
              </Option>
            ))}
          </Select>
          <Select
            value={sortDesc}
            onChange={(v) => setSortDesc(v)}
            style={{ width: 120 }}
          >
            <Option value={false}>Ascending</Option>
            <Option value={true}>Descending</Option>
          </Select>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => router.push("/admin/post/create")}
        >
          Add New Post
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={postList}
        loading={postLoading}
        rowKey="id"
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
