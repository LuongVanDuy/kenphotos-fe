"use client";

import React from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  FileOutlined,
  PlusOutlined,
  UnorderedListOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";

const { Header, Sider, Content } = Layout;

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const getOpenKeys = () => {
    if (pathname.startsWith("/admin/post")) return ["post"];
    if (pathname.startsWith("/admin/media")) return ["media"];
    return [];
  };

  const getSelectedKeys = () => {
    return [pathname];
  };

  const items = [
    {
      key: "post",
      icon: <FileTextOutlined />,
      label: "Posts",
      children: [
        {
          key: "/admin/post/list",
          icon: <UnorderedListOutlined />,
          label: "List",
          onClick: () => router.push("/admin/post/list"),
        },
        {
          key: "/admin/post/create",
          icon: <PlusOutlined />,
          label: "Create New",
          onClick: () => router.push("/admin/post/create"),
        },
      ],
    },
    {
      key: "media",
      icon: <FileTextOutlined />,
      label: "Media Library",
      children: [
        {
          key: "/admin/media/list",
          icon: <UnorderedListOutlined />,
          label: "Library",
          onClick: () => router.push("/admin/media/list"),
        },
        {
          key: "/admin/media/create",
          icon: <PlusOutlined />,
          label: "Create New",
          onClick: () => router.push("/admin/media/create"),
        },
      ],
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider collapsible>
        <div className="text-white text-center py-4 text-lg font-bold">Admin</div>
        <Menu theme="dark" mode="inline" items={items} selectedKeys={getSelectedKeys()} defaultOpenKeys={getOpenKeys()} />
      </Sider>

      {/* Main content layout */}
      <Layout>
        <Header style={{ background: "#fff", padding: "0 16px" }}>
          <h1 className="text-xl font-semibold">Admin Panel</h1>
        </Header>
        <Content style={{ margin: "16px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
