import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/theme-provider";
import { longChauMetadata } from "@/enums/metadata";
import { Toaster as Sonner } from "sonner";

import "./globals.css";
import CommonService from "@/services/web/common";

export async function generateMetadata(): Promise<Metadata> {
  const res = await CommonService.fnGetCommonLayout();
  const general = !!res?.data?.general ? res?.data?.general[0] : null;
  return {
    ...longChauMetadata,
    title: general?.meta_description,
    description: general?.meta_description,
    keywords: general?.meta_keyword,
    icons: {
      icon: "/assets/logo/icon.png",
      shortcut: "/assets/logo/icon.png",
      apple: "/assets/logo/icon.png"
    },
    openGraph: {
      title: general?.meta_description,
      description: general?.meta_description
    }
  };
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning={true}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <Sonner />
      </body>
    </html>
  );
}
