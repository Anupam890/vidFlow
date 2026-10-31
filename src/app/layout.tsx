import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import JsonLd from "@/components/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  getWebSiteSchema,
  getSoftwareApplicationSchema,
  getOrganizationSchema,
} from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#059669",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "vidsnap.tech - all type of downloader",
    template: "%s | vidsnap.tech - all type of downloader",
  },
  description:
    "Free, 100% watermark-free online video downloader for YouTube, TikTok, Instagram, Twitter/X, Reddit, and Pinterest. Save in 4K, 1080p Full HD, or convert to 320kbps MP3.",
  keywords: [
    "video downloader",
    "online video downloader",
    "youtube downloader",
    "youtube to mp3",
    "youtube shorts downloader",
    "tiktok downloader no watermark",
    "instagram reels downloader",
    "instagram video download",
    "twitter video downloader",
    "x video downloader",
    "reddit video downloader with audio",
    "pinterest video downloader",
    "4k video downloader",
    "1080p video downloader",
    "save video from link",
    "free mp3 converter",
    "vidsnap",
  ],
  authors: [{ name: "VidSnap", url: SITE_URL }],
  creator: "VidSnap",
  publisher: "VidSnap",
  applicationName: "VidSnap",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "VidSnap | Fast Online Video & Audio Downloader",
    description:
      "Free, watermark-free online video downloader for YouTube, TikTok, Instagram, Twitter/X, Reddit, and Pinterest. Save in 4K, 1080p, or convert to 320kbps MP3.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VidSnap | Fast Online Video & Audio Downloader",
    description:
      "Save videos from YouTube, TikTok, Instagram, Twitter, Reddit & Pinterest in 4K, 1080p, or 320kbps MP3.",
    creator: "@VidSnap",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon", sizes: "64x64", type: "image/png" },
    ],
    apple: "/apple-icon",
  },
  verification: {
    google: "6MUeO2-_VKn2Rf5Gn0i2fzJsr5tIY0oWnphtjvdAMqk",
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
      <head>
        <meta name="google-site-verification" content="6MUeO2-_VKn2Rf5Gn0i2fzJsr5tIY0oWnphtjvdAMqk" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon" />
        <JsonLd data={getWebSiteSchema()} />
        <JsonLd data={getSoftwareApplicationSchema()} />
        <JsonLd data={getOrganizationSchema()} />
      </head>
      <body className="min-h-full flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-emerald-500/20 selection:text-emerald-800">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
