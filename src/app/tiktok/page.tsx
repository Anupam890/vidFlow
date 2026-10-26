import PlatformPageTemplate from "@/components/PlatformPageTemplate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TikTok Video Downloader Without Watermark | VidSnap",
  description:
    "Download TikTok videos without watermark in HD MP4 or extract original audio sounds to MP3. Free, fast and unlimited.",
};

export default function TikTokPage() {
  return (
    <PlatformPageTemplate
      platform="tiktok"
      title="TikTok Video Downloader Without Watermark"
      subtitle="Save clean, watermark-free TikTok videos in high definition MP4 format. Extract trending sounds and songs to MP3."
      tips={[
        {
          title: "Clean Watermark Removal",
          desc: "Our extraction pipeline eliminates the bouncy TikTok logo and end credits for a crisp, clean viewing experience.",
        },
        {
          title: "Audio Sound Extraction",
          desc: "Save original sounds, trending musical audio, and voiceovers into high quality MP3 audio tracks.",
        },
        {
          title: "Mobile and Desktop Ready",
          desc: "Paste TikTok app share links (vm.tiktok.com or vt.tiktok.com) or standard web links directly.",
        },
      ]}
      faqs={[
        {
          q: "How do I download a TikTok video without the watermark?",
          a: "Simply open the TikTok app, click 'Share' -> 'Copy Link', paste the link into VidSnap, and select 'Download'. The saved video will have zero watermarks.",
        },
        {
          q: "Can I extract the music or audio track from a TikTok?",
          a: "Yes! Switch to the 'Audio (MP3)' tab after analyzing the link to save the audio file.",
        },
        {
          q: "Does VidSnap work with private TikTok videos?",
          a: "No, VidSnap only processes publicly accessible TikTok videos.",
        },
      ]}
    />
  );
}
