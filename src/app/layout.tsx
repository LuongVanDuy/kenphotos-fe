import LayoutProvider from "@/components/Layout/Provider";
import "../../public/css/globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

import "../../public/css/globals.css";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <LayoutProvider>{children}</LayoutProvider>
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=6LfvyqYrAAAAACOms6yP9H3TowHoG082voRRc9sx`}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
