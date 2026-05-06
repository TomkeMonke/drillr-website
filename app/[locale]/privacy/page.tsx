import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/locales";
import { getDictionary } from "../dictionaries";
import { RichText } from "@/components/RichText";

function slugFor(i: number) {
  return `section-${i + 1}`;
}

export default async function PrivacyPage({ params }: PageProps<"/[locale]/privacy">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.privacy;

  return (
    <section className="mx-auto max-w-3xl px-5 lg:px-8 py-20 lg:py-28">
      <header className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-[0.04em] uppercase">{t.title}</h1>
        <p className="mt-4 text-xs uppercase tracking-widest text-white/40">{t.lastUpdated}</p>
      </header>

      <p className="text-white/70 leading-relaxed mb-14">
        <RichText text={t.intro} />
      </p>

      <nav aria-label="Table of contents" className="mb-16 rounded-2xl border border-white/5 bg-surface/40 px-6 py-6">
        <h2 className="text-xs uppercase tracking-widest text-white/40 mb-4">{t.tocLabel}</h2>
        <ol className="space-y-2">
          {t.sections.map((s, i) => (
            <li key={s.heading}>
              <a
                href={`#${slugFor(i)}`}
                className="group flex gap-3 text-sm text-white/75 hover:text-primary-light transition-colors"
              >
                <span className="text-white/40 group-hover:text-primary-light transition-colors tabular-nums w-6 shrink-0">
                  {i + 1}.
                </span>
                <span>{s.heading}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="space-y-12">
        {t.sections.map((s, i) => (
          <article
            key={s.heading}
            id={slugFor(i)}
            className={`scroll-mt-24 ${i > 0 ? "pt-12 border-t border-white/5" : ""}`}
          >
            <h2 className="text-xl font-semibold text-white mb-5">
              <span className="text-white/40 mr-2 tabular-nums">{i + 1}.</span>
              {s.heading}
            </h2>
            <div className="space-y-4">
              {s.paragraphs?.map((p, j) => (
                <p key={j} className="text-white/70 leading-relaxed">
                  <RichText text={p} />
                </p>
              ))}
              {s.bullets && (
                <ul className="space-y-2 pl-6 list-disc marker:text-primary/50 text-white/70 leading-relaxed">
                  {s.bullets.map((b, j) => (
                    <li key={j}>
                      <RichText text={b} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
      </div>

      {t.crossLink && (
        <div className="mt-16 pt-8 border-t border-white/5 text-center">
          <Link
            href={`/${locale}${t.crossLink.href}`}
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-light transition-colors"
          >
            <span>{t.crossLink.label}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
    </section>
  );
}
