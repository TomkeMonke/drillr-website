"use client";

import { useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({ children, className = "", strength = 0.35 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * strength;
    const dy = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
    const inner = el.firstElementChild as HTMLElement | null;
    if (inner) inner.style.transform = `translate(${dx * 0.4}px, ${dy * 0.4}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
    const inner = el.firstElementChild as HTMLElement | null;
    if (inner) inner.style.transform = "";
  };

  return (
    <div
      className="magnetic-wrap inline-block"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div ref={ref} className="magnetic-outer inline-block">
        <div className={`magnetic-inner inline-block ${className}`}>{children}</div>
      </div>
      <style>{`
        .magnetic-outer, .magnetic-inner {
          transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }
        @media (hover: none), (pointer: coarse) {
          .magnetic-outer, .magnetic-inner { transform: none !important; }
        }
      `}</style>
    </div>
  );
}
