"use client";

import Link from "next/link";
import {
  Copy,
  Globe,
  ClipboardPaste,
  SlidersHorizontal,
  Download,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: Copy,
      title: "Copy the Video Link",
      desc: "Find your video on YouTube, TikTok, Instagram, or Facebook. Tap “Share” (or ⋮/•••), then choose “Copy link”.",
    },
    {
      num: "02",
      icon: Globe,
      title: "Open vidsnap.tech",
      desc: "Open your browser and visit vidsnap.tech on any computer, tablet, or smartphone.",
    },
    {
      num: "03",
      icon: ClipboardPaste,
      title: "Paste Your Link",
      desc: "Paste the copied video URL into the search box on our homepage.",
    },
    {
      num: "04",
      icon: SlidersHorizontal,
      title: "Choose Format & Quality",
      desc: "Click “Download”, then choose your format (MP4/MP3) and quality (up to 4K, depending on the source).",
    },
    {
      num: "05",
      icon: Download,
      title: "Download and Save",
      desc: "Select an option and your download will start automatically. Find it in your device’s “Downloads” folder.",
    },
  ];

  return (
    <section className="relative py-24 border-t border-slate-200/80 bg-slate-50/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-700 mb-3 shadow-xs">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Quick Start Guide</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight">
            How to Download a Video Online in 5 Simple Steps
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            Whether you want to save a YouTube video, an Instagram Reel, or a TikTok clip, the process is simple. Follow these steps to turn any supported link into an MP4 or MP3 download.
          </p>
        </div>

        {/* 5-Step Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                className="relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 shadow-xs group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-2xl font-black text-slate-300 group-hover:text-emerald-500/40 transition-colors">
                      {s.num}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-300 pointer-events-none">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Platform Supports Link */}
        <div className="mt-14 text-center">
          <Link
            href="/#platforms"
            className="inline-flex items-center gap-2.5 rounded-2xl bg-white border border-emerald-300 hover:border-emerald-500 px-6 py-3.5 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-900 shadow-sm hover:shadow-md transition-all group cursor-pointer"
          >
            <span>Support the Most Popular Platforms</span>
            <ArrowRight className="h-4 w-4 text-emerald-600 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
