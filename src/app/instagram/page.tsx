import InstagramDownloader from "@/components/InstagramDownloader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instagram Downloader - Reels, Videos, Stories, Viewer & Photos | VidSnap",
  description:
    "Free online Instagram downloader & viewer. Save Reels, photos, stories, and carousels anonymously without login. High definition MP4 and JPG.",
};

export default function InstagramPage() {
  return <InstagramDownloader initialSlug="reels" />;
}
