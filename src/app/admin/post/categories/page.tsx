"use client";

import React, { useEffect, useCallback, useState } from "react";
import { Button, Tag, Input, Select, Modal, Form, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { fetchWithToken, postWithToken } from "@/app/api/index";
import CustomTable from "@/components/Admin/UI/CustomTable";
import debounce from "lodash.debounce";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {
  fetchCategories,
  createPostCategory,
} from "@/store/actions/categories";
import CategoryForm from "@/components/Admin/Post/CategoryForm";
import { CustomModal } from "@/components/Admin/UI/CustomModal";
import { Tree, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { DataNode } from "antd/es/tree";
import { Typography, Tooltip } from "antd";

const { Option } = Select;

const sortFields = [
  { value: "name", label: "Name" },
  { value: "createdAt", label: "Created At" },
];

const CategoryPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortDesc, setSortDesc] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [showModal, setShowModal] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  // Redux state
  const {
    list: categories,
    loading,
    error,
    total = 0,
  } = useSelector((state: RootState) => state.categories);

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setPage(1);
      setSearch(value);
    }, 300),
    []
  );

  useEffect(() => {
    dispatch(
      fetchCategories({
        search: search || undefined,
        sortBy,
        sortDesc,
        page,
        itemsPerPage,
      })
    );
  }, [search, sortBy, sortDesc, page, itemsPerPage, dispatch]);

  const handleCreate = async (values: any) => {
    try {
      setCreateLoading(true);
      await dispatch(
        createPostCategory({
          name: values.name,
          slug: values.slug,
          description: values.description,
          parentId: values.parentId || 0,
        }) as any
      );
      message.success("Category created");
      setShowModal(false);
      dispatch(
        fetchCategories({
          search: search || undefined,
          sortBy,
          sortDesc,
          page,
          itemsPerPage,
        })
      );
    } catch (err: any) {
      message.error(err.message || "Failed to create category");
    } finally {
      setCreateLoading(false);
    }
  };

  // Convert flat categories to treeData for Antd Tree
  function buildTree(flat: any[], parentId: number | null = null): DataNode[] {
    return flat
      .filter((cat) => (cat.parentId ?? null) === parentId)
      .map((cat) => ({
        title: (
          <div className="flex items-center group py-2 px-2 rounded hover:bg-gray-50 transition-all">
            <div className="flex-1 min-w-0">
              <Typography.Text strong ellipsis>
                {cat.name}
              </Typography.Text>
              {cat.description && (
                <div className="text-xs text-gray-400 truncate mt-0.5">
                  {cat.description}
                </div>
              )}
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
              <Tooltip title="Edit">
                <EditOutlined
                  style={{ color: "#1677ff", cursor: "pointer", fontSize: 16 }}
                />
              </Tooltip>
              <Tooltip title="Delete">
                <DeleteOutlined
                  style={{ color: "#ff4d4f", cursor: "pointer", fontSize: 16 }}
                />
              </Tooltip>
            </div>
          </div>
        ),
        key: cat.id,
        children: buildTree(flat, cat.id),
      }));
  }
  const treeData = buildTree(categories);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-5">Categories</h1>
      <div className="flex flex-wrap gap-2 mb-6 items-center justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          <Input.Search
            placeholder="Search categories"
            allowClear
            onChange={(e) => debouncedSearch(e.target.value)}
            style={{ width: 200 }}
          />
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
          onClick={() => setShowModal(true)}
        >
          Add Category
        </Button>
      </div>
      {/* Tree view for categories */}
      <div className="bg-white rounded-lg shadow p-6 mb-6 border border-gray-100">
        <Tree
          treeData={treeData}
          defaultExpandAll
          className="category-tree"
          showLine={{ showLeafIcon: false }}
        />
      </div>
      <CustomModal
        title="Add Category"
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
      >
        <CategoryForm
          onSubmit={handleCreate}
          loading={createLoading}
          mode="create"
          categories={categories}
        />
      </CustomModal>
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
};

export default CategoryPage;
