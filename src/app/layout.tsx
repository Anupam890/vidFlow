import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VidSnap | Fast Online Video & Audio Downloader (4K & MP3)",
  description:
    "Free, watermark-free online video downloader for YouTube, TikTok, Instagram, Twitter/X, Reddit, and Pinterest. Save in 4K, 1080p, or convert to 320kbps MP3.",
  keywords: [
    "video downloader",
    "youtube downloader",
    "tiktok downloader no watermark",
    "instagram reels downloader",
    "twitter video downloader",
    "reddit video downloader with audio",
    "youtube to mp3",
    "4k video downloader",
    "vidsnap",
  ],
  authors: [{ name: "VidSnap" }],
  openGraph: {
    title: "VidSnap | Fast Online Video & Audio Downloader",
    description:
      "Free, watermark-free online video downloader for YouTube, TikTok, Instagram, Twitter/X, Reddit, and Pinterest.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-emerald-500/20 selection:text-emerald-800">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
