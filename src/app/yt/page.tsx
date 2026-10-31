import PlatformPageTemplate from "@/components/PlatformPageTemplate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube Video Downloader - 4K, 1080p & MP3",
  description:
    "Free online YouTube video downloader. Download YouTube videos and Shorts in 4K, 1080p, 720p HD with sound or extract 320kbps MP3 audio.",
  keywords: [
    "youtube video downloader",
    "youtube 4k downloader",
    "youtube 1080p downloader with audio",
    "youtube shorts downloader",
    "youtube to mp3 320kbps",
    "download youtube video online",
    "free youtube downloader",
  ],
  alternates: {
    canonical: "/yt",
  },
  openGraph: {
    title: "YouTube Video Downloader - 4K, 1080p & MP3 | VidSnap",
    description:
      "Save YouTube videos, Shorts, and audio tracks in high-resolution MP4 or 320kbps MP3 format.",
    url: "/yt",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Video Downloader (4K & MP3) | VidSnap",
    description:
      "Download YouTube videos and Shorts in 4K or 1080p with crystal clear audio.",
  },
};

export default function YouTubePage() {
  return (
    <PlatformPageTemplate
      platform="youtube"
      title="YouTube Video & Audio Downloader"
      subtitle="Download YouTube videos, Shorts, and clips in 4K, 1080p HD with crystal clear merged audio. Fast, free, and unlimited."
      tips={[
        {
          title: "4K & 1080p With Full Audio",
          desc: "Unlike standard downloaders, our engine automatically merges high-definition video with original audio streams seamlessly.",
        },
        {
          title: "YouTube Shorts Support",
          desc: "Easily paste vertical YouTube Shorts URLs to save clean MP4 videos with sound to your camera roll or desktop.",
        },
        {
          title: "320kbps MP3 Audio Extraction",
          desc: "Extract background music, podcasts, or lectures directly into high-fidelity stereo MP3 audio.",
        },
      ]}
      faqs={[
        {
          q: "What resolutions are available for download?",
          a: "VidSnap provides direct access to all available resolutions served by YouTube, including standard progressive streams and high-resolution options up to 4K.",
        },
        {
          q: "Can I download YouTube Shorts?",
          a: "Yes! Simply copy the Shorts link (youtube.com/shorts/...) and paste it in. VidSnap will process it instantly.",
        },
        {
          q: "What is the maximum resolution supported?",
          a: "VidSnap supports up to 4K (2160p) at 60fps depending on the original uploaded video quality.",
        },
        {
          q: "Is there any software installation required?",
          a: "None at all. VidSnap operates completely inside your web browser on mobile and desktop.",
        },
      ]}
    />
  );
}
