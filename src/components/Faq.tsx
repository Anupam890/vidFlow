"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { getFaqSchema } from "@/lib/seo";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Is VidSnap completely free to use?",
      a: "Yes. VidSnap is 100% free with unlimited downloads. You do not need to register an account, enter credit card details, or install third-party plugins.",
    },
    {
      q: "Does VidSnap download TikTok videos without a watermark?",
      a: "Yes! VidSnap automatically strips the TikTok watermark, giving you a clean, full-resolution MP4 video suitable for archiving or offline viewing.",
    },
    {
      q: "Can I download videos in high definition?",
      a: "Yes! VidSnap provides direct access to all available video resolutions delivered by the platform, from 360p and 720p HD up to 1080p and 4K.",
    },
    {
      q: "Can I download audio or convert videos to MP3?",
      a: "Yes. Simply switch to the 'Audio (MP3)' tab on the download card to extract studio-quality 320kbps MP3 audio directly from any supported video or music clip.",
    },
    {
      q: "Can I download private videos or stories?",
      a: "VidSnap is designed to process publicly accessible media links. Content that requires logging into private accounts or DRM-encrypted paid content cannot be downloaded.",
    },
    {
      q: "Where do my downloaded videos go on my phone or laptop?",
      a: "Downloaded files are automatically saved to your operating system's default 'Downloads' folder (or your browser's designated download folder). On mobile devices, they will also appear in your Files app or Gallery.",
    },
    {
      q: "Is it legal to download videos using VidSnap?",
      a: "Downloading videos for personal offline backup, fair use, research, or viewing public content you have rights to is generally permitted. However, you must respect platform terms of service and copyright laws. Do not redistribute copyrighted material without permission.",
    },
  ];

  return (
    <section className="relative py-20 bg-white border-t border-slate-200/80">
      <JsonLd data={getFaqSchema(faqs)} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 mb-3 shadow-xs">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-xs text-slate-500">
            Everything you need to know about formats, audio syncing, and usage.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50/70 transition-all hover:border-emerald-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-4 text-left text-sm font-semibold text-slate-900 hover:text-emerald-700 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${
                      isOpen ? "rotate-180 text-emerald-600" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs leading-relaxed text-slate-600 border-t border-slate-100 pt-3">
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
