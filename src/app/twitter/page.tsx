import PlatformPageTemplate from "@/components/PlatformPageTemplate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Twitter / X Video & GIF Downloader | VidSnap",
  description:
    "Fast and free X (Twitter) video and GIF downloader. Save viral clips and animations in HD MP4 with audio.",
};

export default function TwitterPage() {
  return (
    <PlatformPageTemplate
      platform="twitter"
      title="Twitter / X Video & GIF Downloader"
      subtitle="Download videos, clips, and animated GIFs from Twitter / X in original quality MP4 format with audio."
      tips={[
        {
          title: "X & Twitter Link Support",
          desc: "Supports both traditional twitter.com links and modern x.com post URLs effortlessly.",
        },
        {
          title: "Animated GIF Conversion",
          desc: "Twitter stores GIFs as looped MP4 videos. VidSnap lets you save them cleanly for instant playback anywhere.",
        },
        {
          title: "Multiple Resolution Selection",
          desc: "Choose between standard definition (SD) or high definition (HD) depending on your device storage.",
        },
      ]}
      faqs={[
        {
          q: "How to download Twitter (X) video to my phone?",
          a: "Tap the share icon on the tweet, copy the link, paste it into VidSnap, and select the desired resolution.",
        },
        {
          q: "Can I download Twitter GIFs as video?",
          a: "Yes! Twitter GIFs are automatically served as smooth looping MP4 files.",
        },
      ]}
    />
  );
}
