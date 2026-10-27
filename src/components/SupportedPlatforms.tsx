"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import {
  YoutubeIcon,
  TikTokIcon,
  InstagramIcon,
  TwitterXIcon,
  RedditIcon,
  PinterestIcon,
} from "./BrandIcons";

export default function SupportedPlatforms() {
  const { t } = useTranslation();

  const platforms = [
    {
      name: "YouTube Downloader",
      slug: "/yt",
      desc: "Download YouTube videos in 4K, 1080p, Shorts, and extract MP3 audio directly.",
      badge: "4K & 1080p",
      badgeColor: "bg-red-50 text-red-700 border-red-200",
      borderGlow: "hover:border-red-400 hover:shadow-red-500/10",
      tag: "Videos & Shorts",
      icon: YoutubeIcon,
      iconColor: "text-red-600",
    },
    {
      name: "TikTok Downloader",
      slug: "/tt",
      desc: "Save TikTok videos without watermark in HD MP4 or extract original sounds to MP3.",
      badge: "No Watermark",
      badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
      borderGlow: "hover:border-cyan-400 hover:shadow-cyan-500/10",
      tag: "Watermark Free",
      icon: TikTokIcon,
      iconColor: "text-cyan-600",
    },
    {
      name: "Instagram Video Downloader",
      slug: "/ig",
      desc: "Download Instagram Reels and videos in high-definition 1080p MP4 with crystal-clear audio.",
      badge: "Reels & Videos",
      badgeColor: "bg-pink-50 text-pink-700 border-pink-200",
      borderGlow: "hover:border-pink-400 hover:shadow-pink-500/10",
      tag: "1080p MP4",
      icon: InstagramIcon,
      iconColor: "text-pink-600",
    },
    {
      name: "Twitter / X Downloader",
      slug: "/tw",
      desc: "Save viral X (Twitter) clips, news videos, and animated GIFs in high resolution.",
      badge: "GIF & Video",
      badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
      borderGlow: "hover:border-sky-400 hover:shadow-sky-500/10",
      tag: "Fast Parsing",
      icon: TwitterXIcon,
      iconColor: "text-slate-900",
    },
    {
      name: "Reddit Video Downloader",
      slug: "/rd",
      desc: "Downloads Reddit video posts with audio automatically merged into a clean MP4 file.",
      badge: "Audio Merged",
      badgeColor: "bg-orange-50 text-orange-700 border-orange-200",
      borderGlow: "hover:border-orange-400 hover:shadow-orange-500/10",
      tag: "Sound Synced",
      icon: RedditIcon,
      iconColor: "text-orange-600",
    },
    {
      name: "Pinterest Downloader",
      slug: "/pin",
      desc: "Save aesthetic pins, creative video ideas, and looping animations in original quality.",
      badge: "Pins & GIFs",
      badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
      borderGlow: "hover:border-rose-400 hover:shadow-rose-500/10",
      tag: "Original Size",
      icon: PinterestIcon,
      iconColor: "text-rose-600",
    },
  ];

  return (
    <section className="relative py-20 bg-slate-50/60 border-t border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">
            {t("platforms.hub")}
          </h2>
          <p className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            {t("platforms.title")}
          </p>
          <p className="mt-3 text-sm text-slate-600">
            {t("platforms.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((p) => {
            const Icon = p.icon;
            return (
              <Link
                key={p.slug}
                href={p.slug}
                className={`group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${p.borderGlow}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-200">
                      <Icon className={`h-5 w-5 ${p.iconColor}`} />
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold border ${p.badgeColor}`}
                    >
                      {p.badge}
                    </span>
                  </div>

                  <span className="text-xs text-slate-400 group-hover:text-emerald-600 transition-colors flex items-center gap-1 font-semibold">
                    {t("platforms.open")} <ArrowRight className="h-3 w-3" />
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {p.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {p.desc}
                </p>

                <div className="flex items-center gap-2 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
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
