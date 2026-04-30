import type { Dictionary } from "@/app/[locale]/dictionaries";
import { Reveal } from "../animations/Reveal";
import { CountUp } from "../animations/CountUp";

interface Props {
  dict: Dictionary;
}

export function UsedBy({ dict }: Props) {
  return (
    <section className="py-24 lg:py-32 border-y border-white/5 bg-white/[0.015]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {dict.usedBy.title}
            </h2>
            <p className="mt-4 text-white/60 text-lg">{dict.usedBy.subtitle}</p>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
          {dict.usedBy.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 90}>
              <div className="bg-background p-8 text-center">
                <div className="text-3xl sm:text-4xl font-bold tracking-tight text-primary">
                  <CountUp value={stat.value} />
                </div>
                <div className="mt-2 text-sm text-white/60">{stat.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
