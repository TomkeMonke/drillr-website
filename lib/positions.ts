/**
 * Shared position data. Keep in sync with dictionaries[locale].positions.
 * `slug` maps to /training/[position] and to the dictionary key.
 */
export const POSITION_SLUGS = ["goalkeeper", "defender", "midfielder", "forward"] as const;
export type PositionSlug = (typeof POSITION_SLUGS)[number];

/** Render order for focus-breakdown bars (PositionPicker + position pages). */
export const FOCUS_CATEGORIES = ["strength", "cardio", "agility", "flexibility"] as const;
export type FocusCategory = (typeof FOCUS_CATEGORIES)[number];

export type PositionFocus = Record<FocusCategory, number>;

export interface PositionData {
  slug: PositionSlug;
  /** Tints for the phone-frame glow + accent UI on the position page */
  accent: string;
  /** Focus % breakdown - must sum to 100 */
  focus: PositionFocus;
}

export const POSITIONS: Record<PositionSlug, PositionData> = {
  goalkeeper: {
    slug: "goalkeeper",
    accent: "#E8A44A",
    focus: { strength: 25, cardio: 10, agility: 40, flexibility: 25 },
  },
  defender: {
    slug: "defender",
    accent: "#5B9FD6",
    focus: { strength: 35, cardio: 20, agility: 20, flexibility: 25 },
  },
  midfielder: {
    slug: "midfielder",
    accent: "#3A9A6A",
    focus: { strength: 25, cardio: 35, agility: 25, flexibility: 15 },
  },
  forward: {
    slug: "forward",
    accent: "#7AB8E8",
    focus: { strength: 25, cardio: 25, agility: 35, flexibility: 15 },
  },
};

export function isPositionSlug(value: string): value is PositionSlug {
  return (POSITION_SLUGS as readonly string[]).includes(value);
}
