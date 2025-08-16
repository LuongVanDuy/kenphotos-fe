import BaseLayout from "@/components/Layout/BaseLayout";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <BaseLayout>{children}</BaseLayout>;
}
