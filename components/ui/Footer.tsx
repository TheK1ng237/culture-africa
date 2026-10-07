import Link from "next/link";
import { NAV_LINKS, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-beige/15 bg-[#100b08] text-beige">
      <div className="mx-auto max-w-7xl px-5 pb-8 pt-12 sm:px-8 sm:pt-16">
        <div className="mb-10 flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-or sm:mb-12">
          <span className="flex h-5 items-end gap-1" aria-hidden="true">
            <span className="h-3 w-1 bg-terre" />
            <span className="h-5 w-1 bg-or" />
            <span className="h-4 w-1 bg-vert" />
          </span>
          Culture vivante, récits pluriels
        </div>

        <div className="grid gap-12 border-b border-beige/15 pb-12 md:grid-cols-12 md:gap-8 md:pb-14">
          <div className="md:col-span-5">
            <p className="font-display text-3xl leading-tight text-ivoire sm:text-4xl">
              {SITE_NAME}
            </p>
            <p className="mt-2 font-display text-xl text-sable">{SITE_TAGLINE}</p>
            <p className="mt-5 max-w-md text-sm leading-7 text-beige/75 sm:text-base">
            Une plateforme pour découvrir, transmettre et valoriser les
            richesses culturelles du continent, sans les réduire à une seule
            voix.
            </p>
          </div>

          <nav aria-label="Navigation de pied de page" className="md:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-or">
              Parcourir
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm text-beige/75 transition-colors hover:text-ivoire"
                  >
                    <span
                      className="h-px w-3 bg-terre transition-all group-hover:w-5"
                      aria-hidden="true"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-or">
              Note éditoriale
            </p>
            <p className="mt-5 text-sm leading-7 text-beige/70">
            Les contenus de cette version sont des textes de démonstration. Ils
            gagneraient à être relus et enrichis avec des spécialistes et des
            communautés concernées.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-5 text-xs text-beige/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {SITE_NAME}</p>
          <p>Prototype local · Sans collecte de données</p>
        </div>
      </div>
    </footer>
  );
}
