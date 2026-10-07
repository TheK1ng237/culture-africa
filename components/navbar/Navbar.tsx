"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";
import { SearchDialog } from "@/components/search/SearchDialog";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > 24));

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, searchOpen]);

  return (
    <>
      <a
        href="#contenu"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded bg-or px-4 py-2 font-medium text-noir transition-transform focus:translate-y-0"
      >
        Aller au contenu
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,backdrop-filter,padding,border-color] duration-500",
          scrolled
            ? "border-beige/10 bg-noir/90 py-3 backdrop-blur-xl"
            : "border-transparent bg-linear-to-b from-noir/65 via-noir/20 to-transparent py-4 backdrop-blur-[2px] sm:py-5",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:gap-6 sm:px-8">
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-3 text-ivoire"
            onClick={() => setMenuOpen(false)}
          >
            <span className="flex h-9 items-end gap-1" aria-hidden="true">
              <span className="h-5 w-1 rounded-t-sm bg-terre" />
              <span className="h-8 w-1 rounded-t-sm bg-or" />
              <span className="h-6 w-1 rounded-t-sm bg-vert" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-xl sm:text-2xl">{SITE_NAME}</span>
              <span className="mt-1.5 hidden text-[0.58rem] uppercase tracking-[0.18em] text-beige/65 sm:block">
                Mille histoires, un continent
              </span>
            </span>
          </Link>

          <nav aria-label="Navigation principale" className="hidden xl:block">
            <ul className="flex items-center gap-5 2xl:gap-7">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={
                      isActive(pathname, link.href) ? "page" : undefined
                    }
                    className={cn(
                      "relative py-2 text-sm text-beige/75 transition-colors hover:text-ivoire 2xl:text-[0.95rem]",
                      isActive(pathname, link.href) &&
                        "text-ivoire after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-or",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Ouvrir la recherche"
              className="flex h-10 w-10 items-center justify-center border border-beige/25 text-ivoire transition-colors hover:border-or hover:text-or"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </button>
            <Link
              href="/#globe"
              className="hidden border border-or/70 bg-or px-4 py-2 text-sm font-semibold text-noir transition-colors hover:border-or-light hover:bg-or-light sm:inline-block"
            >
              Explorer
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 border border-beige/25 text-ivoire transition-colors hover:border-or xl:hidden"
            >
              <span
                className={cn(
                  "h-0.5 w-5 bg-current transition-transform",
                  menuOpen && "translate-y-1 rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-5 bg-current transition-transform",
                  menuOpen && "-translate-y-1 -rotate-45",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="menu-mobile"
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-noir px-6 pb-10 pt-28 xl:hidden sm:px-8"
          >
            <nav aria-label="Menu mobile" className="mx-auto max-w-7xl">
              <div className="mb-5 flex items-center gap-3 border-b border-beige/15 pb-4 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-or">
                <span className="h-px w-8 bg-or" aria-hidden="true" />
                Navigation
              </div>
              <ul className="grid grid-cols-1 gap-x-12 sm:grid-cols-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.4, ease: EASE }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={
                        isActive(pathname, link.href) ? "page" : undefined
                      }
                      className={cn(
                        "group flex items-baseline gap-4 border-b border-beige/10 py-4 font-display text-3xl text-beige/80 transition-colors hover:text-ivoire sm:text-4xl",
                        isActive(pathname, link.href) && "text-or",
                      )}
                    >
                      <span className="font-sans text-xs text-beige/40 transition-colors group-hover:text-or" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <Link
                href="/#globe"
                onClick={() => setMenuOpen(false)}
                className="mt-8 inline-flex items-center gap-3 border border-or bg-or px-6 py-3 font-semibold text-noir transition-colors hover:bg-or-light"
              >
                Explorer le globe
                <span aria-hidden="true">↗</span>
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {searchOpen ? (
          <SearchDialog key="search" onClose={() => setSearchOpen(false)} />
        ) : null}
      </AnimatePresence>
    </>
  );
}
