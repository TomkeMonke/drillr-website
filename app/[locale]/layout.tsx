import type { Metadata, Viewport } from "next";
import { Geist, Noto_Sans_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { LOCALES, OG_LOCALES, isLocale, isRtl } from "@/lib/locales";
import { getDictionary } from "./dictionaries";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

// Geist has no Arabic glyphs. Only ar pages put this font's variable on <html>
// (see globals.css); it is not preloaded, since a root-layout preload would
// make every language download it.
const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  preload: false,
});

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0a0a",
};

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    metadataBase: new URL("https://getdrillr.app"),
    // Template suffixes subpage titles; canonical/hreflang are set per page
    // (a canonical inherited from the layout would point every subpage home).
    title: { default: dict.meta.title, template: "%s - Drillr" },
    description: dict.meta.description,
    icons: { icon: "/favicon.png" },
    openGraph: {
      type: "website",
      siteName: "Drillr",
      title: dict.meta.title,
      description: dict.meta.description,
      locale: OG_LOCALES[locale],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const fontVariables =
    locale === "ar" ? `${geistSans.variable} ${notoSansArabic.variable}` : geistSans.variable;

  return (
    <html
      lang={locale}
      dir={isRtl(locale) ? "rtl" : undefined}
      className={`${fontVariables} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ScrollProgress />
        <Header locale={locale} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} dict={dict} />
        <Analytics />
      </body>
    </html>
  );
}
