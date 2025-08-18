// app/(main)/layout.tsx (hoặc PageLayout.tsx)
import BaseLayout from "@/components/Layout/BaseLayout";
import { fetchSettings } from "@/utils/metadata";

export default async function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await fetchSettings(["menuHeader", "menuFooter"]);

  return <BaseLayout settings={settings}>{children}</BaseLayout>;
}
