import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = [
    { path: "", priority: 1.0, changeFrequency: "daily" as const },
    { path: "/yt", priority: 0.95, changeFrequency: "daily" as const },
    { path: "/tt", priority: 0.95, changeFrequency: "daily" as const },
    { path: "/ig", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/tw", priority: 0.85, changeFrequency: "daily" as const },
    { path: "/x", priority: 0.85, changeFrequency: "daily" as const },
    { path: "/rd", priority: 0.85, changeFrequency: "daily" as const },
    { path: "/pin", priority: 0.85, changeFrequency: "daily" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "monthly" as const },
  ];

  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}

