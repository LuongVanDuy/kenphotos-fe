"use client";

import { fetchPosts } from "@/store/actions/posts";
import { CopyOutlined, DeleteOutlined, DownloadOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Checkbox, Image, Space, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd/lib";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const PostList = (props: any) => {
  const { fetchPosts, postList, postTotal, postLoading } = props;
  const { data: session } = useSession();
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  function handleSearch(keyword: string, page = 1, itemsPerPage = 10) {
    const queryParams = {
      search: keyword,
      page,
      itemsPerPage,
      sortBy: "createdTime",
      sortDesc: true,
    };

    fetchPosts(session?.accessToken, queryParams);
    setPageNumber(page);
    setPageSize(itemsPerPage);
  }

  useEffect(() => {
    if (session?.accessToken) {
      handleSearch(keyword);
    }
  }, [session?.accessToken]);

  return <></>;
};

const mapStateToProps = (state: any) => ({
  postList: state.post.list,
  postTotal: state.post.total,
  postLoading: state.post.loading,
});

const mapDispatchToProps = {
  fetchPosts: fetchPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
