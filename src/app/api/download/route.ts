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

  // Clean filename for safe content disposition header
  const safeTitle = rawTitle.replace(/[\\/:*?"<>|]+/g, "_").slice(0, 100);
  const filename = `${safeTitle}.${rawExt}`;
  const encodedFilename = encodeURIComponent(filename);

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
        "Content-Disposition": `attachment; filename="${filename}"; filename*=UTF-8''${encodedFilename}`,
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
