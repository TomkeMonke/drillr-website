import type { Dictionary } from "@/app/[locale]/dictionaries";
import { Reveal } from "../animations/Reveal";
import { TiltFrame } from "../animations/TiltFrame";

interface Props {
  dict: Dictionary;
}

export function DrillVideo({ dict }: Props) {
  const t = dict.drillVideo;

  return (
    <section className="py-24 lg:py-32 border-y border-white/5 bg-white/[0.015]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal direction="right" distance={40}>
          <span className="inline-block text-sm uppercase tracking-widest text-primary font-semibold mb-3">
            {t.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {t.title}
          </h2>
          <p className="mt-5 text-lg text-white/70 max-w-md leading-relaxed">
            {t.body}
          </p>
        </Reveal>

        <Reveal direction="left" distance={40}>
          <TiltFrame max={7}>
            <div className="relative">
              <div
                className="absolute inset-0 -z-10 blur-3xl rounded-[3rem] opacity-60"
                style={{
                  background: "radial-gradient(closest-side, rgba(91,159,214,0.3), transparent)",
                }}
              />
              <div className="mx-auto w-full max-w-[360px] aspect-[9/19] rounded-[2.5rem] bg-gradient-to-b from-[#1a1a1f] to-[#0a0a0a] border border-white/10 shadow-2xl shadow-black/50 p-2.5">
                <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-black">
                  <div className="absolute left-1/2 -translate-x-1/2 top-2 z-10 h-6 w-24 rounded-full bg-black border border-white/5" />
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover"
                    poster="/icon.png"
                  >
                    <source src="/drill-agility.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="text-xs uppercase tracking-widest text-white/60">
                      {t.caption}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TiltFrame>
        </Reveal>
      </div>
    </section>
  );
}
