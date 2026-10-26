"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import HeroInput from "@/components/HeroInput";
import DownloadCard from "@/components/DownloadCard";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import { ExtractedMedia } from "@/lib/types";
import {
  InstagramTool,
  INSTAGRAM_TOOLS,
  getInstagramToolBySlug,
} from "@/lib/instagram-tools";
import { getInstagramToolIcon } from "./InstagramOptionIcons";
import { ChevronDown, Sparkles, ShieldCheck } from "lucide-react";

interface InstagramDownloaderProps {
  initialSlug?: string;
}

export default function InstagramDownloader({
  initialSlug = "",
}: InstagramDownloaderProps) {
  const router = useRouter();
  const [selectedTool, setSelectedTool] = useState<InstagramTool>(() =>
    getInstagramToolBySlug(initialSlug)
  );
  const [extractedMedia, setExtractedMedia] = useState<ExtractedMedia | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Sync if initialSlug prop changes
  useEffect(() => {
    if (initialSlug) {
      setSelectedTool(getInstagramToolBySlug(initialSlug));
    }
  }, [initialSlug]);

  const handleSelectTool = (tool: InstagramTool) => {
    setSelectedTool(tool);
    // Smooth URL change without page reload
    if (tool.href) {
      router.push(tool.href, { scroll: false });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#090d16]">
      <div className="ambient-glow" />
      <Navbar />

      <main className="relative z-10 flex-1">
        {/* Hero Section with Dropdown & Pills */}
        <HeroInput
          initialPlatform="instagram"
          defaultTitle={
            <>
              {selectedTool.id === "viewer" ? (
                <>
                  Instagram <span className="bg-gradient-to-r from-pink-500 via-rose-400 to-amber-400 bg-clip-text text-transparent">Story & Profile Viewer</span>
                </>
              ) : (
                <>
                  {selectedTool.heroTitle.split(" ")[0]}{" "}
                  <span className="bg-gradient-to-r from-pink-500 via-rose-400 to-amber-400 bg-clip-text text-transparent">
                    {selectedTool.heroTitle.split(" ").slice(1).join(" ")}
                  </span>
                </>
              )}
            </>
          }
          defaultSubtitle={selectedTool.heroSubtitle}
          placeholder={selectedTool.inputPlaceholder}
          topSlot={
            <div className="flex flex-col items-center gap-3 w-full max-w-2xl px-2">
              {/* Horizontal Quick Pill Switcher */}
              <div className="flex items-center justify-center gap-1.5 flex-wrap overflow-x-auto max-w-full pb-1">
                {INSTAGRAM_TOOLS.map((tool) => {
                  const isSelected = selectedTool.id === tool.id;
                  return (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => handleSelectTool(tool)}
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                        isSelected
                          ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/25 border border-pink-400 font-semibold"
                          : "bg-slate-900/80 border border-white/5 text-slate-400 hover:text-white hover:border-pink-500/30 hover:bg-slate-800"
                      }`}
                    >
                      <span className={isSelected ? "text-white" : "text-pink-400"}>
                        {getInstagramToolIcon(tool.id, "h-3 w-3")}
                      </span>
                      <span>{tool.shortName}</span>
                    </button>
                  );
                })}
              </div>

              {/* Story/Viewer Session Info Banner */}
              {(selectedTool.id === "viewer" || selectedTool.id === "story") && (
                <div className="mt-1 flex items-center gap-2 rounded-xl border border-indigo-500/25 bg-indigo-500/10 px-3.5 py-2 text-[11px] text-indigo-200 text-left">
                  <ShieldCheck className="h-4 w-4 text-indigo-400 shrink-0" />
                  <span>
                    Instagram Stories expire in 24 hours and require session authentication from Instagram servers (configure <code className="text-pink-300 font-mono text-[10px]">cookies.txt</code> or <code className="text-pink-300 font-mono text-[10px]">INSTAGRAM_SESSION_ID</code>). Public Reels and Posts download directly without login.
                  </span>
                </div>
              )}
            </div>
          }
          onExtractSuccess={(media) => {
            setExtractedMedia(media);
            setTimeout(() => {
              window.scrollTo({ top: 380, behavior: "smooth" });
            }, 100);
          }}
        />

        {/* Download Card */}
        {extractedMedia && <DownloadCard media={extractedMedia} />}

        {/* Selected Tool Feature Guide */}
        <section className="py-16 border-t border-white/5 bg-[#0b101d]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-semibold uppercase tracking-wider text-pink-400">
                Optimized Engine
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                How VidSnap Handles {selectedTool.name}
              </h2>
              <p className="mt-2 text-xs text-slate-400 max-w-xl mx-auto">
                {selectedTool.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {selectedTool.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/5 bg-slate-900/60 p-5 backdrop-blur-sm transition-all hover:border-pink-500/30 hover:shadow-lg hover:shadow-pink-500/5"
                >
                  <div className="flex items-center gap-2 text-pink-400 text-xs font-semibold mb-2">
                    <Sparkles className="h-4 w-4" />
                    <span>Feature {idx + 1}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Features */}
        <Features />

        {/* Walkthrough */}
        <HowItWorks />

        {/* Custom FAQs for the Selected Instagram Tool */}
        <section className="py-16 bg-[#090d16] border-t border-white/5">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              Frequently Asked Questions About {selectedTool.shortName}
            </h2>
            <div className="space-y-3">
              {selectedTool.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={faq.q}
                    className="overflow-hidden rounded-xl border border-white/5 bg-slate-900/50 backdrop-blur-sm"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between p-4 text-left font-medium text-white transition-colors hover:bg-white/5 text-sm"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-pink-400 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-slate-400 leading-relaxed border-t border-white/5">
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
