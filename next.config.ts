import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      { source: "/youtube", destination: "/yt", permanent: true },
      { source: "/tiktok", destination: "/tt", permanent: true },
      { source: "/instagram", destination: "/ig", permanent: true },
      { source: "/instagram/:path*", destination: "/ig", permanent: true },
      { source: "/twitter", destination: "/tw", permanent: true },
      { source: "/reddit", destination: "/rd", permanent: true },
      { source: "/pinterest", destination: "/pin", permanent: true },
    ];
  },
};

export default nextConfig;
