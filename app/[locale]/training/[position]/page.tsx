import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES, isLocale } from "@/lib/locales";
import { pageMetadata } from "@/lib/metadata";
import { FEATURES } from "@/lib/features";
import { FOCUS_CATEGORIES, POSITION_SLUGS, POSITIONS, isPositionSlug } from "@/lib/positions";
import { getDictionary } from "../../dictionaries";
import { DownloadBadges } from "@/components/DownloadBadges";
import { Reveal } from "@/components/animations/Reveal";
import { ScrollScene } from "@/components/animations/ScrollScene";

export async function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    POSITION_SLUGS.map((position) => ({ locale, position })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/training/[position]">): Promise<Metadata> {
  const { locale, position } = await params;
  if (!isLocale(locale) || !isPositionSlug(position)) return {};
  const dict = await getDictionary(locale);
  const pos = dict.positions[position];
  return pageMetadata(locale, `/training/${position}`, pos.name, pos.description);
}

export default async function PositionPage({
  params,
}: PageProps<"/[locale]/training/[position]">) {
  if (!FEATURES.positionPages) notFound();
  const { locale, position } = await params;
  if (!isLocale(locale) || !isPositionSlug(position)) notFound();

  const dict = await getDictionary(locale);
  const pos = dict.positions[position];
  const data = POSITIONS[position];
  const t = dict.positionPicker;

  return (
    <>
      <ScrollScene soft>
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-50 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${data.accent}22, transparent 70%)`,
          }}
          aria-hidden="true"
        />
        <div className="mx-auto max-w-5xl px-5 lg:px-8 pt-20 lg:pt-28 pb-12 text-center">
          <div
            className="animate-hero-scale mx-auto h-14 w-14 rounded-2xl mb-6 flex items-center justify-center text-xl font-bold"
            style={{ background: `${data.accent}1f`, color: data.accent, animationDelay: "80ms" }}
          >
            {pos.name.charAt(0)}
          </div>
          <div
            className="animate-hero-rise text-sm uppercase tracking-widest text-white/50 mb-3"
            style={{ animationDelay: "180ms" }}
          >
            {pos.tagline}
          </div>
          <h1
            className="animate-hero-rise text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
            style={{ animationDelay: "280ms" }}
          >
            {pos.name}
          </h1>
          <p
            className="animate-hero-rise mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
            style={{ animationDelay: "420ms" }}
          >
            {pos.description}
          </p>
          <div
            className="animate-hero-rise mt-9 flex justify-center"
            style={{ animationDelay: "560ms" }}
          >
            <DownloadBadges labels={dict.common} size="md" />
          </div>
        </div>
      </section>
      </ScrollScene>

      <ScrollScene>
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 grid md:grid-cols-2 gap-6">
          <Reveal>
            <div className="rounded-2xl border border-white/5 bg-surface/60 p-7 h-full">
              <h2 className="text-sm uppercase tracking-widest text-white/50 mb-3">
                {dict.positions.strengthsTitle}
              </h2>
              <p className="text-white/85 leading-relaxed">{pos.strengths}</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-2xl border border-white/5 bg-surface/60 p-7 h-full">
              <h2 className="text-sm uppercase tracking-widest text-white/50 mb-3">
                {dict.positions.weaknessTitle}
              </h2>
              <p className="text-white/85 leading-relaxed">{pos.weaknesses}</p>
            </div>
          </Reveal>
        </div>
      </section>
      </ScrollScene>

      <ScrollScene>
      <section className="py-16 lg:py-20 border-y border-white/5 bg-white/[0.015]">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight mb-10">
              {t.focusBreakdown}
            </h2>
          </Reveal>
          <div className="max-w-2xl space-y-4">
            {FOCUS_CATEGORIES.map((cat, i) => {
              const pct = data.focus[cat];
              return (
                <Reveal key={cat} delay={i * 80}>
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-white/85">{t.categoryLabels[cat]}</span>
                      <span className="text-white/60 tabular-nums">{pct}%</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-white/[0.06] overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${pct}%`, background: data.accent }}
                      />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      </ScrollScene>

      <ScrollScene>
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight mb-10">
              {dict.positions.weekTitle}
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {pos.week.map((day, i) => (
              <Reveal key={day.day} delay={i * 70}>
                <div className="rounded-2xl border border-white/5 bg-surface/60 hover:bg-surface hover:-translate-y-0.5 transition-all duration-300 p-5 h-full">
                  <div className="text-xs uppercase tracking-widest text-white/40 mb-2">
                    {day.day}
                  </div>
                  <div className="text-sm text-white/90 leading-snug">{day.session}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      </ScrollScene>

      <ScrollScene>
      <section className="py-16 lg:py-20 border-y border-white/5 bg-white/[0.015]">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight mb-10">
              {dict.positions.drillsTitle}
            </h2>
          </Reveal>
          <ul className="space-y-2.5">
            {pos.drills.map((drill, i) => (
              <Reveal key={drill.name} as="li" delay={i * 80}>
                <div className="flex items-center justify-between rounded-xl bg-surface/60 border border-white/5 px-5 py-4">
                  <span className="text-white/90 font-medium">{drill.name}</span>
                  <span className="text-sm text-white/50 tabular-nums shrink-0 ml-3">
                    {drill.spec}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      </ScrollScene>

      <ScrollScene>
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-5 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {dict.positions.downloadCta}
              <span style={{ color: data.accent }}>{pos.name}</span>
            </h2>
            <div className="mt-8 flex justify-center">
              <DownloadBadges labels={dict.common} size="lg" />
            </div>
            <div className="mt-10">
              <Link
                href={`/${locale}/training`}
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                ← {dict.positions.indexTitle}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
      </ScrollScene>
    </>
  );
}
