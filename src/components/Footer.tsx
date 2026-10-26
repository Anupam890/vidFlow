import Link from "next/link";
import { DownloadCloud, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
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
                vid<span className="text-emerald-400">Flow</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed">
              Ultra-fast online video and audio downloader with 4K resolution support and watermark removal.
            </p>
          </div>

          {/* Platform Engines */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Platforms
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
              Tools
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
              Legal & Safety
            </h4>
            <ul className="space-y-2 text-slate-500">
              <li>
                <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
              </li>
              <li>
                <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
              </li>
              <li>
                <span className="hover:text-slate-300 cursor-pointer">DMCA & Copyright</span>
              </li>
              <li>
                <span className="hover:text-slate-300 cursor-pointer">Contact Support</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Notice */}
        {/* <div className="rounded-xl border border-white/5 bg-slate-900/40 p-4 mb-8 text-[11px] text-slate-500 leading-relaxed">
          <p className="flex items-center gap-1.5 font-semibold text-slate-400 mb-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            Disclaimer & DMCA Compliance
          </p>
          <p>
            vidFlow is an independent utility tool designed for personal offline backup, fair use, and educational archiving. vidFlow does not host, store, or archive any copyrighted videos on its servers. All media streams are fetched directly from the respective public CDN nodes of third-party platforms. All trademarks, logos, and copyrights belong to their respective owners.
          </p>
        </div> */}

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center border-t border-white/5 pt-6 text-[11px] text-slate-500">
          <p className="flex items-center gap-1 mt-2 sm:mt-0">© 2026 vidFlow. All rights reserved.</p>
          {/* <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Engineered with Next.js & High-Speed Stream Pipe
          </p> */}
        </div>
      </div>
    </footer>
  );
}
