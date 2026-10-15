export const LOCALES = ["en", "pl", "es", "de", "fr", "it", "pt", "id"] as const;
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
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
