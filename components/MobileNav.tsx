"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavItem {
  href: string;
  label: string;
}

interface Props {
  nav: NavItem[];
}

export function MobileNav({ nav }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the panel on navigation (e.g. browser back), adjusting state
  // during render instead of in an effect.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/15 bg-white/5 text-white/80 hover:text-white transition-colors"
      >
        <span className="relative block w-4 h-3">
          <span
            className={`absolute left-0 right-0 h-px bg-current transition-all duration-200 ${
              open ? "top-1/2 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 right-0 top-1/2 h-px bg-current transition-opacity duration-200 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 right-0 h-px bg-current transition-all duration-200 ${
              open ? "top-1/2 -rotate-45" : "bottom-0"
            }`}
          />
        </span>
      </button>

      {open && (
        <nav
          id="mobile-nav-panel"
          className="md:hidden absolute left-0 right-0 top-full border-b border-white/5 bg-background/95 backdrop-blur-xl"
        >
          <ul className="px-5 py-3 flex flex-col gap-1 text-base text-white/80">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block px-2 py-3 rounded-lg hover:bg-white/5 hover:text-white transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}
