import React, { useState, useEffect } from "react";
import {
  Modal,
  Tabs,
  Upload,
  Button,
  Input,
  Select,
  Image,
  Card,
  Typography,
  Spin,
  message,
} from "antd";
import {
  UploadOutlined,
  FileImageOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchMedia, uploadMedia } from "@/store/actions/media";
import { useSession } from "next-auth/react";
import { Media } from "@/types";
import { getImageUrl } from "@/utils";
import { AppDispatch, RootState } from "@/store/store";
import MediaItem from "@/components/Admin/Media/MediaItem";

const { Search } = Input;
const { Option } = Select;
const { Text } = Typography;

interface MediaLibraryModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onSelect: (media: any) => void;
  title?: string;
  accept?: string;
}

const MediaLibraryModal: React.FC<MediaLibraryModalProps> = ({
  isOpen,
  onCancel,
  onSelect,
  title = "Media Library",
  accept = "image/*",
}) => {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  // Get state from Redux store
  const mediaList = useSelector((state: RootState) => state.media.list);
  const mediaTotal = useSelector((state: RootState) => state.media.total);
  const mediaLoading = useSelector((state: RootState) => state.media.loading);
  const [activeTab, setActiveTab] = useState("library");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<number | undefined>(
    undefined
  );
  const [sortBy, setSortBy] = useState("createdTime");
  const [sortDesc, setSortDesc] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [uploading, setUploading] = useState(false);

  // Query function
  const handleQuery = async (keyword: string, page = 1, itemsPerPage = 20) => {
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
  };

  useEffect(() => {
    if (isOpen) {
      handleQuery(searchKeyword);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, sortDesc, statusFilter, isOpen]);

  // Handle search
  const handleSearch = (value: string) => {
    setSearchKeyword(value);
    handleQuery(value, 1, pageSize);
  };

  // Handle upload
  const handleUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    dispatch(
      uploadMedia(
        formData,
        session?.accessToken || "",
        (response: any) => {
          message.success("File uploaded successfully");
          onSelect({
            ...response,
            slug: response.url,
          });
          onCancel();
          setUploading(false);
        },
        (error: any) => {
          message.error(`Upload failed: ${error}`);
          setUploading(false);
        }
      ) as any
    );
  };

  // Get file icon based on extension
  const getFileIcon = (filename: string) => {
    const ext = filename?.split(".")?.pop()?.toLowerCase();
    switch (ext) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "webp":
      case "svg":
        return <FileImageOutlined className="text-blue-500" />;
      default:
        return <FileTextOutlined className="text-gray-500" />;
    }
  };

  // Check if file is image
  const isImageFile = (filename: string) => {
    return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(filename);
  };

  // Media Library Tab
  const MediaLibraryTab = () => (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex gap-4 items-center">
        <Search
          placeholder="Search media..."
          allowClear
          style={{ width: 300 }}
          onSearch={handleSearch}
          defaultValue={searchKeyword}
        />
        <Select
          defaultValue="all"
          style={{ width: 120 }}
          onChange={(value) =>
            setStatusFilter(value === "all" ? undefined : Number(value))
          }
        >
          <Option value="all">All Types</Option>
          <Option value="1">Images</Option>
          <Option value="2">Documents</Option>
          <Option value="3">Videos</Option>
        </Select>
      </div>

      {/* Media Grid */}
      <div className="media-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-4 max-h-96 overflow-y-auto">
        {mediaList.map((item: Media) => (
          <MediaItem
            key={item.id}
            item={item}
            selected={false}
            onSelect={() => onSelect(item)}
          />
        ))}
      </div>

      {/* Pagination */}
      {mediaTotal > pageSize && (
        <div className="flex justify-center">
          <Button.Group>
            <Button
              disabled={pageNumber === 1}
              onClick={() =>
                handleQuery(searchKeyword, pageNumber - 1, pageSize)
              }
            >
              Previous
            </Button>
            <Button
              disabled={pageNumber * pageSize >= mediaTotal}
              onClick={() =>
                handleQuery(searchKeyword, pageNumber + 1, pageSize)
              }
            >
              Next
            </Button>
          </Button.Group>
        </div>
      )}
    </div>
  );

  // Upload Tab
  const UploadTab = () => (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <Upload
          accept={accept}
          beforeUpload={(file) => {
            handleUpload(file);
            return false;
          }}
          showUploadList={false}
          disabled={uploading}
        >
          <div className="space-y-4">
            <UploadOutlined className="text-4xl text-gray-400" />
            <div>
              <Text className="text-lg font-medium">Click to upload</Text>
              <br />
              <Text className="text-sm text-gray-500">
                or drag and drop files here
              </Text>
            </div>
            {uploading && <Spin />}
          </div>
        </Upload>
      </div>

      <div className="text-center">
        <Text className="text-sm text-gray-500">
          Supported formats: JPG, PNG, GIF, WebP, SVG
        </Text>
      </div>
    </div>
  );

  const tabItems = [
    {
      key: "library",
      label: "Media Library",
      children: <MediaLibraryTab />,
    },
    {
      key: "upload",
      label: "Upload Files",
      children: <UploadTab />,
    },
  ];

  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={onCancel}
      width={1200}
      footer={null}
      centered
    >
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        className="mt-4"
      />
    </Modal>
  );
};

export default MediaLibraryModal;
