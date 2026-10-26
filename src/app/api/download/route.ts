import { NextRequest } from "next/server";
import { prepareMediaFile } from "@/lib/extractor";
import fs from "fs";
import { Readable } from "stream";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get("url");
  const formatId = searchParams.get("format_id") || undefined;
  const audioOnly = searchParams.get("audio") === "true";
  const rawTitle = searchParams.get("title") || "video";
  const rawExt = searchParams.get("ext") || (audioOnly ? "mp3" : "mp4");

  if (!targetUrl) {
    return new Response(JSON.stringify({ error: "Missing 'url' parameter." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Sanitize filename for Content-Disposition header (RFC 6266 & RFC 5987)
  // 1. Unicode title for modern browsers via filename*=UTF-8''
  const safeUnicodeTitle = rawTitle
    .replace(/[\r\n\t]/g, " ")
    .replace(/[\\/:*?"<>|]/g, "_")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 100) || "video";
  const utf8Filename = `${safeUnicodeTitle}.${rawExt}`;
  const encodedUtf8Filename = encodeURIComponent(utf8Filename).replace(
    /['()*]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`
  );

  // 2. Strict ASCII fallback for legacy filename="..." parameter (ByteString requires char code <= 255)
  const asciiOnlyTitle = safeUnicodeTitle
    .replace(/[^\x20-\x7E]/g, "")
    .replace(/["\\]/g, "")
    .trim()
    .slice(0, 80) || "video";
  const asciiFilename = `${asciiOnlyTitle}.${rawExt}`;

  try {
    const { filePath, cleanup, size } = await prepareMediaFile(targetUrl, {
      formatId,
      audioOnly,
      ext: rawExt,
    });

    const nodeStream = fs.createReadStream(filePath);
    const webStream = Readable.toWeb(nodeStream as any);

    // Auto cleanup temp file when stream ends or client cancels
    nodeStream.on("close", cleanup);
    nodeStream.on("error", cleanup);
    req.signal.addEventListener("abort", cleanup);

    const contentType = audioOnly
      ? "audio/mpeg"
      : rawExt === "webm"
      ? "video/webm"
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
