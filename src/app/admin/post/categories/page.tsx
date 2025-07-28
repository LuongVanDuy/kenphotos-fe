"use client";

import React, { useEffect, useCallback, useState } from "react";
import { Button, Tag, Input, Select, Modal, Form, message, TreeSelect, Card, Row, Col, Statistic, Divider, Empty, Spin, Badge, Table } from "antd";
import {
  PlusOutlined,
  FolderOutlined,
  SearchOutlined,
  FilterOutlined,
  ReloadOutlined,
  BranchesOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { fetchWithToken, postWithToken } from "@/app/api/index";
import { useSelector, useDispatch, connect } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchCategories, updateCategory, deleteCategory, fetchCategoryDetail } from "@/store/actions/categories";
import { Tree, Space } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import type { DataNode } from "antd/es/tree";
import { Typography, Tooltip } from "antd";
import CategoryForm from "@/components/Admin/Post/CategoryForm";

const { Option } = Select;
const { Title, Text, Paragraph } = Typography;

const sortFields = [
  { value: "name", label: "Name" },
  { value: "createdAt", label: "Created At" },
];

const CategoryPage: React.FC = (props: any) => {
  const { fetchCategories, categoryList, categoryLoading } = props;

  const [sortBy, setSortBy] = useState<string>("name");
  const [sortDesc, setSortDesc] = useState<boolean>(false);
  const [keyword, setKeyword] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  function handleQuery(keyword: string, page = 1, itemsPerPage = 10) {
    const queryParams = {
      search: keyword,
      status: 1,
      page,
      itemsPerPage,
    };

    fetchCategories(queryParams);
    setPageNumber(page);
    setPageSize(itemsPerPage);
  }

  useEffect(() => {
    handleQuery(keyword);
  }, []);

  function buildTree(flat: any[], parentId: number | null = null): DataNode[] {
    return flat
      .filter((cat) => (cat.parentId ?? null) === parentId)
      .map((cat) => ({
        title: (
          <div className="flex items-center justify-between group py-3 px-3 rounded-lg hover:bg-blue-50 transition-all duration-200 border border-transparent hover:border-blue-200">
            <div className="flex items-center flex-1 min-w-0">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg mr-3">
                <FolderOutlined style={{ color: "#1677ff", fontSize: 16 }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Typography.Text strong className="text-gray-800" ellipsis>
                    {cat.name}
                  </Typography.Text>
                  {cat.parentId && <Badge count="Sub" size="small" style={{ backgroundColor: "#52c41a" }} />}
                </div>
                {cat.description && <div className="text-xs text-gray-500 truncate mt-1 max-w-xs">{cat.description}</div>}
                <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
                  {cat.parentId && (
                    <span className="flex items-center gap-1">
                      <BranchesOutlined />
                      Parent: {categoryList.find((p: any) => p.id === cat.parentId)?.name || "Unknown"}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
              <Tooltip title="View Details">
                <Button type="text" size="small" icon={<EyeOutlined />} onClick={() => setSelectedCategory(cat)} className="hover:bg-blue-100" />
              </Tooltip>
              <Tooltip title="Edit Category">
                <Button
                  type="text"
                  size="small"
                  icon={<EditOutlined />}
                  onClick={() => {
                    setEditingId(cat.id);
                    setModalMode("edit");
                    setShowModal(true);
                  }}
                  className="hover:bg-blue-100"
                />
              </Tooltip>
              <Tooltip title="Delete Category">
                <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => handleDelete(cat)} className="hover:bg-red-100" />
              </Tooltip>
            </div>
          </div>
        ),
        key: cat.id,
        value: cat.id,
        children: buildTree(flat, cat.id),
      }));
  }

  const treeData = buildTree(categoryList);

  const handleCategorySuccess = () => {
    setEditingId(null);
    setModalMode("create");
    setShowModal(false);
  };

  const handleDelete = (cat: any) => {
    Modal.confirm({
      title: (
        <div className="flex items-center gap-2">
          <DeleteOutlined style={{ color: "#ff4d4f" }} />
          <span>Delete Category</span>
        </div>
      ),
      content: (
        <div className="mt-4">
          <p className="text-gray-700 mb-2">
            Are you sure you want to delete the category <strong>"{cat.name}"</strong>?
          </p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-700 text-sm">⚠️ This action cannot be undone. All subcategories will also be deleted.</p>
          </div>
        </div>
      ),
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      icon: null,
      onOk: async () => {
        // try {
        //   await dispatch(deleteCategory(cat.id) as any);
        //   message.success("Category deleted successfully");
        //   loadCategories();
        // } catch (err: any) {
        //   message.error(err.message || "Failed to delete category");
        // }
      },
    });
  };

  return (
    <div className="">
      <h1 className="text-4xl font-bold mb-5">Categories</h1>

      <div className="flex flex-wrap gap-2 mb-6 items-center justify-between">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Input.Search
              placeholder="Search categories..."
              allowClear
              onSearch={(value) => {
                // setSearch(value);
                // setPage(1);
              }}
              className="!w-[250px]"
              size="large"
            />
          </div>
          <div className="flex items-center gap-2">
            <Select value={sortBy} onChange={setSortBy} style={{ width: 150 }} size="large">
              {sortFields.map((f) => (
                <Option key={f.value} value={f.value}>
                  {f.label}
                </Option>
              ))}
            </Select>
            <Select value={sortDesc} onChange={(v) => setSortDesc(v)} style={{ width: 120 }} size="large">
              <Option value={false}>Ascending</Option>
              <Option value={true}>Descending</Option>
            </Select>
          </div>
        </div>
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingId(null);
            setModalMode("create");
            setShowModal(true);
          }}
          className="shadow-md"
        >
          Add New Category
        </Button>
      </div>

      <Card className="shadow-sm" loading={categoryLoading}>
        {categoryList.length === 0 ? (
          <Empty description="No categories found" image={Empty.PRESENTED_IMAGE_SIMPLE}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setEditingId(null);
                setModalMode("create");
                setShowModal(true);
              }}
            >
              Create First Category
            </Button>
          </Empty>
        ) : (
          <div className="bg-white rounded-lg">
            <Tree treeData={treeData} defaultExpandAll className="category-tree" showLine={{ showLeafIcon: false }} showIcon={false} />
          </div>
        )}
      </Card>

      {/* Category Details Modal */}
      {selectedCategory && (
        <Modal
          title={
            <div className="flex items-center gap-2">
              <FolderOutlined style={{ color: "#1677ff" }} />
              <span>Category Details</span>
            </div>
          }
          open={!!selectedCategory}
          onCancel={() => setSelectedCategory(null)}
          footer={[
            <Button
              key="edit"
              type="primary"
              onClick={() => {
                setEditingId(selectedCategory.id);
                setModalMode("edit");
                setShowModal(true);
                setSelectedCategory(null);
              }}
            >
              Edit Category
            </Button>,
            <Button key="close" onClick={() => setSelectedCategory(null)}>
              Close
            </Button>,
          ]}
          width={600}
        >
          <div className="space-y-4">
            <div>
              <Text strong>Name:</Text>
              <Paragraph className="!mb-0">{selectedCategory.name}</Paragraph>
            </div>
            <div>
              <Text strong>Slug:</Text>
              <Paragraph className="!mb-0">
                <code className="bg-gray-100 px-2 py-1 rounded">{selectedCategory.slug}</code>
              </Paragraph>
            </div>
            <div>
              <Text strong>Description:</Text>
              <Paragraph className="!mb-0">{selectedCategory.description || "No description"}</Paragraph>
            </div>
            <div>
              <Text strong>Parent Category:</Text>
              <Paragraph className="!mb-0">
                {selectedCategory.parentId ? categoryList.find((p: any) => p.id === selectedCategory.parentId)?.name || "Unknown" : "Root Category"}
              </Paragraph>
            </div>
            <div>
              <Text strong>Created:</Text>
              <Paragraph className="!mb-0">{new Date(selectedCategory.createdAt).toLocaleString()}</Paragraph>
            </div>
            <div>
              <Text strong>Last Updated:</Text>
              <Paragraph className="!mb-0">{new Date(selectedCategory.updatedAt).toLocaleString()}</Paragraph>
            </div>
          </div>
        </Modal>
      )}

      <CategoryForm
        categories={categoryList}
        mode={modalMode}
        open={showModal}
        setOpen={setShowModal}
        onSuccess={handleCategorySuccess}
        editingId={editingId}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  categoryList: state.categories.list,
  categoryLoading: state.categories.loading,
});

const mapDispatchToProps = {
  fetchCategories: fetchCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
