import type { MetadataRoute } from "next";

const BASE = "https://dhunlive.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    "/hi",
    "/delete-account",
    "/hi/delete-account",
    "/privacy",
    "/hi/privacy",
  ].map((path) => ({
    url: `${BASE}${path === "/" ? "" : path}`,
  }));
}
