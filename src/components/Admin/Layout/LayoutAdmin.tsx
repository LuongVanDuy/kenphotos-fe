"use client";

import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { AdminMenuHelper } from "@/config/adminMenu";
import { designTokens } from "../UI/theme";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

const { Content } = Layout;

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  // Enhanced responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      const tablet = window.innerWidth >= 768 && window.innerWidth < 1024;

      setIsMobile(mobile);

      // Auto-collapse on mobile and tablet
      if (mobile || tablet) {
        setCollapsed(true);
      } else {
        // Auto-expand on desktop if user hasn't manually collapsed
        const userCollapsed = localStorage.getItem('admin-sidebar-collapsed');
        if (userCollapsed === null) {
          setCollapsed(false);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update openKeys when pathname changes
  useEffect(() => {
    setOpenKeys(AdminMenuHelper.getOpenKeys(pathname));
  }, [pathname]);

  // Save user's collapse preference
  const handleCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
    localStorage.setItem('admin-sidebar-collapsed', collapsed.toString());
  };

  // Helper function to handle navigation and close mobile sidebar
  const handleNavigation = (path: string) => {
    router.push(path);
    // Close sidebar on mobile after navigation
    if (isMobile) {
      setCollapsed(true);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", background: designTokens.colors.neutral[50] }}>
      {/* Mobile Overlay - Click outside to close sidebar */}
      {isMobile && !collapsed && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 99,
            backdropFilter: 'blur(4px)',
          }}
          onClick={() => setCollapsed(true)}
        />
      )}

      {/* Sidebar Component */}
      <AdminSidebar
        collapsed={collapsed}
        onCollapse={handleCollapse}
        isMobile={isMobile}
        pathname={pathname}
        openKeys={openKeys}
        onOpenChange={setOpenKeys}
        onNavigation={handleNavigation}
      />

      {/* Main content layout */}
      <Layout
        style={{
          marginLeft: isMobile ? 0 : (collapsed ? 80 : 280),
          transition: 'margin-left 0.2s ease-in-out',
          background: designTokens.colors.neutral[50],
        }}
        className="admin-main-layout"
      >
        {/* Header Component */}
        <AdminHeader
          collapsed={collapsed}
          onCollapse={handleCollapse}
          isMobile={isMobile}
          pathname={pathname}
          darkMode={darkMode}
          onDarkModeToggle={() => setDarkMode(!darkMode)}
          onNavigation={handleNavigation}
        />

        {/* Content Area */}
        <Content
          style={{
            margin: isMobile ? '16px' : '32px',
            minHeight: 'calc(100vh - 136px)',
            background: 'transparent',
          }}
        >
          <div
            className="admin-content-container fade-in"
            style={{
              padding: isMobile ? '16px' : '32px',
              background: '#ffffff',
              borderRadius: designTokens.borderRadius.xl,
              boxShadow: designTokens.boxShadow.md,
              border: `1px solid ${designTokens.colors.neutral[200]}`,
              minHeight: 'calc(100vh - 200px)',
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
