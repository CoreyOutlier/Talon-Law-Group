import type { MetadataRoute } from "next";
import { markets, practiceAreas, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/about", "/practice-areas", "/offices", "/results", "/reviews", "/contact"];

  return [
    ...staticRoutes.map((r) => ({
      url: `${site.domain}${r}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: r === "" ? 1 : 0.8,
    })),
    ...markets.map((m) => ({
      url: `${site.domain}/offices/${m.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...practiceAreas.map((p) => ({
      url: `${site.domain}/practice-areas/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
