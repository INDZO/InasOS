import type { MetadataRoute } from "next";
import { portfolioUrl, portfolioViews } from "@/data/portfolio-views";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: portfolioUrl, changeFrequency: "monthly", priority: 1 },
    ...Object.values(portfolioViews).map(({ path }) => ({
      url: portfolioUrl + path,
      alternates: { languages: { en: portfolioUrl + portfolioViews.en.path, "sr-Latn": portfolioUrl + portfolioViews.sr.path } },
    })),
  ];
}
