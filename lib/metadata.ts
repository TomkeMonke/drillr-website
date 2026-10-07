import type { Metadata } from "next";
import { LOCALES, type Locale } from "./locales";

/** Canonical + hreflang alternates for a localized path ("" for the home page). */
export function localizedAlternates(locale: Locale, path = ""): Metadata["alternates"] {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      ...Object.fromEntries(LOCALES.map((l) => [l, `/${l}${path}`])),
      // The unprefixed path redirects by Accept-Language, so it is the default
      "x-default": path || "/",
    },
  };
}

/**
 * Standard metadata for a localized subpage: own title (suffixed via the
 * layout's title.template), description, and per-path canonical/hreflang.
 */
export function pageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  return {
    title,
    description,
    alternates: localizedAlternates(locale, path),
  };
}
