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
} from "antd";
import { UserOutlined, PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchPosts } from "@/store/actions/posts";
import CustomTable from "@/components/Admin/UI/CustomTable";
import { useSession } from "next-auth/react";
import debounce from "lodash.debounce";

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
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [deleteFlg, setDeleteFlg] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("createdTime");
  const [sortDesc, setSortDesc] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const { data: session } = useSession();

  // Get posts state from Redux
  const {
    list: posts,
    loading,
    error,
    total = 0,
  } = useSelector((state: RootState) => state.post);

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setPage(1);
      setSearch(value);
    }, 300),
    []
  );

  // Fetch posts on filter/sort/page change
  useEffect(() => {
    dispatch(
      fetchPosts({
        search: search || undefined,
        status: status !== "all" ? status : undefined,
        deleteFlg: deleteFlg !== "all" ? deleteFlg : undefined,
        sortBy,
        sortDesc,
        page,
        itemsPerPage,
      })
    );
  }, [
    search,
    status,
    deleteFlg,
    sortBy,
    sortDesc,
    page,
    itemsPerPage,
    dispatch,
  ]);

  const handleEdit = (post: any) => {
    router.push(`/admin/post/edit/${post.id}`);
  };

  const handleDelete = (post: any) => {
    // TODO: Implement delete logic
    message.info("Delete post feature not implemented");
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
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold mb-5">Posts</h1>

      <div className="flex flex-wrap gap-2 mb-6 items-center justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          <Input.Search
            placeholder="Search posts"
            allowClear
            onChange={(e) => debouncedSearch(e.target.value)}
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
      <CustomTable
        columns={columns}
        data={posts}
        loading={loading}
        onRefresh={() => {
          dispatch(
            fetchPosts({
              search: search || undefined,
              status: status !== "all" ? status : undefined,
              deleteFlg: deleteFlg !== "all" ? deleteFlg : undefined,
              sortBy,
              sortDesc,
              page,
              itemsPerPage,
            })
          );
        }}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        searchable={false}
        exportable
        pagination={{
          current: page,
          pageSize: itemsPerPage,
          total: total,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: [5, 10, 20, 50],
          onChange: (p: number, size?: number) => {
            setPage(p);
            setItemsPerPage(size || 10);
          },
          showTotal: (total: number, range: [number, number]) =>
            `Showing ${range[0]}-${range[1]} of ${total} items`,
        }}
      />
      {error && <div className="text-red-500 mt-4">Failed to load posts.</div>}
    </div>
  );
};

export default PostListPage;
