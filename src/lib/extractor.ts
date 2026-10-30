import { execFile } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";
import os from "os";
import crypto from "crypto";
import { Platform, MediaFormat, ExtractedMedia, detectPlatform } from "./types";

export * from "./types";

const execFileAsync = promisify(execFile);

// Local FFmpeg directory
export const LOCAL_FFMPEG_DIR =
  "C:\\Users\\anupa\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-9.0.2-full_build\\bin";

try {
  if (fs.existsSync(/*turbopackIgnore: true*/ LOCAL_FFMPEG_DIR)) {
    if (process.env.PATH && !process.env.PATH.includes(LOCAL_FFMPEG_DIR)) {
      process.env.PATH = `${process.env.PATH};${LOCAL_FFMPEG_DIR}`;
    }
  }
} catch {}

// Persistent file-based cache paths across Next.js workers
const CACHE_DIR = path.join(os.tmpdir(), "vidflow_cache");
const PREPARED_DIR = path.join(os.tmpdir(), "vidflow_files");

try {
  if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });
  if (!fs.existsSync(PREPARED_DIR)) fs.mkdirSync(PREPARED_DIR, { recursive: true });
} catch {}

// Re-encoding is the most expensive thing this server does. Anything above
// these limits is refused rather than allowed to monopolise the machine.
const MAX_TRANSCODE_HEIGHT = Number(process.env.MAX_TRANSCODE_HEIGHT || 720);
const MAX_TRANSCODE_SECONDS = Number(process.env.MAX_TRANSCODE_SECONDS || 600);

const FFMPEG_LOW_PRIORITY = process.platform !== "win32";

/**
 * Runs ffmpeg pinned to a single thread and at low CPU priority, so a long
 * transcode cannot starve the web server on a small box.
 */
function runFfmpeg(args: string[]) {
  const throttled = ["-threads", "1", "-filter_threads", "1", ...args];
  return FFMPEG_LOW_PRIORITY
    ? execFileAsync("nice", ["-n", "15", "ffmpeg", ...throttled], { env: process.env })
    : execFileAsync("ffmpeg", throttled, { env: process.env });
}

function getCacheKey(url: string): string {
  const clean = (url || "").trim().toLowerCase().replace(/\/$/, "");
  return crypto.createHash("md5").update(clean).digest("hex");
}

interface CachedItem {
  data: ExtractedMedia;
  rawFormats?: any[];
  expiresAt: number;
}

const memoryCache = new Map<string, CachedItem>();

export function getCachedMedia(url: string): ExtractedMedia | null {
  const key = getCacheKey(url);
  const now = Date.now();

  const mem = memoryCache.get(key);
  if (mem && mem.expiresAt > now) {
    return mem.data;
  }

  const cacheFile = path.join(CACHE_DIR, `${key}.json`);
  try {
    if (fs.existsSync(cacheFile)) {
      const content = fs.readFileSync(cacheFile, "utf-8");
      const parsed: CachedItem = JSON.parse(content);
      if (parsed.expiresAt > now) {
        memoryCache.set(key, parsed);
        return parsed.data;
      }
    }
  } catch {}

  return null;
}

export function getCachedRawFormats(url: string): any[] | null {
  const key = getCacheKey(url);
  const mem = memoryCache.get(key);
  if (mem?.rawFormats) return mem.rawFormats;

  const cacheFile = path.join(CACHE_DIR, `${key}.json`);
  try {
    if (fs.existsSync(cacheFile)) {
      const content = fs.readFileSync(cacheFile, "utf-8");
      const parsed: CachedItem = JSON.parse(content);
      if (parsed.expiresAt > Date.now()) {
        return parsed.rawFormats || null;
      }
    }
  } catch {}
  return null;
}

export function setCachedMedia(url: string, data: ExtractedMedia, rawFormats?: any[]) {
  const key = getCacheKey(url);
  const expiresAt = Date.now() + 30 * 60 * 1000;
  const item: CachedItem = { data, rawFormats, expiresAt };
  memoryCache.set(key, item);

  try {
    const cacheFile = path.join(CACHE_DIR, `${key}.json`);
    fs.writeFileSync(cacheFile, JSON.stringify(item), "utf-8");
  } catch {}
}

/**
 * Discovers ffmpeg location for yt-dlp.
 * On Docker / Linux production, ffmpeg is in system PATH (/usr/bin/ffmpeg).
 * On local Windows, uses LOCAL_FFMPEG_DIR if it exists.
 */
export function getFfmpegLocationArgs(): string[] {
  if (process.env.FFMPEG_LOCATION && fs.existsSync(/*turbopackIgnore: true*/ process.env.FFMPEG_LOCATION)) {
    return ["--ffmpeg-location", process.env.FFMPEG_LOCATION];
  }
  try {
    if (LOCAL_FFMPEG_DIR && fs.existsSync(/*turbopackIgnore: true*/ LOCAL_FFMPEG_DIR)) {
      return ["--ffmpeg-location", LOCAL_FFMPEG_DIR];
    }
  } catch {}
  return [];
}

/**
 * Automatically discovers cookies for platforms requiring authentication (e.g. Instagram stories)
 */
export function getCookiesArgs(): string[] {
  const possiblePaths = [
    process.env.COOKIES_PATH,
    process.env.INSTAGRAM_COOKIES_PATH,
    path.resolve(process.cwd(), "cookies.txt"),
    path.resolve(process.cwd(), "instagram_cookies.txt"),
  ].filter(Boolean) as string[];

  for (const p of possiblePaths) {
    if (fs.existsSync(/*turbopackIgnore: true*/ p)) {
      return ["--cookies", p];
    }
  }

  // Support INSTAGRAM_SESSION_ID in .env or environment
  const sessionId = process.env.INSTAGRAM_SESSION_ID;
  if (sessionId) {
    const cookieFile = path.resolve(os.tmpdir(), "vidsnap_instagram_session.txt");
    const cookieContent = `# Netscape HTTP Cookie File\n.instagram.com\tTRUE\t/\tTRUE\t2147483647\tsessionid\t${sessionId.trim()}\n`;
    try {
      fs.writeFileSync(/*turbopackIgnore: true*/ cookieFile, cookieContent, "utf-8");
      return ["--cookies", cookieFile];
    } catch {}
  }

  return [];
}

/**
 * Clean, user-friendly error messages for platform restrictions
 */
function formatExtractionError(rawError: any): string {
  const msg = String(rawError?.stderr || rawError?.message || "");

  if (
    msg.includes("You need to log in to access this content") ||
    msg.includes("[instagram:story]") ||
    msg.includes("Use --cookies") ||
    msg.includes("login_required")
  ) {
    return "Instagram Stories & Highlights require an Instagram session. To enable story downloads, save a cookies.txt file into the vidsnap folder or set INSTAGRAM_SESSION_ID in .env.local. Public Reels and Posts can be downloaded directly without login.";
  }

  if (msg.includes("empty media response") || msg.includes("Unable to extract data")) {
    return "Instagram did not return media for this link. The story or post might be expired, private, or temporarily rate-limited. Try public Reels or feed posts.";
  }

  if (msg.includes("Private video") || msg.includes("account is private")) {
    return "This media belongs to a private account and cannot be accessed anonymously.";
  }

  if (msg.includes("Video unavailable") || msg.includes("This content isn't available right now")) {
    return "This content is unavailable or has been removed from the platform.";
  }

  return rawError?.stderr || rawError?.message || "Failed to parse video. Please verify the URL is valid and public.";
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
 * Returns typical bitrate in kbps for a given resolution height
 */
export function estimateBitrateByHeight(height: number): number {
  if (height >= 2160) return 18000;
  if (height >= 1440) return 9500;
  if (height >= 1080) return 3800;
  if (height >= 720) return 1900;
  if (height >= 480) return 950;
  if (height >= 360) return 520;
  if (height >= 240) return 290;
  return 160;
}

/**
 * Builds rich, comprehensive audio formats with exact computed total file sizes
 */
export function buildStandardAudioFormats(durationSec?: number): MediaFormat[] {
  const dur = durationSec && durationSec > 0 ? durationSec : 180;
  return [
    {
      id: "audio_320k",
      ext: "mp3",
      quality: "Studio Quality (320 kbps)",
      filesize: Math.round((320 * 1000 / 8) * dur),
      filesizeApprox: Math.round((320 * 1000 / 8) * dur),
      hasAudio: true,
      hasVideo: false,
      formatNote: "Max Bitrate MP3",
    },
    {
      id: "audio_192k",
      ext: "mp3",
      quality: "High Quality (192 kbps)",
      filesize: Math.round((192 * 1000 / 8) * dur),
      filesizeApprox: Math.round((192 * 1000 / 8) * dur),
      hasAudio: true,
      hasVideo: false,
      formatNote: "High Quality MP3",
    },
    {
      id: "audio_128k",
      ext: "mp3",
      quality: "Standard (128 kbps)",
      filesize: Math.round((128 * 1000 / 8) * dur),
      filesizeApprox: Math.round((128 * 1000 / 8) * dur),
      hasAudio: true,
      hasVideo: false,
      formatNote: "Compact MP3",
    },
    {
      id: "audio_m4a",
      ext: "m4a",
      quality: "Apple AAC / M4A (192 kbps)",
      filesize: Math.round((192 * 1000 / 8) * dur),
      filesizeApprox: Math.round((192 * 1000 / 8) * dur),
      hasAudio: true,
      hasVideo: false,
      formatNote: "Crisp iOS / Mac Audio",
    },
    {
      id: "audio_wav",
      ext: "wav",
      quality: "Lossless Master (WAV)",
      filesize: Math.round((1411 * 1000 / 8) * dur),
      filesizeApprox: Math.round((1411 * 1000 / 8) * dur),
      hasAudio: true,
      hasVideo: false,
      formatNote: "Uncompressed Studio Audio",
    },
  ];
}

/**
 * Dedicated TikTok extractor using TikWM API
 * Bypasses regional geoblocks, removes TikTok watermarks automatically,
 * and provides full ladder of video resolutions (1080p, 720p, 480p, 360p) in MP4 & WEBM.
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
      const duration = d.duration || 30;
      const baseSize = d.hd_size || d.size || Math.round((3800 * 1000 / 8) * duration);

      const videos: MediaFormat[] = [
        {
          id: d.hdplay ? "hdnowm" : "nowm",
          quality: "1080p Full HD",
          ext: "mp4",
          resolution: "1080x1920",
          filesize: baseSize,
          filesizeApprox: baseSize,
          hasAudio: true,
          hasVideo: true,
          url: d.hdplay || d.play,
          qualityRank: 1080,
        },
        {
          id: "nowm",
          quality: "720p HD",
          ext: "mp4",
          resolution: "720x1280",
          filesize: d.size || Math.round(baseSize * 0.65),
          filesizeApprox: d.size || Math.round(baseSize * 0.65),
          hasAudio: true,
          hasVideo: true,
          url: d.play,
          qualityRank: 720,
        },
        {
          id: "scale:480:mp4",
          quality: "480p",
          ext: "mp4",
          resolution: "480x854",
          filesize: Math.round(baseSize * 0.38),
          filesizeApprox: Math.round(baseSize * 0.38),
          hasAudio: true,
          hasVideo: true,
          qualityRank: 480,
          isTranscode: true,
        },
        {
          id: "scale:360:mp4",
          quality: "360p",
          ext: "mp4",
          resolution: "360x640",
          filesize: Math.round(baseSize * 0.24),
          filesizeApprox: Math.round(baseSize * 0.24),
          hasAudio: true,
          hasVideo: true,
          qualityRank: 360,
          isTranscode: true,
        },
      ];

      const audios = buildStandardAudioFormats(d.duration);
      if (d.music) {
        audios[0].url = d.music;
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

  const cookieArgs = getCookiesArgs();

  const args = [
    ...getFfmpegLocationArgs(),
    "-J",
    "--no-warnings",
    "--no-check-certificates",
    "--flat-playlist",
    "--remote-components", "ejs:github",
    "--js-runtimes", "node",
    ...cookieArgs,
    targetUrl,
  ];

  try {
    const { stdout } = await execFileAsync("yt-dlp", args, {
      maxBuffer: 50 * 1024 * 1024,
      env: process.env,
    });

    const info = JSON.parse(stdout);
    const duration = info.duration || 0;

    const rawFormats: any[] = info.formats || [];

    // 1. Identify best available audio track for accurate total file size computation
    const audioFormats = rawFormats.filter(
      (f) => (f.acodec && f.acodec !== "none" && (!f.vcodec || f.vcodec === "none")) ||
             (f.resolution === "audio only")
    );
    let bestAudioSize = 0;
    for (const a of audioFormats) {
      const aSize = a.filesize || a.filesize_approx || (a.abr && duration ? Math.round((a.abr * 1000 / 8) * duration) : 0);
      if (aSize > bestAudioSize) {
        bestAudioSize = aSize;
      }
    }
    if (!bestAudioSize && duration) {
      bestAudioSize = Math.round((128 * 1000 / 8) * duration);
    }

    // 2. Map and deduplicate video formats
    const formatMap = new Map<string, MediaFormat>();
    let maxQualityRank = 0;
    let baseRefSize = 0;

    for (const f of rawFormats) {
      const vcodec = f.vcodec || "none";
      const hasVideo = vcodec !== "none" || (f.height && f.height > 0);
      if (!hasVideo && !f.height && !f.width) continue;

      const width = f.width || 0;
      const height = f.height || 0;
      // Appropriately handle vertical / portrait videos (e.g. 1080x1920 is 1080p tier)
      const effectiveHeight = (height > width && width > 0) ? width : height;

      let qualityLabel = "";
      let qualityRank = 0;
      if (effectiveHeight >= 2160) { qualityLabel = "4K (2160p)"; qualityRank = 2160; }
      else if (effectiveHeight >= 1440) { qualityLabel = "2K (1440p)"; qualityRank = 1440; }
      else if (effectiveHeight >= 1080) { qualityLabel = "1080p Full HD"; qualityRank = 1080; }
      else if (effectiveHeight >= 720) { qualityLabel = "720p HD"; qualityRank = 720; }
      else if (effectiveHeight >= 480) { qualityLabel = "480p"; qualityRank = 480; }
      else if (effectiveHeight >= 360) { qualityLabel = "360p"; qualityRank = 360; }
      else if (effectiveHeight >= 240) { qualityLabel = "240p"; qualityRank = 240; }
      else if (effectiveHeight >= 144) { qualityLabel = "144p"; qualityRank = 144; }
      else if (effectiveHeight > 0) { qualityLabel = `${effectiveHeight}p`; qualityRank = effectiveHeight; }
      else if (f.format_note) { qualityLabel = f.format_note; qualityRank = 1; }
      else continue;

      if (qualityRank > maxQualityRank) {
        maxQualityRank = qualityRank;
      }

      const ext = (f.ext || (f.video_ext !== "none" ? f.video_ext : "mp4") || "mp4").toLowerCase();
      // Keep standard user-facing containers: mp4 and webm
      if (ext !== "mp4" && ext !== "webm") continue;

      let rawSize = f.filesize || f.filesize_approx;
      if (!rawSize && f.tbr && duration) {
        rawSize = Math.round((f.tbr * 1000 / 8) * duration);
      } else if (!rawSize && f.vbr && duration) {
        rawSize = Math.round((f.vbr * 1000 / 8) * duration);
      } else if (!rawSize && effectiveHeight && duration) {
        rawSize = Math.round((estimateBitrateByHeight(effectiveHeight) * 1000 / 8) * duration);
      }

      const hasAudio = f.acodec && f.acodec !== "none";
      // Crucial: Video-only DASH streams get merged with best audio, so total size must include audio track!
      const totalSize = hasAudio ? rawSize : ((rawSize || 0) + bestAudioSize);

      if (totalSize && totalSize > baseRefSize) {
        baseRefSize = totalSize;
      }

      const isM3u8 = (f.protocol && f.protocol.toLowerCase().includes("m3u8")) ||
                     (f.url && f.url.toLowerCase().includes(".m3u8"));
      const isDirectHttps = !isM3u8 && (f.url?.startsWith("http") || f.protocol === "https" || f.protocol === "http");
      const key = `${qualityLabel}_${ext}`;

      const candidate: MediaFormat = {
        id: f.format_id,
        ext,
        quality: qualityLabel,
        resolution: f.resolution || (height ? (width ? `${width}x${height}` : `${height}p`) : undefined),
        filesize: totalSize || undefined,
        filesizeApprox: totalSize || undefined,
        hasAudio: true,
        hasVideo: true,
        formatNote: f.format_note,
        url: f.url,
        qualityRank,
      };

      if (!formatMap.has(key)) {
        formatMap.set(key, candidate);
      } else {
        const prev = formatMap.get(key)!;
        const prevIsM3u8 = (prev.url && prev.url.toLowerCase().includes(".m3u8"));

        // CRITICAL SPEED FIX: Direct HTTPS byte streams must ALWAYS take precedence over throttled HLS m3u8 manifests
        if (prevIsM3u8 && !isM3u8) {
          formatMap.set(key, candidate);
        } else if (!prevIsM3u8 && isM3u8) {
          // Keep fast direct stream, do not overwrite with slow m3u8
        } else if ((!prev.filesize || prev.filesize <= 0) && totalSize && totalSize > 0) {
          formatMap.set(key, candidate);
        } else if (f.tbr && prev.filesize && totalSize && totalSize > prev.filesize) {
          formatMap.set(key, candidate);
        }
      }
    }

    // 3. Guarantee full resolution ladder downwards so users are NEVER restricted to only 1-2 formats
    const standardTiers = [
      { label: "1080p Full HD", rank: 1080, res: "1920x1080", ratio: 1.0 },
      { label: "720p HD", rank: 720, res: "1280x720", ratio: 0.65 },
      { label: "480p", rank: 480, res: "854x480", ratio: 0.38 },
      { label: "360p", rank: 360, res: "640x360", ratio: 0.24 },
    ];

    // Only synthesise MP4 tiers. A missing tier has to be re-encoded on demand,
    // and VP9/WebM encoding is far too expensive for a small shared box — a
    // single clip can occupy every core for longer than the video itself runs.
    const effectiveMaxRank = maxQualityRank > 0 ? maxQualityRank : 1080;
    for (const tier of standardTiers) {
      if (tier.rank > effectiveMaxRank) continue;
      if (tier.rank > MAX_TRANSCODE_HEIGHT) continue;

      const key = `${tier.label}_mp4`;
      if (formatMap.has(key)) continue;

      const estBytes = baseRefSize > 0
        ? Math.round(baseRefSize * tier.ratio)
        : Math.round(((estimateBitrateByHeight(tier.rank) + 128) * 1000 / 8) * (duration || 180));

      formatMap.set(key, {
        id: `scale:${tier.rank}:mp4`,
        ext: "mp4",
        quality: tier.label,
        resolution: tier.res,
        filesize: estBytes,
        filesizeApprox: estBytes,
        hasAudio: true,
        hasVideo: true,
        qualityRank: tier.rank,
        isTranscode: true,
      });
    }

    // 4. Sort video formats logically: highest resolution first, with MP4 placed ahead of WEBM
    const videos = Array.from(formatMap.values()).sort((a, b) => {
      const rankA = a.qualityRank || 0;
      const rankB = b.qualityRank || 0;
      if (rankB !== rankA) return rankB - rankA;
      if (a.ext === "mp4" && b.ext !== "mp4") return -1;
      if (b.ext === "mp4" && a.ext !== "mp4") return 1;
      return 0;
    });

    // 5. Populate comprehensive audio options with total filesizes
    const audios = buildStandardAudioFormats(duration);

    if (videos.length === 0 && info.url) {
      videos.push({
        id: "direct",
        ext: info.ext || "mp4",
        quality: "Best Quality",
        hasAudio: true,
        hasVideo: true,
        url: info.url,
        filesize: info.filesize || info.filesize_approx || (duration ? Math.round((2500 * 1000 / 8) * duration) : undefined),
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

    setCachedMedia(targetUrl, result, rawFormats);
    return result;
  } catch (error: any) {
    console.error("Extraction error:", error?.message || error);
    throw new Error(formatExtractionError(error));
  }
}

/**
 * Downloads and prepares a clean, 100% compliant media file
 * Optimized for ultra-fast response using persistent caching and direct FFmpeg muxing
 */
export async function prepareMediaFile(
  targetUrl: string,
  options: {
    formatId?: string;
    audioOnly?: boolean;
    ext?: string;
    quality?: string;
  }
): Promise<{ filePath: string; cleanup: () => void; size: number }> {
  // VP9/WebM encoding is an order of magnitude slower than realtime here, and
  // no WebM option is offered any more — reject hand-crafted requests for it.
  if (options.ext === "webm") {
    throw new Error("WebM output is not available. Please choose an MP4 format.");
  }

  // Refuse re-encodes that would tie up the box for longer than they are worth.
  if (options.formatId?.startsWith("scale:")) {
    const targetHeight = parseInt(options.formatId.split(":")[1]) || 720;
    const cachedDuration = getCachedMedia(targetUrl)?.duration || 0;
    if (targetHeight > MAX_TRANSCODE_HEIGHT || cachedDuration > MAX_TRANSCODE_SECONDS) {
      throw new Error(
        "This quality needs re-encoding, which is disabled for long or high-resolution videos. Please pick one of the native formats instead."
      );
    }
  }

  const cacheKey = getCacheKey(targetUrl);
  const targetExt = options.ext || (options.audioOnly ? "mp3" : "mp4");
  const cleanFormatId = (options.formatId || (options.audioOnly ? "audio" : "best")).replace(/[^a-zA-Z0-9_-]/g, "_");
  const cleanQuality = (options.quality || "default").replace(/[^a-zA-Z0-9_-]/g, "_");
  const cachedPreparedFile = path.join(PREPARED_DIR, `${cacheKey}_${cleanFormatId}_${cleanQuality}.${targetExt}`);

  // 1. Instant cache return (0 ms) if file was already prepared
  try {
    if (fs.existsSync(cachedPreparedFile)) {
      const stat = fs.statSync(cachedPreparedFile);
      if (stat.size > 1000) {
        return {
          filePath: cachedPreparedFile,
          cleanup: () => {}, // Persistent cache keeps file for repeated downloads
          size: stat.size,
        };
      }
    }
  } catch {}

  const tempDir = os.tmpdir();
  const fileUid = `vidsnap_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const finalPath = cachedPreparedFile;

  const platform = detectPlatform(targetUrl);

  // 2. High-speed TikTok handling
  const mediaData = getCachedMedia(targetUrl) || (platform === "tiktok" ? await extractTikTokWithTikWM(targetUrl) : null);
  if (mediaData && platform === "tiktok") {
    if (options.audioOnly) {
      const streamUrl = mediaData.audios[0]?.url || mediaData.directDownloadUrl || mediaData.videos[0]?.url;
      if (streamUrl) {
        const rawTempAudio = path.join(tempDir, `${fileUid}_raw.mp4`);
        const streamRes = await fetch(streamUrl, {
          headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
        });
        if (streamRes.ok) {
          fs.writeFileSync(rawTempAudio, Buffer.from(await streamRes.arrayBuffer()));
          const audioBitrate = options.quality?.replace(/[^\d]/g, "") || "320";
          try {
            await runFfmpeg([
              "-y",
              "-i", rawTempAudio,
              "-vn",
              ...(targetExt === "mp3" ? ["-c:a", "libmp3lame", "-b:a", `${audioBitrate}k`] : []),
              ...(targetExt === "m4a" ? ["-c:a", "aac", "-b:a", `${audioBitrate}k`] : []),
              finalPath,
            ]);
            try { if (fs.existsSync(rawTempAudio)) fs.unlinkSync(rawTempAudio); } catch {}
            const stat = fs.statSync(finalPath);
            return { filePath: finalPath, cleanup: () => {}, size: stat.size };
          } catch {
            const stat = fs.statSync(rawTempAudio);
            return { filePath: rawTempAudio, cleanup: () => {}, size: stat.size };
          }
        }
      }
    }

    // Video download for TikTok
    const streamUrl = (options.formatId === "nowm" || options.formatId === "scale:720:mp4" || !mediaData.videos[0]?.url)
      ? (mediaData.videos.find((v) => v.id === "nowm")?.url || mediaData.videos[0]?.url)
      : mediaData.videos[0]?.url;

    if (streamUrl) {
      const streamRes = await fetch(streamUrl, {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
      });

      if (streamRes.ok) {
        const rawVideo = path.join(tempDir, `${fileUid}_raw.mp4`);
        fs.writeFileSync(rawVideo, Buffer.from(await streamRes.arrayBuffer()));

        const isScale = options.formatId?.startsWith("scale:");
        const isWebm = targetExt === "webm";

        if (isScale || isWebm) {
          const targetHeight = isScale ? parseInt(options.formatId!.split(":")[1]) || 720 : 1080;
          try {
            const ffmpegArgs = ["-y", "-i", rawVideo];
            if (isScale) {
              ffmpegArgs.push("-vf", `scale=-2:${targetHeight}`);
            }
            if (isWebm) {
              ffmpegArgs.push("-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "30", "-c:a", "libopus");
            } else {
              ffmpegArgs.push("-c:v", "libx264", "-preset", "ultrafast", "-crf", "23", "-c:a", "copy");
            }
            ffmpegArgs.push(finalPath);

            await runFfmpeg(ffmpegArgs);
            try { if (fs.existsSync(rawVideo)) fs.unlinkSync(rawVideo); } catch {}
            const stat = fs.statSync(finalPath);
            return { filePath: finalPath, cleanup: () => {}, size: stat.size };
          } catch {}
        }

        // Direct stream copy
        try {
          fs.renameSync(rawVideo, finalPath);
        } catch {
          fs.copyFileSync(rawVideo, finalPath);
        }
        const stat = fs.statSync(finalPath);
        return { filePath: finalPath, cleanup: () => {}, size: stat.size };
      }
    }
  }

  // 3. Ultra-fast direct FFmpeg muxing from cached stream URLs
  const cachedFormats = getCachedRawFormats(targetUrl);
  if (cachedFormats && cachedFormats.length > 0) {
    try {
      // Filter out slow throttled HLS m3u8 playlists for direct high-speed byte streaming
      const directStreams = cachedFormats.filter(
        (f) => f.url?.startsWith("http") && !f.url?.includes(".m3u8")
      );
      const formatsPool = directStreams.length > 0 ? directStreams : cachedFormats;

      // Select optimal audio track: prefer AAC/m4a for MP4 container, Opus for WebM, with highest bitrate
      const audioStreams = formatsPool.filter(
        (f) => f.acodec && f.acodec !== "none" && (!f.vcodec || f.vcodec === "none")
      );
      let fAudio = targetExt === "mp4" || targetExt === "m4a"
        ? audioStreams.filter((f) => f.ext === "m4a" || f.acodec?.includes("mp4a")).sort((a, b) => (b.abr || b.tbr || 0) - (a.abr || a.tbr || 0))[0]
        : audioStreams.filter((f) => f.ext === "webm" || f.acodec?.includes("opus")).sort((a, b) => (b.abr || b.tbr || 0) - (a.abr || a.tbr || 0))[0];

      if (!fAudio) {
        fAudio = audioStreams.sort((a, b) => (b.abr || b.tbr || 0) - (a.abr || a.tbr || 0))[0] ||
                 formatsPool.find((f) => f.acodec && f.acodec !== "none");
      }

      if (options.audioOnly) {
        if (fAudio?.url) {
          const audioBitrate = options.quality?.replace(/[^\d]/g, "") || "320";
          const ffmpegArgs = ["-y", "-i", fAudio.url, "-vn"];
          if (targetExt === "mp3") {
            ffmpegArgs.push("-c:a", "libmp3lame", "-b:a", `${audioBitrate}k`);
          } else if (targetExt === "m4a") {
            ffmpegArgs.push("-c:a", "aac", "-b:a", `${audioBitrate}k`);
          }
          ffmpegArgs.push(finalPath);
          await runFfmpeg(ffmpegArgs);
          const stat = fs.statSync(finalPath);
          return { filePath: finalPath, cleanup: () => {}, size: stat.size };
        }
      } else if (options.formatId?.startsWith("scale:")) {
        const targetHeight = parseInt(options.formatId.split(":")[1]) || 720;
        const videoStreams = formatsPool
          .filter((f) => f.vcodec && f.vcodec !== "none" && f.height)
          .sort((a, b) => (a.height || 0) - (b.height || 0));
        const fVideo = videoStreams.find((f) => f.height >= targetHeight) ||
                       videoStreams[videoStreams.length - 1] ||
                       formatsPool.find((f) => f.vcodec && f.vcodec !== "none") ||
                       formatsPool[0];

        if (fVideo?.url) {
          const ffmpegArgs = ["-y", "-i", fVideo.url];
          if (fAudio?.url && (!fVideo.acodec || fVideo.acodec === "none")) {
            ffmpegArgs.push("-i", fAudio.url);
          }
          ffmpegArgs.push(
            "-vf", `scale=-2:${targetHeight}`,
            "-c:v", targetExt === "webm" ? "libvpx-vp9" : "libx264",
            "-preset", "ultrafast",
            "-crf", "23",
            "-c:a", "copy",
            "-movflags", "+faststart",
            finalPath
          );
          await runFfmpeg(ffmpegArgs);
          const stat = fs.statSync(finalPath);
          return { filePath: finalPath, cleanup: () => {}, size: stat.size };
        }
      } else {
        const fVideo = formatsPool.find((f) => f.format_id === options.formatId) ||
                       cachedFormats.find((f) => f.format_id === options.formatId && f.url?.startsWith("http")) ||
                       formatsPool.find((f) => f.vcodec && f.vcodec !== "none") ||
                       cachedFormats.find((f) => f.vcodec && f.vcodec !== "none" && f.url?.startsWith("http"));

        if (fVideo?.url) {
          // If stream already contains audio (progressive)
          if (fVideo.acodec && fVideo.acodec !== "none") {
            const ffmpegArgs = ["-y", "-i", fVideo.url, "-c", "copy", "-movflags", "+faststart", finalPath];
            await runFfmpeg(ffmpegArgs);
            const stat = fs.statSync(finalPath);
            return { filePath: finalPath, cleanup: () => {}, size: stat.size };
          }
          // Direct fast stream copy muxing (takes ~1-2s!)
          if (fAudio?.url) {
            const ffmpegArgs = [
              "-y",
              "-i", fVideo.url,
              "-i", fAudio.url,
              "-c", "copy",
              "-movflags", "+faststart",
              finalPath,
            ];
            await runFfmpeg(ffmpegArgs);
            const stat = fs.statSync(finalPath);
            return { filePath: finalPath, cleanup: () => {}, size: stat.size };
          }
        }
      }
    } catch (directMuxError) {
      console.warn("Fast direct FFmpeg muxing fallback triggered:", directMuxError);
    }
  }

  // 4. Fallback extraction via yt-dlp
  const outputPattern = path.join(tempDir, `${fileUid}.%(ext)s`);
  const cookieArgs = getCookiesArgs();

  const args = [
    ...getFfmpegLocationArgs(),
    "--no-warnings",
    "--no-check-certificates",
    "--remote-components", "ejs:github",
    "--js-runtimes", "node",
    "--concurrent-fragments", "4",
    ...cookieArgs,
  ];

  if (options.audioOnly) {
    const audioExt = options.ext || "mp3";
    args.push("-x", "--audio-format", audioExt);
    if (options.quality) {
      const qNum = options.quality.replace(/[^\d]/g, "");
      if (qNum) args.push("--audio-quality", `${qNum}k`);
    }
  } else if (options.formatId?.startsWith("scale:")) {
    const targetHeight = options.formatId.split(":")[1] || "720";
    args.push(
      "-f",
      `bestvideo[height<=${targetHeight}]+bestaudio/best[height<=${targetHeight}]/bestvideo+bestaudio/best`
    );
    args.push("--postprocessor-args", `VideoConvertor:-vf scale=-2:${targetHeight}`);
    args.push("--merge-output-format", targetExt);
  } else if (options.formatId && options.formatId !== "direct") {
    args.push("-f", `${options.formatId}+bestaudio/best`);
    args.push("--merge-output-format", targetExt);
  } else {
    args.push("-f", "bestvideo+bestaudio/best");
    args.push("--merge-output-format", targetExt);
  }

  args.push("-o", outputPattern, targetUrl);

  await execFileAsync("yt-dlp", args, {
    maxBuffer: 50 * 1024 * 1024,
    env: process.env,
  });

  let generatedFile = path.join(tempDir, `${fileUid}.${targetExt}`);
  if (!fs.existsSync(/*turbopackIgnore: true*/ generatedFile)) {
    const files = fs.readdirSync(/*turbopackIgnore: true*/ tempDir).filter((f) => f.startsWith(fileUid));
    if (files.length > 0) {
      generatedFile = path.join(tempDir, files[0]);
    } else {
      throw new Error("Downloaded media file could not be generated.");
    }
  }

  // Cache generated file into PREPARED_DIR
  try {
    fs.copyFileSync(generatedFile, finalPath);
  } catch {}

  const finalStat = fs.statSync(/*turbopackIgnore: true*/ fs.existsSync(finalPath) ? finalPath : generatedFile);

  return {
    filePath: fs.existsSync(finalPath) ? finalPath : generatedFile,
    cleanup: () => {},
    size: finalStat.size,
  };
}
