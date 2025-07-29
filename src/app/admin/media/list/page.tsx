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
} from "antd";
import {
  AppstoreOutlined,
  UnorderedListOutlined,
  UploadOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Media } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { fetchMedia } from "@/store/actions/media";
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

  // WordPress-style grid view
  const renderGridView = () => (
    <div className="media-library-content">
      {/* Media Grid */}
      <div className="media-grid">
        {mediaList.map((item: Media) => (
          <MediaItem key={item.id} item={item} />
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
        <div className="relative">
          {/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(record.name) ? (
            <Image
              alt="preview"
              width={50}
              height={50}
              src={getImageUrl(record.slug)}
              className="object-cover rounded"
            />
          ) : (
            <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded">
              <span className="text-lg">📄</span>
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
          <div className="font-medium">{text}</div>
          <div className="text-sm text-gray-500">
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
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <div className="media-library-container">
      {/* Header */}
      <div className="media-library-header">
        <div className="flex justify-between items-center">
          <div>
            <Title level={2} className="mb-1">
              Media Library
            </Title>
            <Text className="text-gray-600">
              Manage your media files and assets
            </Text>
          </div>
          <Button
            type="primary"
            icon={<UploadOutlined />}
            onClick={() => router.push("/admin/media/create")}
            size="large"
          >
            Add New
          </Button>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="media-filters">
        <div className="media-filters-row">
          <div className="media-filters-left">
            {/* <Search
              placeholder="Search media..."
              allowClear
              style={{ width: 300 }}
              onSearch={handleSearch}
              defaultValue={searchKeyword}
            /> */}
            <Select
              defaultValue="all"
              className="w-[120px] !h-[40px]"
              onChange={(value) =>
                setStatusFilter(value === "all" ? undefined : Number(value))
              }
            >
              <Option value="all">All Types</Option>
              <Option value="1">Images</Option>
              <Option value="2">Documents</Option>
              <Option value="3">Videos</Option>
            </Select>
            <Button.Group>
              <Button
                type={
                  sortBy === "createdTime" && sortDesc ? "primary" : "default"
                }
                icon={<SortDescendingOutlined />}
                onClick={() => handleSort("createdTime")}
                size="small"
              >
                Newest
              </Button>
              <Button
                type={
                  sortBy === "createdTime" && !sortDesc ? "primary" : "default"
                }
                icon={<SortAscendingOutlined />}
                onClick={() => handleSort("createdTime")}
                size="small"
              >
                Oldest
              </Button>
            </Button.Group>
          </div>

          <div className="media-filters-right">
            <Button.Group>
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
          </div>
        </div>
      </div>

      {/* Content */}
      {viewMode === "grid" ? (
        renderGridView()
      ) : (
        <Table
          columns={tableColumns}
          dataSource={mediaList}
          loading={mediaLoading}
          pagination={{
            current: pageNumber,
            pageSize,
            total: mediaTotal,
            onChange: (page, pageSize) => {
              handleQuery(searchKeyword, page, pageSize);
            },
          }}
        />
      )}
    </div>
  );
};

export default MediaListPage;
