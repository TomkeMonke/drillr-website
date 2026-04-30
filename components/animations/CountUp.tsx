"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  value: string;
  duration?: number;
  className?: string;
}

interface Parsed {
  number: number;
  prefix: string;
  suffix: string;
  decimals: number;
  separator: "comma" | "space" | "none";
}

function parse(value: string): Parsed {
  const match = value.match(/^([^\d.,]*?)([\d., ]+?)([^\d]*)$/);
  if (!match) {
    return { number: 0, prefix: "", suffix: value, decimals: 0, separator: "none" };
  }
  const [, prefix, numStr, suffix] = match;
  const separator: Parsed["separator"] = numStr.includes(",")
    ? "comma"
    : /\d \d/.test(numStr)
      ? "space"
      : "none";
  const clean = numStr.replace(/[, ]/g, "");
  const decimals = clean.includes(".") ? clean.split(".")[1].length : 0;
  return {
    number: parseFloat(clean) || 0,
    prefix,
    suffix,
    decimals,
    separator,
  };
}

function format(n: number, decimals: number, separator: Parsed["separator"]): string {
  const fixed = n.toFixed(decimals);
  if (separator === "none") return fixed;
  const sep = separator === "comma" ? "," : " ";
  const [intPart, decPart] = fixed.split(".");
  const withSep = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, sep);
  return decPart ? `${withSep}.${decPart}` : withSep;
}

export function CountUp({ value, duration = 1600, className }: Props) {
  const parsed = parse(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(() =>
    format(0, parsed.decimals, parsed.separator),
  );
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setDisplay(format(parsed.number, parsed.decimals, parsed.separator));
      started.current = true;
      return;
    }

    const node = ref.current;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (t: number) => {
            const progress = Math.min((t - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(format(parsed.number * eased, parsed.decimals, parsed.separator));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [parsed.number, parsed.decimals, parsed.separator, duration]);

  return (
    <span ref={ref} className={className}>
      {parsed.prefix}
      <span className="tabular-nums">{display}</span>
      {parsed.suffix}
    </span>
  );
}
