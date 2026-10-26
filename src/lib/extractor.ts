import { execFile } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";
import os from "os";
import { Platform, MediaFormat, ExtractedMedia, detectPlatform } from "./types";

export * from "./types";

const execFileAsync = promisify(execFile);

// Local FFmpeg directory
export const LOCAL_FFMPEG_DIR =
  "C:\\Users\\anupa\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-9.0.2-full_build\\bin";

if (process.env.PATH && !process.env.PATH.includes(LOCAL_FFMPEG_DIR)) {
  process.env.PATH = `${process.env.PATH};${LOCAL_FFMPEG_DIR}`;
}

// In-memory cache for parsed URLs (avoids redundant scraping & rate limits)
const mediaCache = new Map<string, { data: ExtractedMedia; expiresAt: number }>();

function getCachedMedia(url: string): ExtractedMedia | null {
  const item = mediaCache.get(url);
  if (item && item.expiresAt > Date.now()) {
    return item.data;
  }
  return null;
}

function setCachedMedia(url: string, data: ExtractedMedia) {
  mediaCache.set(url, { data, expiresAt: Date.now() + 15 * 60 * 1000 });
}

function formatDuration(seconds?: number): string {
  if (!seconds || isNaN(seconds)) return "";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  if (mins >= 60) {
    const hrs = Math.floor(mins / 60);
    const remMins = mins % 60;
    return `${hrs}:${remMins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

/**
 * Dedicated TikTok extractor using TikWM API
 * Bypasses regional geoblocks and removes TikTok watermarks automatically.
 */
async function extractTikTokWithTikWM(targetUrl: string): Promise<ExtractedMedia | null> {
  try {
    const res = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(targetUrl)}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!res.ok) return null;
    const json = await res.json();

    if (json.code === 0 && json.data) {
      const d = json.data;
      const videos: MediaFormat[] = [
        {
          id: "nowm",
          quality: "HD (No Watermark)",
          ext: "mp4",
          filesize: d.size,
          hasAudio: true,
          hasVideo: true,
          url: d.play,
        },
      ];

      if (d.hdplay) {
        videos.unshift({
          id: "hdnowm",
          quality: "Full HD (No Watermark)",
          ext: "mp4",
          filesize: d.hd_size || d.size,
          hasAudio: true,
          hasVideo: true,
          url: d.hdplay,
        });
      }

      const audios: MediaFormat[] = [];
      if (d.music) {
        audios.push({
          id: "music",
          quality: "Original Sound",
          ext: "mp3",
          filesize: d.music_info?.duration ? d.music_info.duration * 16000 : undefined,
          hasAudio: true,
          hasVideo: false,
          url: d.music,
        });
      }

      return {
        id: d.id || "tiktok_media",
        title: d.title || "TikTok Video (No Watermark)",
        thumbnail: d.cover || d.origin_cover || "",
        duration: d.duration,
        durationString: formatDuration(d.duration),
        uploader: d.author?.nickname || d.author?.unique_id || "TikTok User",
        uploaderUrl: d.author?.unique_id ? `https://www.tiktok.com/@${d.author.unique_id}` : "",
        platform: "tiktok",
        url: targetUrl,
        videos,
        audios,
        directDownloadUrl: d.play,
      };
    }
  } catch (e) {
    console.warn("TikWM extraction fallback failed:", e);
  }
  return null;
}

export async function extractMediaInfo(targetUrl: string): Promise<ExtractedMedia> {
  // Check memory cache first
  const cached = getCachedMedia(targetUrl);
  if (cached) return cached;

  const platform = detectPlatform(targetUrl);

  // If TikTok, use dedicated TikWM extractor for clean watermark-free video
  if (platform === "tiktok") {
    const tikTokData = await extractTikTokWithTikWM(targetUrl);
    if (tikTokData) {
      setCachedMedia(targetUrl, tikTokData);
      return tikTokData;
    }
  }

  const args = [
    "--ffmpeg-location",
    LOCAL_FFMPEG_DIR,
    "-J",
    "--no-warnings",
    "--no-check-certificates",
    "--flat-playlist",
    targetUrl,
  ];

  try {
    const { stdout } = await execFileAsync("yt-dlp", args, {
      maxBuffer: 50 * 1024 * 1024,
      env: process.env,
    });

    const info = JSON.parse(stdout);

    const rawFormats: any[] = info.formats || [];
    const videos: MediaFormat[] = [];
    const audios: MediaFormat[] = [];

    for (const f of rawFormats) {
      const vcodec = f.vcodec || "none";
      const acodec = f.acodec || "none";
      const hasVideo = vcodec !== "none";
      const hasAudio = acodec !== "none";

      const height = f.height || 0;
      let qualityLabel = "";
      if (height >= 2160) qualityLabel = "4K (2160p)";
      else if (height >= 1440) qualityLabel = "2K (1440p)";
      else if (height >= 1080) qualityLabel = "1080p Full HD";
      else if (height >= 720) qualityLabel = "720p HD";
      else if (height >= 480) qualityLabel = "480p";
      else if (height >= 360) qualityLabel = "360p";
      else if (height > 0) qualityLabel = `${height}p`;
      else if (f.format_note) qualityLabel = f.format_note;

      if (hasVideo) {
        const existing = videos.find(
          (v) => v.quality === qualityLabel && v.hasAudio === hasAudio
        );
        if (!existing && qualityLabel) {
          videos.push({
            id: f.format_id,
            ext: f.ext || "mp4",
            quality: qualityLabel,
            resolution: f.resolution || (height ? `${f.width || ""}x${height}` : undefined),
            filesize: f.filesize || undefined,
            filesizeApprox: f.filesize_approx || undefined,
            hasAudio,
            hasVideo: true,
            formatNote: f.format_note,
            url: f.url,
          });
        }
      } else if (hasAudio) {
        const abr = f.abr ? `${Math.round(f.abr)} kbps` : (f.format_note || "Audio");
        const existing = audios.find((a) => a.quality === abr);
        if (!existing) {
          audios.push({
            id: f.format_id,
            ext: f.ext || "mp3",
            quality: abr,
            filesize: f.filesize || undefined,
            filesizeApprox: f.filesize_approx || undefined,
            hasAudio: true,
            hasVideo: false,
            formatNote: f.format_note,
            url: f.url,
          });
        }
      }
    }

    const qualityWeight: Record<string, number> = {
      "4K (2160p)": 2160,
      "2K (1440p)": 1440,
      "1080p Full HD": 1080,
      "720p HD": 720,
      "480p": 480,
      "360p": 360,
    };

    videos.sort((a, b) => (qualityWeight[b.quality] || 0) - (qualityWeight[a.quality] || 0));
    audios.sort((a, b) => (b.filesize || 0) - (a.filesize || 0));

    if (videos.length === 0 && info.url) {
      videos.push({
        id: "direct",
        ext: info.ext || "mp4",
        quality: "Best Quality",
        hasAudio: true,
        hasVideo: true,
        url: info.url,
      });
    }

    const result: ExtractedMedia = {
      id: info.id || "media",
      title: info.title || "Video Download",
      thumbnail: info.thumbnail || "",
      duration: info.duration,
      durationString: formatDuration(info.duration),
      uploader: info.uploader || info.channel || "",
      uploaderUrl: info.uploader_url || "",
      platform,
      url: targetUrl,
      videos,
      audios,
      directDownloadUrl: info.url,
    };

    setCachedMedia(targetUrl, result);
    return result;
  } catch (error: any) {
    console.error("Extraction error:", error?.message || error);
    throw new Error(
      error?.stderr ||
        error?.message ||
        "Failed to parse video. Please verify the URL is valid and public."
    );
  }
}

/**
 * Downloads and prepares a clean, 100% compliant media file
 */
export async function prepareMediaFile(
  targetUrl: string,
  options: {
    formatId?: string;
    audioOnly?: boolean;
    ext?: string;
  }
): Promise<{ filePath: string; cleanup: () => void; size: number }> {
  const tempDir = os.tmpdir();
  const fileUid = `vidflow_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const targetExt = options.audioOnly ? "mp3" : "mp4";
  const finalPath = path.join(tempDir, `${fileUid}.${targetExt}`);

  const platform = detectPlatform(targetUrl);

  // If TikTok or cached direct stream
  const mediaData = getCachedMedia(targetUrl) || (platform === "tiktok" ? await extractTikTokWithTikWM(targetUrl) : null);
  if (mediaData && platform === "tiktok") {
    const streamUrl = options.audioOnly
      ? mediaData.audios[0]?.url
      : mediaData.videos[0]?.url;

    if (streamUrl) {
      const streamRes = await fetch(streamUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      });

      if (streamRes.ok) {
        const buffer = Buffer.from(await streamRes.arrayBuffer());
        fs.writeFileSync(finalPath, buffer);
        const stat = fs.statSync(finalPath);
        return {
          filePath: finalPath,
          cleanup: () => {
            try {
              if (fs.existsSync(finalPath)) fs.unlinkSync(finalPath);
            } catch {}
          },
          size: stat.size,
        };
      }
    }
  }

  // Standard extraction via yt-dlp
  const outputPattern = path.join(tempDir, `${fileUid}.%(ext)s`);

  const args = [
    "--ffmpeg-location",
    LOCAL_FFMPEG_DIR,
    "--no-warnings",
    "--no-check-certificates",
  ];

  if (options.audioOnly) {
    args.push("-x", "--audio-format", "mp3");
  } else if (options.formatId && options.formatId !== "direct") {
    args.push("-f", `${options.formatId}+bestaudio/best`);
    args.push("--merge-output-format", "mp4");
  } else {
    args.push("-f", "bestvideo+bestaudio/best");
    args.push("--merge-output-format", "mp4");
  }

  args.push("-o", outputPattern, targetUrl);

  await execFileAsync("yt-dlp", args, {
    maxBuffer: 50 * 1024 * 1024,
    env: process.env,
  });

  let generatedFile = finalPath;
  if (!fs.existsSync(generatedFile)) {
    const files = fs.readdirSync(tempDir).filter((f) => f.startsWith(fileUid));
    if (files.length > 0) {
      generatedFile = path.join(tempDir, files[0]);
    } else {
      throw new Error("Downloaded media file could not be generated.");
    }
  }

  const stat = fs.statSync(generatedFile);

  const cleanup = () => {
    try {
      if (fs.existsSync(generatedFile)) {
        fs.unlinkSync(generatedFile);
      }
    } catch {}
  };

  return { filePath: generatedFile, cleanup, size: stat.size };
}
