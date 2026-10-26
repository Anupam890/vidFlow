"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DownloadCloud } from "lucide-react";
import InstagramNavDropdown from "./InstagramNavDropdown";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "@/context/LanguageContext";

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const links = [
    { name: t("nav.youtube"), id: "youtube", href: "/youtube" },
    { name: t("nav.tiktok"), id: "tiktok", href: "/tiktok" },
    { name: t("nav.instagram"), id: "instagram", href: "/instagram" },
    { name: t("nav.twitter"), id: "twitter", href: "/twitter" },
    { name: t("nav.reddit"), id: "reddit", href: "/reddit" },
    { name: t("nav.pinterest"), id: "pinterest", href: "/pinterest" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#090d16]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 p-[1px] shadow-lg shadow-emerald-500/20 transition-transform group-hover:scale-105">
              <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-[#090d16]">
                <DownloadCloud className="h-5 w-5 text-emerald-400 transition-transform group-hover:-translate-y-0.5" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-0.5">
                Vid<span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Snap</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-emerald-400/80 font-medium -mt-1">
                {t("nav.tagline")}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 rounded-full border border-white/5 bg-slate-900/60 p-1">
            {links.map((link) => {
              if (link.id === "instagram") {
                return <InstagramNavDropdown key={link.href} />;
              }

              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                    isActive
                      ? "bg-emerald-500/15 text-emerald-400 shadow-sm border border-emerald-500/30"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
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
        <div className="lg:hidden flex overflow-x-auto border-t border-white/5 px-4 py-2 gap-2 scrollbar-none bg-[#090d16]/95 items-center">
          {links.map((link) => {
            const isActive =
              link.id === "instagram"
                ? pathname.startsWith("/instagram")
                : pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap rounded-lg px-3 py-1 text-xs font-medium transition-colors flex items-center gap-1 ${
                  isActive
                    ? link.id === "instagram"
                      ? "bg-pink-500/15 text-pink-400 border border-pink-500/30"
                      : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>{link.name}</span>
                {link.id === "instagram" && (
                  <span className="text-[10px] text-pink-400">▾</span>
                )}
              </Link>
            );
          })}
        </div>
      </header>
    </>
  );
}
