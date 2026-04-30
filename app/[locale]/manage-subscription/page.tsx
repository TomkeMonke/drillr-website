import { notFound } from "next/navigation";
import { isLocale } from "@/lib/locales";
import { getDictionary } from "../dictionaries";
import { PageHeader } from "@/components/PageHeader";
import { ScrollScene } from "@/components/animations/ScrollScene";

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

      <div className="rounded-2xl border border-white/5 bg-surface/60 p-7">
        <form className="space-y-4">
          <label className="block">
            <span className="block text-sm text-white/70 mb-1.5">{t.emailLabel}</span>
            <input
              type="email"
              required
              className="w-full rounded-lg bg-background border border-white/10 focus:border-primary/60 focus:outline-none px-4 py-3 text-white placeholder:text-white/30"
            />
          </label>
          <button
            type="submit"
            className="btn-shine w-full rounded-lg bg-white text-black font-semibold py-3.5 hover:bg-white/90 hover:-translate-y-0.5 transition-all duration-200"
          >
            {t.submit}
          </button>
        </form>
      </div>

      <div className="mt-8 grid sm:grid-cols-2 gap-4">
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
