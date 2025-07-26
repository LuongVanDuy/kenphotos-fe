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

} from "antd";
import {
  AppstoreOutlined,
  UnorderedListOutlined,
  UploadOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { CustomShowConfirmModal } from "@/components/Admin/UI/CustomModal";
import { Media } from "@/types";
import { connect } from "react-redux";
import { fetchMedia } from "@/store/actions/media";
import { useSession } from "next-auth/react";
import CustomTable from "@/components/Admin/UI/CustomTable";
import MediaItem from "@/components/Admin/Media/MediaItem";
import { getImageUrl } from "@/utils";

const { Search } = Input;
const { Option } = Select;
const { Text, Title } = Typography;

const MediaListPage: React.FC = (props: any) => {
  const { fetchMedia, mediaList, mediaTotal, mediaLoading } = props;
  const router = useRouter();
  const { data: session } = useSession();

  // State management
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
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

    fetchMedia(session?.accessToken, queryParams);
    setPageNumber(page);
    setPageSize(itemsPerPage);
  }

  useEffect(() => {
    if (session?.accessToken) {
      handleQuery(searchKeyword);
    }
  }, [session?.accessToken, sortBy, sortDesc, statusFilter]);

  // Handle search
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

  const handlePreview = (mediaItem: Media) => {
    // Check if it's an image by file extension
    const isImage = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(mediaItem.name);
    const imageUrl = getImageUrl(mediaItem.slug);
    if (isImage) {
      setPreviewImage(imageUrl);
      setPreviewVisible(true);
    } else {
      // For non-image files, use the full URL if it's a relative path
      const fileUrl = mediaItem.slug.startsWith("http")
        ? mediaItem.slug
        : imageUrl;
      window.open(fileUrl, "_blank");
    }
  };

  // WordPress-style grid view
  const renderGridView = () => (
    <div className="media-library-content">
      {/* Media Grid */}
      <div className="media-grid">
        {mediaList.map((item: Media) => (
          <MediaItem key={item.id} item={item} onPreview={handlePreview} />
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
              width={50}
              height={50}
              src={getImageUrl(record.slug)}
              alt={record.name}
              className="object-cover rounded"
              preview={false}
              onClick={() => handlePreview(record)}
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
        <CustomTable
          columns={tableColumns}
          data={mediaList}
          loading={mediaLoading}
          onRefresh={() => handleQuery(searchKeyword, pageNumber, pageSize)}
          onView={handlePreview}
          searchable={false}
          exportable
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

      {/* Image Preview Modal */}
      <Modal
        open={previewVisible}
        title="Image Preview"
        footer={null}
        onCancel={() => setPreviewVisible(false)}
        width="30%"
        style={{ top: 50 }}
      >
        <Image alt="preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  mediaList: state.media.list,
  mediaTotal: state.media.total,
  mediaLoading: state.media.loading,
});

const mapDispatchToProps = {
  fetchMedia: fetchMedia,
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaListPage);
