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
  Sparkles,
  FileVideo,
} from "lucide-react";
import { ExtractedMedia, MediaFormat } from "@/lib/types";

interface DownloadCardProps {
  media: ExtractedMedia;
}

function formatBytes(bytes?: number): string {
  if (!bytes || bytes <= 0) return "--";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export default function DownloadCard({ media }: DownloadCardProps) {
  const [activeTab, setActiveTab] = useState<"video" | "audio" | "thumbnail">("video");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = (format?: MediaFormat, isAudio = false) => {
    const id = format?.id || (isAudio ? "audio" : "best");
    setDownloadingId(id);

    const params = new URLSearchParams({
      url: media.url,
      title: media.title,
    });

    if (isAudio) {
      params.set("audio", "true");
      params.set("ext", "mp3");
    } else if (format?.id) {
      params.set("format_id", format.id);
      params.set("ext", format.ext || "mp4");
    }

    const downloadEndpoint = `/api/download?${params.toString()}`;

    // Initiate browser download
    const link = document.createElement("a");
    link.href = downloadEndpoint;
    link.setAttribute("download", `${media.title}.${isAudio ? "mp3" : "mp4"}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setDownloadingId(null), 3000);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a]/90 backdrop-blur-xl shadow-2xl">
        {/* Top Header & Preview */}
        <div className="flex flex-col md:flex-row items-center gap-6 p-6 border-b border-white/5 bg-slate-900/40">
          {/* Thumbnail with duration */}
          <div className="relative aspect-video w-full md:w-72 shrink-0 overflow-hidden rounded-xl bg-slate-800 shadow-md">
            {media.thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={media.thumbnail}
                alt={media.title}
                className="h-full w-full object-cover transition-transform hover:scale-105 duration-300"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-slate-500">
                <FileVideo className="h-10 w-10" />
              </div>
            )}
            {media.durationString && (
              <span className="absolute bottom-2 right-2 rounded-md bg-black/80 px-2 py-0.5 font-mono text-[11px] font-medium text-white backdrop-blur-sm">
                {media.durationString}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400 capitalize">
                {media.platform}
              </span>
              {media.uploader && (
                <span className="text-xs text-slate-400 truncate">
                  by {media.uploader}
                </span>
              )}
            </div>

            <h2 className="text-lg font-bold text-white line-clamp-2 mb-3">
              {media.title}
            </h2>

            <a
              href={media.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <span>View original source</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-white/5 bg-slate-950/60 px-6">
          <button
            onClick={() => setActiveTab("video")}
            className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-semibold transition-all ${
              activeTab === "video"
                ? "border-emerald-500 text-emerald-400"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Film className="h-4 w-4" />
            <span>Video (MP4)</span>
            <span className="ml-1 rounded-full bg-white/5 px-1.5 py-0.2 text-[10px]">
              {media.videos.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("audio")}
            className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-semibold transition-all ${
              activeTab === "audio"
                ? "border-emerald-500 text-emerald-400"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Music className="h-4 w-4" />
            <span>Audio (MP3)</span>
          </button>

          <button
            onClick={() => setActiveTab("thumbnail")}
            className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-semibold transition-all ${
              activeTab === "thumbnail"
                ? "border-emerald-500 text-emerald-400"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <ImageIcon className="h-4 w-4" />
            <span>Cover Art / HD Photo</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "video" && (
            <div className="space-y-2.5">
              {media.videos.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-slate-400 mb-4">
                    Ready to stream best quality video:
                  </p>
                  <button
                    onClick={() => handleDownload()}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-2.5 text-xs font-semibold text-slate-950 hover:bg-emerald-400"
                  >
                    <Download className="h-4 w-4" />
                    Download Best Quality MP4
                  </button>
                </div>
              ) : (
                media.videos.map((fmt) => {
                  const size = fmt.filesize || fmt.filesizeApprox;
                  const isDownloading = downloadingId === fmt.id;
                  const isHighRes =
                    fmt.quality.includes("4K") ||
                    fmt.quality.includes("1080p") ||
                    fmt.quality.includes("2K");

                  return (
                    <div
                      key={fmt.id + fmt.quality}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl border border-white/5 bg-slate-900/50 p-3.5 hover:border-white/10 hover:bg-slate-900/80 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`rounded-lg px-2.5 py-1 text-xs font-bold ${
                            isHighRes
                              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                              : "bg-slate-800 text-slate-300"
                          }`}
                        >
                          {fmt.quality}
                        </span>

                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span className="uppercase font-mono text-[11px] text-slate-300">
                            {fmt.ext}
                          </span>
                          <span>•</span>
                          <span>{formatBytes(size)}</span>
                          <span>•</span>
                          <span className="inline-flex items-center gap-1 text-emerald-400/90 text-[11px]">
                            <Volume2 className="h-3 w-3" />
                            Audio Included
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDownload(fmt)}
                        disabled={isDownloading}
                        className="w-full sm:w-auto flex items-center justify-center gap-1.5 rounded-xl bg-white/10 hover:bg-emerald-500 hover:text-slate-950 px-4 py-2 text-xs font-semibold text-white transition-all shadow-sm"
                      >
                        {isDownloading ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                            <span>Starting...</span>
                          </>
                        ) : (
                          <>
                            <Download className="h-3.5 w-3.5" />
                            <span>Download {fmt.quality.split(" ")[0]}</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {activeTab === "audio" && (
            <div className="space-y-3">
              {[
                { label: "Studio Quality (320 kbps)", rate: "320k" },
                { label: "High Quality (192 kbps)", rate: "192k" },
                { label: "Standard (128 kbps)", rate: "128k" },
              ].map((opt) => (
                <div
                  key={opt.rate}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-slate-900/50 p-3.5 hover:border-white/10 hover:bg-slate-900/80 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500/10 text-teal-400">
                      <Music className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">
                        {opt.label}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        MP3 Audio • Lossless Audio Track
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownload(undefined, true)}
                    className="flex items-center gap-1.5 rounded-xl bg-teal-500/20 text-teal-300 hover:bg-teal-500 hover:text-slate-950 border border-teal-500/30 px-4 py-2 text-xs font-semibold transition-all"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Extract MP3</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "thumbnail" && (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              {media.thumbnail ? (
                <>
                  <div className="max-w-md overflow-hidden rounded-xl border border-white/10 shadow-lg">
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
                    download="thumbnail.jpg"
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-semibold text-slate-950 hover:bg-emerald-400 transition-colors shadow-md"
                  >
                    <Download className="h-4 w-4" />
                    Download HD Image
                  </a>
                </>
              ) : (
                <p className="text-sm text-slate-400">
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
