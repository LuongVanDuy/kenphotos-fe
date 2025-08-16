"use client";

import React, { useEffect } from "react";
import { Card, Row, Col, Table, Tag, Button, Space, Typography } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  PictureOutlined,
  EyeOutlined,
  PlusOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { AppDispatch, RootState } from "@/store/store";
import { fetchUsers } from "@/store/actions/users";
import { fetchPosts } from "@/store/actions/posts";
import { fetchMedia } from "@/store/actions/media";
import { fetchOrders } from "@/store/actions/orders";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

interface DashboardOverviewProps {
  stats?: any;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ stats }) => {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const userTotal = useSelector((state: RootState) => state.users.total) || 0;
  const postTotal = useSelector((state: RootState) => state.posts.total) || 0;
  const mediaTotal = useSelector((state: RootState) => state.media.total) || 0;
  const orderTotal = useSelector((state: RootState) => state.orders.total) || 0;

  const recentPosts = useSelector((state: RootState) => state.posts.list) || [];

  useEffect(() => {
    if (session?.accessToken) {
      dispatch(
        fetchUsers({ page: 1, itemsPerPage: 1 }, session.accessToken) as any
      );
      dispatch(
        fetchPosts({ page: 1, itemsPerPage: 5 }, session.accessToken) as any
      );
      dispatch(
        fetchMedia({ page: 1, itemsPerPage: 1 }, session.accessToken) as any
      );
      dispatch(
        fetchOrders({ page: 1, itemsPerPage: 1 }, session.accessToken) as any
      );
    }
  }, [session?.accessToken, dispatch]);

  const mockStats: any = {
    totalUsers: userTotal,
    totalPosts: postTotal,
    totalMedia: mediaTotal,
    totalViews: orderTotal,
    recentPosts: recentPosts,
  };

  const currentStats = stats || mockStats;

  const statisticCards = [
    {
      title: "Total Users",
      value: currentStats.totalUsers,
      icon: <TeamOutlined />,
      color: "#1677ff",
      bgColor: "#e6f7ff",
      description: "Registered users",
    },
    {
      title: "Total Posts",
      value: currentStats.totalPosts,
      icon: <FileTextOutlined />,
      color: "#52c41a",
      bgColor: "#f6ffed",
      description: "Published content",
    },
    {
      title: "Media Files",
      value: currentStats.totalMedia,
      icon: <PictureOutlined />,
      color: "#faad14",
      bgColor: "#fffbe6",
      description: "Images uploaded",
    },
    {
      title: "Total Orders",
      value: currentStats.totalViews,
      icon: <EyeOutlined />,
      color: "#2f54eb",
      bgColor: "#f0f5ff",
      description: "Customer orders",
    },
  ];

  const recentPostsColumns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Author",
      key: "author",
      render: (_: any, record: any) => (
        <Space>
          {record.author
            ? `${record.author.firstName} ${record.author.lastName}`
            : "Unknown"}
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: number) => {
        const statusMap: Record<number, { label: string; color: string }> = {
          0: { label: "Draft", color: "orange" },
          1: { label: "Published", color: "green" },
        };
        return (
          <Tag color={statusMap[status]?.color || "default"}>
            {statusMap[status]?.label || status}
          </Tag>
        );
      },
    },
    {
      title: "Created",
      dataIndex: "createdTime",
      key: "createdTime",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <div className="dashboard-overview">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-4 sm:space-y-0">
          <div>
            <Title
              level={1}
              style={{
                margin: 0,
                fontSize: "clamp(24px, 5vw, 32px)",
                fontWeight: 700,
                color: "#595959",
              }}
            >
              Dashboard Overview
            </Title>
            <Text
              style={{
                fontSize: "clamp(14px, 3vw, 16px)",
                color: "#595959",
                marginTop: "8px",
                display: "block",
              }}
            >
              Welcome back! Here's what's happening with your site today.
            </Text>
          </div>
        </div>
      </div>

      {/* Modern Statistics Cards - Responsive Grid */}
      <Row gutter={[16, 16]} className="mb-8 admin-card-grid">
        {statisticCards.map((card, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card
              hoverable
              style={{
                background: `linear-gradient(135deg, ${card.bgColor}, ${card.bgColor}90)`,
                border: `1px solid ${card.color}20`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "relative", zIndex: 1 }}>
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${card.color}, ${card.color}dd)`,
                      boxShadow: `0 4px 12px ${card.color}30`,
                    }}
                  >
                    {React.cloneElement(card.icon, {
                      style: { fontSize: "20px", color: "#ffffff" },
                    })}
                  </div>
                </div>

                <div>
                  <div
                    className="text-3xl font-bold mb-1"
                    style={{ color: "#595959" }}
                  >
                    {card.value.toLocaleString()}
                  </div>
                  <div
                    className="text-sm font-medium mb-1"
                    style={{ color: "#595959" }}
                  >
                    {card.title}
                  </div>
                  <div className="text-xs" style={{ color: "#595959" }}>
                    {card.description}
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} className="admin-responsive-grid">
        <Col xs={24} lg={16}>
          <Card
            title={
              <div className="flex items-center justify-between">
                <div>
                  <Text
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "#595959",
                    }}
                  >
                    Recent Posts
                  </Text>
                </div>
              </div>
            }
            style={{ height: "fit-content" }}
          >
            <Table
              dataSource={recentPosts}
              columns={recentPostsColumns}
              pagination={false}
              size="middle"
              rowKey="id"
              style={{
                borderRadius: 12,
              }}
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Card
              title={
                <Text
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#595959",
                  }}
                >
                  Quick Actions
                </Text>
              }
            >
              <Space
                direction="vertical"
                style={{ width: "100%" }}
                size="middle"
              >
                <Button
                  type="primary"
                  block
                  icon={<PlusOutlined />}
                  style={{ height: "48px" }}
                  onClick={() => router.push("/admin/post/create")}
                >
                  Create New Post
                </Button>

                <Button
                  block
                  icon={<UserOutlined />}
                  style={{ height: "48px" }}
                  onClick={() => router.push("/admin/user/create")}
                >
                  Add User
                </Button>
              </Space>
            </Card>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardOverview;
