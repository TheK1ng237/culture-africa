"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Country } from "@/types";
import { normalize } from "@/lib/utils";
import { CountryCard } from "./CountryCard";

export function CountriesExplorer({ countries }: { countries: Country[] }) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("");
  const [language, setLanguage] = useState("");

  const regions = useMemo(() => Array.from(new Set(countries.map((c) => c.region))), [countries]);
  const languages = useMemo(
    () => Array.from(new Set(countries.flatMap((c) => c.languages))).sort((a, b) => a.localeCompare(b, "fr")),
    [countries],
  );

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return countries.filter((c) => {
      if (region && c.region !== region) return false;
      if (language && !c.languages.includes(language)) return false;
      if (!q) return true;
      return normalize(`${c.name} ${c.capital} ${c.description} ${c.peoples.join(" ")}`).includes(q);
    });
  }, [countries, query, region, language]);

  const fieldClass =
    "w-full rounded-xl border border-noir/20 bg-ivoire px-4 py-3 text-base text-noir outline-none focus:border-terre focus:ring-2 focus:ring-or/50";

  return (
    <div>
      <form role="search" aria-label="Filtrer les pays" onSubmit={(event) => event.preventDefault()} className="grid gap-4 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <label htmlFor="pays-recherche" className="mb-1.5 block text-sm font-medium">Rechercher un pays</label>
          <input id="pays-recherche" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Nom, capitale, peuple…" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="pays-region" className="mb-1.5 block text-sm font-medium">Région</label>
          <select id="pays-region" value={region} onChange={(e) => setRegion(e.target.value)} className={fieldClass}>
            <option value="">Toutes les régions</option>
            {regions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="pays-langue" className="mb-1.5 block text-sm font-medium">Langue</label>
          <select id="pays-langue" value={language} onChange={(e) => setLanguage(e.target.value)} className={fieldClass}>
            <option value="">Toutes les langues</option>
            {languages.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
      </form>

      <p className="mt-6 text-noir/70" aria-live="polite">
        {filtered.length} {filtered.length > 1 ? "pays affichés" : "pays affiché"} sur {countries.length}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-noir/25 p-10 text-center">
          <p className="font-display text-2xl">Aucun pays ne correspond à ces filtres.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setRegion("");
              setLanguage("");
            }}
            className="mt-4 rounded-full bg-noir px-5 py-2 text-ivoire hover:bg-rouge"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((country) => (
              <motion.li
                key={country.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                <CountryCard country={country} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
