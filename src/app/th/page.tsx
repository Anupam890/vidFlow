import PlatformPageTemplate from "@/components/PlatformPageTemplate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Threads Video Downloader - Save Meta Threads Videos & Photos",
  description:
    "Free online Threads video downloader. Download Meta Threads videos and media in HD 1080p MP4 with sound. Fast, unlimited, and watermark-free.",
  keywords: [
    "threads video downloader",
    "threads downloader",
    "download threads video online",
    "save threads video mp4",
    "threads audio extractor",
    "meta threads video download",
    "threads video saver hd",
  ],
  alternates: {
    canonical: "/th",
  },
  openGraph: {
    title: "Threads Video Downloader | VidSnap",
    description:
      "Save Meta Threads videos and media in crystal clear HD MP4 quality with audio.",
    url: "/th",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Threads Video Downloader | VidSnap",
    description:
      "Download Meta Threads videos in full HD with crystal clear audio.",
  },
};

export default function ThreadsPage() {
  return (
    <PlatformPageTemplate
      platform="threads"
      title="Threads Video Downloader"
      subtitle="Save Meta Threads videos, clips, and media in crisp HD MP4 with synchronized audio. Fast, free, and watermark-free."
      tips={[
        {
          title: "Full HD Video Quality",
          desc: "Extracts original video streams directly from Meta CDN servers in highest native resolution.",
        },
        {
          title: "Clean Audio Track",
          desc: "Preserves background sounds, dialogue, and audio tracks in high fidelity stereo.",
        },
        {
          title: "No App Installation",
          desc: "Download public Threads videos effortlessly right in your web browser without logging in.",
        },
      ]}
      faqs={[
        {
          q: "How do I download a video from Threads?",
          a: "Tap the Share icon under any post on Threads, select 'Copy link', paste it into VidSnap, and click Download.",
        },
        {
          q: "Does this work on both iPhone and Android?",
          a: "Yes! VidSnap works in any mobile browser on iOS, Android, Windows, and Mac.",
        },
        {
          q: "Can I download videos from private Threads accounts?",
          a: "No, VidSnap only downloads media from public, accessible Threads posts.",
        },
      ]}
    />
  );
}

