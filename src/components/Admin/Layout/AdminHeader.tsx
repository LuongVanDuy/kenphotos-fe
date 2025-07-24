"use client";

import React from "react";
import { Layout, Button, Breadcrumb, Badge, Space, Typography, Divider, Avatar, Dropdown } from "antd";
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
import { AdminMenuHelper, userMenuConfig } from "@/config/adminMenu";
import { designTokens } from "../UI/theme";

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
        position: 'sticky',
        top: 0,
        zIndex: 10,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: designTokens.boxShadow.md,
        borderBottom: `1px solid ${designTokens.colors.neutral[200]}`,
        height: '72px',
      }}
    >
      {/* Left Section */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => onCollapse(!collapsed)}
          style={{
            fontSize: '16px',
            width: 48,
            height: 48,
            borderRadius: designTokens.borderRadius.lg,
            color: designTokens.colors.neutral[600],
          }}
          className="admin-focus admin-touch-target"
        />

        {/* Breadcrumb - Hidden on mobile */}
        <div className="hidden sm:block">
          <Breadcrumb
            style={{
              margin: '0',
              fontSize: '14px',
            }}
            separator={
              <span style={{ color: designTokens.colors.neutral[400] }}>
                /
              </span>
            }
          >
            {breadcrumbs.map((item, index) => (
              <Breadcrumb.Item key={index}>
                {item.path ? (
                  <a
                    onClick={() => onNavigation(item.path!)}
                    style={{
                      color: index === breadcrumbs.length - 1
                        ? designTokens.colors.neutral[800]
                        : designTokens.colors.neutral[500],
                      fontWeight: index === breadcrumbs.length - 1 ? 500 : 400,
                      textDecoration: 'none',
                    }}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {item.title}
                  </a>
                ) : (
                  <span style={{
                    color: designTokens.colors.neutral[800],
                    fontWeight: 500,
                  }}>
                    {item.title}
                  </span>
                )}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </div>
      </div>

      {/* Right Section - Responsive */}
      <Space size={isMobile ? "small" : "middle"}>
        {/* Search Button - Hidden on mobile */}
        {!isMobile && (
          <Button
            type="text"
            icon={<SearchOutlined />}
            style={{
              width: 40,
              height: 40,
              borderRadius: designTokens.borderRadius.lg,
              color: designTokens.colors.neutral[600],
            }}
            className="admin-focus admin-touch-target"
          />
        )}

        {/* Theme Toggle - Hidden on mobile */}
        {!isMobile && (
          <Button
            type="text"
            icon={darkMode ? <SunOutlined /> : <MoonOutlined />}
            onClick={onDarkModeToggle}
            style={{
              width: 40,
              height: 40,
              borderRadius: designTokens.borderRadius.lg,
              color: designTokens.colors.neutral[600],
            }}
            className="admin-focus admin-touch-target"
          />
        )}

        {/* Help Button - Hidden on mobile */}
        {!isMobile && (
          <Button
            type="text"
            icon={<QuestionCircleOutlined />}
            style={{
              width: 40,
              height: 40,
              borderRadius: designTokens.borderRadius.lg,
              color: designTokens.colors.neutral[600],
            }}
            className="admin-focus admin-touch-target"
          />
        )}

        {/* Notifications */}
        <Badge
          count={5}
          size="small"
          style={{
            backgroundColor: designTokens.colors.error[500],
          }}
        >
          <Button
            type="text"
            icon={<BellOutlined />}
            style={{
              width: 40,
              height: 40,
              borderRadius: designTokens.borderRadius.lg,
              color: designTokens.colors.neutral[600],
            }}
            className="admin-focus admin-touch-target"
          />
        </Badge>

        {!isMobile && (
          <Divider type="vertical" style={{ height: '32px', margin: '0 8px' }} />
        )}

        {/* User Profile Dropdown */}
        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
          trigger={['click']}
        >
          <div
            className="flex items-center cursor-pointer rounded-lg transition-colors admin-focus admin-touch-target"
            style={{
              background: 'transparent',
              border: `1px solid ${designTokens.colors.neutral[200]}`,
              borderRadius: designTokens.borderRadius.lg,
              padding: isMobile ? '8px' : '12px',
              minHeight: '44px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = designTokens.colors.neutral[50];
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <Avatar
              size={32}
              icon={<UserOutlined />}
              style={{
                background: `linear-gradient(135deg, ${designTokens.colors.primary[500]}, ${designTokens.colors.primary[600]})`,
              }}
            />
            <div className="ml-3 text-left hidden sm:block">
              <Text
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: designTokens.colors.neutral[800],
                  display: 'block',
                  lineHeight: '1.2',
                }}
              >
                {user.name}
              </Text>
              <Text
                style={{
                  fontSize: '12px',
                  color: designTokens.colors.neutral[500],
                  display: 'block',
                  lineHeight: '1.2',
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
