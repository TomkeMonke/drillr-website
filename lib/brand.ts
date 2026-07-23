/**
 * Brand primary color — single source of truth for JS / Satori contexts
 * (e.g. the OpenGraph image) that cannot read the CSS custom properties in
 * app/globals.css. Keep `primary` in sync with `--primary` there.
 */
export const BRAND = {
  /** Hex form, e.g. for solid fills. */
  primary: "#5b9fd6",
  /** Comma-separated RGB channels, for `rgba(${primaryRgb}, a)` gradients. */
  primaryRgb: "91, 159, 214",
} as const;
