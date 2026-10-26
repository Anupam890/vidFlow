"use client";

import { X, Sparkles, Download, CheckCircle, ShieldCheck } from "lucide-react";

interface ExtensionModalProps {
  onClose: () => void;
}

export default function ExtensionModal({ onClose }: ExtensionModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#0f172a] p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 shadow-lg shadow-emerald-500/20">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">vidFlow Browser Extension</h3>
            <p className="text-xs text-slate-400">Available for Chrome, Brave, Edge & Opera</p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-slate-900/60 p-3.5">
            <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-white">1-Click Download Button</p>
              <p className="text-xs text-slate-400">
                Adds a neat "Download 4K / MP3" button directly under YouTube, TikTok, and Instagram players.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-slate-900/60 p-3.5">
            <ShieldCheck className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-white">Zero Tracking & Clean</p>
              <p className="text-xs text-slate-400">
                No third-party trackers, no adware, completely open-source and privacy-focused.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <button
            onClick={() => {
              alert("The vidFlow extension package will be ready for installation from the Chrome Web Store upon release.");
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/25 hover:opacity-95 transition-all"
          >
            <Download className="h-4 w-4" />
            Add to Chrome (Free)
          </button>
          <button
            onClick={onClose}
            className="w-full py-2.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
