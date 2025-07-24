"use client";

import React from "react";
import { Layout, Menu, Typography } from "antd";
import { AdminMenuHelper, adminMenuConfig } from "@/config/adminMenu";
import { designTokens } from "../UI/theme";

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

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  collapsed,
  onCollapse,
  isMobile,
  pathname,
  openKeys,
  onOpenChange,
  onNavigation,
}) => {
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
        overflow: 'hidden',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 101,
        background: designTokens.colors.neutral[900],
        borderRight: `1px solid ${designTokens.colors.neutral[800]}`,
        boxShadow: designTokens.boxShadow.xl,
      }}
      theme="dark"
    >
      {/* Logo Section */}
      <div
        className="relative overflow-hidden"
        style={{
          borderBottom: `1px solid ${designTokens.colors.neutral[800]}`,
          background: `linear-gradient(135deg, ${designTokens.colors.primary[600]} 0%, ${designTokens.colors.primary[700]} 50%, ${designTokens.colors.primary[800]} 100%)`,
          minHeight: '88px',
          position: 'relative',
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 50%)`,
            zIndex: 1,
          }}
        />

        <div className="relative z-10 flex items-center justify-center py-6 px-4">
          <div className="text-white text-center">
            {collapsed ? (
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center relative"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.1))',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '-2px',
                    right: '-2px',
                    width: '8px',
                    height: '8px',
                    background: designTokens.colors.success[400],
                    borderRadius: '50%',
                    border: '2px solid white',
                  }}
                />
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-3">
                  <div>
                    <div className="text-xl font-bold text-white">KenPhotos</div>
                  </div>
                </div>
                <Text
                  style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '13px',
                    fontWeight: 400,
                    letterSpacing: '0.5px',
                  }}
                >
                  Admin Dashboard
                </Text>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div 
        className="admin-scrollbar" 
        style={{ 
          height: 'calc(100vh - 88px)', 
          overflowY: 'auto', 
          padding: '20px 0' 
        }}
      >
        {/* Navigation Section Label */}
        {!collapsed && (
          <div style={{ padding: '0 20px 16px 20px' }}>
            <Text
              style={{
                color: designTokens.colors.neutral[400],
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              Navigation
            </Text>
          </div>
        )}

        <Menu
          key={pathname} // Force re-render when pathname changes
          theme="dark"
          mode="inline"
          items={menuItems}
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          style={{
            borderRight: 0,
            background: 'transparent',
            padding: '0 12px',
          }}
          className="admin-sidebar-menu"
          forceSubMenuRender
        />
      </div>
    </Sider>
  );
};

export default AdminSidebar;
