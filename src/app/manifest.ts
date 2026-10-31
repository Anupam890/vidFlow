import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VidSnap - Free Online Video & Audio Downloader",
    short_name: "VidSnap",
    description:
      "Save videos and extract MP3 audio from YouTube, TikTok, Instagram, Twitter, Reddit, and Pinterest in 4K, 1080p, and 320kbps.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#059669",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

