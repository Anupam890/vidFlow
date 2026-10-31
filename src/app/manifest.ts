import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "vidsnap.tech - all type of downloader",
    short_name: "vidsnap.tech",
    description:
      "Save videos and extract MP3 audio from YouTube, TikTok, Instagram, Twitter, Reddit, and Pinterest in 4K, 1080p, and 320kbps.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#059669",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/icon",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
