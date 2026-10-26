"use client";

import Link from "next/link";
import { DownloadCloud, ShieldCheck, Heart } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-white/5 bg-[#060911] text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-slate-950 font-bold">
                <DownloadCloud className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Vid<span className="text-emerald-400">Snap</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t("footer.desc")}
            </p>
          </div>

          {/* Platform Engines */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              {t("footer.platforms")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/youtube" className="hover:text-emerald-400 transition-colors">
                  YouTube Downloader
                </Link>
              </li>
              <li>
                <Link href="/tiktok" className="hover:text-emerald-400 transition-colors">
                  TikTok No-Watermark
                </Link>
              </li>
              <li>
                <Link href="/instagram" className="hover:text-emerald-400 transition-colors">
                  Instagram Reels & Story
                </Link>
              </li>
              <li>
                <Link href="/twitter" className="hover:text-emerald-400 transition-colors">
                  Twitter / X Video
                </Link>
              </li>
            </ul>
          </div>

          {/* Sub-features */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              {t("footer.tools")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/reddit" className="hover:text-emerald-400 transition-colors">
                  Reddit Video with Sound
                </Link>
              </li>
              <li>
                <Link href="/pinterest" className="hover:text-emerald-400 transition-colors">
                  Pinterest Video & GIF
                </Link>
              </li>
              <li>
                <Link href="/youtube" className="hover:text-emerald-400 transition-colors">
                  YouTube to MP3 Converter
                </Link>
              </li>
              <li>
                <Link href="/youtube" className="hover:text-emerald-400 transition-colors">
                  YouTube Shorts Downloader
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Policy */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              {t("footer.legal")}
            </h4>
            <ul className="space-y-2 text-slate-500">
              <li>
                <Link href="/terms" className="hover:text-slate-300 transition-colors">
                  {t("footer.terms")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-slate-300 transition-colors">
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link href="/terms#dmca" className="hover:text-slate-300 transition-colors">
                  {t("footer.dmca")}
                </Link>
              </li>
              <li>
                <a
                  href="mailto:360xlabs@gmail.com"
                  className="hover:text-slate-300 transition-colors"
                >
                  {t("footer.contact")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/5 pt-6 text-[11px] text-slate-500">
          <p>© 2026 VidSnap. {t("footer.rights")}</p>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <Link href="/terms" className="hover:text-slate-400 transition-colors">{t("footer.terms")}</Link>
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">{t("footer.privacy")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
