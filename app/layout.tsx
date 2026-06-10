import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";

import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getNavigation } from "@/lib/wordpress";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mulish",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dhirubhai Ambani University — School of Technology",
  description:
    "Dhirubhai Ambani University (Formerly DA-IICT) — a pioneer in Information and Communication Technology education in India since 2001.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigation = await getNavigation();

  return (
    <html lang="en" className={mulish.variable}>
      <head>
        {/* Namdhinggo (display serif) loaded directly so the build never
            depends on the next/font font catalogue. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Namdhinggo:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <TopBar />
        <Header navigation={navigation} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
