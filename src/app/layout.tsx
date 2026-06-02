import type { Metadata } from "next";
import type { ReactNode } from "react";
import AuthProvider from "@/components/auth/AuthProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tử Vi — Lập lá số tử vi trực tuyến",
  description:
    "Lập lá số Tử Vi Đẩu Số miễn phí bằng tiếng Việt, an sao đầy đủ 12 cung dựa trên thư viện iztro.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body className="font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
