import PlatformPageTemplate from "@/components/PlatformPageTemplate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube Video Downloader - Download 4K, 1080p, Shorts & MP3 | vidFlow",
  description:
    "Free YouTube Downloader to save videos, Shorts, and convert to MP3 in high quality up to 4K resolution with audio included.",
};

export default function YouTubePage() {
  return (
    <PlatformPageTemplate
      platform="youtube"
      title="YouTube Video & Shorts Downloader"
      subtitle="Download YouTube videos, Shorts, and audio in 4K, 1080p Full HD, and 320kbps MP3 format without software installation."
      tips={[
        {
          title: "Audio + Video Merged (No Silent Videos)",
          desc: "YouTube delivers 1080p and 4K video as separated streams. vidFlow uses FFmpeg to automatically merge them into a complete MP4 file.",
        },
        {
          title: "Shorts & Long Form Supported",
          desc: "Works with standard youtube.com watch links, mobile youtu.be shortlinks, and youtube.com/shorts URLs seamlessly.",
        },
        {
          title: "Lossless MP3 Conversion",
          desc: "Extract background tracks, interviews, and music directly into clean 320kbps MP3 audio files with 1 click.",
        },
      ]}
      faqs={[
        {
          q: "Can I download 4K YouTube videos with sound?",
          a: "Yes. vidFlow's stream remuxing pipeline ensures that the highest resolution video stream and highest bitrate audio stream are joined together.",
        },
        {
          q: "Does this downloader support YouTube Shorts?",
          a: "Yes, simply copy the share link of any YouTube Short and paste it directly into vidFlow.",
        },
        {
          q: "Is there any limit to video length?",
          a: "No! vidFlow supports long videos, podcasts, and documentaries.",
        },
      ]}
    />
  );
}
