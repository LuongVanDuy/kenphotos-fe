import LayoutAdmin from "@/components/Admin/Layout/LayoutAdmin";
import "antd/dist/reset.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <LayoutAdmin>{children}</LayoutAdmin>;
}
