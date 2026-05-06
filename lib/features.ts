/**
 * Feature flags. Flip to `false` to hide a section without deleting code.
 * To remove a feature permanently: flip to false here, then delete the
 * corresponding component file and its import in the page that uses it.
 */
export const FEATURES = {
  /** Interactive position picker on the home page (after Features). */
  positionPicker: true,
  /** FAQ accordion before the footer. */
  faq: true,
  /** "For coaches/academies" CTA strip above the footer. */
  coachesCta: false,
  /** /training/[position] landing pages (also gates the Training column in footer). */
  positionPages: true,
  /** Player testimonials grid. Off until we have real reviews to quote. */
  testimonials: false,
} as const;

export type FeatureKey = keyof typeof FEATURES;
