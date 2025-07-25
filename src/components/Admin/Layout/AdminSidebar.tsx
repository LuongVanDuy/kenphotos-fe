"use client";

import React from "react";
import { Layout, Menu, Typography } from "antd";
import { AdminMenuHelper, adminMenuConfig } from "@/components/Admin/Layout/AdminMenu";
import Link from "next/link";

const { Sider } = Layout;
const { Text } = Typography;

interface AdminSidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  isMobile: boolean;
  pathname: string;
  openKeys: string[];
  onOpenChange: (keys: string[]) => void;
  onNavigation: (path: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ collapsed, onCollapse, isMobile, pathname, openKeys, onOpenChange, onNavigation }) => {
  const selectedKeys = AdminMenuHelper.getSelectedKeys(pathname);
  const menuItems = AdminMenuHelper.convertToAntdMenuItems(adminMenuConfig, onNavigation);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      width={280}
      collapsedWidth={isMobile ? 0 : 80}
      breakpoint="lg"
      style={{
        overflow: "hidden",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 101,
        background: "#fff",
        borderRight: `1px solid #e5e7eb`, // xám nhạt
        boxShadow: "0 1px 8px 0 rgba(0,0,0,0.04)",
      }}
      theme="light"
    >
      {/* Logo Section */}
      <div
        className="relative overflow-hidden"
        style={{
          borderBottom: `1px solid #e5e7eb`,
          minHeight: "72px",
          position: "relative",
          background: "#f9fafb",
        }}
      >
        <div className="relative z-10 flex items-center justify-center py-4 px-4">
          <div className="text-center">
            {collapsed ? (
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-200">
                <span className="text-lg font-bold text-gray-700">K</span>
              </div>
            ) : (
              <Link href="/" className="space-y-1">
                <div className="flex items-center justify-center space-x-2">
                  <div>
                    <div className="text-lg font-bold text-gray-900">KenPhotos</div>
                  </div>
                </div>
                <Text
                  style={{
                    color: "#6b7280",
                    fontSize: "13px",
                    fontWeight: 400,
                    letterSpacing: "0.5px",
                  }}
                >
                  Admin Dashboard
                </Text>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div
        className="admin-scrollbar"
        style={{
          height: "calc(100vh - 72px)",
          overflowY: "auto",
          padding: "20px 0",
          background: "#fff",
        }}
      >
        {/* Navigation Section Label */}
        {!collapsed && (
          <div style={{ padding: "0 20px 12px 20px" }}>
            <Text
              style={{
                color: "#9ca3af",
                fontSize: "11px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Navigation
            </Text>
          </div>
        )}

        <Menu
          key={pathname}
          theme="light"
          mode="inline"
          items={menuItems}
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          style={{
            borderRight: 0,
            background: "transparent",
            padding: "0 12px",
          }}
          className="admin-sidebar-menu"
          forceSubMenuRender
        />
      </div>
    </Sider>
  );
};

export default AdminSidebar;
