"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { ADS_CONFIG } from "@/config/ads";

export default function StickyBottomAd() {
  const [dismissed, setDismissed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if dismissed in this session
    if (typeof window !== "undefined") {
      const isDismissed = sessionStorage.getItem("vidsnap_sticky_ad_dismissed");
      if (isDismissed === "true") {
        setDismissed(true);
      }
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("vidsnap_sticky_ad_dismissed", "true");
    }
  };

  if (!ADS_CONFIG.enabled || dismissed) return null;

  const zoneConfig = ADS_CONFIG.zones.stickyBottom;
  const hasRealAd = Boolean(zoneConfig.zoneId || zoneConfig.scriptUrl);

  // If placeholders are disabled and no real ad is configured, don't show
  if (!hasRealAd && !ADS_CONFIG.showPlaceholders) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] py-1.5 px-3 transition-transform duration-300">
      <div className="mx-auto max-w-4xl relative flex items-center justify-center min-h-[46px] sm:min-h-[50px]">
        {/* Dismiss Button */}
        <button
          onClick={handleDismiss}
          aria-label="Close Advertisement"
          className="absolute -top-2.5 right-0 sm:right-2 flex h-5 w-5 items-center justify-center rounded-full bg-slate-700 text-white hover:bg-slate-900 shadow-md transition-colors cursor-pointer text-xs"
        >
          <X className="h-3 w-3" />
        </button>

        {hasRealAd ? (
          <div
            ref={containerRef}
            id="monetag-sticky-bottom"
            className="flex items-center justify-center w-full"
          />
        ) : (
          <div className="flex items-center justify-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Advertisement
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
