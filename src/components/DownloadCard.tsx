"use client";

import { useState } from "react";
import {
  Download,
  Film,
  Music,
  Image as ImageIcon,
  ExternalLink,
  Check,
  Volume2,
  FileVideo,
  HardDrive,
  SlidersHorizontal,
  RotateCcw,
  Loader2,
  AlertCircle,
  X,
} from "lucide-react";
import { ExtractedMedia, MediaFormat } from "@/lib/types";
import { useTranslation } from "@/context/LanguageContext";

interface DownloadCardProps {
  media: ExtractedMedia;
}

function triggerBrowserDownload(url: string, filename: string) {
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
  }, 1500);
}

const RESOLUTION_RANKS: Record<string, number> = {
  "4K": 2160,
  "2K": 1440,
  "1080P": 1080,
  "720P": 720,
  "480P": 480,
  "360P": 360,
  "240P": 240,
  "144P": 144,
};

function getResolutionToken(fmt: MediaFormat): string {
  const match = fmt.quality.match(/\d+p|\d+K/i);
  if (match) return match[0].toUpperCase();
  if (fmt.resolution) {
    const resMatch = fmt.resolution.match(/\d+x(\d+)/);
    if (resMatch) return `${resMatch[1]}P`;
  }
  return fmt.quality.split(" ")[0].toUpperCase();
}

function formatBytes(bytes?: number): string {
  if (!bytes || bytes <= 0) return "--";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export default function DownloadCard({ media }: DownloadCardProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"video" | "audio" | "thumbnail">("video");
  const [formatFilter, setFormatFilter] = useState<"all" | "mp4" | "webm">("all");
  const [resolutionFilter, setResolutionFilter] = useState<string>("all");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const [isVertical, setIsVertical] = useState<boolean>(() => {
    const lowerUrl = (media.url || "").toLowerCase();
    if (
      lowerUrl.includes("/shorts/") ||
      lowerUrl.includes("/reel/") ||
      lowerUrl.includes("/reels/") ||
      lowerUrl.includes("tiktok.com") ||
      lowerUrl.includes("pinterest.com") ||
      lowerUrl.includes("pin.it")
    ) {
      return true;
    }

    for (const v of media.videos) {
      if (v.resolution) {
        const match = v.resolution.match(/(\d+)x(\d+)/);
        if (match) {
          const w = parseInt(match[1], 10);
          const h = parseInt(match[2], 10);
          if (h > w) return true;
          if (w > h) return false;
        }
      }
    }

    return media.platform === "tiktok" || media.platform === "pinterest";
  });

  const handleDownload = (
    format?: MediaFormat,
    isAudio = false,
    audioQuality = "320kbps",
    audioExt = "mp3"
  ) => {
    const id = format?.id || (isAudio ? `audio_${audioQuality}_${audioExt}` : "best");
    setDownloadingId(id);

    // Extract clean resolution token (e.g. "1080p", "720p", "4K", or "320kbps")
    const cleanResolution = isAudio
      ? audioQuality
      : format?.quality?.match(/\d+p|\d+K/i)?.[0] ||
        format?.quality?.replace(/\s+/g, "_") ||
        "HD";

    const BRANDING = "VidSnap";
    const sanitizedTitle = (media.title || "video")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "_")
      .slice(0, 60) || "video";

    const ext = isAudio ? audioExt : (format?.ext || "mp4");
    // branding_name_video_name_resolution_format
    const expectedFilename = `${BRANDING}_${sanitizedTitle}_${cleanResolution}.${ext}`;

    const params = new URLSearchParams({
      url: media.url,
      title: media.title,
      branding: BRANDING,
      quality: cleanResolution,
      ext: ext,
    });

    if (isAudio) {
      params.set("audio", "true");
    } else if (format?.id) {
      params.set("format_id", format.id);
    }

    const downloadEndpoint = `/api/download?${params.toString()}`;

    // Directly trigger browser download immediately
    triggerBrowserDownload(downloadEndpoint, expectedFilename);

    // Reset button state after brief feedback
    setTimeout(() => {
      setDownloadingId(null);
    }, 2000);
  };

  const uniqueResolutions = Array.from(
    new Set(media.videos.map((v) => getResolutionToken(v)))
  ).sort((a, b) => (RESOLUTION_RANKS[b] || 0) - (RESOLUTION_RANKS[a] || 0));

  const mp4Count = media.videos.filter((v) => (v.ext || "").toLowerCase() === "mp4").length;
  const webmCount = media.videos.filter((v) => (v.ext || "").toLowerCase() === "webm").length;

  const displayedVideos = media.videos.filter((v) => {
    const matchesContainer =
      formatFilter === "all" || (v.ext || "").toLowerCase() === formatFilter;
    const matchesResolution =
      resolutionFilter === "all" || getResolutionToken(v) === resolutionFilter;
    return matchesContainer && matchesResolution;
  });

  const isFiltered = formatFilter !== "all" || resolutionFilter !== "all";

  const resetFilters = () => {
    setFormatFilter("all");
    setResolutionFilter("all");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xl">
        {/* Top Header & Preview */}
        <div className="flex flex-col md:flex-row items-center gap-6 p-6 border-b border-slate-200 bg-slate-50/70">
          {/* Thumbnail with duration & aspect-ratio adaptation */}
          <div
            className={`relative shrink-0 overflow-hidden rounded-2xl bg-slate-900 border border-slate-200 shadow-sm transition-all duration-300 ${
              isVertical
                ? "aspect-[9/16] w-36 sm:w-44 md:w-48 mx-auto md:mx-0 shadow-md ring-1 ring-slate-900/5"
                : "aspect-video w-full md:w-72"
            }`}
          >
            {media.thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={media.thumbnail}
                alt={media.title}
                onLoad={(e) => {
                  const img = e.currentTarget;
                  if (img.naturalWidth && img.naturalHeight) {
                    setIsVertical(img.naturalHeight > img.naturalWidth);
                  }
                }}
                className="h-full w-full object-cover transition-transform hover:scale-105 duration-300"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-slate-400">
                <FileVideo className="h-10 w-10" />
              </div>
            )}
            {media.durationString && (
              <span className="absolute bottom-2 right-2 rounded-md bg-slate-900/85 px-2 py-0.5 font-mono text-[11px] font-medium text-white backdrop-blur-xs">
                {media.durationString}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 text-left flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 capitalize">
                {media.platform}
              </span>
              {media.uploader && (
                <span className="text-xs text-slate-500 truncate">
                  by {media.uploader}
                </span>
              )}
            </div>

            <h2 className="text-lg font-bold text-slate-900 line-clamp-2 mb-3">
              {media.title}
            </h2>

            <a
              href={media.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-emerald-600 transition-colors font-medium"
            >
              <span>View original source</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 bg-slate-100/60 px-6">
          <button
            onClick={() => setActiveTab("video")}
            className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "video"
                ? "border-emerald-600 text-emerald-700 bg-white shadow-xs rounded-t-lg -mb-[1px]"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <Film className="h-4 w-4 text-emerald-600" />
            <span>{t("card.video")}</span>
            <span className="ml-1 rounded-full bg-slate-200/80 px-2 py-0.2 text-[10px] text-slate-700 font-semibold">
              {media.videos.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("audio")}
            className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "audio"
                ? "border-emerald-600 text-emerald-700 bg-white shadow-xs rounded-t-lg -mb-[1px]"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <Music className="h-4 w-4 text-teal-600" />
            <span>{t("card.audio")}</span>
          </button>

          <button
            onClick={() => setActiveTab("thumbnail")}
            className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "thumbnail"
                ? "border-emerald-600 text-emerald-700 bg-white shadow-xs rounded-t-lg -mb-[1px]"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <ImageIcon className="h-4 w-4 text-cyan-600" />
            <span>{t("card.thumbnail")}</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "video" && (
            <div className="space-y-4">
              {media.videos.length === 0 ? (
                <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <p className="text-sm text-slate-600 mb-4 font-medium">
                    Ready to download highest quality MP4 stream:
                  </p>
                  <button
                    onClick={() => handleDownload()}
                    disabled={!!downloadingId}
                    className={`inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-xs font-semibold shadow-md transition-all cursor-pointer ${
                      downloadingId === "best"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300 ring-2 ring-emerald-500/20"
                        : downloadingId
                        ? "opacity-50 cursor-not-allowed bg-slate-100 text-slate-400"
                        : "bg-emerald-600 text-white hover:bg-emerald-500"
                    }`}
                  >
                    {downloadingId === "best" ? (
                      <>
                        <Loader2 className="h-4 w-4 text-emerald-700 animate-spin" />
                        <span>Starting Download...</span>
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4" />
                        <span>Download Best Quality MP4</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <>
                  {/* Clean Filter Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex flex-wrap items-center gap-4">
                      {/* Format Filter */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                          Format:
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setFormatFilter("all")}
                            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                              formatFilter === "all"
                                ? "bg-emerald-600 text-white shadow-xs"
                                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                            }`}
                          >
                            All ({media.videos.length})
                          </button>
                          <button
                            onClick={() => setFormatFilter("mp4")}
                            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                              formatFilter === "mp4"
                                ? "bg-emerald-600 text-white shadow-xs"
                                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                            }`}
                          >
                            MP4 ({mp4Count})
                          </button>
                          {webmCount > 0 && (
                            <button
                              onClick={() => setFormatFilter("webm")}
                              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                                formatFilter === "webm"
                                  ? "bg-emerald-600 text-white shadow-xs"
                                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                              }`}
                            >
                              WEBM ({webmCount})
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Resolution Dropdown Filter */}
                      <div className="flex items-center gap-1.5">
                        <SlidersHorizontal className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                          Resolution:
                        </span>
                        <select
                          value={resolutionFilter}
                          onChange={(e) => setResolutionFilter(e.target.value)}
                          className="px-2.5 py-1 text-xs font-bold rounded-lg bg-white border border-slate-200 text-slate-800 shadow-xs focus:outline-emerald-600 cursor-pointer"
                        >
                          <option value="all">All Resolutions</option>
                          {uniqueResolutions.map((res) => {
                            const count = media.videos.filter(
                              (v) => getResolutionToken(v) === res
                            ).length;
                            return (
                              <option key={res} value={res}>
                                {res} ({count})
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>

                    {/* Filter Reset & Status */}
                    <div className="flex items-center gap-2">
                      {isFiltered && (
                        <button
                          onClick={resetFilters}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                        >
                          <RotateCcw className="h-3 w-3" />
                          <span>Reset</span>
                        </button>
                      )}
                      <span className="text-[11px] font-medium text-slate-400">
                        {displayedVideos.length} format{displayedVideos.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  {displayedVideos.length === 0 ? (
                    <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                      <p className="text-sm font-semibold text-slate-700 mb-1">
                        No formats match your selected filters
                      </p>
                      <p className="text-xs text-slate-500 mb-4">
                        Try selecting another resolution or switching to All Containers.
                      </p>
                      <button
                        onClick={resetFilters}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors cursor-pointer shadow-xs"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        <span>Reset All Filters</span>
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between px-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        <span>Resolution & Spec</span>
                        <span className="hidden sm:inline">Total File Size</span>
                        <span>Download Action</span>
                      </div>

                  {displayedVideos.map((fmt) => {
                    const sizeBytes = fmt.filesize || fmt.filesizeApprox;
                    const sizeText = formatBytes(sizeBytes);
                    const isDownloading = downloadingId === fmt.id;

                    // Parse resolution cleanly (e.g. "1080p", "720p")
                    const resMatch = fmt.quality.match(/\d+p|\d+K/i);
                    const resDisplay = resMatch ? resMatch[0] : fmt.quality.split(" ")[0];

                    return (
                      <div
                        key={fmt.id + fmt.quality + fmt.ext}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4 hover:border-emerald-300 hover:bg-white hover:shadow-md transition-all group"
                      >
                        {/* Format Icon & Details */}
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 shadow-xs font-bold text-xs uppercase">
                            {fmt.ext || "mp4"}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="text-sm font-bold text-slate-900 truncate">
                                {fmt.quality}
                              </h4>
                              <span className="rounded-md bg-slate-100 border border-slate-200 text-slate-600 text-[10px] uppercase font-bold px-2 py-0.5">
                                {fmt.ext || "mp4"}
                              </span>
                            </div>

                            <div className="flex items-center gap-2.5 text-xs text-slate-500 mt-0.5">
                              <span className="inline-flex items-center gap-1 text-emerald-700 font-medium text-[11px]">
                                <Volume2 className="h-3.5 w-3.5 text-emerald-600" />
                                Audio Included
                              </span>
                              <span>•</span>
                              <span className="text-slate-600 font-mono text-[11px]">
                                {fmt.resolution || "Full Video Stream"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Size & Download Button */}
                        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                          {/* Resolution - Total MB Badge */}
                          <div className="flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 shadow-xs">
                            <HardDrive className="h-3.5 w-3.5 text-emerald-600" />
                            <div className="text-left">
                              <span className="text-[10px] text-slate-400 uppercase block font-semibold leading-none">
                                Total Size
                              </span>
                              <span className="text-xs font-mono font-bold text-slate-800">
                                {sizeText}
                              </span>
                            </div>
                          </div>

                          {/* Action Button */}
                          <button
                            onClick={() => handleDownload(fmt)}
                            disabled={!!downloadingId}
                            className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold shadow-xs transition-all cursor-pointer whitespace-nowrap min-w-[140px] ${
                              isDownloading
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-300 ring-2 ring-emerald-500/20"
                                : downloadingId
                                ? "opacity-50 cursor-not-allowed bg-slate-100 text-slate-400"
                                : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20 hover:shadow-md"
                            }`}
                          >
                            {isDownloading ? (
                              <>
                                <Loader2 className="h-4 w-4 text-emerald-700 animate-spin" />
                                <span>Starting Download...</span>
                              </>
                            ) : (
                              <>
                                <Download className="h-4 w-4" />
                                <span>Download {resDisplay}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </>
          )}
        </div>
      )}

          {activeTab === "audio" && (
            <div className="space-y-3">
              {(() => {
                const dur = media.duration && media.duration > 0 ? media.duration : 180;
                const audioItems = [
                  {
                    id: "audio_320k",
                    label: "Studio Quality (320 kbps)",
                    rate: "320kbps",
                    ext: "mp3",
                    badge: "Max Bitrate",
                    desc: "High-Fidelity MP3 Audio • Direct Sound Track",
                    size: Math.round((320 * 1000 / 8) * dur),
                  },
                  {
                    id: "audio_192k",
                    label: "High Quality (192 kbps)",
                    rate: "192kbps",
                    ext: "mp3",
                    badge: "High Quality",
                    desc: "Balanced Crystal Clear MP3 Audio",
                    size: Math.round((192 * 1000 / 8) * dur),
                  },
                  {
                    id: "audio_128k",
                    label: "Standard (128 kbps)",
                    rate: "128kbps",
                    ext: "mp3",
                    badge: "Compact Size",
                    desc: "Fast Download • Data Saver MP3",
                    size: Math.round((128 * 1000 / 8) * dur),
                  },
                  {
                    id: "audio_m4a",
                    label: "Apple AAC / M4A (192 kbps)",
                    rate: "192kbps",
                    ext: "m4a",
                    badge: "Native iOS/Mac",
                    desc: "High-Efficiency AAC Audio for Apple Devices",
                    size: Math.round((192 * 1000 / 8) * dur),
                  },
                  {
                    id: "audio_wav",
                    label: "Lossless Master (WAV)",
                    rate: "1411kbps",
                    ext: "wav",
                    badge: "Studio Master",
                    desc: "Uncompressed CD-Quality Audio",
                    size: Math.round((1411 * 1000 / 8) * dur),
                  },
                ];

                return audioItems.map((opt) => {
                  const isDownloading = downloadingId === `audio_${opt.rate}_${opt.ext}`;
                  const sizeText = formatBytes(opt.size);

                  return (
                    <div
                      key={opt.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-4 hover:border-teal-300 hover:bg-white hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 border border-teal-200 text-teal-700 shadow-xs">
                          <Music className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-bold text-slate-900">
                              {opt.label}
                            </p>
                            <span className="rounded-md bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5">
                              {opt.badge}
                            </span>
                            <span className="rounded-md bg-slate-200/80 text-slate-700 text-[10px] uppercase font-bold px-1.5 py-0.5">
                              {opt.ext}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 truncate">
                            {opt.desc}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                        {/* Audio Total Size Badge */}
                        <div className="flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 shadow-xs">
                          <HardDrive className="h-3.5 w-3.5 text-teal-600" />
                          <div className="text-left">
                            <span className="text-[10px] text-slate-400 uppercase block font-semibold leading-none">
                              Total Size
                            </span>
                            <span className="text-xs font-mono font-bold text-slate-800">
                              {sizeText}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDownload(undefined, true, opt.rate, opt.ext)}
                          disabled={!!downloadingId}
                          className={`w-full sm:w-auto flex items-center justify-center gap-1.5 rounded-xl px-5 py-2.5 text-xs font-semibold shadow-xs transition-all cursor-pointer whitespace-nowrap ${
                            isDownloading
                              ? "bg-teal-100 text-teal-800 border border-teal-300 ring-2 ring-teal-500/20"
                              : downloadingId
                              ? "opacity-50 cursor-not-allowed bg-slate-100 text-slate-400"
                              : "bg-teal-600 hover:bg-teal-500 text-white shadow-teal-600/20 hover:shadow-md"
                          }`}
                        >
                          {isDownloading ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin text-teal-700" />
                              <span>Starting Download...</span>
                            </>
                          ) : (
                            <>
                              <Download className="h-4 w-4" />
                              <span>Download {opt.ext.toUpperCase()}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          )}

          {activeTab === "thumbnail" && (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              {media.thumbnail ? (
                <>
                  <div className="max-w-md overflow-hidden rounded-xl border border-slate-200 shadow-md bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={media.thumbnail}
                      alt={media.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <a
                    href={media.thumbnail}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={`${media.title || "thumbnail"}.jpg`}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors shadow-md cursor-pointer"
                  >
                    <Download className="h-4 w-4" />
                    Download Full Resolution Image
                  </a>
                </>
              ) : (
                <p className="text-sm text-slate-500">
                  No preview photo available for this media item.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
