import type { MetadataRoute } from "next";
import { ROUTES } from "@/lib/data";
import { GUIDES, LEGAL } from "@/lib/content";

const BASE = "https://flyuganda.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/routes",
    "/schedule",
    "/book",
    "/manage",
    "/check-in",
    "/cargo",
    "/about",
    "/contact",
    "/destinations",
    "/travel-info",
    "/careers",
    "/press",
    "/pearl-club",
    "/pearl-club/join",
    "/pearl-club/account",
    "/fr",
  ];

  const dynamic = [
    ...ROUTES.map((r) => `/routes/${r.to.toLowerCase()}`),
    ...GUIDES.map((g) => `/destinations/${g.city.toLowerCase().split(" ")[0]}`),
    ...Object.keys(LEGAL).map((d) => `/legal/${d}`),
  ];

  const now = new Date();
  return [...staticPaths, ...dynamic].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
