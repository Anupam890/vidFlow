import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  YoutubeIcon,
  TikTokIcon,
  InstagramIcon,
  TwitterXIcon,
  RedditIcon,
  PinterestIcon,
} from "./BrandIcons";

export default function SupportedPlatforms() {
  const platforms = [
    {
      name: "YouTube Downloader",
      slug: "/youtube",
      desc: "Download YouTube videos in 4K, 1080p, Shorts, and extract MP3 audio directly.",
      badge: "4K & 1080p",
      badgeColor: "bg-red-500/10 text-red-400 border-red-500/20",
      borderGlow: "hover:border-red-500/40",
      tag: "Videos & Shorts",
      icon: YoutubeIcon,
      iconColor: "text-red-500",
    },
    {
      name: "TikTok Downloader",
      slug: "/tiktok",
      desc: "Save TikTok videos without watermark in HD MP4 or extract original sounds to MP3.",
      badge: "No Watermark",
      badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      borderGlow: "hover:border-cyan-500/40",
      tag: "Watermark Free",
      icon: TikTokIcon,
      iconColor: "text-cyan-400",
    },
    {
      name: "Instagram Downloader",
      slug: "/instagram",
      desc: "Download Instagram Reels, carousel multi-photos, profile media, and story highlights.",
      badge: "Reels & Stories",
      badgeColor: "bg-pink-500/10 text-pink-400 border-pink-500/20",
      borderGlow: "hover:border-pink-500/40",
      tag: "HD Quality",
      icon: InstagramIcon,
      iconColor: "text-pink-500",
    },
    {
      name: "Twitter / X Downloader",
      slug: "/twitter",
      desc: "Save viral X (Twitter) clips, news videos, and animated GIFs in high resolution.",
      badge: "GIF & Video",
      badgeColor: "bg-sky-500/10 text-sky-400 border-sky-500/20",
      borderGlow: "hover:border-sky-500/40",
      tag: "Fast Parsing",
      icon: TwitterXIcon,
      iconColor: "text-white",
    },
    {
      name: "Reddit Video Downloader",
      slug: "/reddit",
      desc: "Downloads Reddit video posts with audio automatically merged into a clean MP4 file.",
      badge: "Audio Merged",
      badgeColor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      borderGlow: "hover:border-orange-500/40",
      tag: "Sound Synced",
      icon: RedditIcon,
      iconColor: "text-orange-500",
    },
    {
      name: "Pinterest Downloader",
      slug: "/pinterest",
      desc: "Save aesthetic pins, creative video ideas, and looping animations in original quality.",
      badge: "Pins & GIFs",
      badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
      borderGlow: "hover:border-rose-500/40",
      tag: "Original Size",
      icon: PinterestIcon,
      iconColor: "text-rose-500",
    },
  ];

  return (
    <section className="relative py-20 bg-[#090d16]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
            Multi-Platform Hub
          </h2>
          <p className="text-3xl font-extrabold text-white sm:text-4xl">
            Supported Video & Social Platforms
          </p>
          <p className="mt-3 text-sm text-slate-400">
            Dedicated download engines tailored specifically for each platform&apos;s unique media stream layout.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((p) => {
            const Icon = p.icon;
            return (
              <Link
                key={p.slug}
                href={p.slug}
                className={`group relative rounded-2xl border border-white/5 bg-slate-900/50 p-6 backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:bg-slate-900/90 ${p.borderGlow}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/5">
                      <Icon className={`h-4 w-4 ${p.iconColor}`} />
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold border ${p.badgeColor}`}
                    >
                      {p.badge}
                    </span>
                  </div>

                  <span className="text-xs text-slate-500 group-hover:text-emerald-400 transition-colors flex items-center gap-1 font-medium">
                    Open <ArrowRight className="h-3 w-3" />
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  {p.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {p.desc}
                </p>

                <div className="flex items-center gap-2 pt-3 border-t border-white/5 text-[11px] text-slate-500 font-medium">
                  <Sparkles className="h-3 w-3 text-emerald-400" />
                  <span>Supports: {p.tag}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
