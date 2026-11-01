"use client";

import { useEffect, useRef } from "react";
import { ADS_CONFIG } from "@/config/ads";

type AdSlotType = "top-banner" | "download-card" | "between-sections";

interface AdSlotProps {
  slot: AdSlotType;
  className?: string;
}

export default function AdSlot({ slot, className = "" }: AdSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  if (!ADS_CONFIG.enabled) return null;

  // Resolve zone config for this slot
  const zoneConfig =
    slot === "top-banner"
      ? ADS_CONFIG.zones.topBanner
      : slot === "download-card"
      ? ADS_CONFIG.zones.downloadCard
      : ADS_CONFIG.zones.betweenSections;

  const hasRealAd = Boolean(zoneConfig.zoneId || zoneConfig.scriptUrl);

  // If a real ad script is provided, inject it into the container dynamically
  useEffect(() => {
    if (!hasRealAd || !containerRef.current) return;

    if (zoneConfig.scriptUrl) {
      const script = document.createElement("script");
      script.src = zoneConfig.scriptUrl;
      script.async = true;
      if (zoneConfig.zoneId) {
        script.setAttribute("data-zone", zoneConfig.zoneId);
      }
      containerRef.current.appendChild(script);

      return () => {
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
        }
      };
    }
  }, [hasRealAd, zoneConfig]);

  const heightClasses =
    slot === "download-card"
      ? "min-h-[140px] max-w-xl"
      : slot === "top-banner"
      ? "min-h-[90px] max-w-4xl"
      : "min-h-[90px] max-w-5xl";

  // If real ad is configured, render container
  if (hasRealAd) {
    return (
      <div className={`mx-auto w-full text-center my-6 ${className}`}>
        <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">
          Advertisement
        </span>
        <div
          ref={containerRef}
          id={`monetag-slot-${slot}`}
          className={`mx-auto flex items-center justify-center overflow-hidden ${heightClasses}`}
        />
      </div>
    );
  }

  // If placeholders are disabled and no ad is configured, return nothing
  if (!ADS_CONFIG.showPlaceholders) return null;

  // Clean, minimal placeholder showing ONLY "Advertisement"
  return (
    <div className={`mx-auto w-full my-6 px-4 ${className}`}>
      <div className={`mx-auto flex items-center justify-center rounded-xl border border-dashed border-slate-200/90 bg-slate-50/70 p-4 text-center transition-all ${heightClasses}`}>
        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
          Advertisement
        </span>
      </div>
    </div>
  );
}
