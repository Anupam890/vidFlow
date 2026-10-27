import PlatformPageTemplate from "@/components/PlatformPageTemplate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube Video Downloader - 4K, 1080p & MP3 | VidSnap",
  description:
    "Free online YouTube video downloader. Download YouTube videos in 4K, 1080p, 720p HD with sound or convert to 320kbps MP3 audio.",
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
          q: "Why do other tools download 1080p YouTube videos without sound?",
          a: "YouTube serves 1080p, 2K, and 4K video as video-only DASH streams. VidSnap processes and remuxes the audio and video into a complete MP4 file on the fly.",
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
