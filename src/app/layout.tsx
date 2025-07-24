import LayoutProvider from "@/components/Layout/Provider";
import StyledComponentsRegistry from "@/lib/StyledComponentsRegistry";
import "../../public/css/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <LayoutProvider>{children}</LayoutProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
