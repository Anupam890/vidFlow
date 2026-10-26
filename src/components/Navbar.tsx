"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DownloadCloud, Sparkles } from "lucide-react";
import { useState } from "react";
import ExtensionModal from "./ExtensionModal";

export default function Navbar() {
  const pathname = usePathname();
  const [showExtension, setShowExtension] = useState(false);

  const links = [
    { name: "Universal", href: "/" },
    { name: "YouTube", href: "/youtube" },
    { name: "TikTok", href: "/tiktok" },
    { name: "Instagram", href: "/instagram" },
    { name: "Twitter / X", href: "/twitter" },
    { name: "Reddit", href: "/reddit" },
    { name: "Pinterest", href: "/pinterest" },
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
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
                vid<span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Flow</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-emerald-400/80 font-medium -mt-1">
                Ultra Fast Downloader
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 rounded-full border border-white/5 bg-slate-900/60 p-1">
            {links.map((link) => {
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
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowExtension(true)}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 transition-all hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-400"
            >
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span className="hidden sm:inline">Get Extension</span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="lg:hidden flex overflow-x-auto border-t border-white/5 px-4 py-2 gap-2 scrollbar-none bg-[#090d16]/95">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </header>

      {showExtension && (
        <ExtensionModal onClose={() => setShowExtension(false)} />
      )}
    </>
  );
}
