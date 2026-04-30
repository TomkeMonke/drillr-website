import { notFound } from "next/navigation";
import { isLocale } from "@/lib/locales";
import { getDictionary } from "../dictionaries";
import { PageHeader } from "@/components/PageHeader";
import { ScrollScene } from "@/components/animations/ScrollScene";

export default async function PrivacyPage({ params }: PageProps<"/[locale]/privacy">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.privacy;

  return (
    <ScrollScene soft>
      <section className="mx-auto max-w-3xl px-5 lg:px-8 py-20 lg:py-28">
        <PageHeader title={t.title} meta={t.lastUpdated} />
        <p className="text-white/70 leading-relaxed mb-12">{t.intro}</p>
        <div className="space-y-10">
          {t.sections.map((s) => (
            <article key={s.heading}>
              <h2 className="text-xl font-semibold text-white mb-3">{s.heading}</h2>
              <p className="text-white/70 leading-relaxed">{s.body}</p>
            </article>
          ))}
        </div>
      </section>
    </ScrollScene>
  );
}
