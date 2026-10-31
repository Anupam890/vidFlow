import { NextRequest, NextResponse } from "next/server";
import { extractMediaInfo } from "@/lib/extractor";
import { runLimited, TooBusyError } from "@/lib/limiter";

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

    const data = await runLimited(() => extractMediaInfo(trimmedUrl));

    // No background preheat: downloading the top format on every
    // paste doubled CPU and bandwidth, including for visitors who never
    // clicked Download. The work now happens only in /api/download.

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    if (err instanceof TooBusyError) {
      return NextResponse.json({ error: err.message }, { status: 503 });
    }
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
