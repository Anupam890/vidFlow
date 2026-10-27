"use client";

import { useState } from "react";
import {
  Search,
  ClipboardPaste,
  X,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { ExtractedMedia, Platform } from "@/lib/types";
import { useTranslation } from "@/context/LanguageContext";

interface HeroInputProps {
  onExtractSuccess: (data: ExtractedMedia) => void;
  initialPlatform?: Platform;
  defaultTitle?: string | React.ReactNode;
  defaultSubtitle?: string;
  placeholder?: string;
  sampleUrls?: { label: string; url: string }[];
  topSlot?: React.ReactNode;
}

export default function HeroInput({
  onExtractSuccess,
  defaultTitle,
  defaultSubtitle,
  placeholder,
  topSlot,
}: HeroInputProps) {
  const { t } = useTranslation();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

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

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && text.trim()) {
        const clean = text.trim();
        setUrl(clean);
        // Auto-fetch immediately on pasting via button
        handleExtract(clean);
      }
    } catch {
      setError("Clipboard access denied. Please paste manually into the input box.");
    }
  };

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {/* Dynamic Titles */}
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
          {defaultTitle || (
            <>
              {t("hero.title_part1")}{" "}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                {t("hero.title_part2")}
              </span>
            </>
          )}
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
          {defaultSubtitle || t("hero.subtitle")}
        </p>

        {/* Top Slot */}
        {topSlot && <div className="mt-8 mb-2 flex justify-center">{topSlot}</div>}

        {/* Input Bar Form */}
        <div className="mt-8 relative mx-auto max-w-3xl">
          <div className="group relative rounded-2xl p-1 bg-gradient-to-r from-emerald-500/25 via-teal-500/20 to-cyan-500/25 shadow-xl shadow-slate-200/80 transition-all focus-within:from-emerald-500 focus-within:to-cyan-500">
            <div className="flex flex-col sm:flex-row items-center gap-2 rounded-xl bg-white p-2 border border-slate-200/80">
              {/* Main Text Input */}
              <div className="relative flex-1 w-full flex items-center">
                <Search className="absolute left-3.5 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onPaste={(e) => {
                    // Auto-fetch immediately on pasting into input box
                    const pasted = e.clipboardData?.getData("text");
                    if (pasted && pasted.trim()) {
                      const clean = pasted.trim();
                      setUrl(clean);
                      handleExtract(clean);
                    }
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleExtract()}
                  placeholder={placeholder || t("hero.placeholder")}
                  className="w-full bg-transparent pl-11 pr-24 py-3.5 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none font-medium"
                  disabled={loading}
                />

                <div className="absolute right-3 flex items-center gap-1.5">
                  {url ? (
                    <button
                      onClick={() => setUrl("")}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
                      title="Clear input"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handlePaste}
                      className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-100/80 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer shadow-xs"
                      title="Paste from clipboard and fetch"
                    >
                      <ClipboardPaste className="h-3.5 w-3.5 text-emerald-600" />
                      <span>{t("hero.paste")}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={() => handleExtract()}
                disabled={loading}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 hover:opacity-95 disabled:opacity-50 transition-all shrink-0 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>{t("hero.processing")}</span>
                  </>
                ) : (
                  <>
                    <span>{t("hero.download")}</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Loading Progress Feedback */}
          {loading && (
            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm animate-in fade-in duration-200">
              <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                <span className="font-semibold text-emerald-600">
                  {loadingStep === 1 && t("hero.step1")}
                  {loadingStep === 2 && t("hero.step2")}
                  {loadingStep === 3 && t("hero.step3")}
                </span>
                <span className="font-mono text-slate-500 font-medium">
                  {loadingStep === 1 && "30%"}
                  {loadingStep === 2 && "70%"}
                  {loadingStep === 3 && "95%"}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
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
            <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-left text-xs text-rose-700 animate-in fade-in shadow-xs">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
