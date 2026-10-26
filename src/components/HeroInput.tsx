"use client";

import { useState } from "react";
import {
  Search,
  ClipboardPaste,
  X,
  ArrowRight,
  Loader2,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { ExtractedMedia, Platform } from "@/lib/types";

interface HeroInputProps {
  onExtractSuccess: (data: ExtractedMedia) => void;
  initialPlatform?: Platform;
  defaultTitle?: string;
  defaultSubtitle?: string;
}

const SAMPLE_URLS = [
  {
    label: "YouTube 4K Demo",
    url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
  },
  {
    label: "Creative Commons Short",
    url: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
  },
  {
    label: "TikTok / Reel Link",
    url: "https://www.tiktok.com/@tiktok/video/7106594312292453678",
  },
];

export default function HeroInput({
  onExtractSuccess,
  defaultTitle,
  defaultSubtitle,
}: HeroInputProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
        handleExtract(text);
      }
    } catch {
      setError("Clipboard access denied. Please paste manually into the input box.");
    }
  };

  const handleExtract = async (targetUrl?: string) => {
    const urlToProcess = (targetUrl || url).trim();
    if (!urlToProcess) {
      setError("Please paste a valid video URL first.");
      return;
    }

    setError(null);
    setLoading(true);
    setLoadingStep(1);

    const stepTimer1 = setTimeout(() => setLoadingStep(2), 600);
    const stepTimer2 = setTimeout(() => setLoadingStep(3), 1500);

    try {
      const response = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlToProcess }),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        throw new Error(
          resData.error || "Failed to extract video information from this link."
        );
      }

      onExtractSuccess(resData.data);
    } catch (err: any) {
      setError(
        err.message ||
          "Could not parse this media. Please ensure the link is public and accessible."
      );
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      setLoading(false);
      setLoadingStep(0);
    }
  };

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {/* Top Feature Pill */}
        {/* <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-400 mb-6 shadow-sm shadow-emerald-500/10">
          <Sparkles className="h-3.5 w-3.5 animate-pulse" />
          <span>Watermark-Free & High Speed Chunked Streaming</span>
        </div> */}

        {/* Dynamic Titles */}
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
          {defaultTitle || (
            <>
              Download Any Video & Audio in{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Full 4K Quality
              </span>
            </>
          )}
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400 sm:text-lg">
          {defaultSubtitle ||
            "Fastest online video downloader for YouTube, TikTok, Instagram, Twitter/X, and 1,000+ sources. No app installation needed."}
        </p>

        {/* Input Bar Form */}
        <div className="mt-8 relative mx-auto max-w-3xl">
          <div className="group relative rounded-2xl p-1 bg-gradient-to-r from-emerald-500/30 via-teal-500/20 to-cyan-500/30 shadow-2xl shadow-emerald-500/10 transition-all focus-within:from-emerald-500 focus-within:to-cyan-500">
            <div className="flex flex-col sm:flex-row items-center gap-2 rounded-xl bg-[#0b1120] p-2">
              {/* Main Text Input */}
              <div className="relative flex-1 w-full flex items-center">
                <Search className="absolute left-3.5 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleExtract()}
                  placeholder="Paste URL from YouTube, TikTok, Instagram, Facebook, X..."
                  className="w-full bg-transparent pl-11 pr-24 py-3.5 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
                  disabled={loading}
                />

                <div className="absolute right-3 flex items-center gap-1.5">
                  {url ? (
                    <button
                      onClick={() => setUrl("")}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                      title="Clear input"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handlePaste}
                      className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-slate-800/90 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
                      title="Paste from clipboard"
                    >
                      <ClipboardPaste className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Paste</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={() => handleExtract()}
                disabled={loading}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/25 hover:opacity-95 disabled:opacity-50 transition-all shrink-0 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Download</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Loading Progress Feedback */}
          {loading && (
            <div className="mt-4 rounded-xl border border-white/10 bg-slate-900/80 p-4 text-left animate-in fade-in duration-200">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-medium text-emerald-400">
                  {loadingStep === 1 && "Connecting to media source..."}
                  {loadingStep === 2 && "Extracting high-definition stream formats..."}
                  {loadingStep === 3 && "Organizing video, audio & thumbnail options..."}
                </span>
                <span className="font-mono text-slate-500">
                  {loadingStep === 1 && "30%"}
                  {loadingStep === 2 && "70%"}
                  {loadingStep === 3 && "95%"}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500 rounded-full"
                  style={{
                    width:
                      loadingStep === 1 ? "35%" : loadingStep === 2 ? "75%" : "95%",
                  }}
                />
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-left text-xs text-rose-300 animate-in fade-in">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Sample URL Chips */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
            <span className="text-slate-500">Quick Test:</span>
            {SAMPLE_URLS.map((sample) => (
              <button
                key={sample.label}
                onClick={() => {
                  setUrl(sample.url);
                  handleExtract(sample.url);
                }}
                className="rounded-lg border border-white/5 bg-slate-900/60 px-2.5 py-1 text-slate-300 hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all"
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
