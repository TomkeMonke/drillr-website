import Image from "next/image";
import type { Dictionary } from "@/app/[locale]/dictionaries";
import type { Locale } from "@/lib/locales";
import { DownloadBadges } from "../DownloadBadges";
import { PhoneFrame } from "../PhoneFrame";
import { TiltFrame } from "../animations/TiltFrame";
import { HeroAurora } from "./HeroAurora";

interface Props {
  dict: Dictionary;
  locale: Locale;
  rating: number;
}

export function Hero({ dict, locale, rating }: Props) {
  const positionScreenshot = locale === "pl" ? "/screenshots/position-v2-pl.png" : "/screenshots/position-v2.png";
  return (
    <section className="relative overflow-hidden">
      <HeroAurora />
      <div className="absolute inset-0 -z-10 bg-grid opacity-25 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32 grid lg:grid-cols-[1.1fr_1fr] gap-16 items-center">
        <div>
          <div
            className="animate-hero-rise inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-white/80 mb-6"
            style={{ animationDelay: "80ms" }}
          >
            <span aria-hidden className="relative inline-block leading-none">
              <span className="text-white/20">★★★★★</span>
              <span
                className="absolute inset-0 overflow-hidden text-accent"
                style={{ width: `${(rating / 5) * 100}%` }}
              >
                ★★★★★
              </span>
            </span>
            <span>{dict.hero.badge.replace("{rating}", rating.toFixed(1))}</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02]">
            <span
              className="animate-hero-rise block text-white/60"
              style={{ animationDelay: "180ms" }}
            >
              {dict.hero.titleLine1}
            </span>
            <span
              className="animate-hero-rise block text-shimmer"
              style={{ animationDelay: "320ms" }}
            >
              {dict.hero.titleLine2}
            </span>
          </h1>
          <p
            className="animate-hero-rise mt-7 max-w-xl text-lg text-white/70 leading-relaxed"
            style={{ animationDelay: "480ms" }}
          >
            {dict.hero.subtitle}
          </p>
          <div
            className="animate-hero-rise mt-9"
            style={{ animationDelay: "620ms" }}
          >
            <p className="flex items-center gap-2.5 mb-4 text-xl font-semibold uppercase tracking-[0.15em] text-white">
              <span>{dict.hero.downloadCta}</span>
              <span aria-hidden className="text-primary text-3xl leading-none">↓</span>
            </p>
            <DownloadBadges
              appStoreLabel={dict.common.downloadAppStore}
              googlePlayLabel={dict.common.downloadGooglePlay}
              appStoreKicker={dict.common.appStoreKicker}
              googlePlayKicker={dict.common.googlePlayKicker}
              size="lg"
            />
          </div>
        </div>

        <div
          className="animate-hero-scale relative flex justify-center lg:justify-end"
          style={{ animationDelay: "280ms" }}
        >
          <TiltFrame max={6}>
            <PhoneFrame variant="primary">
              <div className="absolute inset-0 bg-[#111113]">
                <Image
                  src={positionScreenshot}
                  alt={dict.common.screenshotAlt}
                  fill
                  priority
                  sizes="(min-width: 768px) 320px, (min-width: 640px) 300px, 280px"
                  className="object-contain"
                />
              </div>
            </PhoneFrame>
          </TiltFrame>
        </div>
      </div>
    </section>
  );
}
