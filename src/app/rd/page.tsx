import PlatformPageTemplate from "@/components/PlatformPageTemplate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reddit Video Downloader With Sound & Audio | VidSnap",
  description:
    "Download Reddit videos with audio automatically merged into a single clean MP4 file. Supports v.redd.it links, gifs, and audio extraction.",
};

export default function RedditPage() {
  return (
    <PlatformPageTemplate
      platform="reddit"
      title="Reddit Video Downloader With Audio"
      subtitle="Save v.redd.it videos with crystal clear synchronized audio. Resolves the infamous silent Reddit download bug automatically."
      tips={[
        {
          title: "Automatic Audio Remuxing",
          desc: "Reddit stores video and audio tracks separately. VidSnap automatically multiplexes them into a single clean MP4 file.",
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
          q: "Why do downloaded Reddit videos usually have no sound?",
          a: "Reddit uses DASH video streaming which separates the video (DASH_video) from the audio (DASH_audio). VidSnap merges both channels on our servers so your file has complete sound.",
        },
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
