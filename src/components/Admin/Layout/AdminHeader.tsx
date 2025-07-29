"use client";

import React from "react";
import {
  Layout,
  Button,
  Breadcrumb,
  Badge,
  Space,
  Typography,
  Divider,
  Avatar,
  Dropdown,
} from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  QuestionCircleOutlined,
  SunOutlined,
  MoonOutlined,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  AdminMenuHelper,
  userMenuConfig,
} from "@/components/Admin/Layout/AdminMenu";

const { Header } = Layout;
const { Text } = Typography;

interface AdminHeaderProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  isMobile: boolean;
  pathname: string;
  darkMode: boolean;
  onDarkModeToggle: () => void;
  onNavigation: (path: string) => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  collapsed,
  onCollapse,
  isMobile,
  pathname,
  darkMode,
  onDarkModeToggle,
  onNavigation,
}) => {
  // Mock user data
  const user = {
    name: "Admin User",
    email: "admin@example.com",
    role: "Administrator",
    avatar: null,
  };

  const breadcrumbs = AdminMenuHelper.getBreadcrumbs(pathname);
  const userMenuItems = AdminMenuHelper.convertUserMenuToAntd(onNavigation);

  return (
    <Header
      style={{
        background: "#ffffff",
        padding: "0 32px",
        position: "sticky",
        top: 0,
        zIndex: 10,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
        borderBottom: `1px solid #e0e0e0`,
        height: "72px",
      }}
    >
      {/* Left Section */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => onCollapse(!collapsed)}
          style={{
            fontSize: "16px",
            width: 48,
            height: 48,
            borderRadius: "8px",
            color: "#666",
          }}
          className="admin-focus admin-touch-target"
        />

        {/* Breadcrumb - Hidden on mobile */}
        <div className="hidden sm:block">
          <Breadcrumb
            style={{ margin: 0, fontSize: 14 }}
            separator={<span style={{ color: "#888" }}>/</span>}
            items={breadcrumbs.map((item, index) => ({
              key: item.path ?? index,
              title: item.path ? (
                <a
                  onClick={() => onNavigation(item.path!)}
                  style={{
                    color: index === breadcrumbs.length - 1 ? "#333" : "#666",
                    fontWeight: index === breadcrumbs.length - 1 ? 500 : 400,
                    textDecoration: "none",
                  }}
                  className="hover:text-blue-600 transition-colors"
                >
                  {item.title}
                </a>
              ) : (
                <span
                  style={{
                    color: "#333",
                    fontWeight: 500,
                  }}
                >
                  {item.title}
                </span>
              ),
            }))}
          />
        </div>
      </div>

      {/* Right Section - Responsive */}
      <Space size={isMobile ? "small" : "middle"}>
        {/* User Profile Dropdown */}
        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
          trigger={["click"]}
        >
          <div
            className="flex items-center cursor-pointer rounded-lg transition-colors admin-focus admin-touch-target"
            style={{
              background: "transparent",
              padding: isMobile ? "8px" : "12px",
              minHeight: "44px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#f5f5f5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <Avatar
              size={32}
              icon={<UserOutlined />}
              style={{
                background: `linear-gradient(135deg, #4caf50, #388e3c)`,
              }}
            />
            <div className="ml-3 text-left hidden sm:block">
              <Text
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#333",
                  display: "block",
                  lineHeight: "1.2",
                }}
              >
                {user.name}
              </Text>
              <Text
                style={{
                  fontSize: "12px",
                  color: "#666",
                  display: "block",
                  lineHeight: "1.2",
                }}
              >
                {user.role}
              </Text>
            </div>
          </div>
        </Dropdown>
      </Space>
    </Header>
  );
};

export default AdminHeader;
