"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import {
  useTranslation,
  SUPPORTED_LANGUAGES,
  LanguageInfo,
} from "@/context/LanguageContext";

interface LanguageSelectorProps {
  isMobile?: boolean;
}

export default function LanguageSelector({ isMobile = false }: LanguageSelectorProps) {
  const { language, setLanguage, currentLangInfo } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
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

  const handleSelect = (lang: LanguageInfo) => {
    setLanguage(lang.code);
    setIsOpen(false);
  };

  const filtered = SUPPORTED_LANGUAGES.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.nativeName.toLowerCase().includes(search.toLowerCase()) ||
      l.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-slate-300 transition-all hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-400 cursor-pointer"
        title="Select Language"
      >
        <Globe className="h-3.5 w-3.5 text-emerald-400 transition-transform group-hover:rotate-12" />
        <span className="hidden sm:inline">{currentLangInfo.nativeName}</span>
        <span className="sm:hidden font-mono uppercase text-[11px]">
          {currentLangInfo.code}
        </span>
        <ChevronDown
          className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-emerald-400" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute ${
            isMobile ? "right-0" : "right-0"
          } top-full mt-2 w-64 rounded-2xl border border-white/10 bg-[#0b1020]/95 p-2.5 shadow-2xl backdrop-blur-2xl ring-1 ring-black/50 z-50 animate-in fade-in slide-in-from-top-2 duration-150`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-2 pb-2 mb-1.5 border-b border-white/5">
            <span className="text-xs font-bold text-white tracking-wide flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-emerald-400" />
              Choose Language
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              {SUPPORTED_LANGUAGES.length} Languages
            </span>
          </div>

          {/* Language Search */}
          <div className="px-1 mb-2">
            <input
              type="text"
              placeholder="Search language..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-slate-900/80 px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          {/* Language Options List */}
          <div className="max-h-56 overflow-y-auto space-y-0.5 pr-1">
            {filtered.map((lang) => {
              const isSelected = language === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelect(lang)}
                  className={`w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-emerald-500/15 text-emerald-300 font-medium border border-emerald-500/30"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{lang.flag}</span>
                    <span className="font-medium">{lang.nativeName}</span>
                    {lang.name !== lang.nativeName && (
                      <span className="text-[11px] text-slate-500">
                        ({lang.name})
                      </span>
                    )}
                  </div>
                  {isSelected && (
                    <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="mt-2 pt-2 border-t border-white/5 px-2 text-[10px] text-slate-500 text-center">
            Select your preferred display language
          </div>
        </div>
      )}
    </div>
  );
}
