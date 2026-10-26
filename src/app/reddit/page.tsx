import PlatformPageTemplate from "@/components/PlatformPageTemplate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reddit Video Downloader with Audio / Sound | vidFlow",
  description:
    "Download Reddit videos with sound automatically merged into a clean MP4 file. Fast, free and high definition.",
};

export default function RedditPage() {
  return (
    <PlatformPageTemplate
      platform="reddit"
      title="Reddit Video Downloader with Sound"
      subtitle="Save Reddit videos with audio automatically merged into a single crisp MP4 file. No muted video issues."
      tips={[
        {
          title: "Audio + Video Merged",
          desc: "Reddit normally separates audio into a hidden DASH stream, resulting in silent videos. vidFlow merges both into a single MP4 with sound.",
        },
        {
          title: "Shortlinks & Full Links",
          desc: "Works with reddit.com/r/... and v.redd.it direct links seamlessly.",
        },
        {
          title: "Highest Available Resolution",
          desc: "Fetches up to 1080p Full HD Reddit video streams with synchronized sound.",
        },
      ]}
      faqs={[
        {
          q: "Why do Reddit videos usually download without audio elsewhere?",
          a: "Reddit uses adaptive DASH streaming where audio and video are hosted in separate files. vidFlow merges both streams on the fly using FFmpeg.",
        },
        {
          q: "Does this work on mobile browsers?",
          a: "Yes, you can use vidFlow in Safari, Chrome, or any mobile browser on iOS and Android.",
        },
      ]}
    />
  );
}
