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
  deleteCategory,
  restoreCategory,
  permanentDeleteCategory,
} from "@/store/actions/categories";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  RestOutlined,
  DeleteFilled,
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
  const [deleteFlg, setDeleteFlg] = useState<number>(0); // 0: Active, 1: Deleted
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

  function handleQuery(keyword: string, page = 1, itemsPerPage = 10) {
    const queryParams = {
      search: keyword,
      deleteFlg,
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
  }, [session?.accessToken, deleteFlg]);

  const handleCategorySuccess = () => {
    setEditingId(null);
    setModalMode("create");
    setShowModal(false);
    handleQuery(keyword, pageNumber, pageSize);
  };

  const handleDelete = (cat: any) => {
    Modal.confirm({
      title: "Confirm",
      content: `Are you sure you want to move "${cat.name}" to trash?`,
      okText: "Move to Trash",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        dispatch(
          deleteCategory(
            { ids: [cat.id] },
            session?.accessToken || "",
            () => {
              message.success("Category moved to trash successfully");
              setSelectedRowKeys([]);
              setSelectedCategories([]);
              handleQuery(keyword, pageNumber, pageSize);
            },
            (error) =>
              message.error(error || "Failed to move category to trash")
          ) as any
        );
      },
    });
  };

  const handleRestore = (cat: any) => {
    Modal.confirm({
      title: "Confirm Restore",
      content: `Are you sure you want to restore "${cat.name}"?`,
      okText: "Restore",
      okType: "primary",
      cancelText: "Cancel",
      onOk() {
        dispatch(
          restoreCategory(
            { ids: [cat.id] },
            session?.accessToken || "",
            () => {
              message.success("Category restored successfully");
              setSelectedRowKeys([]);
              setSelectedCategories([]);
              handleQuery(keyword, pageNumber, pageSize);
            },
            (error) => message.error(error || "Failed to restore category")
          ) as any
        );
      },
    });
  };

  const handlePermanentDelete = (cat: any) => {
    Modal.confirm({
      title: "Permanent Delete",
      content: `Are you sure you want to permanently delete "${cat.name}"? This action cannot be undone.`,
      okText: "Delete Permanently",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        dispatch(
          permanentDeleteCategory(
            { ids: [cat.id] },
            session?.accessToken || "",
            () => {
              message.success("Category deleted permanently");
              setSelectedRowKeys([]);
              setSelectedCategories([]);
              handleQuery(keyword, pageNumber, pageSize);
            },
            (error) =>
              message.error(error || "Failed to delete category permanently")
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
      content: `Are you sure you want to move ${selectedCategories.length} category(ies) to trash?`,
      okText: "Move to Trash",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        const ids = selectedCategories.map((cat) => cat.id);
        dispatch(
          deleteCategory(
            { ids },
            session?.accessToken || "",
            () => {
              message.success("Categories moved to trash successfully");
              setSelectedRowKeys([]);
              setSelectedCategories([]);
              handleQuery(keyword, pageNumber, pageSize);
            },
            (error) =>
              message.error(error || "Failed to move categories to trash")
          ) as any
        );
      },
    });
  };

  const handleBulkRestore = () => {
    if (selectedCategories.length === 0) {
      message.warning("Please select categories to restore");
      return;
    }

    Modal.confirm({
      title: "Bulk Restore",
      content: `Are you sure you want to restore ${selectedCategories.length} category(ies)?`,
      okText: "Restore",
      okType: "primary",
      cancelText: "Cancel",
      onOk() {
        const ids = selectedCategories.map((cat) => cat.id);
        dispatch(
          restoreCategory(
            { ids },
            session?.accessToken || "",
            () => {
              message.success("Categories restored successfully");
              setSelectedRowKeys([]);
              setSelectedCategories([]);
              handleQuery(keyword, pageNumber, pageSize);
            },
            (error) => message.error(error || "Failed to restore categories")
          ) as any
        );
      },
    });
  };

  const handleBulkPermanentDelete = () => {
    if (selectedCategories.length === 0) {
      message.warning("Please select categories to delete permanently");
      return;
    }

    Modal.confirm({
      title: "Bulk Permanent Delete",
      content: `Are you sure you want to permanently delete ${selectedCategories.length} category(ies)? This action cannot be undone.`,
      okText: "Delete Permanently",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        const ids = selectedCategories.map((cat) => cat.id);
        dispatch(
          permanentDeleteCategory(
            { ids },
            session?.accessToken || "",
            () => {
              message.success("Categories deleted permanently");
              setSelectedRowKeys([]);
              setSelectedCategories([]);
              handleQuery(keyword, pageNumber, pageSize);
            },
            (error) =>
              message.error(error || "Failed to delete categories permanently")
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

  return (
    <div className="">
      <h1 className="text-4xl font-bold mb-5">
        {deleteFlg === 1 ? "Trash" : "Categories"}
      </h1>

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
          {deleteFlg === 1 ? (
            <>
              <Button
                type="default"
                icon={<RestOutlined />}
                onClick={handleBulkRestore}
                disabled={selectedCategories.length === 0}
              >
                Restore Selected ({selectedCategories.length})
              </Button>
              <Button
                type="primary"
                danger
                icon={<DeleteFilled />}
                onClick={handleBulkPermanentDelete}
                disabled={selectedCategories.length === 0}
              >
                Delete Permanently ({selectedCategories.length})
              </Button>
            </>
          ) : (
            <>
              <Button
                type="default"
                danger
                icon={<DeleteOutlined />}
                onClick={handleBulkDelete}
                disabled={selectedCategories.length === 0}
              >
                Move to Trash ({selectedCategories.length})
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
              setSelectedCategories([]);
              handleQuery(keyword, 1, pageSize);
            }}
          >
            Active Categories
          </Button>
          <Button
            type={deleteFlg === 1 ? "primary" : "default"}
            onClick={() => {
              setDeleteFlg(1);
              setSelectedRowKeys([]);
              setSelectedCategories([]);
              handleQuery(keyword, 1, pageSize);
            }}
          >
            Trash
          </Button>
        </Space>
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
        fetchCategory={fetchCategory}
      />
    </div>
  );
};

export default CategoryPage;
