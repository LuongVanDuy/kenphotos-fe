"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import viVN from "antd/lib/locale/vi_VN";

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
  return (
    <AntdRegistry>
      <ConfigProvider locale={viVN}>{children}</ConfigProvider>
    </AntdRegistry>
  );
}
