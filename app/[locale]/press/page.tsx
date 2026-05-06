import { notFound } from "next/navigation";
import { isLocale } from "@/lib/locales";
import { getDictionary } from "../dictionaries";
import { PageHeader } from "@/components/PageHeader";
import { ScrollScene } from "@/components/animations/ScrollScene";

const PRESS_EMAIL = "drillrapps@gmail.com";

export default async function PressPage({ params }: PageProps<"/[locale]/press">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.press;

  return (
    <ScrollScene soft>
      <section className="mx-auto max-w-3xl px-5 lg:px-8 py-20 lg:py-28">
        <PageHeader title={t.title} subtitle={t.subtitle} />
        <div className="rounded-2xl border border-white/5 bg-surface/60 px-7 py-10 text-center">
          <p className="text-xs uppercase tracking-widest text-white/40 mb-4">
            {t.contactLabel}
          </p>
          <a
            href={`mailto:${PRESS_EMAIL}`}
            className="text-xl sm:text-2xl font-semibold text-white hover:text-primary-light transition-colors break-all"
          >
            {PRESS_EMAIL}
          </a>
        </div>
      </section>
    </ScrollScene>
  );
}
