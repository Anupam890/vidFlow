"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Sparkles } from "lucide-react";
import { INSTAGRAM_TOOLS } from "@/lib/instagram-tools";
import { getInstagramToolIcon } from "./InstagramOptionIcons";
import { InstagramIcon } from "./BrandIcons";

interface InstagramNavDropdownProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

export default function InstagramNavDropdown({
  isMobile = false,
  onItemClick,
}: InstagramNavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isInstagramActive = pathname.startsWith("/instagram");

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Smooth hover handlers for desktop
  const handleMouseEnter = () => {
    if (isMobile) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  // Mobile Accordion View
  if (isMobile) {
    return (
      <div className="relative w-full" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
            isInstagramActive
              ? "bg-pink-500/15 text-pink-400 border border-pink-500/30 font-semibold"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <span className="flex items-center gap-1.5">
            <InstagramIcon className="h-3.5 w-3.5 text-pink-400" />
            <span>Instagram Options</span>
          </span>
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="mt-1 space-y-1 rounded-xl border border-white/10 bg-[#0c1222] p-2 animate-in fade-in slide-in-from-top-2 duration-150">
            {INSTAGRAM_TOOLS.map((tool) => {
              const isActive = pathname === tool.href;
              return (
                <Link
                  key={tool.id}
                  href={tool.href}
                  onClick={() => {
                    setIsOpen(false);
                    onItemClick?.();
                  }}
                  className={`flex items-center justify-between rounded-lg px-2.5 py-2 text-xs transition-colors ${
                    isActive
                      ? "bg-pink-500/20 text-pink-300 font-medium"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-pink-400">
                      {getInstagramToolIcon(tool.id, "h-4 w-4")}
                    </span>
                    <span>{tool.name}</span>
                  </div>
                  {tool.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full border ${
                        tool.badgeColor || "bg-pink-500/10 text-pink-400 border-pink-500/20"
                      }`}
                    >
                      {tool.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Desktop Dropdown
  return (
    <div
      className="relative inline-block text-left"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className={`group flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
          isInstagramActive
            ? "bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-orange-500/20 text-pink-300 shadow-sm border border-pink-500/30"
            : "text-slate-400 hover:text-white hover:bg-white/5"
        }`}
      >
        <InstagramIcon className="h-3.5 w-3.5 text-pink-400 transition-transform group-hover:scale-110" />
        <span>Instagram</span>
        <ChevronDown
          className={`h-3 w-3 text-slate-400 transition-transform duration-200 group-hover:text-white ${
            isOpen ? "rotate-180 text-pink-400" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu Panel */}
      {isOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[460px] rounded-2xl border border-white/10 bg-[#0b101e]/95 p-3 shadow-2xl backdrop-blur-2xl ring-1 ring-black/40 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 px-2 pb-2.5 mb-2">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-500 text-white shadow-sm">
                <InstagramIcon className="h-3.5 w-3.5" />
              </div>
              <span className="text-xs font-bold text-white tracking-wide">
                Instagram Download Tools
              </span>
            </div>
            <span className="text-[11px] text-pink-400 font-semibold px-2 py-0.5 rounded-full bg-pink-500/10 border border-pink-500/20">
              {INSTAGRAM_TOOLS.length} Tools
            </span>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-2 gap-1.5">
            {INSTAGRAM_TOOLS.map((tool) => {
              const isActive = pathname === tool.href;
              return (
                <Link
                  key={tool.id}
                  href={tool.href}
                  onClick={() => setIsOpen(false)}
                  className={`group flex items-start gap-2.5 rounded-xl p-2.5 text-left transition-all ${
                    isActive
                      ? "bg-pink-500/15 border border-pink-500/30"
                      : "hover:bg-white/5 border border-transparent hover:border-white/5"
                  }`}
                >
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-900 border border-white/10 text-pink-400 transition-colors group-hover:border-pink-500/40 group-hover:bg-pink-500/10">
                    {getInstagramToolIcon(tool.id, "h-3.5 w-3.5")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                        {tool.shortName}
                      </span>
                      {tool.id === "viewer" && (
                        <span className="rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-1.5 py-0.2 text-[9px] font-semibold leading-tight">
                          savefromins
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug line-clamp-1 group-hover:text-slate-300 mt-0.5">
                      {tool.badge || tool.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

         
         
        </div>
      )}
    </div>
  );
}
