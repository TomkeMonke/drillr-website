import type { Dictionary } from "@/app/[locale]/dictionaries";
import { DownloadBadges } from "../DownloadBadges";
import { Reveal } from "../animations/Reveal";

interface Props {
  dict: Dictionary;
}

export function FinalCta({ dict }: Props) {
  const t = dict.finalCta;

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 p-10 lg:p-16 text-center bg-gradient-to-br from-[#10121a] via-[#0f1118] to-[#0a0a0e]">
            <div
              className="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full blur-3xl opacity-40 pointer-events-none"
              style={{ background: "radial-gradient(closest-side, rgba(var(--primary-rgb),0.4), transparent)" }}
              aria-hidden="true"
            />
            <div className="relative flex flex-col items-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                {t.title}
              </h2>
              <p className="mt-4 max-w-xl text-white/70 leading-relaxed">{t.body}</p>
              <DownloadBadges labels={dict.common} size="lg" className="mt-9 justify-center" />
              <p className="mt-5 text-sm text-white/50">{t.note}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
