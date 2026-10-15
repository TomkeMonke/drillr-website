"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/locales";

interface Props {
  current: Locale;
}

const LOCALE_PREFIX_RE = new RegExp(`^/(${LOCALES.join("|")})(?=/|$)`);

// A dropdown rather than a pill per language: eight pills do not fit next to
// the menu button on a phone.
export function LanguageSwitcher({ current }: Props) {
  const pathname = usePathname() ?? "/";
  // strip the leading /<locale> segment
  const stripped = pathname.replace(LOCALE_PREFIX_RE, "") || "";
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative text-xs font-medium">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={LOCALE_LABELS[current]}
        className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-white/80 hover:text-white transition-colors"
      >
        {current.toUpperCase()}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <ul
          role="menu"
          className="absolute right-0 top-full mt-2 z-50 min-w-44 rounded-2xl border border-white/10 bg-surface/95 backdrop-blur p-1 shadow-xl"
        >
          {LOCALES.map((loc) => {
            const active = loc === current;
            return (
              <li key={loc} role="none">
                <Link
                  role="menuitem"
                  href={`/${loc}${stripped}`}
                  hrefLang={loc}
                  lang={loc}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "true" : undefined}
                  className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${
                    active ? "bg-white text-black" : "text-white/75 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span>{LOCALE_LABELS[loc]}</span>
                  <span className={active ? "text-black/50" : "text-white/40"}>{loc.toUpperCase()}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
