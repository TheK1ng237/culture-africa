"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import type { Country } from "@/types";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { AfricaFlatMap } from "./AfricaFlatMap";
import type { GlobeMarker } from "./AfricaGlobe";

function GlobeSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center" role="status">
      <span className="sr-only">Chargement du globe</span>
      <div className="h-48 w-48 animate-pulse rounded-full border border-or/30 bg-or/5" />
    </div>
  );
}

// Three.js n’est chargé qu’à l’affichage de la section.
const AfricaGlobe = dynamic(() => import("./AfricaGlobe"), { ssr: false, loading: () => <GlobeSkeleton /> });

let webglCache: boolean | null = null;
function detectWebGL(): boolean {
  if (webglCache !== null) return webglCache;
  try {
    const canvas = document.createElement("canvas");
    webglCache = Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    webglCache = false;
  }
  return webglCache;
}
const noopSubscribe = () => () => {};
const getWebGLSnapshot = (): boolean | null => detectWebGL();
const getServerSnapshot = (): boolean | null => null;

export function GlobeSection({ countries }: { countries: Country[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "300px" });
  const webgl = useSyncExternalStore(noopSubscribe, getWebGLSnapshot, getServerSnapshot);
  const [failed, setFailed] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const markers = useMemo<GlobeMarker[]>(
    () => countries.map((c) => ({ slug: c.slug, name: c.name, lat: c.coordinates.lat, lng: c.coordinates.lng })),
    [countries],
  );
  const selected = countries.find((c) => c.slug === selectedSlug) ?? null;
  const useFallback = failed || webgl === false;

  return (
    <section id="globe" className="scroll-mt-20 bg-noir text-ivoire" aria-labelledby="titre-globe">
      <div ref={sectionRef} className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-28">
        <div className="flex flex-col justify-center">
          <h2 id="titre-globe" className="font-display text-4xl leading-tight text-balance md:text-5xl">
            Un continent, à faire tourner entre ses mains
          </h2>
          <p className="mt-5 max-w-lg text-beige/80">
            Faites glisser le globe, touchez un repère doré et ouvrez la page du pays. Chaque point est le début d’une
            exploration.
          </p>

          <div className="mt-8 min-h-[13rem]" aria-live="polite">
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div
                  key={selected.slug}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="rounded-2xl border border-or/30 bg-noir-2 p-6"
                >
                  <p className="text-sm text-beige/70">
                    {selected.region}, capitale {selected.capital}
                  </p>
                  <h3 className="mt-1 font-display text-3xl">
                    <span aria-hidden="true">{selected.flag} </span>
                    {selected.name}
                  </h3>
                  <p className="mt-3 text-beige/85">{selected.description}</p>
                  <p className="mt-3 text-sm text-beige/70">Langues : {selected.languages.join(", ")}</p>
                  <Link
                    href={`/countries/${selected.slug}`}
                    className="mt-5 inline-block rounded-full bg-or px-5 py-2 text-sm font-medium text-noir transition-colors hover:bg-ocre"
                  >
                    Ouvrir la page {selected.name}
                  </Link>
                </motion.div>
              ) : (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-dashed border-beige/20 p-6 text-beige/70"
                >
                  Aucun pays sélectionné. Choisissez un repère sur le globe ou un pays dans la liste ci-dessous.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div>
          <div
            className="relative mx-auto aspect-square w-full max-w-[34rem]"
            role="img"
            aria-label="Globe interactif centré sur l’Afrique. La liste de pays située en dessous offre les mêmes informations au clavier."
          >
            {useFallback ? (
              <AfricaFlatMap markers={markers} selectedSlug={selectedSlug} onSelect={setSelectedSlug} />
            ) : inView && webgl ? (
              <AfricaGlobe markers={markers} selectedSlug={selectedSlug} onSelect={setSelectedSlug} onUnavailable={() => setFailed(true)} />
            ) : (
              <GlobeSkeleton />
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="sr-only">Choisir un pays</h3>
          <ul className="flex flex-wrap gap-2">
            {countries.map((country) => (
              <li key={country.slug}>
                <button
                  type="button"
                  aria-pressed={country.slug === selectedSlug}
                  onClick={() => setSelectedSlug(country.slug)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm transition-colors",
                    country.slug === selectedSlug
                      ? "border-or bg-or text-noir"
                      : "border-beige/25 text-beige/85 hover:border-or hover:text-ivoire",
                  )}
                >
                  <span aria-hidden="true">{country.flag} </span>
                  {country.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
