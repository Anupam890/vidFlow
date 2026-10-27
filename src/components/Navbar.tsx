"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DownloadCloud } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "@/context/LanguageContext";

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const links = [
    { name: t("nav.youtube"), id: "youtube", href: "/yt", aliases: ["/youtube"] },
    { name: t("nav.tiktok"), id: "tiktok", href: "/tt", aliases: ["/tiktok"] },
    { name: t("nav.instagram"), id: "instagram", href: "/ig", aliases: ["/instagram"] },
    { name: t("nav.twitter"), id: "twitter", href: "/tw", aliases: ["/twitter", "/x"] },
    { name: t("nav.reddit"), id: "reddit", href: "/rd", aliases: ["/reddit"] },
    { name: t("nav.pinterest"), id: "pinterest", href: "/pin", aliases: ["/pinterest"] },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-xl shadow-xs">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 p-[1px] shadow-md shadow-emerald-500/15 transition-transform group-hover:scale-105">
              <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-white">
                <DownloadCloud className="h-5 w-5 text-emerald-600 transition-transform group-hover:-translate-y-0.5" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-0.5">
                Vid<span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">Snap</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-emerald-600 font-semibold -mt-1">
                {t("nav.tagline")}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 rounded-full border border-slate-200 bg-slate-100/70 p-1">
            {links.map((link) => {
              const isActive =
                pathname === link.href || link.aliases.includes(pathname);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                    isActive
                      ? "bg-white text-emerald-700 shadow-xs border border-emerald-500/30 font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <LanguageSelector />
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="lg:hidden flex overflow-x-auto border-t border-slate-200 px-4 py-2 gap-2 scrollbar-none bg-white/95 items-center">
          {links.map((link) => {
            const isActive =
              pathname === link.href || link.aliases.includes(pathname);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap rounded-lg px-3 py-1 text-xs font-medium transition-colors flex items-center gap-1 ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      </header>
    </>
  );
}
