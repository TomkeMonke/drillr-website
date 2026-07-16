import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/locales";
import { pageMetadata } from "@/lib/metadata";
import { FEATURES } from "@/lib/features";
import { POSITION_SLUGS, POSITIONS } from "@/lib/positions";
import { getDictionary } from "../dictionaries";
import { PageHeader } from "@/components/PageHeader";
import { ScrollScene } from "@/components/animations/ScrollScene";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/training">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return pageMetadata(
    locale,
    "/training",
    dict.positions.indexTitle,
    dict.positions.indexSubtitle,
  );
}

export default async function TrainingIndex({ params }: PageProps<"/[locale]/training">) {
  if (!FEATURES.positionPages) notFound();
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <ScrollScene soft>
      <section className="mx-auto max-w-6xl px-5 lg:px-8 py-20 lg:py-28">
        <PageHeader title={dict.positions.indexTitle} subtitle={dict.positions.indexSubtitle} />
        <div className="grid sm:grid-cols-2 gap-5">
        {POSITION_SLUGS.map((slug) => {
          const pos = dict.positions[slug];
          const data = POSITIONS[slug];
          return (
            <Link
              key={slug}
              href={`/${locale}/training/${slug}`}
              className="group card-lift relative overflow-hidden rounded-3xl border border-white/5 bg-surface/60 hover:bg-surface p-8"
            >
              <div
                className="absolute -top-16 -right-16 h-40 w-40 rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity pointer-events-none"
                style={{ background: data.accent }}
                aria-hidden="true"
              />
              <div
                className="relative h-10 w-10 rounded-xl mb-5 flex items-center justify-center text-sm font-bold"
                style={{ background: `${data.accent}22`, color: data.accent }}
              >
                {pos.name.charAt(0)}
              </div>
              <h2 className="relative text-2xl font-semibold text-white">{pos.name}</h2>
              <p className="relative mt-1 text-white/60">{pos.tagline}</p>
              <div className="relative mt-6 flex items-center gap-2 text-sm text-primary">
                {dict.positionPicker.viewPlan}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 transition-transform group-hover:translate-x-1">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          );
        })}
        </div>
      </section>
    </ScrollScene>
  );
}
