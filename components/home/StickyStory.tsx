"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/app/[locale]/dictionaries";

interface Props {
  dict: Dictionary;
}

const ACCENTS = ["#5B9FD6", "#E8A44A", "#8BD17C"];

const ICONS = [
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-10 w-10">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 12h18M12 5v14" />
    <circle cx="12" cy="12" r="2.5" />
  </svg>,
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-10 w-10">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-10 w-10">
    <path d="M4 20h16" />
    <rect x="6" y="12" width="3" height="8" rx="1" />
    <rect x="11" y="7" width="3" height="13" rx="1" />
    <rect x="16" y="3" width="3" height="17" rx="1" />
  </svg>,
];

export function StickyStory({ dict }: Props) {
  const steps = dict.story.steps;
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let ticking = false;
    const compute = () => {
      ticking = false;
      const vCenter = window.innerHeight / 2;
      let bestI = 0;
      let bestDist = Infinity;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const dist = Math.abs(center - vCenter);
        if (dist < bestDist) {
          bestDist = dist;
          bestI = i;
        }
      });
      setActive(bestI);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="relative py-24 lg:py-32 border-y border-white/5 bg-white/[0.015]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="text-xs uppercase tracking-[0.2em] text-primary/80 mb-3">
            {dict.story.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {dict.story.title}
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">
          <div className="lg:sticky lg:top-28 flex justify-center">
            <div className="relative">
              <div
                aria-hidden
                className="absolute inset-0 -z-10 blur-3xl rounded-[3rem] opacity-60 transition-colors duration-700"
                style={{
                  background: `radial-gradient(closest-side, ${ACCENTS[active]}55, transparent)`,
                }}
              />
              <div className="relative mx-auto w-[260px] sm:w-[300px] aspect-[9/19] rounded-[2.75rem] bg-gradient-to-b from-[#1a1a1f] to-[#0a0a0a] border border-white/10 shadow-2xl shadow-black/50 p-2.5">
                <div className="relative w-full h-full rounded-[2.25rem] overflow-hidden bg-[#0a0a0a]">
                  <div className="absolute left-1/2 -translate-x-1/2 top-2 z-10 h-6 w-24 rounded-full bg-black border border-white/5" />
                  {steps.map((step, i) => {
                    const accent = ACCENTS[i] ?? ACCENTS[0];
                    return (
                      <div
                        key={i}
                        className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center transition-opacity duration-500"
                        style={{
                          opacity: i === active ? 1 : 0,
                          background: `radial-gradient(120% 80% at 50% 0%, ${accent}22, transparent 60%), #0a0a0a`,
                        }}
                      >
                        <div
                          className="h-16 w-16 rounded-2xl flex items-center justify-center"
                          style={{ background: accent, color: "#0a0a0a" }}
                        >
                          {ICONS[i] ?? ICONS[0]}
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                          {step.eyebrow}
                        </div>
                        <div className="text-base font-semibold text-white/90 max-w-[200px] leading-snug">
                          {step.title}
                        </div>
                        <div className="mt-2 flex gap-1.5">
                          {steps.map((_, j) => (
                            <span
                              key={j}
                              className="h-1 rounded-full transition-all duration-500"
                              style={{
                                width: j === active ? 22 : 8,
                                background: j === active ? accent : "rgba(255,255,255,0.2)",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-24 lg:gap-40 lg:pt-12 lg:pb-24">
            {steps.map((step, i) => {
              const accent = ACCENTS[i] ?? ACCENTS[0];
              return (
                <div
                  key={i}
                  data-index={i}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  className="transition-opacity duration-500"
                  style={{ opacity: i === active ? 1 : 0.4 }}
                >
                  <div
                    className="text-xs uppercase tracking-[0.2em] mb-3"
                    style={{ color: accent }}
                  >
                    {step.eyebrow}
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
                    {step.title}
                  </h3>
                  <p className="mt-5 text-lg text-white/65 leading-relaxed max-w-lg">
                    {step.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
