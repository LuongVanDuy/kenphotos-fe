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
  Switch,
  Tag,
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
  isDefault?: boolean;
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
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <span style={{ fontWeight: "500", color: "#2271b1" }}>
              {prefix ? `${prefix} ` : ""}
              {text}
            </span>
            {record.isDefault && <Tag color="blue">Default</Tag>}
          </div>
        );
      },
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      search: false,
      width: "40%",
      responsive: ["md"],
      render: (text: any) => {
        if (!text) return null;
        const plainText = stripHtml(text);
        const truncated =
          plainText.length > 100 ? plainText.slice(0, 100) + "..." : plainText;
        return <span className="text-sm">{truncated}</span>;
      },
    },
    {
      title: "Default",
      dataIndex: "isDefault",
      key: "isDefault",
      align: "center",
      width: 100,
      responsive: ["lg"],
      render: (isDefault: boolean, record: any) => (
        <Switch
          checked={isDefault}
          onChange={(checked) => handleSetDefault(record, checked)}
          size="small"
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 80,
      render: (_: any, record: any) => {
        const menuItems = [
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
            disabled: record.isDefault,
          },
        ];
        return (
          <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
            <Button type="text" icon={<MoreOutlined />} size="small" />
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
    if (cat.isDefault) {
      message.warning(
        "Cannot delete default category. Please set another category as default first."
      );
      return;
    }

    Modal.confirm({
      title: "Confirm Delete",
      content: `Are you sure you want to delete "${cat.name}"? This action cannot be undone.`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        dispatch(
          permanentDeleteCategory(
            cat.id,
            session?.accessToken || "",
            () => {
              message.success("Category deleted successfully");
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

    const hasDefault = selectedCategories.some((cat) => cat.isDefault);
    if (hasDefault) {
      message.warning(
        "Cannot delete default category. Please set another category as default first."
      );
      return;
    }

    Modal.confirm({
      title: "Bulk Delete",
      content: `Are you sure you want to delete ${selectedCategories.length} category(ies)? This action cannot be undone.`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        const promises = selectedCategories.map((cat) =>
          dispatch(
            permanentDeleteCategory(
              cat.id,
              session?.accessToken || "",
              () => {},
              (error) => message.error(error || "Failed to delete category")
            ) as any
          )
        );
        Promise.all(promises).then(() => {
          message.success("Categories deleted successfully");
          setSelectedRowKeys([]);
          setSelectedCategories([]);
          handleQuery(keyword, pageNumber, pageSize);
        });
      },
    });
  };

  const handleEdit = (record: any) => {
    setEditingId(record.id);
    setModalMode("edit");
    setShowModal(true);
  };

  const handleSetDefault = (cat: any, checked: boolean) => {
    if (checked) {
      Modal.confirm({
        title: "Set as Default",
        content: `Are you sure you want to set "${cat.name}" as the default category?`,
        okText: "Yes",
        okType: "primary",
        cancelText: "No",
        onOk() {
          dispatch(
            updateCategoryDefault(
              cat.id,
              session?.accessToken || "",
              () => {
                message.success("Default category updated successfully");
                handleQuery(keyword, pageNumber, pageSize);
              },
              (error) => message.error(error || "Failed to update default")
            ) as any
          );
        },
      });
    } else {
      Modal.confirm({
        title: "Remove Default",
        content: `Are you sure you want to remove "${cat.name}" as the default category?`,
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk() {
          dispatch(
            updateCategoryDefault(
              cat.id,
              session?.accessToken || "",
              () => {
                message.success("Removed default successfully");
                handleQuery(keyword, pageNumber, pageSize);
              },
              (error) => message.error(error || "Failed to remove default")
            ) as any
          );
        },
      });
    }
  };

  return (
    <div className="">
      <h1 className="text-2xl md:text-4xl font-bold mb-4 lg:mb-5">
        Categories
      </h1>

      <div className="flex flex-col lg:flex-row gap-3 lg:gap-2 mb-4 lg:mb-6 items-start lg:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center w-full lg:w-auto">
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
            style={{ width: "100%", maxWidth: "300px" }}
            size="middle"
          />
          <div className="flex gap-2 w-full sm:w-auto">
            <Select
              value={sortBy}
              onChange={setSortBy}
              style={{ minWidth: "120px" }}
              size="middle"
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
              style={{ minWidth: "100px" }}
              size="middle"
            >
              <Option value={false}>Asc</Option>
              <Option value={true}>Desc</Option>
            </Select>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
          <Button
            type="default"
            danger
            icon={<DeleteOutlined />}
            onClick={handleBulkDelete}
            disabled={selectedCategories.length === 0}
            size="middle"
            block={window.innerWidth < 640}
          >
            Delete Selected ({selectedCategories.length})
          </Button>
          <Button
            type="primary"
            size="middle"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingId(null);
              setModalMode("create");
              setShowModal(true);
            }}
            block={window.innerWidth < 640}
          >
            Add New Category
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
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
            getCheckboxProps: (record) => ({
              disabled: record.isDefault,
            }),
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
            responsive: true,
            size: "small",
          }}
          scroll={{ x: 600 }}
        />
      </div>

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
          width="90%"
          style={{ maxWidth: 600 }}
        >
          <div className="space-y-4">
            <div>
              <Text strong>Name:</Text>
              <Paragraph className="!mb-0">{selectedCategory.name}</Paragraph>
            </div>
            <div>
              <Text strong>Slug:</Text>
              <Paragraph className="!mb-0">
                <code className="bg-gray-100 px-2 py-1 rounded text-sm break-all">
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
