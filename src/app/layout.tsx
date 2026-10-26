import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "vidFlow | Fast Online Video & Audio Downloader (4K & MP3)",
  description:
    "Universal, watermark-free online video downloader for YouTube, TikTok, Instagram, Twitter/X, Reddit, and Pinterest. Save in 4K, 1080p, or convert to 320kbps MP3.",
  keywords: [
    "video downloader",
    "youtube downloader",
    "tiktok downloader no watermark",
    "instagram reels downloader",
    "twitter video downloader",
    "reddit video downloader with audio",
    "youtube to mp3",
    "4k video downloader",
    "vidflow",
  ],
  authors: [{ name: "vidFlow" }],
  openGraph: {
    title: "vidFlow | Fast Online Video & Audio Downloader",
    description:
      "Universal, watermark-free online video downloader for YouTube, TikTok, Instagram, Twitter/X, Reddit, and Pinterest.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#090d16] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-300">
        {children}
      </body>
    </html>
  );
}
