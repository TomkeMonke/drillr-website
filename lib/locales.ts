export const LOCALES = ["en", "pl", "es", "de", "fr", "it", "pt", "id", "tr", "ar", "sv"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/** Each language in its own name, for the language menu. */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  pl: "Polski",
  es: "Español",
  de: "Deutsch",
  fr: "Français",
  it: "Italiano",
  pt: "Português",
  id: "Bahasa Indonesia",
  tr: "Türkçe",
  ar: "العربية",
  sv: "Svenska",
};

/** Open Graph locale per language. pt is Brazilian Portuguese, same as the app. */
export const OG_LOCALES: Record<Locale, string> = {
  en: "en_US",
  pl: "pl_PL",
  es: "es_ES",
  de: "de_DE",
  fr: "fr_FR",
  it: "it_IT",
  pt: "pt_BR",
  id: "id_ID",
  tr: "tr_TR",
  ar: "ar_AR",
  sv: "sv_SE",
};

/** Languages without their own captures in public/screenshots yet; they show the English set.
 *  Empty since 2026-11-20 (Swedish was the last). */
const NO_SCREENSHOTS: readonly Locale[] = [];

/** App screenshot for a language: English has no suffix, every other language "-<code>". */
export function screenshotSrc(name: string, locale: Locale): string {
  const shown = NO_SCREENSHOTS.includes(locale) ? "en" : locale;
  return `/screenshots/${name}${shown === "en" ? "" : `-${shown}`}.png`;
}

/** Right-to-left languages: <html dir="rtl"> and a mirrored layout. */
const RTL_LOCALES: readonly Locale[] = ["ar"];

export function isRtl(locale: Locale): boolean {
  return RTL_LOCALES.includes(locale);
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
