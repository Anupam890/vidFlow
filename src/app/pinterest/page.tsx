import PlatformPageTemplate from "@/components/PlatformPageTemplate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pinterest Video & GIF Downloader | VidSnap",
  description:
    "Free Pinterest Video Downloader. Save pins, videos, and looping GIFs in original resolution without software.",
};

export default function PinterestPage() {
  return (
    <PlatformPageTemplate
      platform="pinterest"
      title="Pinterest Video & GIF Downloader"
      subtitle="Download aesthetic Pinterest videos, idea pins, and looping GIFs in original high-resolution MP4 format."
      tips={[
        {
          title: "Idea Pins & Video Pins",
          desc: "Supports both standard video pins and multi-page Idea Pins with full resolution.",
        },
        {
          title: "Original Quality Preservation",
          desc: "Saves media in 1080p and 720p without re-encoding compression.",
        },
        {
          title: "pin.it Shortlinks Supported",
          desc: "Paste official Pinterest mobile share links or full desktop URLs effortlessly.",
        },
      ]}
      faqs={[
        {
          q: "How to download a video from Pinterest?",
          a: "Copy the pin link using the share menu on Pinterest, paste the URL into VidSnap, and hit Download.",
        },
        {
          q: "Can I save high-resolution GIFs from Pinterest?",
          a: "Yes, VidSnap downloads Pinterest GIFs in smooth, high-quality MP4 video format.",
        },
      ]}
    />
  );
}
