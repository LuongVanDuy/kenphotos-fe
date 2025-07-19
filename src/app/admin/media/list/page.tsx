"use client";

import { fetchMedia } from "@/store/actions/media";
import { CopyOutlined, DeleteOutlined, DownloadOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Checkbox, Image, Space, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd/lib";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

interface UploadedBy {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
}

interface MediaItem {
  id: number;
  name: string;
  slug: string;
  createdTime: string;
  uploadedBy: UploadedBy;
}

const UploadList = (props: any) => {
  const { fetchMedia, mediaList, mediaTotal, mediaLoading } = props;
  const { data: session } = useSession();
  const [keyword, setKeyword] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const router = useRouter();

  const columns: ColumnsType<MediaItem> = [
    {
      title: <Checkbox />,
      dataIndex: "id",
      width: 50,
      render: (id: number) => <Checkbox value={id} />,
    },
    {
      title: "Tập tin",
      dataIndex: "name",
      width: 800,
      render: (text: string, record) => (
        <Space>
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${record.slug}`}
            width={60}
            height={60}
            preview={false}
            alt={record.name}
            className="border border-solid border-[rgba(0,0,0,0.07)] rounded-[4px] overflow-hidden"
          />
          <div>
            <a href={`/media/edit/${record.id}`}>
              <strong>{record.name}</strong>
            </a>
            <p style={{ margin: 0 }}>{record.slug.split("/").pop()}</p>
          </div>
        </Space>
      ),
    },
    {
      title: "Tác giả",
      dataIndex: "uploadedBy",
      render: (user: UploadedBy) => (
        <a className="font-bold" href={`/user/${user.id}`}>
          {user.first_name}
        </a>
      ),
    },
    {
      title: "Ngày",
      dataIndex: "createdTime",
      render: (time: string) => dayjs(time).format("DD/MM/YYYY"),
    },
    {
      title: "Hành động",
      key: "action",

      render: (_: any, record: MediaItem) => (
        <Space>
          <Button size="small" type="primary" icon={<EditOutlined />} onClick={() => router.push(`/media/edit/${record.id}`)}>
            Chỉnh sửa
          </Button>

          <Button size="small" type="default" icon={<DownloadOutlined />} href={`${process.env.NEXT_PUBLIC_IMAGE_URL}${record.slug}`} download>
            Tải về
          </Button>

          <Button size="small" type="primary" danger icon={<DeleteOutlined />} onClick={() => router.push(`/media/delete/${record.id}`)}>
            Xoá
          </Button>
        </Space>
      ),
    },
  ];

  function handleSearch(keyword: string, page = 1, itemsPerPage = 10) {
    const queryParams = {
      search: keyword,
      page,
      itemsPerPage,
      sortBy: "createdTime",
      sortDesc: true,
    };

    fetchMedia(session?.accessToken, queryParams);
    setPageNumber(page);
    setPageSize(itemsPerPage);
  }

  useEffect(() => {
    if (session?.accessToken) {
      handleSearch(keyword);
    }
  }, [session?.accessToken]);

  return (
    <>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={mediaList}
        loading={mediaLoading}
        pagination={{
          current: pageNumber,
          pageSize: pageSize,
          total: mediaTotal,
          showSizeChanger: true,
          onChange: (page, pageSize) => {
            handleSearch(keyword, page, pageSize);
          },
        }}
      />
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(UploadList);
