"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Is vidFlow completely free to use?",
      a: "Yes. vidFlow is 100% free with unlimited downloads. You do not need to register an account, enter credit card details, or install third-party plugins.",
    },
    {
      q: "Does vidFlow download TikTok videos without a watermark?",
      a: "Yes! vidFlow automatically strips the TikTok watermark, giving you a clean, full-resolution MP4 video suitable for archiving or offline viewing.",
    },
    {
      q: "Why do high-res (1080p / 4K) videos from other downloaders often have no audio?",
      a: "Platforms like YouTube and Reddit deliver video and audio as separate adaptive streams for resolutions higher than 720p. Most downloaders only grab the video stream. vidFlow utilizes server-side FFmpeg remuxing to seamlessly combine the highest-quality video and audio into a single complete MP4 file.",
    },
    {
      q: "Can I download audio or convert videos to MP3?",
      a: "Yes. Simply switch to the 'Audio (MP3)' tab on the download card to extract studio-quality 320kbps MP3 audio directly from any supported video or music clip.",
    },
    {
      q: "Can I download private videos or stories?",
      a: "vidFlow is designed to process publicly accessible media links. Content that requires logging into private accounts or DRM-encrypted paid content cannot be downloaded.",
    },
    {
      q: "Where do my downloaded videos go on my phone or laptop?",
      a: "Downloaded files are automatically saved to your operating system's default 'Downloads' folder (or your browser's designated download folder). On mobile devices, they will also appear in your Files app or Gallery.",
    },
    {
      q: "Is it legal to download videos using vidFlow?",
      a: "Downloading videos for personal offline backup, fair use, research, or viewing public content you have rights to is generally permitted. However, you must respect platform terms of service and copyright laws. Do not redistribute copyrighted material without permission.",
    },
  ];

  return (
    <section className="relative py-20 bg-[#090d16] border-t border-white/5">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 mb-3">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-xs text-slate-400">
            Everything you need to know about formats, audio syncing, and usage.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="overflow-hidden rounded-xl border border-white/5 bg-slate-900/50 backdrop-blur-sm transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-4 text-left text-sm font-semibold text-white hover:text-emerald-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-emerald-400" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 text-xs leading-relaxed text-slate-400 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
