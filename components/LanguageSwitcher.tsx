"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/locales";

interface Props {
  current: Locale;
}

export function LanguageSwitcher({ current }: Props) {
  const pathname = usePathname() ?? "/";
  // strip the leading /<locale> segment
  const stripped = pathname.replace(/^\/(en|pl)(?=\/|$)/, "") || "";

  return (
    <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-0.5 text-xs font-medium">
      {LOCALES.map((loc) => {
        const active = loc === current;
        const href = `/${loc}${stripped}`;
        return (
          <Link
            key={loc}
            href={href}
            className={`px-2.5 py-1 rounded-full transition-colors ${
              active
                ? "bg-white text-black"
                : "text-white/70 hover:text-white"
            }`}
          >
            {loc.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
