import PlatformPageTemplate from "@/components/PlatformPageTemplate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instagram Reels & Video Downloader | vidFlow",
  description:
    "Download Instagram Reels, stories, and carousel videos in original high definition quality with sound. Free and unlimited.",
};

export default function InstagramPage() {
  return (
    <PlatformPageTemplate
      platform="instagram"
      title="Instagram Reels & Video Downloader"
      subtitle="Save Instagram Reels, video posts, stories, and carousel media in original HD quality with full audio."
      tips={[
        {
          title: "Full HD Reels & Videos",
          desc: "Extracts original MP4 streams directly from Instagram CDN with maximum clarity and zero compression artifacts.",
        },
        {
          title: "Audio & Music Retention",
          desc: "Audio tracks and trending Instagram sounds are preserved in high-fidelity stereo.",
        },
        {
          title: "Photo & Cover Art Extraction",
          desc: "Download high resolution cover photos, thumbnails, and preview frames directly.",
        },
      ]}
      faqs={[
        {
          q: "How can I download Instagram Reels?",
          a: "Tap the three dots on the Instagram Reel, tap 'Copy Link', paste into vidFlow, and click Download.",
        },
        {
          q: "Can I download videos from private Instagram accounts?",
          a: "Only public Instagram Reels and videos can be processed without account credentials.",
        },
        {
          q: "Does vidFlow compress the video quality?",
          a: "No, vidFlow fetches the raw stream file straight from the CDN to maintain original clarity.",
        },
      ]}
    />
  );
}
