"use client";

import React from "react";
import { Layout, Menu } from "antd";
import { DashboardOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

type Props = {
  children: React.ReactNode;
};

const LayoutAdmin = ({ children }: Props) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider collapsible>
        <div className="text-white text-center py-4 text-lg font-bold">Admin</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            Users
          </Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Layout phần nội dung */}
      <Layout>
        <Header style={{ background: "#fff", padding: "0 16px" }}>
          <h1 className="text-xl font-semibold">Quản trị</h1>
        </Header>
        <Content style={{ margin: "16px" }}>
          <div className="bg-white p-6 rounded shadow">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
