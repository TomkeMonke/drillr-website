import { notFound } from "next/navigation";
import Link from "next/link";
import { isLocale } from "@/lib/locales";
import { getDictionary } from "../dictionaries";
import { PageHeader } from "@/components/PageHeader";
import { ScrollScene } from "@/components/animations/ScrollScene";

const SUPPORT_EMAIL = "drillrapps@gmail.com";

export default async function SupportPage({ params }: PageProps<"/[locale]/support">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.support;
  const base = `/${locale}`;

  return (
    <ScrollScene soft>
      <section className="mx-auto max-w-2xl px-5 lg:px-8 py-20 lg:py-28">
        <PageHeader title={t.title} subtitle={t.subtitle} />

        <div className="rounded-2xl border border-white/5 bg-surface/60 px-7 py-10 text-center">
          <p className="text-xs uppercase tracking-widest text-white/40 mb-4">
            {t.emailLabel}
          </p>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-xl sm:text-2xl font-semibold text-white hover:text-primary-light transition-colors break-all"
          >
            {SUPPORT_EMAIL}
          </a>
          <p className="mt-4 text-sm text-white/50">{t.responseTime}</p>
        </div>

        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          <Link
            href={`${base}/feedback`}
            className="card-lift rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] p-5"
          >
            <div className="font-semibold">{t.feedbackTitle}</div>
            <div className="mt-1 text-sm text-white/60">{t.feedbackBody}</div>
          </Link>
          <Link
            href={`${base}/manage-subscription`}
            className="card-lift rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] p-5"
          >
            <div className="font-semibold">{t.subscriptionTitle}</div>
            <div className="mt-1 text-sm text-white/60">{t.subscriptionBody}</div>
          </Link>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold mb-6">{t.faqTitle}</h2>
          <ul className="space-y-6">
            {t.faq.map((item) => (
              <li key={item.q}>
                <p className="font-medium text-white">{item.q}</p>
                <p className="mt-1 text-sm text-white/60 leading-relaxed">{item.a}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </ScrollScene>
  );
}
