import PlatformPageTemplate from "@/components/PlatformPageTemplate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Twitter (X) Video Downloader - Save X Videos & GIFs",
  description:
    "Download Twitter videos and X clips in high definition MP4 format. Save viral clips, news broadcasts, and animated GIFs instantly.",
  keywords: [
    "twitter video downloader",
    "x video downloader",
    "download twitter video",
    "save twitter gif to mp4",
    "x clip downloader",
    "twitter video download hd",
    "free twitter downloader",
  ],
  alternates: {
    canonical: "/tw",
  },
  openGraph: {
    title: "Twitter (X) Video Downloader - Save X Videos & GIFs | VidSnap",
    description:
      "Save Twitter (X) video tweets, breaking news clips, and animated GIFs in HD MP4 quality. Fast, safe, and completely free.",
    url: "/tw",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Twitter / X Video Downloader | VidSnap",
    description:
      "Download Twitter (X) videos and GIFs in full HD MP4 quality.",
  },
};

export default function TwitterPage() {
  return (
    <PlatformPageTemplate
      platform="twitter"
      title="Twitter / X Video Downloader"
      subtitle="Save Twitter (X) video tweets, breaking news clips, and animated GIFs in HD MP4 quality. Fast, safe, and completely free."
      tips={[
        {
          title: "Multi-Bitrate Stream Extraction",
          desc: "X hosts multiple bitrates for every video. VidSnap automatically selects and delivers the highest quality stream available.",
        },
        {
          title: "Animated GIF to MP4 Conversion",
          desc: "Twitter GIFs are stored as looping video streams. Download them as standard MP4 files ready to share anywhere.",
        },
        {
          title: "Lightning Fast Processing",
          desc: "Our lightweight extractor fetches and prepares video links from tweet posts in seconds.",
        },
      ]}
      faqs={[
        {
          q: "How do I download a video from Twitter / X?",
          a: "Click the 'Share' icon on the tweet containing the video, select 'Copy link to Tweet', paste the URL into VidSnap, and click Download.",
        },
        {
          q: "Can I download GIFs from Twitter?",
          a: "Yes! VidSnap detects animated GIFs and allows you to download them in universal MP4 format.",
        },
        {
          q: "Does this work with links from x.com as well as twitter.com?",
          a: "Yes, both twitter.com and x.com URLs are fully supported.",
        },
      ]}
    />
  );
}
