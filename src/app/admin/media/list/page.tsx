"use client";

import React, { useState, useEffect } from "react";
import {
  Image,
  Button,
  Tag,
  Input,
  Select,
  Modal,
  Typography,
  Table,
  message,
  Space,
} from "antd";
import {
  AppstoreOutlined,
  UnorderedListOutlined,
  UploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Media } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { fetchMedia, deleteMedia } from "@/store/actions/media";
import { useSession } from "next-auth/react";
import MediaItem from "@/components/Admin/Media/MediaItem";
import { getImageUrl } from "@/utils";
import { AppDispatch, RootState } from "@/store/store";

const { Search } = Input;
const { Option } = Select;
const { Text, Title } = Typography;

const MediaListPage: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  // Get state from Redux store
  const mediaList = useSelector((state: RootState) => state.media.list);
  const mediaTotal = useSelector((state: RootState) => state.media.total);
  const mediaLoading = useSelector((state: RootState) => state.media.loading);

  // State management
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<number | undefined>(
    undefined
  );
  const [sortBy, setSortBy] = useState("createdTime");
  const [sortDesc, setSortDesc] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<Media[]>([]);

  // Query function
  function handleQuery(keyword: string, page = 1, itemsPerPage = 20) {
    const queryParams: any = {
      search: keyword,
      page,
      itemsPerPage,
      sortBy,
      sortDesc,
    };

    if (statusFilter !== undefined) {
      queryParams.status = statusFilter;
    }

    dispatch(fetchMedia(queryParams, session?.accessToken || "") as any);
    setPageNumber(page);
    setPageSize(itemsPerPage);
  }

  useEffect(() => {
    if (session?.accessToken) {
      handleQuery(searchKeyword);
    }
  }, [session?.accessToken, sortBy, sortDesc, statusFilter]);

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
    handleQuery(value, 1, pageSize);
  };

  // Handle sort
  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortDesc(!sortDesc);
    } else {
      setSortBy(field);
      setSortDesc(true);
    }
  };

  const handleBulkDelete = () => {
    if (selectedMedia.length === 0) {
      message.warning("Please select media files to delete");
      return;
    }

    Modal.confirm({
      title: "Delete Media Files",
      content: `Are you sure you want to delete ${selectedMedia.length} media file(s)? This action cannot be undone.`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        const ids = selectedMedia.map((media) => media.id);
        dispatch(
          deleteMedia(
            { ids },
            session?.accessToken || "",
            () => {
              message.success("Media files deleted successfully");
              setSelectedRowKeys([]);
              setSelectedMedia([]);
              handleQuery(searchKeyword, pageNumber, pageSize);
            },
            (error) => message.error(error || "Failed to delete media files")
          ) as any
        );
      },
    });
  };

  // WordPress-style grid view
  const renderGridView = () => (
    <div className="media-library-content">
      {/* Media Grid */}
      <div className="media-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-4">
        {mediaList.map((item: Media) => (
          <div key={item.id} className="aspect-square">
            <MediaItem
              item={item}
              selected={selectedRowKeys.includes(item.id)}
              onSelect={(selected) => {
                if (selected) {
                  setSelectedRowKeys([...selectedRowKeys, item.id]);
                  setSelectedMedia([...selectedMedia, item]);
                } else {
                  setSelectedRowKeys(
                    selectedRowKeys.filter((key) => key !== item.id)
                  );
                  setSelectedMedia(
                    selectedMedia.filter((media) => media.id !== item.id)
                  );
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );

  // Table columns for list view
  const tableColumns = [
    {
      title: "Preview",
      key: "preview",
      width: 80,
      render: (_: any, record: Media) => (
        <div className="relative w-[60px] h-[60px]">
          {/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(record.name) ? (
            <Image
              alt="preview"
              src={getImageUrl(record.slug)}
              className="object-cover rounded"
            />
          ) : (
            <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded">
              📄
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Media) => (
        <div>
          <div className="font-medium text-sm lg:text-base truncate">
            {text}
          </div>
          <div className="text-xs lg:text-sm text-gray-500">
            Uploaded by {record.uploadedBy.firstName}{" "}
            {record.uploadedBy.lastName}
          </div>
        </div>
      ),
    },
    {
      title: "Type",
      key: "type",
      render: (_: any, record: Media) => {
        const ext = record.name.split(".").pop()?.toUpperCase();
        return <Tag>{ext || "Unknown"}</Tag>;
      },
    },
    {
      title: "Date",
      dataIndex: "createdTime",
      key: "createdTime",
      render: (date: string) => (
        <div className="text-sm">{new Date(date).toLocaleDateString()}</div>
      ),
    },
  ];

  return (
    <div className="media-library-container">
      {/* Header */}
      <div className="media-library-header mb-4 lg:mb-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 lg:justify-between lg:items-center">
          <div>
            <Title level={2} className="mb-1 text-xl lg:text-2xl">
              Media Library
            </Title>
            <Text className="text-gray-600 text-sm lg:text-base">
              Manage your media files and assets
            </Text>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 lg:gap-0 lg:items-center">
            {selectedMedia.length > 0 && (
              <Button
                type="default"
                danger
                icon={<DeleteOutlined />}
                onClick={handleBulkDelete}
                size="middle"
                block={window.innerWidth < 640}
              >
                Delete Selected ({selectedMedia.length})
              </Button>
            )}
            <div className="flex gap-1">
              <Button.Group size="middle">
                <Button
                  type={viewMode === "grid" ? "primary" : "default"}
                  icon={<AppstoreOutlined />}
                  onClick={() => setViewMode("grid")}
                />
                <Button
                  type={viewMode === "list" ? "primary" : "default"}
                  icon={<UnorderedListOutlined />}
                  onClick={() => setViewMode("list")}
                />
              </Button.Group>
              <Button
                type="primary"
                icon={<UploadOutlined />}
                onClick={() => router.push("/admin/media/create")}
                size="middle"
              >
                <span className="hidden sm:inline">Add New</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {viewMode === "grid" ? (
        renderGridView()
      ) : (
        <div className="overflow-x-auto">
          <Table
            columns={tableColumns}
            dataSource={mediaList}
            loading={mediaLoading}
            rowKey="id"
            rowSelection={{
              selectedRowKeys,
              onChange: (selectedRowKeys, selectedRows) => {
                setSelectedRowKeys(selectedRowKeys);
                setSelectedMedia(selectedRows);
              },
            }}
            pagination={{
              current: pageNumber,
              pageSize,
              total: mediaTotal,
              onChange: (page, pageSize) => {
                handleQuery(searchKeyword, page, pageSize);
              },
              responsive: true,
              size: "small",
            }}
            scroll={{ x: 600 }}
          />
        </div>
      )}
    </div>
  );
};

export default MediaListPage;
