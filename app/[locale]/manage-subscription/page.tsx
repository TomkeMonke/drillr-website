import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/locales";
import { pageMetadata } from "@/lib/metadata";
import { getDictionary } from "../dictionaries";
import { PageHeader } from "@/components/PageHeader";
import { ScrollScene } from "@/components/animations/ScrollScene";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/manage-subscription">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return pageMetadata(
    locale,
    "/manage-subscription",
    dict.manageSubscription.title,
    dict.manageSubscription.body,
  );
}

export default async function ManageSubscriptionPage({
  params,
}: PageProps<"/[locale]/manage-subscription">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.manageSubscription;

  return (
    <ScrollScene soft>
      <section className="mx-auto max-w-2xl px-5 lg:px-8 py-20 lg:py-28">
        <PageHeader title={t.title} subtitle={t.body} />

      <div className="mt-2 grid sm:grid-cols-2 gap-4">
        <a
          href="https://apps.apple.com/account/subscriptions"
          target="_blank"
          rel="noopener"
          className="card-lift rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] p-5 text-center"
        >
          <div className="text-sm text-white/60">App Store</div>
          <div className="mt-1 font-semibold">{t.appleHelp}</div>
        </a>
        <a
          href="https://play.google.com/store/account/subscriptions"
          target="_blank"
          rel="noopener"
          className="card-lift rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] p-5 text-center"
        >
          <div className="text-sm text-white/60">Google Play</div>
          <div className="mt-1 font-semibold">{t.googleHelp}</div>
        </a>
      </div>
      </section>
    </ScrollScene>
  );
}
