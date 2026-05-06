import Image from "next/image";
import type { Dictionary } from "@/app/[locale]/dictionaries";
import { PhoneFrame } from "../PhoneFrame";
import { Reveal } from "../animations/Reveal";
import { TiltFrame } from "../animations/TiltFrame";

interface Props {
  dict: Dictionary;
}

export function Features({ dict }: Props) {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <h2 className="text-center text-3xl sm:text-4xl font-bold tracking-tight mb-16">
            {dict.features.title}
          </h2>
        </Reveal>
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-center">
          <Reveal direction="right" distance={40}>
            <div className="flex justify-center lg:justify-start">
              <TiltFrame max={7}>
                <PhoneFrame variant="primary">
                  <div className="absolute inset-0 bg-[#111113]">
                    <Image
                      src="/screenshots/day-detail-v2.png"
                      alt={dict.common.screenshotAlt}
                      fill
                      sizes="(min-width: 768px) 320px, (min-width: 640px) 300px, 280px"
                      className="object-contain"
                    />
                  </div>
                </PhoneFrame>
              </TiltFrame>
            </div>
          </Reveal>
          <ul className="space-y-4">
            {dict.features.items.map((item, i) => (
              <Reveal key={item.title} as="li" direction="left" distance={32} delay={i * 100}>
                <div className="card-lift rounded-2xl border border-white/5 bg-surface/60 hover:bg-surface p-6">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-white/60">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
