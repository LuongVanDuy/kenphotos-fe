"use client";

import React, { useEffect, useCallback, useState } from "react";
import {
  Button,
  Input,
  Select,
  Modal,
  Table,
  Dropdown,
  Space,
  message,
} from "antd";
import { PlusOutlined, FolderOutlined, MoreOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  fetchCategory,
  permanentDeleteCategory,
  updateCategoryDefault,
} from "@/store/actions/categories";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  StarOutlined,
} from "@ant-design/icons";
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
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);

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
      title: "Default",
      dataIndex: "isDefault",
      key: "isDefault",
      align: "center",
      width: 100,
      render: (isDefault: boolean) =>
        isDefault ? (
          <span style={{ color: "#52c41a", fontWeight: 600 }}>Default</span>
        ) : (
          <span style={{ color: "#aaa" }}>—</span>
        ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_: any, record: any) => {
        const menuItems = [
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
            danger: true,
          },
          {
            key: "setDefault",
            label: "Set Default",
            icon: <StarOutlined />,
            onClick: () => handleSetDefault(record),
            disabled: record.isDefault,
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

  function handleQuery(keyword: string, page = 1, itemsPerPage = 10) {
    const queryParams = {
      search: keyword,
      page,
      itemsPerPage,
      sortBy,
      sortDesc,
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
    handleQuery(keyword, pageNumber, pageSize);
  };

  const handleDelete = (cat: any) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: `Are you sure you want to delete "${cat.name}"? This action cannot be undone.`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        dispatch(
          permanentDeleteCategory(
            { ids: [cat.id] },
            session?.accessToken || "",
            () => {
              message.success("Category deleted successfully");
              setSelectedRowKeys([]);
              setSelectedCategories([]);
              handleQuery(keyword, pageNumber, pageSize);
            },
            (error) => message.error(error || "Failed to delete category")
          ) as any
        );
      },
    });
  };

  const handleBulkDelete = () => {
    if (selectedCategories.length === 0) {
      message.warning("Please select categories to delete");
      return;
    }

    Modal.confirm({
      title: "Bulk Delete",
      content: `Are you sure you want to delete ${selectedCategories.length} category(ies)? This action cannot be undone.`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        const ids = selectedCategories.map((cat) => cat.id);
        dispatch(
          permanentDeleteCategory(
            { ids },
            session?.accessToken || "",
            () => {
              message.success("Categories deleted successfully");
              setSelectedRowKeys([]);
              setSelectedCategories([]);
              handleQuery(keyword, pageNumber, pageSize);
            },
            (error) => message.error(error || "Failed to delete categories")
          ) as any
        );
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

  const handleSetDefault = (cat: any) => {
    Modal.confirm({
      title: "Set as Default",
      content: `Are you sure you want to set "${cat.name}" as the default category?`,
      okText: "Set Default",
      okType: "primary",
      cancelText: "Cancel",
      onOk() {
        dispatch(
          updateCategoryDefault(
            { id: cat.id, data: { isDefault: true } },
            session?.accessToken || "",
            () => {
              message.success("Set as default successfully");
              handleQuery(keyword, pageNumber, pageSize);
            },
            (error) => message.error(error || "Failed to set default")
          ) as any
        );
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
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onSearch={(value) => {
                setKeyword(value);
                setPageNumber(1);
                handleQuery(value, 1, pageSize);
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
        <div className="flex gap-2">
          <Button
            type="default"
            danger
            icon={<DeleteOutlined />}
            onClick={handleBulkDelete}
            disabled={selectedCategories.length === 0}
          >
            Delete Selected ({selectedCategories.length})
          </Button>
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
      </div>

      <Table<TableListItem>
        columns={columns}
        dataSource={categoryList}
        loading={categoryLoading}
        rowKey="id"
        rowSelection={{
          selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
            setSelectedCategories(selectedRows);
          },
        }}
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
      />
    </div>
  );
};

export default CategoryPage;
