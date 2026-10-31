"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroInput from "@/components/HeroInput";
import DownloadCard from "@/components/DownloadCard";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import { ExtractedMedia, Platform } from "@/lib/types";
import { ChevronDown, Sparkles } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { getFaqSchema, getBreadcrumbSchema } from "@/lib/seo";

interface PlatformPageProps {
  platform: Platform;
  title: string;
  subtitle: string;
  tips: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
}

export default function PlatformPageTemplate({
  platform,
  title,
  subtitle,
  tips,
  faqs,
}: PlatformPageProps) {
  const [extractedMedia, setExtractedMedia] = useState<ExtractedMedia | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const platformSlug =
    platform === "youtube"
      ? "yt"
      : platform === "tiktok"
      ? "tt"
      : platform === "instagram"
      ? "ig"
      : platform === "twitter"
      ? "tw"
      : platform === "reddit"
      ? "rd"
      : "pin";

  return (
    <div className="relative min-h-screen flex flex-col bg-[#f8fafc] text-slate-900">
      <JsonLd data={getFaqSchema(faqs)} />
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: title, url: `/${platformSlug}` },
        ])}
      />
      <div className="ambient-glow" />
      <Navbar />

      <main className="relative z-10 flex-1">
        <HeroInput
          initialPlatform={platform}
          defaultTitle={title}
          defaultSubtitle={subtitle}
          onExtractSuccess={(media) => {
            setExtractedMedia(media);
            setTimeout(() => {
              window.scrollTo({ top: 380, behavior: "smooth" });
            }, 100);
          }}
        />

        {extractedMedia && <DownloadCard media={extractedMedia} />}

        {/* Platform Specific Feature Guide */}
        <section className="py-16 border-t border-slate-200/80 bg-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Optimized Extraction
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                How VidSnap Handles {platform.toUpperCase()} Media
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tips.map((tip, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 shadow-xs transition-all hover:bg-white hover:shadow-md hover:border-emerald-300"
                >
                  <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold mb-2">
                    <Sparkles className="h-4 w-4 text-emerald-600" />
                    <span>Feature {idx + 1}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">{tip.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Features */}
        <Features />

        {/* Walkthrough */}
        <HowItWorks />

        {/* Custom FAQs for this platform */}
        <section className="py-16 bg-slate-50/60 border-t border-slate-200/80">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">
              Frequently Asked Questions About {platform.toUpperCase()} Downloads
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={faq.q}
                    className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs transition-all hover:border-emerald-200"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
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
      </main>

      <Footer />
    </div>
  );
}
