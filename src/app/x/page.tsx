import PlatformPageTemplate from "@/components/PlatformPageTemplate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "X (Twitter) Video Downloader - Save X Videos & GIFs",
  description:
    "Download X videos, tweet media, and animated GIFs in high definition MP4 format. Free, fast, and unlimited online X video downloader.",
  keywords: [
    "x video downloader",
    "x.com video download",
    "download x videos",
    "twitter video downloader",
    "save x gif",
    "x video saver online",
  ],
  alternates: {
    canonical: "/x",
  },
  openGraph: {
    title: "X (Twitter) Video Downloader - Save X Videos & GIFs | VidSnap",
    description:
      "Save X video posts, breaking news clips, and animated GIFs in HD MP4 quality. Fast, safe, and completely free.",
    url: "/x",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "X Video Downloader | VidSnap",
    description:
      "Download X videos and GIFs in full HD MP4 quality.",
  },
};

export default function XPage() {
  return (
    <PlatformPageTemplate
      platform="twitter"
      title="X / Twitter Video Downloader"
      subtitle="Save X (Twitter) video posts, breaking news clips, and animated GIFs in HD MP4 quality. Fast, safe, and completely free."
      tips={[
        {
          title: "Multi-Bitrate Stream Extraction",
          desc: "X hosts multiple bitrates for every video. VidSnap automatically selects and delivers the highest quality stream available.",
        },
        {
          title: "Animated GIF to MP4 Conversion",
          desc: "X GIFs are stored as looping video streams. Download them as standard MP4 files ready to share anywhere.",
        },
        {
          title: "Lightning Fast Processing",
          desc: "Our lightweight extractor fetches and prepares video links from x.com posts in seconds.",
        },
      ]}
      faqs={[
        {
          q: "How do I download a video from X?",
          a: "Click the 'Share' icon on the post containing the video, select 'Copy link', paste the URL into VidSnap, and click Download.",
        },
        {
          q: "Can I download GIFs from X?",
          a: "Yes! VidSnap detects animated GIFs and allows you to download them in universal MP4 format.",
        },
        {
          q: "Does this work with links from both x.com and twitter.com?",
          a: "Yes, both twitter.com and x.com URLs are fully supported.",
        },
      ]}
    />
  );
}
