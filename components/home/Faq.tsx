import type { Dictionary } from "@/app/[locale]/dictionaries";
import { Reveal } from "../animations/Reveal";

interface Props {
  dict: Dictionary;
}

export function Faq({ dict }: Props) {
  return (
    <section id="faq" className="py-24 lg:py-32 scroll-mt-24">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <Reveal>
          <h2 className="text-center text-3xl sm:text-4xl font-bold tracking-tight">
            {dict.faq.title}
          </h2>
          <p className="text-center text-white/60 mt-3 mb-12">
            {dict.faq.subtitle}
          </p>
        </Reveal>
        <div className="space-y-3">
          {dict.faq.items.map((item, i) => (
            <Reveal key={item.q} delay={i * 70}>
              <details className="group rounded-2xl border border-white/5 bg-surface/60 open:bg-surface open:border-white/10 transition-colors">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5">
                  <h3 className="text-base sm:text-lg font-medium text-white">{item.q}</h3>
                  <span
                    className="shrink-0 text-white/60 transition-transform duration-300 group-open:rotate-45"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <div className="faq-content">
                  <div className="faq-content-inner">
                    <div className="px-6 pb-5 -mt-1 text-white/70 leading-relaxed">
                      {item.a}
                    </div>
                  </div>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
