import { ImageResponse } from "next/og";

export const alt = "VidSnap - Free Online Video & Audio Downloader";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #022c22 0%, #064e3b 40%, #0f172a 100%)",
          color: "white",
          padding: "60px",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        {/* Brand Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "20px",
              background: "#059669",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 25px -5px rgba(5, 150, 105, 0.5)",
              color: "white",
              fontSize: "36px",
              fontWeight: 800,
            }}
          >
            ⚡
          </div>
          <span
            style={{
              fontSize: "68px",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#ffffff",
            }}
          >
            Vid<span style={{ color: "#34d399" }}>Snap</span>
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "36px",
            fontWeight: 800,
            textAlign: "center",
            maxWidth: "960px",
            color: "#f8fafc",
            marginBottom: "16px",
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
          }}
        >
          Fast Online Video & Audio Downloader
        </div>

        {/* Sub-tagline */}
        <div
          style={{
            fontSize: "22px",
            fontWeight: 500,
            textAlign: "center",
            maxWidth: "840px",
            color: "#94a3b8",
            marginBottom: "40px",
            lineHeight: 1.4,
          }}
        >
          Save videos in 4K, 1080p Full HD, or 320kbps MP3 audio with zero watermarks.
        </div>

        {/* Platform Badges */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            justifyContent: "center",
            maxWidth: "960px",
          }}
        >
          {[
            "YouTube 4K & Shorts",
            "TikTok No-Watermark",
            "Instagram Reels",
            "Twitter / X",
            "Reddit",
            "Pinterest",
            "320kbps MP3",
          ].map((tag) => (
            <div
              key={tag}
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(52, 211, 153, 0.3)",
                borderRadius: "9999px",
                padding: "10px 22px",
                fontSize: "18px",
                fontWeight: 600,
                color: "#6ee7b7",
                backdropFilter: "blur(8px)",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
