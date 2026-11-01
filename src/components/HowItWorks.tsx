"use client";

import Image from "next/image";
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
      step: "Step 1",
      image: "/images/steps/step-1.png",
      icon: Copy,
      title: "Copy the Video Link",
      desc: "Find your video on YouTube, TikTok, Instagram, or Facebook. Tap “Share” (or ⋮/•••), then choose “Copy link”.",
    },
    {
      num: "02",
      step: "Step 2",
      image: "/images/steps/step-2.png",
      icon: Globe,
      title: "Open vidsnap.tech",
      desc: "Open your browser and visit vidsnap.tech on any computer, tablet, or smartphone.",
    },
    {
      num: "03",
      step: "Step 3",
      image: "/images/steps/step-3.png",
      icon: ClipboardPaste,
      title: "Paste Your Link",
      desc: "Paste the copied video URL into the search box on our homepage.",
    },
    {
      num: "04",
      step: "Step 4",
      image: "/images/steps/step-4.png",
      icon: SlidersHorizontal,
      title: "Choose Format & Quality",
      desc: "Click “Download”, then choose your format (MP4/MP3) and quality (up to 4K, depending on the source).",
    },
    {
      num: "05",
      step: "Step 5",
      image: "/images/steps/step-5.png",
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

        {/* 5-Step Responsive Grid with Actual Website Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                className="relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 group overflow-hidden"
              >
                <div>
                  {/* Step Actual Website Screenshot / Image */}
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80 mb-4 shadow-xs group-hover:border-emerald-300 transition-colors">
                    <Image
                      src={s.image}
                      alt={`${s.step}: ${s.title}`}
                      width={800}
                      height={520}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      priority={idx < 2}
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="inline-flex items-center gap-1 rounded-md bg-slate-900/85 backdrop-blur-md px-2 py-0.5 font-mono text-[10px] font-bold text-white shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        {s.step}
                      </span>
                    </div>
                  </div>

                  {/* Header: Icon + Number */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 shadow-2xs group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="font-mono text-xl font-black text-slate-300 group-hover:text-emerald-500/40 transition-colors">
                      {s.num}
                    </span>
                  </div>

                  {/* Step Title & Description */}
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5 leading-snug group-hover:text-emerald-700 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/3 -translate-y-1/2 z-10 text-slate-300 pointer-events-none">
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
