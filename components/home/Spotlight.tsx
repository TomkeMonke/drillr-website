import type { Dictionary } from "@/app/[locale]/dictionaries";
import { PhoneFrame } from "../PhoneFrame";
import { Reveal } from "../animations/Reveal";
import { TiltFrame } from "../animations/TiltFrame";

interface Props {
  dict: Dictionary;
}

export function Spotlight({ dict }: Props) {
  return (
    <section className="py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal direction="right" distance={40} className="order-2 lg:order-1">
          <span className="inline-block text-sm uppercase tracking-widest text-accent font-semibold mb-4">
            {dict.spotlight.badge}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            {dict.spotlight.title}
          </h2>
          <p className="mt-5 text-lg text-white/70 max-w-md leading-relaxed">
            {dict.spotlight.body}
          </p>
        </Reveal>
        <Reveal direction="left" distance={40} className="order-1 lg:order-2">
          <div className="flex justify-center">
            <TiltFrame max={7}>
              <PhoneFrame variant="accent" />
            </TiltFrame>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
