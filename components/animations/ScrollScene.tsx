import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Use the lighter "exit only" variant - good for hero sections that should not fade in on first paint. */
  soft?: boolean;
  className?: string;
}

/**
 * Server-component wrapper that opts a section into scroll-driven enter/exit transitions.
 * Falls back gracefully on browsers without animation-timeline (Safari/Firefox today)
 * - the inner Reveal animations still handle entrance.
 */
export function ScrollScene({ children, soft = false, className = "" }: Props) {
  return (
    <div className={`${soft ? "scroll-scene-soft" : "scroll-scene"} ${className}`}>
      {children}
    </div>
  );
}
