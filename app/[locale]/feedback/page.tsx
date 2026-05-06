import { notFound } from "next/navigation";
import Script from "next/script";
import { isLocale } from "@/lib/locales";
import { getDictionary } from "../dictionaries";
import { PageHeader } from "@/components/PageHeader";

const TALLY_FORM_ID = {
  en: "BzQeRR",
  pl: "2EJR8L",
} as const;

function tallySrc(formId: string) {
  return `https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`;
}

export default async function FeedbackPage({ params }: PageProps<"/[locale]/feedback">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.feedback;
  const formId = TALLY_FORM_ID[locale];

  return (
    <section className="mx-auto max-w-3xl px-5 lg:px-8 py-20 lg:py-28">
      <PageHeader title={t.title} subtitle={t.subtitle} />

      <div className="rounded-2xl border border-white/5 bg-surface/40 px-2 sm:px-5 py-4 sm:py-6">
        <iframe
          key={formId}
          src={tallySrc(formId)}
          loading="lazy"
          width="100%"
          height="1100"
          frameBorder={0}
          marginHeight={0}
          marginWidth={0}
          title={t.title}
          className="block w-full"
        />
      </div>

      <noscript>
        <p className="mt-6 text-center text-sm text-white/60">
          <a
            href={`https://tally.so/r/${formId}`}
            className="text-primary hover:text-primary-light underline-offset-4 hover:underline"
          >
            {t.title}
          </a>
        </p>
      </noscript>

      <Script src="https://tally.so/widgets/embed.js" strategy="afterInteractive" />
    </section>
  );
}
