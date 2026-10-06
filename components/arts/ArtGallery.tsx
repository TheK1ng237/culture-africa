"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ArtCategory, ArtPiece } from "@/types";
import { EASE } from "@/lib/motion";
import { cn, imageAlt } from "@/lib/utils";

interface ArtGalleryProps {
  pieces: ArtPiece[];
  categories: { name: ArtCategory; description: string }[];
}

export function ArtGallery({ pieces, categories }: ArtGalleryProps) {
  const [category, setCategory] = useState<ArtCategory | "Tout">("Tout");
  const [openId, setOpenId] = useState<string | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const filtered = useMemo(() => (category === "Tout" ? pieces : pieces.filter((p) => p.category === category)), [pieces, category]);
  const openIndex = openId ? filtered.findIndex((p) => p.id === openId) : -1;
  const current = openIndex >= 0 ? filtered[openIndex] : null;
  const activeCategory = categories.find((c) => c.name === category);

  function close() {
    setOpenId(null);
    triggerRef.current?.focus();
  }

  function step(delta: number) {
    if (openIndex < 0 || filtered.length === 0) return;
    setOpenId(filtered[(openIndex + delta + filtered.length) % filtered.length].id);
  }

  useEffect(() => {
    if (!openId) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openId, openIndex, filtered]);

  const chips: (ArtCategory | "Tout")[] = ["Tout", ...categories.map((c) => c.name)];

  return (
    <div>
      <div role="group" aria-label="Filtrer par catégorie" className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <button
            key={chip}
            type="button"
            aria-pressed={chip === category}
            onClick={() => setCategory(chip)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              chip === category ? "border-noir bg-noir text-ivoire" : "border-noir/25 hover:border-terre hover:text-rouge",
            )}
          >
            {chip}
          </button>
        ))}
      </div>
      <p className="mt-4 min-h-6 text-noir/70" aria-live="polite">
        {activeCategory ? activeCategory.description : "Huit familles d’arts, de la parure à l’architecture."}
      </p>

      <ul className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((piece, i) => (
            <motion.li
              key={piece.id}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35 }}
              className="mb-5 break-inside-avoid"
            >
              <button
                type="button"
                onClick={(event) => {
                  triggerRef.current = event.currentTarget;
                  setOpenId(piece.id);
                }}
                className="group block w-full overflow-hidden rounded-2xl bg-noir text-left"
                aria-label={`Agrandir : ${piece.title}`}
              >
                <div className={cn("relative overflow-hidden", i % 3 === 0 ? "aspect-[4/5]" : i % 3 === 1 ? "aspect-[3/2]" : "aspect-square")}>
                  <Image src={piece.image} alt={imageAlt(piece.title)} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-noir/90 to-transparent p-5 text-ivoire">
                    <p className="font-display text-xl">{piece.title}</p>
                    <p className="text-sm text-beige/80">{piece.category}, {piece.origin}</p>
                  </div>
                </div>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <AnimatePresence>
        {current ? (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-noir/95 p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <motion.figure
              key={current.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="grid max-h-full w-full max-w-5xl gap-6 overflow-y-auto text-ivoire md:grid-cols-[1.4fr_1fr] md:items-center"
            >
              <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
                <Image src={current.image} alt={imageAlt(current.title)} fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover" priority />
              </div>
              <figcaption>
                <p className="text-sm text-or">{current.category}, {current.origin}</p>
                <h3 className="mt-1 font-display text-3xl sm:text-4xl">{current.title}</h3>
                <p className="mt-4 text-beige/90">{current.description}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button type="button" onClick={() => step(-1)} className="rounded-full border border-beige/30 px-4 py-2 hover:border-or hover:text-or">Précédente</button>
                  <button type="button" onClick={() => step(1)} className="rounded-full border border-beige/30 px-4 py-2 hover:border-or hover:text-or">Suivante</button>
                  <button type="button" autoFocus onClick={close} className="rounded-full bg-or px-4 py-2 font-medium text-noir hover:bg-ocre">Fermer</button>
                </div>
              </figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
