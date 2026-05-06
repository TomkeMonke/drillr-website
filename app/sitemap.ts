import type { MetadataRoute } from "next";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/locales";
import { POSITION_SLUGS } from "@/lib/positions";
import { FEATURES } from "@/lib/features";

const BASE_URL = "https://getdrillr.app";

const STATIC_PATHS = ["", "/press", "/manage-subscription", "/privacy", "/terms"] as const;

function localizedEntry(
  path: string,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number,
): MetadataRoute.Sitemap[number] {
  return {
    url: `${BASE_URL}/${DEFAULT_LOCALE}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${BASE_URL}/${l}${path}`]),
      ),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) =>
    localizedEntry(path, path === "" ? "weekly" : "monthly", path === "" ? 1 : 0.6),
  );

  if (FEATURES.positionPages) {
    entries.push(localizedEntry("/training", "monthly", 0.7));
    for (const slug of POSITION_SLUGS) {
      entries.push(localizedEntry(`/training/${slug}`, "monthly", 0.6));
    }
  }

  return entries;
}
