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

  // Size styling per slot
  const slotDimensions = {
    "top-banner": {
      label: "Top Banner (728x90 / 300x250)",
      heightClasses: "min-h-[100px] sm:min-h-[110px] max-w-4xl",
      desc: "Prime placement below search input",
    },
    "download-card": {
      label: "Download Card Inline Ad (300x250 / Responsive)",
      heightClasses: "min-h-[160px] max-w-xl",
      desc: "High-converting zone directly below video options",
    },
    "between-sections": {
      label: "Content Banner (728x90 / Responsive)",
      heightClasses: "min-h-[110px] max-w-5xl",
      desc: "Non-intrusive banner between content sections",
    },
  }[slot];

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
          className={`mx-auto flex items-center justify-center overflow-hidden ${slotDimensions.heightClasses}`}
        />
      </div>
    );
  }

  // If placeholders are disabled and no ad is configured, return nothing
  if (!ADS_CONFIG.showPlaceholders) return null;

  // Placeholder mode for visual testing and layout preparation
  return (
    <div className={`mx-auto w-full my-6 px-4 ${className}`}>
      <div className={`mx-auto flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300/80 bg-slate-100/60 p-4 text-center transition-all hover:bg-slate-100 ${slotDimensions.heightClasses}`}>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-800">
            Ad Space
          </span>
          <span className="text-xs font-semibold text-slate-700">
            {slotDimensions.label}
          </span>
        </div>
        <p className="text-[11px] text-slate-500 max-w-md">
          {slotDimensions.desc} • Configure in <code className="text-emerald-700 font-mono">src/config/ads.ts</code>
        </p>
      </div>
    </div>
  );
}
