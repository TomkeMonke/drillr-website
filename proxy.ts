import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/locales";

function pickLocale(request: NextRequest): string {
  const accept = request.headers.get("accept-language") ?? "";
  const langs = accept
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase());
  for (const lang of langs) {
    const short = lang.split("-")[0];
    if ((LOCALES as readonly string[]).includes(short)) return short;
  }
  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = (LOCALES as readonly string[]).some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return;

  const locale = pickLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
