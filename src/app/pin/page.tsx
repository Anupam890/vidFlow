import PlatformPageTemplate from "@/components/PlatformPageTemplate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pinterest Video & Image Downloader - Save Pins & GIFs | VidSnap",
  description:
    "Download Pinterest videos, ideas, GIFs, and high-resolution images. Fast, free, and unlimited online Pinterest pin downloader.",
};

export default function PinterestPage() {
  return (
    <PlatformPageTemplate
      platform="pinterest"
      title="Pinterest Video & Pin Downloader"
      subtitle="Save aesthetic Pinterest pins, creative video tutorials, and looping animations in original high definition quality."
      tips={[
        {
          title: "Full HD Video Pins",
          desc: "Extracts original MP4 video streams without compression or quality degradation.",
        },
        {
          title: "Aesthetic Idea Pins",
          desc: "Save multi-page and video pins effortlessly with a single link.",
        },
        {
          title: "Looping GIF Support",
          desc: "Download high quality animated GIFs and pin visuals in universal formats.",
        },
      ]}
      faqs={[
        {
          q: "How do I download a video from Pinterest?",
          a: "Tap the three dots on the pin, select 'Copy link', paste it into VidSnap, and click Download.",
        },
        {
          q: "Can I download images and GIFs from Pinterest too?",
          a: "Yes! VidSnap supports video pins, animated GIFs, and high-resolution images.",
        },
        {
          q: "Is there any watermark on downloaded pins?",
          a: "No, downloaded videos and images are completely clean and free of watermarks.",
        },
      ]}
    />
  );
}
