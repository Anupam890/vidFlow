import PlatformPageTemplate from "@/components/PlatformPageTemplate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reddit Video Downloader With Sound & Audio",
  description:
    "Download Reddit videos with audio automatically merged into a single clean MP4 file. Supports v.redd.it links, gifs, and audio extraction.",
  keywords: [
    "reddit video downloader",
    "reddit video download with audio",
    "v.redd.it downloader",
    "reddit video sound fix",
    "save reddit video mp4",
    "reddit clip downloader",
    "free reddit downloader",
  ],
  alternates: {
    canonical: "/rd",
  },
  openGraph: {
    title: "Reddit Video Downloader With Sound | VidSnap",
    description:
      "Download Reddit videos with audio automatically merged into a single clean MP4 file.",
    url: "/rd",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reddit Video Downloader With Sound | VidSnap",
    description:
      "Save Reddit videos and v.redd.it clips with crystal-clear merged audio.",
  },
};

export default function RedditPage() {
  return (
    <PlatformPageTemplate
      platform="reddit"
      title="Reddit Video Downloader"
      subtitle="Save v.redd.it videos and media links instantly with full resolution support and synced audio."
      tips={[
        {
          title: "Direct Video Downloads",
          desc: "Download high quality Reddit videos directly to your device with maximum speed.",
        },
        {
          title: "Supports v.redd.it Links",
          desc: "Paste Reddit post URLs or direct v.redd.it media links — both work seamlessly.",
        },
        {
          title: "Extract Meme Sounds",
          desc: "Convert viral Reddit audio tracks, commentary, and sound memes directly to MP3.",
        },
      ]}
      faqs={[
        {
          q: "How do I get the link to a Reddit video?",
          a: "Click 'Share' underneath the Reddit post, select 'Copy Link', and paste it into VidSnap.",
        },
        {
          q: "Does this work on mobile apps?",
          a: "Yes, you can share directly from the official Reddit app or third-party clients to your browser.",
        },
      ]}
    />
  );
}
