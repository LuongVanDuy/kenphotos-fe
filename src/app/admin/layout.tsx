import LayoutAdmin from "@/components/Admin/Layout/LayoutAdmin";
import { createMetadata } from "@/utils/metadata";
import "antd/dist/reset.css";

export async function generateMetadata() {
  return createMetadata({
    title: "Admin KenPhotos",
    description:
      "Welcome to KenPhotos, your go-to destination for stunning photography and videography services.",
  });
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutAdmin>{children}</LayoutAdmin>;
}
