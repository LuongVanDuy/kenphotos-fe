"use client";

import React, { useEffect, useCallback, useState } from "react";
import { Button, Input, Select, Modal, Table, Dropdown } from "antd";
import { PlusOutlined, FolderOutlined, MoreOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchCategory } from "@/store/actions/categories";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import CategoryForm from "@/components/Admin/Post/CategoryForm";
import { useSession } from "next-auth/react";
import { AppDispatch, RootState } from "@/store/store";

const { Option } = Select;
const { Text, Paragraph } = Typography;

const sortFields = [
  { value: "name", label: "Name" },
  { value: "createdAt", label: "Created At" },
];

export type TableListItem = {
  id: number;
  name: string;
  description: string;
  action: any;
};

const CategoryPage: React.FC = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  // Get state from Redux store
  const categoryList = useSelector((state: RootState) => state.categories.list);
  const categoryLoading = useSelector(
    (state: RootState) => state.categories.loading
  );
  const categoryTotal = useSelector(
    (state: RootState) => state.categories.total
  );

  const [sortBy, setSortBy] = useState<string>("name");
  const [sortDesc, setSortDesc] = useState<boolean>(false);
  const [keyword, setKeyword] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const columns: any[] = [
    {
      title: "Danh mục",
      dataIndex: "name",
      key: "name",
      formItemProps: {
        style: { marginBottom: 0 },
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
      },
      render: (text: any, record: any) => {
        const prefix = Array(record.level).fill("—").join(" ");
        return (
          <span style={{ fontWeight: "500", color: "#2271b1" }}>
            {prefix ? `${prefix} ` : ""}
            {text}
          </span>
        );
      },
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      search: false,
      width: "40%",
      render: (text: any) => {
        if (!text) return null;
        const plainText = stripHtml(text);
        const truncated =
          plainText.length > 200 ? plainText.slice(0, 200) + "..." : plainText;
        return <span>{truncated}</span>;
      },
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

  function handleQuery(keyword: string, page = 1, itemsPerPage = 10) {
    const queryParams = {
      search: keyword,
      status: 1,
      page,
      itemsPerPage,
    };

    dispatch(fetchCategories(queryParams, session?.accessToken || "") as any);
    setPageNumber(page);
    setPageSize(itemsPerPage);
  }

  useEffect(() => {
    if (session?.accessToken) {
      handleQuery(keyword);
    }
  }, [session?.accessToken]);

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
            Are you sure you want to delete the category{" "}
            <strong>"{cat.name}"</strong>?
          </p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-700 text-sm">
              ⚠️ This action cannot be undone. All subcategories will also be
              deleted.
            </p>
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

  const handleView = (record: any) => {
    setSelectedCategory(record);
  };

  const handleEdit = (record: any) => {
    setEditingId(record.id);
    setModalMode("edit");
    setShowModal(true);
    setSelectedCategory(null);
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
            <Select
              value={sortBy}
              onChange={setSortBy}
              style={{ width: 150 }}
              size="large"
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
              style={{ width: 120 }}
              size="large"
            >
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

      <Table<TableListItem>
        columns={columns}
        dataSource={categoryList}
        loading={categoryLoading}
        rowKey="id"
        pagination={{
          current: pageNumber,
          pageSize,
          total: categoryTotal,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          onChange: (page, pageSize) => {
            handleQuery(keyword, page, pageSize);
          },
        }}
      />

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
                <code className="bg-gray-100 px-2 py-1 rounded">
                  {selectedCategory.slug}
                </code>
              </Paragraph>
            </div>
            <div>
              <Text strong>Description:</Text>
              <Paragraph className="!mb-0">
                {selectedCategory.description || "No description"}
              </Paragraph>
            </div>
            <div>
              <Text strong>Parent Category:</Text>
              <Paragraph className="!mb-0">
                {selectedCategory.parentId
                  ? categoryList.find(
                      (p: any) => p.id === selectedCategory.parentId
                    )?.name || "Unknown"
                  : "Root Category"}
              </Paragraph>
            </div>
            <div>
              <Text strong>Created:</Text>
              <Paragraph className="!mb-0">
                {new Date(selectedCategory.createdAt).toLocaleString()}
              </Paragraph>
            </div>
            <div>
              <Text strong>Last Updated:</Text>
              <Paragraph className="!mb-0">
                {new Date(selectedCategory.updatedAt).toLocaleString()}
              </Paragraph>
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
        fetchCategory={fetchCategory}
      />
    </div>
  );
};

export default CategoryPage;
