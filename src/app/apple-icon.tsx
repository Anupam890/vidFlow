import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          borderRadius: "40px",
          padding: "16px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "32px",
            background: "#ffffff",
            border: "6px solid #10b981",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 24px rgba(16, 185, 129, 0.25)",
          }}
        >
          <svg
            width="96"
            height="96"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#059669"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
            <path d="M12 12v8" />
            <path d="m8 16 4 4 4-4" />
          </svg>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

