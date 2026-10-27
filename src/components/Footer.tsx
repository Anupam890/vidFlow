"use client";

import Link from "next/link";
import { DownloadCloud } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 text-xs">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold shadow-xs">
                <DownloadCloud className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-slate-900 tracking-tight">
                Vid<span className="text-emerald-600">Snap</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t("footer.desc")}
            </p>
          </div>

          {/* Platform Engines */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              {t("footer.platforms")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/yt" className="hover:text-emerald-600 transition-colors">
                  YouTube Downloader (/yt)
                </Link>
              </li>
              <li>
                <Link href="/tt" className="hover:text-emerald-600 transition-colors">
                  TikTok No-Watermark (/tt)
                </Link>
              </li>
              <li>
                <Link href="/ig" className="hover:text-emerald-600 transition-colors">
                  Instagram Video (/ig)
                </Link>
              </li>
              <li>
                <Link href="/tw" className="hover:text-emerald-600 transition-colors">
                  Twitter / X Video (/tw)
                </Link>
              </li>
            </ul>
          </div>

          {/* Sub-features */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              {t("footer.tools")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/rd" className="hover:text-emerald-600 transition-colors">
                  Reddit Video with Sound (/rd)
                </Link>
              </li>
              <li>
                <Link href="/pin" className="hover:text-emerald-600 transition-colors">
                  Pinterest Video & GIF (/pin)
                </Link>
              </li>
              <li>
                <Link href="/yt" className="hover:text-emerald-600 transition-colors">
                  YouTube to MP3 Converter
                </Link>
              </li>
              <li>
                <Link href="/yt" className="hover:text-emerald-600 transition-colors">
                  YouTube Shorts Downloader
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Policy */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              {t("footer.legal")}
            </h4>
            <ul className="space-y-2 text-slate-500">
              <li>
                <Link href="/terms" className="hover:text-emerald-600 transition-colors">
                  {t("footer.terms")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-emerald-600 transition-colors">
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link href="/terms#dmca" className="hover:text-emerald-600 transition-colors">
                  {t("footer.dmca")}
                </Link>
              </li>
              <li>
                <a
                  href="mailto:360xlabs@gmail.com"
                  className="hover:text-emerald-600 transition-colors"
                >
                  {t("footer.contact")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-200 pt-6 text-[11px] text-slate-500">
          <p>© 2026 VidSnap. {t("footer.rights")}</p>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <Link href="/terms" className="hover:text-slate-800 transition-colors">{t("footer.terms")}</Link>
            <Link href="/privacy" className="hover:text-slate-800 transition-colors">{t("footer.privacy")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
