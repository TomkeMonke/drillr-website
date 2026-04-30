import type { Dictionary } from "@/app/[locale]/dictionaries";
import { Reveal } from "../animations/Reveal";

interface Props {
  dict: Dictionary;
}

export function Testimonials({ dict }: Props) {
  return (
    <section className="py-24 lg:py-32 bg-[#0a0a0e] border-y border-white/5">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <h2 className="text-center text-3xl sm:text-4xl font-bold tracking-tight mb-14">
            {dict.testimonials.title}
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {dict.testimonials.items.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 100}>
              <figure className="group card-lift rounded-2xl border border-white/5 bg-surface/60 hover:bg-surface p-6 flex flex-col h-full">
                <div className="text-accent text-sm mb-3">★★★★★</div>
                <blockquote className="text-white/80 leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="avatar-ring h-9 w-9 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-sm font-semibold text-white">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{t.name}</div>
                    <div className="text-xs text-white/50">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
