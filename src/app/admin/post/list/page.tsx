"use client";

import React, { useEffect, useCallback, useState } from "react";
import {
  Button,
  Tag,
  Avatar,
  Space,
  message,
  Select,
  Input,
  Pagination,
  Table,
  Dropdown,
  Modal,
} from "antd";
import {
  UserOutlined,
  PlusOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch, connect } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchPosts, deletePost } from "@/store/actions/posts";

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

const PostListPage: React.FC = (props: any) => {
  const { fetchPosts, deletePost, postList, postTotal, postLoading } = props;

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [deleteFlg, setDeleteFlg] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("createdTime");
  const [sortDesc, setSortDesc] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [keyword, setKeyword] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  function handleQuery(keyword: string, page = 1, itemsPerPage = 10) {
    const queryParams = {
      search: keyword,
      status: 0,
      page,
      itemsPerPage,
    };

    fetchPosts(queryParams);
    setPageNumber(page);
    setPageSize(itemsPerPage);
  }

  useEffect(() => {
    handleQuery(keyword);
  }, []);

  const handleEdit = (post: any) => {
    router.push(`/admin/post/edit/${post.id}`);
  };

  const handleDelete = async (post: any) => {
    Modal.confirm({
      title: "Delete Post",
      content: `Are you sure you want to delete "${post.title}"? This action cannot be undone.`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await deletePost(post.id);
          message.success("Post deleted successfully");
          // Refresh the list
          handleQuery(keyword, pageNumber, pageSize);
        } catch (error: any) {
          message.error(error.message || "Failed to delete post");
        }
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
          {/* <Input.Search placeholder="Search posts" allowClear onChange={(e) => debouncedSearch(e.target.value)} style={{ width: 200 }} /> */}
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

const mapStateToProps = (state: any) => ({
  postList: state.posts.list,
  postTotal: state.posts.total,
  postLoading: state.posts.loading,
});

const mapDispatchToProps = {
  fetchPosts: fetchPosts,
  deletePost: deletePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostListPage);
