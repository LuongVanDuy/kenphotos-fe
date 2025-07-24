"use client";

import React from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Tag,
  Avatar,
  List,
  Button,
  Space,
  Progress,
  Typography,
  Divider,
} from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  PictureOutlined,
  EyeOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  PlusOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { DashboardStats, User, Post, Media } from "@/types";
import { AdminCard, AdminButton, StatusBadge } from "../UI/StyledComponents";
import { designTokens } from "../UI/theme";

const { Title, Text } = Typography;

interface DashboardOverviewProps {
  stats?: DashboardStats;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ stats }) => {
  // Mock data for demonstration
  const mockStats: DashboardStats = {
    totalUsers: 1234,
    totalPosts: 567,
    totalMedia: 890,
    totalViews: 12345,
    recentUsers: [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "admin",
        status: "active",
        createdAt: "2024-01-15",
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "editor",
        status: "active",
        createdAt: "2024-01-14",
      },
    ],
    recentPosts: [
      {
        id: "1",
        title: "Getting Started with Next.js",
        content: "Content here...",
        status: "published",
        author: {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          role: "admin",
          status: "active",
          createdAt: "2024-01-15",
        },
        tags: ["nextjs", "react"],
        categories: ["tutorial"],
        createdAt: "2024-01-15",
        updatedAt: "2024-01-15",
      },
    ],
    recentMedia: [
      {
        id: "1",
        filename: "hero-image.jpg",
        originalName: "hero-image.jpg",
        mimeType: "image/jpeg",
        size: 1024000,
        url: "/images/hero-image.jpg",
        uploadedBy: {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          role: "admin",
          status: "active",
          createdAt: "2024-01-15",
        },
        createdAt: "2024-01-15",
      },
    ],
  };

  const currentStats = stats || mockStats;

  const statisticCards = [
    {
      title: "Total Users",
      value: currentStats.totalUsers,
      icon: <TeamOutlined />,
      color: designTokens.colors.primary[500],
      bgColor: designTokens.colors.primary[50],
      trend: { value: 12, isPositive: true },
      description: "Active users this month",
    },
    {
      title: "Total Posts",
      value: currentStats.totalPosts,
      icon: <FileTextOutlined />,
      color: designTokens.colors.success[500],
      bgColor: designTokens.colors.success[50],
      trend: { value: 8, isPositive: true },
      description: "Published content",
    },
    {
      title: "Media Files",
      value: currentStats.totalMedia,
      icon: <PictureOutlined />,
      color: designTokens.colors.warning[500],
      bgColor: designTokens.colors.warning[50],
      trend: { value: 3, isPositive: false },
      description: "Images and videos",
    },
    {
      title: "Total Views",
      value: currentStats.totalViews,
      icon: <EyeOutlined />,
      color: designTokens.colors.info[500],
      bgColor: designTokens.colors.info[50],
      trend: { value: 15, isPositive: true },
      description: "Page views today",
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
      dataIndex: "author",
      key: "author",
      render: (author: User) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />} />
          {author.name}
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "published" ? "green" : status === "draft" ? "orange" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <div className="dashboard-overview">
      {/* Modern Header Section - Responsive */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-4 sm:space-y-0">
          <div>
            <Title
              level={1}
              style={{
                margin: 0,
                fontSize: 'clamp(24px, 5vw, 32px)',
                fontWeight: 700,
                color: designTokens.colors.neutral[900],
              }}
            >
              Dashboard Overview
            </Title>
            <Text
              style={{
                fontSize: 'clamp(14px, 3vw, 16px)',
                color: designTokens.colors.neutral[600],
                marginTop: '8px',
                display: 'block',
              }}
            >
              Welcome back! Here's what's happening with your site today.
            </Text>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
            <Button
              icon={<CalendarOutlined />}
              style={{
                borderRadius: designTokens.borderRadius.lg,
                height: '40px',
                border: `1px solid ${designTokens.colors.neutral[300]}`,
              }}
              className="admin-touch-target"
            >
              <span className="hidden sm:inline">Last 30 days</span>
              <span className="sm:hidden">30 days</span>
            </Button>
            <AdminButton
              type="primary"
              icon={<EyeOutlined />}
              colorScheme="primary"
              style={{ height: '40px' }}
              className="admin-touch-target"
            >
              <span className="hidden sm:inline">View Analytics</span>
              <span className="sm:hidden">Analytics</span>
            </AdminButton>
          </div>
        </div>
      </div>

      {/* Modern Statistics Cards - Responsive Grid */}
      <Row gutter={[16, 16]} className="mb-8 admin-card-grid">
        {statisticCards.map((card, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <AdminCard
              hoverable
              style={{
                background: `linear-gradient(135deg, ${card.bgColor}, ${card.bgColor}90)`,
                border: `1px solid ${card.color}20`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Background Pattern */}
              <div
                style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: `${card.color}10`,
                  zIndex: 0,
                }}
              />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${card.color}, ${card.color}dd)`,
                      boxShadow: `0 4px 12px ${card.color}30`,
                    }}
                  >
                    {React.cloneElement(card.icon, {
                      style: { fontSize: '20px', color: '#ffffff' }
                    })}
                  </div>
                  <div className="flex items-center">
                    {card.trend.isPositive ? (
                      <ArrowUpOutlined style={{ color: designTokens.colors.success[500], fontSize: '14px' }} />
                    ) : (
                      <ArrowDownOutlined style={{ color: designTokens.colors.error[500], fontSize: '14px' }} />
                    )}
                    <span
                      className="text-sm font-medium ml-1"
                      style={{
                        color: card.trend.isPositive ? designTokens.colors.success[500] : designTokens.colors.error[500]
                      }}
                    >
                      {card.trend.value}%
                    </span>
                  </div>
                </div>

                <div>
                  <div
                    className="text-3xl font-bold mb-1"
                    style={{ color: designTokens.colors.neutral[900] }}
                  >
                    {card.value.toLocaleString()}
                  </div>
                  <div
                    className="text-sm font-medium mb-1"
                    style={{ color: designTokens.colors.neutral[700] }}
                  >
                    {card.title}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: designTokens.colors.neutral[500] }}
                  >
                    {card.description}
                  </div>
                </div>
              </div>
            </AdminCard>
          </Col>
        ))}
      </Row>

      {/* Main Content Grid - Responsive */}
      <Row gutter={[16, 16]} className="admin-responsive-grid">
        {/* Recent Posts */}
        <Col xs={24} lg={16}>
          <AdminCard
            title={
              <div className="flex items-center justify-between">
                <div>
                  <Text
                    style={{
                      fontSize: '18px',
                      fontWeight: 600,
                      color: designTokens.colors.neutral[800],
                    }}
                  >
                    Recent Posts
                  </Text>
                  <Text
                    style={{
                      fontSize: '14px',
                      color: designTokens.colors.neutral[500],
                      display: 'block',
                      marginTop: '4px',
                    }}
                  >
                    Latest published content
                  </Text>
                </div>
                <AdminButton
                  type="primary"
                  icon={<PlusOutlined />}
                  size="small"
                  colorScheme="primary"
                >
                  Add New
                </AdminButton>
              </div>
            }
            style={{ height: 'fit-content' }}
          >
            <Table
              dataSource={currentStats.recentPosts}
              columns={recentPostsColumns}
              pagination={false}
              size="middle"
              rowKey="id"
              style={{
                borderRadius: designTokens.borderRadius.lg,
              }}
            />
          </AdminCard>
        </Col>

        {/* Quick Actions & Recent Activity */}
        <Col xs={24} lg={8}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            {/* Quick Actions */}
            <AdminCard
              title={
                <Text
                  style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: designTokens.colors.neutral[800],
                  }}
                >
                  Quick Actions
                </Text>
              }
            >
              <Space direction="vertical" style={{ width: "100%" }} size="middle">
                <AdminButton
                  type="primary"
                  block
                  icon={<PlusOutlined />}
                  colorScheme="primary"
                  style={{ height: '48px' }}
                >
                  Create New Post
                </AdminButton>
                <AdminButton
                  block
                  icon={<PlusOutlined />}
                  colorScheme="neutral"
                  style={{ height: '48px' }}
                >
                  Upload Media
                </AdminButton>
                <AdminButton
                  block
                  icon={<UserOutlined />}
                  colorScheme="neutral"
                  style={{ height: '48px' }}
                >
                  Add User
                </AdminButton>
              </Space>
            </AdminCard>

            {/* Recent Users */}
            <AdminCard
              title={
                <Text
                  style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: designTokens.colors.neutral[800],
                  }}
                >
                  Recent Users
                </Text>
              }
            >
              <List
                dataSource={currentStats.recentUsers}
                renderItem={(user) => (
                  <List.Item style={{ padding: '12px 0' }}>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          icon={<UserOutlined />}
                          style={{
                            background: `linear-gradient(135deg, ${designTokens.colors.primary[500]}, ${designTokens.colors.primary[600]})`,
                          }}
                        />
                      }
                      title={
                        <Text style={{ fontWeight: 500, color: designTokens.colors.neutral[800] }}>
                          {user.name}
                        </Text>
                      }
                      description={
                        <Text style={{ color: designTokens.colors.neutral[500] }}>
                          {user.email}
                        </Text>
                      }
                    />
                    <StatusBadge status={user.status as any} size="small" />
                  </List.Item>
                )}
              />
            </AdminCard>

            {/* Storage Usage */}
            <AdminCard
              title={
                <Text
                  style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: designTokens.colors.neutral[800],
                  }}
                >
                  Storage Usage
                </Text>
              }
            >
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <Text style={{ fontWeight: 500, color: designTokens.colors.neutral[700] }}>
                      Media Files
                    </Text>
                    <Text style={{ color: designTokens.colors.neutral[600] }}>
                      2.4 GB / 10 GB
                    </Text>
                  </div>
                  <Progress
                    percent={24}
                    size="small"
                    strokeColor={designTokens.colors.primary[500]}
                    trailColor={designTokens.colors.neutral[200]}
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <Text style={{ fontWeight: 500, color: designTokens.colors.neutral[700] }}>
                      Database
                    </Text>
                    <Text style={{ color: designTokens.colors.neutral[600] }}>
                      156 MB / 1 GB
                    </Text>
                  </div>
                  <Progress
                    percent={15}
                    size="small"
                    strokeColor={designTokens.colors.success[500]}
                    trailColor={designTokens.colors.neutral[200]}
                  />
                </div>
              </div>
            </AdminCard>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardOverview;
