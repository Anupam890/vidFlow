import React from "react";

interface BrandLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export default function BrandLogo({
  className = "",
  size = 40,
  showText = true,
}: BrandLogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Boxed Squircle Logo Container matching user's reference */}
      <div
        className="relative flex items-center justify-center shrink-0 rounded-xl p-[2px] bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-400 shadow-md shadow-emerald-500/20 transition-transform group-hover:scale-105"
        style={{ width: size, height: size }}
      >
        <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white">
          <svg
            className="text-emerald-600 transition-transform group-hover:scale-105"
            style={{ width: size * 0.58, height: size * 0.58 }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
            <path d="M12 12v8" />
            <path d="m8 16 4 4 4-4" />
          </svg>
        </div>
      </div>

      {showText && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-baseline">
            <span className="text-xl font-black tracking-tight text-slate-900">
              vidsnap
            </span>
            <span className="text-xl font-black tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              .tech
            </span>
          </div>
          <span className="text-[10px] font-semibold text-emerald-700 tracking-wide -mt-0.5">
            All Type of Downloader
          </span>
        </div>
      )}
    </div>
  );
}
