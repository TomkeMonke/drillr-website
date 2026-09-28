import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/locales";
import { POSITION_SLUGS } from "@/lib/positions";
import { FEATURES } from "@/lib/features";

const BASE_URL = "https://getdrillr.app";

const STATIC_PATHS = ["", "/press", "/manage-subscription", "/feedback", "/support", "/privacy", "/terms"] as const;

// One entry per locale, each carrying the full hreflang set, so every
// language version is listed directly rather than only discovered via alternates.
function localizedEntries(
  path: string,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number,
): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    LOCALES.map((l) => [l, `${BASE_URL}/${l}${path}`]),
  );
  return LOCALES.map((l) => ({
    url: `${BASE_URL}/${l}${path}`,
    changeFrequency,
    priority,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = STATIC_PATHS.flatMap((path) =>
    localizedEntries(path, path === "" ? "weekly" : "monthly", path === "" ? 1 : 0.6),
  );

  if (FEATURES.positionPages) {
    entries.push(...localizedEntries("/training", "monthly", 0.7));
    for (const slug of POSITION_SLUGS) {
      entries.push(...localizedEntries(`/training/${slug}`, "monthly", 0.6));
    }
  }

  return entries;
}
