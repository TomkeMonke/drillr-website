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

        <form
        action={`mailto:${PRESS_EMAIL}`}
        method="post"
        encType="text/plain"
        className="rounded-2xl border border-white/5 bg-surface/60 p-7 space-y-5"
      >
        <Field label={t.email} required>
          <input
            type="email"
            name="From"
            required
            className="w-full rounded-lg bg-background border border-white/10 focus:border-primary/60 focus:outline-none px-4 py-3 text-white placeholder:text-white/30"
          />
        </Field>
        <Field label={t.subject} required>
          <input
            type="text"
            name="Subject"
            required
            placeholder={t.subjectPlaceholder}
            className="w-full rounded-lg bg-background border border-white/10 focus:border-primary/60 focus:outline-none px-4 py-3 text-white placeholder:text-white/30"
          />
        </Field>
        <Field label={t.message} required>
          <textarea
            name="Body"
            rows={6}
            required
            placeholder={t.messagePlaceholder}
            className="w-full rounded-lg bg-background border border-white/10 focus:border-primary/60 focus:outline-none px-4 py-3 text-white placeholder:text-white/30 resize-y"
          />
        </Field>
        <button
          type="submit"
          className="btn-shine w-full rounded-lg bg-white text-black font-semibold py-3.5 hover:bg-white/90 hover:-translate-y-0.5 transition-all duration-200"
        >
          {t.submit}
        </button>
        <p className="text-center text-sm text-white/50">
          {t.fallback}{" "}
          <a href={`mailto:${PRESS_EMAIL}`} className="text-primary hover:underline">
            {PRESS_EMAIL}
          </a>
        </p>
      </form>
      </section>
    </ScrollScene>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm text-white/70 mb-1.5">
        {label} {required && <span className="text-accent">*</span>}
      </span>
      {children}
    </label>
  );
}
