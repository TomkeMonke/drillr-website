"use client";

import { useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  max?: number;
  /** Whether the element lifts slightly on hover. */
  lift?: boolean;
}

export function TiltFrame({ children, className = "", max = 8, lift = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    // Skip on coarse pointers (touch devices)
    if (window.matchMedia?.("(pointer: coarse)").matches) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (y - 0.5) * -max * 2;
    const tiltY = (x - 0.5) * max * 2;

    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      if (!ref.current) return;
      const liftZ = lift ? 20 : 0;
      ref.current.style.transform = `perspective(1200px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateZ(${liftZ}px)`;
    });
  };

  const onLeave = () => {
    if (!ref.current) return;
    if (rafId.current) cancelAnimationFrame(rafId.current);
    ref.current.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transition: "transform 400ms cubic-bezier(0.2, 0.8, 0.2, 1)",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      className={className}
    >
      {children}
    </div>
  );
}
