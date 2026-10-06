"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { SUGGESTIONS, searchAll } from "@/lib/search";
import { EASE } from "@/lib/motion";

export function SearchDialog({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const results = useMemo(() => searchAll(query), [query]);
  const total = results.reduce((sum, group) => sum + group.items.length, 0);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    return () => previous?.focus?.();
  }, []);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.stopPropagation();
      onClose();
      return;
    }
    if (event.key !== "Tab" || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll<HTMLElement>("a[href], button, input");
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-noir/80 px-4 pt-[10vh] backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Recherche"
        onKeyDown={onKeyDown}
        initial={{ opacity: 0, y: -16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="flex max-h-[78vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-ivoire text-noir shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-noir/10 px-5 py-4">
          <label htmlFor="recherche-globale" className="sr-only">
            Rechercher dans Culture Africa
          </label>
          <input
            id="recherche-globale"
            type="search"
            autoFocus
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Un pays, un plat, un genre musical, un récit…"
            className="w-full bg-transparent text-lg outline-none placeholder:text-noir/45"
          />
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full border border-noir/20 px-3 py-1 text-sm hover:border-rouge hover:text-rouge"
          >
            Fermer
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-4" aria-live="polite">
          {query.trim() === "" ? (
            <div>
              <p className="text-sm text-noir/70">Essayez une de ces recherches :</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {SUGGESTIONS.map((suggestion) => (
                  <li key={suggestion}>
                    <button
                      type="button"
                      onClick={() => setQuery(suggestion)}
                      className="rounded-full border border-noir/20 px-4 py-1.5 text-sm hover:border-terre hover:text-rouge"
                    >
                      {suggestion}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : total === 0 ? (
            <p className="py-6 text-noir/70">Aucun résultat pour « {query} ». Essayez un autre mot, ou un nom de pays.</p>
          ) : (
            <div className="space-y-6">
              <p className="sr-only">{total} résultats</p>
              {results.map((group) => (
                <section key={group.category} aria-label={group.category}>
                  <h2 className="font-display text-xl text-rouge">{group.category}</h2>
                  <ul className="mt-2 divide-y divide-noir/10">
                    {group.items.map((item) => (
                      <li key={item.id}>
                        <Link href={item.href} onClick={onClose} className="block rounded py-3 hover:bg-beige/60">
                          <span className="block font-medium">{item.title}</span>
                          <span className="line-clamp-2 block text-sm text-noir/70">{item.description}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
