import { NextRequest, NextResponse } from "next/server";
import { extractMediaInfo, prepareMediaFile } from "@/lib/extractor";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "A valid video URL is required." },
        { status: 400 }
      );
    }

    let trimmedUrl = url.trim();

    // Normalize Instagram handle or scheme if missing
    if (trimmedUrl.startsWith("@")) {
      trimmedUrl = `https://www.instagram.com/${trimmedUrl.slice(1).replace(/\/$/, "")}/`;
    } else if (trimmedUrl.startsWith("instagram.com/")) {
      trimmedUrl = `https://www.${trimmedUrl}`;
    } else if (!trimmedUrl.startsWith("http://") && !trimmedUrl.startsWith("https://")) {
      if (/^[a-zA-Z0-9._]{1,30}$/.test(trimmedUrl)) {
        trimmedUrl = `https://www.instagram.com/${trimmedUrl}/`;
      } else {
        return NextResponse.json(
          { error: "Invalid URL format. Please include http:// or https://" },
          { status: 400 }
        );
      }
    }

    const data = await extractMediaInfo(trimmedUrl);

    // High-speed background preheat: asynchronously prepare the top format so user clicks enjoy instant 0ms download
    if (data && data.videos && data.videos.length > 0) {
      const topVideo = data.videos[0];
      prepareMediaFile(trimmedUrl, {
        formatId: topVideo.id,
        ext: topVideo.ext || "mp4",
        quality: topVideo.quality,
      }).catch((e) => {
        console.warn("Background preheat notice:", e?.message);
      });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("API /api/extract error:", err);
    return NextResponse.json(
      {
        error:
          err.message ||
          "Unable to process this URL. Ensure the video is public and accessible.",
      },
      { status: 500 }
    );
  }
}
