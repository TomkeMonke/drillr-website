import type { CSSProperties, ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface Props {
  children: ReactNode;
  /** @deprecated kept for API compat; scroll-linked version doesn't use time delays */
  delay?: number;
  /** Direction the element travels from. "none" = pure fade. */
  direction?: Direction;
  /** Distance in px the element travels. */
  distance?: number;
  /** @deprecated kept for API compat; scroll-linked version uses the scroll range instead */
  duration?: number;
  /** @deprecated kept for API compat */
  once?: boolean;
  /** @deprecated kept for API compat */
  threshold?: number;
  className?: string;
  /** Render as this element. Defaults to div. */
  as?: "div" | "section" | "article" | "li" | "span";
}

/**
 * Scroll-linked reveal: opacity + transform are bound to the element's scroll
 * progress through the viewport. As the user scrolls, every Reveal continuously
 * mirrors scroll position instead of firing once and freezing.
 *
 * Chrome/Edge/Safari 26+ get the native `animation-timeline: view()` effect.
 * Browsers without support fall back to static content (always visible).
 */
export function Reveal({
  children,
  direction = "up",
  distance = 24,
  className = "",
  as: Tag = "div",
}: Props) {
  const style = {
    "--reveal-distance": `${distance}px`,
  } as CSSProperties;

  return (
    <Tag className={`reveal-scroll reveal-scroll-${direction} ${className}`} style={style}>
      {children}
    </Tag>
  );
}
