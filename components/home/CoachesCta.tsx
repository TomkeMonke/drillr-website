import type { Dictionary } from "@/app/[locale]/dictionaries";
import { Reveal } from "../animations/Reveal";

const COACH_EMAIL = "drillrapps@gmail.com";

interface Props {
  dict: Dictionary;
}

export function CoachesCta({ dict }: Props) {
  const t = dict.coachesCta;

  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 p-10 lg:p-14 bg-gradient-to-br from-[#10121a] via-[#0f1118] to-[#0a0a0e]">
            <div
              className="absolute -top-20 -right-20 h-64 w-64 rounded-full blur-3xl opacity-40 pointer-events-none"
              style={{ background: "radial-gradient(closest-side, rgba(91,159,214,0.4), transparent)" }}
              aria-hidden="true"
            />
            <div className="relative grid lg:grid-cols-[1.3fr_1fr] gap-8 items-center">
              <div>
                <div className="inline-block text-xs uppercase tracking-widest text-primary font-semibold mb-3">
                  {t.eyebrow}
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                  {t.title}
                </h2>
                <p className="mt-4 text-white/70 leading-relaxed max-w-xl">{t.body}</p>
              </div>
              <div className="lg:justify-self-end">
                <a
                  href={`mailto:${COACH_EMAIL}?subject=${encodeURIComponent("Coach / Academy inquiry")}`}
                  className="group btn-shine glow-breathe inline-flex items-center gap-2 rounded-xl bg-white text-black font-semibold px-6 py-3.5 hover:bg-white/90 hover:-translate-y-0.5 transition-all duration-200"
                >
                  {t.cta}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
