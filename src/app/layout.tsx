import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant, Be_Vietnam_Pro } from "next/font/google";
import AuthProvider from "@/components/auth/AuthProvider";
import ThemeProvider from "@/components/theme/ThemeProvider";
import "./globals.css";

const serif = Cormorant({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tử Vi - Lập lá số tử vi chính xác, trực quan",
  description:
    "Lập lá số Tử Vi Đẩu Số bằng tiếng Việt: an sao đầy đủ 12 cung, mệnh cục, can chi, trình bày trực quan, dễ đọc, có chiều sâu văn hoá Á Đông.",
};

// Script no-flash: đặt theme trước khi paint (mặc định đêm sao).
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')t='dark';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${serif.variable} ${sans.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="sky grain font-sans">
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
