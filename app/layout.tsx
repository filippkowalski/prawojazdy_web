import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppDownloadBannerWrapper } from "@/components/app-download-banner-wrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Polish Driving License Tests - Practice Theory Exam",
  description: "Practice for your Polish driving license exam with 3,000+ questions in multiple languages. Free theory test preparation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* iOS Smart App Banner */}
        <meta name="apple-itunes-app" content="app-id=6469685187" />

        {/* Android App Intent */}
        <meta name="google-play-app" content="app-id=com.ski.prawojazdy.prawojazdy" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppDownloadBannerWrapper />
        {children}
      </body>
    </html>
  );
}
