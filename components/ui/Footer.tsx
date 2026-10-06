import Link from "next/link";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-noir text-beige">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl text-ivoire">{SITE_NAME}</p>
          <p className="mt-4 max-w-md text-beige/80">
            Une plateforme pour découvrir, transmettre et valoriser les richesses culturelles du continent, sans les
            réduire à une seule voix.
          </p>
        </div>
        <nav aria-label="Pied de page">
          <p className="font-display text-xl text-ivoire">Explorer</p>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-beige/80 transition-colors hover:text-or">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="font-display text-xl text-ivoire">À savoir</p>
          <p className="mt-4 text-beige/80">
            Les contenus de cette version sont des textes de démonstration. Ils gagneraient à être relus et enrichis
            avec des spécialistes et des communautés concernées.
          </p>
        </div>
      </div>
      <div className="border-t border-beige/10 px-5 py-6 text-center text-sm text-beige/60">
        © {SITE_NAME}. Prototype local, sans collecte de données.
      </div>
    </footer>
  );
}
