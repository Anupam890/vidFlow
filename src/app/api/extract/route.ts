import { NextRequest, NextResponse } from "next/server";
import { extractMediaInfo } from "@/lib/extractor";

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

    const trimmedUrl = url.trim();
    if (!trimmedUrl.startsWith("http://") && !trimmedUrl.startsWith("https://")) {
      return NextResponse.json(
        { error: "Invalid URL format. Please include http:// or https://" },
        { status: 400 }
      );
    }

    const data = await extractMediaInfo(trimmedUrl);
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
