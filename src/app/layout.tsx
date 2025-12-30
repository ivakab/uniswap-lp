import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.scss";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Uniswap Stable Pools",
  description: "MVP: stable pools scanner for Uniswap v3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
