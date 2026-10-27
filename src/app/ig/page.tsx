import PlatformPageTemplate from "@/components/PlatformPageTemplate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instagram Video Downloader - Download Reels & Videos | VidSnap",
  description:
    "Download Instagram Reels and videos in high-definition 1080p MP4 with synchronized audio. Free, fast, and unlimited online Instagram video downloader.",
};

export default function InstagramPage() {
  return (
    <PlatformPageTemplate
      platform="instagram"
      title="Instagram Video & Reels Downloader"
      subtitle="Save Instagram Reels and videos in crisp 1080p MP4 quality with synchronized sound. Fast, free, and watermark-free."
      tips={[
        {
          title: "Full 1080p HD Quality",
          desc: "Extracts video directly from Instagram CDN servers in original maximum resolution.",
        },
        {
          title: "Synchronized Audio",
          desc: "Keeps original background music, voiceovers, and audio tracks in high fidelity stereo.",
        },
        {
          title: "Direct & Free",
          desc: "Download public Instagram videos and Reels quickly without account login or software installation.",
        },
      ]}
      faqs={[
        {
          q: "How do I download an Instagram Reel or Video?",
          a: "Tap the Share icon on any Instagram video or Reel, choose 'Copy Link', paste it into VidSnap, and click Download.",
        },
        {
          q: "What format will the video be saved in?",
          a: "Videos are saved in universally compatible high-definition MP4 format with audio.",
        },
        {
          q: "Can I download videos from private Instagram accounts?",
          a: "No, VidSnap only downloads videos from publicly accessible Instagram posts.",
        },
        {
          q: "Is there any limit on how many videos I can download?",
          a: "No, VidSnap is completely free and provides unlimited downloads.",
        },
      ]}
    />
  );
}
