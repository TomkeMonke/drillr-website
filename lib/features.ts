/**
 * Feature flags. Flip to `false` to hide a section without deleting code.
 * To remove a feature permanently: flip to false here, then delete the
 * corresponding component file and its import in the page that uses it.
 */
export const FEATURES = {
  /** Interactive position picker on the home page (between Hero and Features). */
  positionPicker: true,
  /** Looping drill video section after Features. */
  drillVideo: true,
  /** FAQ accordion before Ratings. */
  faq: true,
  /** "For coaches/academies" CTA strip above the footer. */
  coachesCta: true,
  /** /training/[position] landing pages (also gates the Training column in footer). */
  positionPages: true,
} as const;

export type FeatureKey = keyof typeof FEATURES;
