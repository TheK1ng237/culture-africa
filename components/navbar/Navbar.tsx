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
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,padding,border-color] duration-500",
          scrolled
            ? "border-b border-beige/10 bg-noir/85 py-3 backdrop-blur-md"
            : "border-b border-transparent bg-transparent py-5",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
          <Link
            href="/"
            className="font-display text-2xl text-ivoire"
            onClick={() => setMenuOpen(false)}
          >
            {SITE_NAME}
          </Link>

          <nav aria-label="Navigation principale" className="hidden xl:block">
            <ul className="flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={
                      isActive(pathname, link.href) ? "page" : undefined
                    }
                    className={cn(
                      "relative py-1 text-[0.95rem] text-beige/80 transition-colors hover:text-ivoire",
                      isActive(pathname, link.href) &&
                        "text-ivoire after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-or",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Ouvrir la recherche"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-beige/25 text-ivoire transition-colors hover:border-or hover:text-or"
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
              className="hidden rounded-full bg-or px-5 py-2 text-sm font-medium text-noir transition-colors hover:bg-ocre sm:inline-block"
            >
              Explorer
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-beige/25 text-ivoire xl:hidden"
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
            className="fixed inset-0 z-40 overflow-y-auto bg-noir px-6 pb-10 pt-28 xl:hidden"
          >
            <nav aria-label="Menu mobile">
              <ul className="space-y-1">
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
                        "block py-3 font-display text-4xl text-beige/80 hover:text-ivoire",
                        isActive(pathname, link.href) && "text-ivoire",
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <Link
                href="/#globe"
                onClick={() => setMenuOpen(false)}
                className="mt-8 inline-block rounded-full bg-or px-6 py-3 font-medium text-noir"
              >
                Explorer le globe
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
