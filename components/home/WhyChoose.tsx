import type { Dictionary } from "@/app/[locale]/dictionaries";
import { Reveal } from "../animations/Reveal";

interface Props {
  dict: Dictionary;
}

const ICONS = [
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>,
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6">
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 9h18M8 3v4M16 3v4" />
  </svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6">
    <path d="M4 20h16" />
    <rect x="6" y="12" width="3" height="8" rx="1" />
    <rect x="11" y="7" width="3" height="13" rx="1" />
    <rect x="16" y="3" width="3" height="17" rx="1" />
  </svg>,
];

export function WhyChoose({ dict }: Props) {
  return (
    <section className="py-24 lg:py-32 border-y border-white/5 bg-white/[0.015]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {dict.whyChoose.title}
            </h2>
            <p className="mt-4 text-white/60 text-lg">{dict.whyChoose.subtitle}</p>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {dict.whyChoose.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 110}>
              <div className="card-lift group rounded-2xl border border-white/5 bg-surface p-7 h-full">
                <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  {ICONS[i] ?? ICONS[0]}
                </div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-white/60">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
