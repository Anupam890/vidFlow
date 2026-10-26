export type Platform =
  | "youtube"
  | "tiktok"
  | "instagram"
  | "twitter"
  | "facebook"
  | "reddit"
  | "pinterest"
  | "generic";

export interface MediaFormat {
  id: string;
  ext: string;
  quality: string;
  resolution?: string;
  filesize?: number;
  filesizeApprox?: number;
  hasAudio: boolean;
  hasVideo: boolean;
  formatNote?: string;
  url?: string;
}

export interface ExtractedMedia {
  id: string;
  title: string;
  thumbnail: string;
  duration?: number;
  durationString?: string;
  uploader?: string;
  uploaderUrl?: string;
  platform: Platform;
  url: string;
  videos: MediaFormat[];
  audios: MediaFormat[];
  directDownloadUrl?: string;
}

export function detectPlatform(url: string): Platform {
  const lower = (url || "").toLowerCase();
  if (lower.includes("youtube.com") || lower.includes("youtu.be")) return "youtube";
  if (lower.includes("tiktok.com")) return "tiktok";
  if (lower.includes("instagram.com")) return "instagram";
  if (lower.includes("twitter.com") || lower.includes("x.com")) return "twitter";
  if (lower.includes("facebook.com") || lower.includes("fb.watch")) return "facebook";
  if (lower.includes("reddit.com") || lower.includes("redd.it")) return "reddit";
  if (lower.includes("pinterest.com") || lower.includes("pin.it")) return "pinterest";
  return "generic";
}
