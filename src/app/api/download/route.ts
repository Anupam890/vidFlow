import { NextRequest } from "next/server";
import { prepareMediaFile } from "@/lib/extractor";
import { runLimited, TooBusyError } from "@/lib/limiter";
import fs from "fs";
import { Readable } from "stream";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get("url");
  const formatId = searchParams.get("format_id") || undefined;
  const audioOnly = searchParams.get("audio") === "true";
  const rawTitle = searchParams.get("title") || "video";
  const rawExt = searchParams.get("ext") || (audioOnly ? "mp3" : "mp4");
  const rawBranding = searchParams.get("branding") || "VidSnap";
  const rawQuality = searchParams.get("quality") || (audioOnly ? "audio" : "HD");

  if (!targetUrl) {
    return new Response(JSON.stringify({ error: "Missing 'url' parameter." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Format: branding_name_video_name_resolution_format
  // e.g. VidSnap_Never_Gonna_Give_You_Up_1080p.mp4
  const cleanBranding = rawBranding
    .replace(/[^\w-]/g, "")
    .trim() || "VidSnap";

  const cleanTitle = rawTitle
    .replace(/[\r\n\t]/g, " ")
    .replace(/[\\/:*?"<>|#%&{}\\<>*?/$!'":@+`|=]/g, "")
    .trim()
    .replace(/\s+/g, "_")
    .slice(0, 60) || "video";

  const cleanQuality = rawQuality
    .replace(/[^\w-]/g, "")
    .trim() || (audioOnly ? "audio" : "HD");

  const fullFilename = `${cleanBranding}_${cleanTitle}_${cleanQuality}.${rawExt}`;

  // Strict ASCII fallback for legacy filename="..." parameter
  const asciiFilename = fullFilename.replace(/[^\x20-\x7E]/g, "_");
  const encodedUtf8Filename = encodeURIComponent(fullFilename).replace(
    /['()*]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`
  );

  try {
    // Only the preparation is rate limited; the byte streaming below is IO
    // bound and must not hold a slot while the client downloads.
    const { filePath, cleanup, size } = await runLimited(() =>
      prepareMediaFile(targetUrl, {
        formatId,
        audioOnly,
        ext: rawExt,
        quality: rawQuality,
      })
    );

    const nodeStream = fs.createReadStream(filePath);
    const webStream = Readable.toWeb(nodeStream as any);

    // Auto cleanup temp file when stream ends or client cancels
    nodeStream.on("close", cleanup);
    nodeStream.on("error", cleanup);
    req.signal.addEventListener("abort", cleanup);

    const contentType = audioOnly
      ? rawExt === "m4a"
        ? "audio/mp4"
        : rawExt === "wav"
        ? "audio/wav"
        : rawExt === "flac"
        ? "audio/flac"
        : rawExt === "aac"
        ? "audio/aac"
        : "audio/mpeg"
      : rawExt === "webm"
      ? "video/webm"
      : rawExt === "mkv"
      ? "video/x-matroska"
      : "video/mp4";

    return new Response(webStream as any, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${asciiFilename}"; filename*=UTF-8''${encodedUtf8Filename}`,
        "Content-Length": size.toString(),
        "Accept-Ranges": "bytes",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error: any) {
    if (error instanceof TooBusyError) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 503,
        headers: { "Content-Type": "application/json", "Retry-After": "10" },
      });
    }
    console.error("Download streaming error:", error);
    return new Response(
      JSON.stringify({ error: error?.message || "Download processing failed." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
