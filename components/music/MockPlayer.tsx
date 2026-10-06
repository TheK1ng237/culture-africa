"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { MusicGenre } from "@/types";
import { cn, formatDuration, imageAlt } from "@/lib/utils";

/** Lecteur de démonstration : simule la lecture (aucun fichier audio, aucun service externe). */
export function MockPlayer({ genres }: { genres: MusicGenre[] }) {
  const [state, setState] = useState({ index: 0, elapsed: 0 });
  const [playing, setPlaying] = useState(false);
  const { index, elapsed } = state;
  const track = genres[index];

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setState((prev) => {
        const next = prev.elapsed + 0.5;
        if (next >= genres[prev.index].durationSec) {
          return { index: (prev.index + 1) % genres.length, elapsed: 0 };
        }
        return { index: prev.index, elapsed: next };
      });
    }, 500);
    return () => window.clearInterval(timer);
  }, [playing, genres]);

  function select(next: number) {
    setState({ index: (next + genres.length) % genres.length, elapsed: 0 });
  }

  const buttonClass =
    "flex h-12 w-12 items-center justify-center rounded-full border border-beige/30 text-ivoire transition-colors hover:border-or hover:text-or";

  return (
    <div className="grid gap-8 rounded-3xl bg-noir p-6 text-ivoire md:grid-cols-[1fr_1.1fr] md:p-10">
      <div>
        <div className="relative aspect-square overflow-hidden rounded-2xl">
          <Image src={track.image} alt={imageAlt(track.name)} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
        </div>
        <p className="mt-5 text-sm text-beige/70">Lecture de démonstration, aucun son n’est émis</p>
        <p className="mt-1 flex items-center gap-3 font-display text-3xl">
          {track.name}
          {playing ? (
            <span className="flex h-5 items-end gap-0.5 text-or" aria-hidden="true">
              <span className="eq-bar" style={{ animationDelay: "0s" }} />
              <span className="eq-bar" style={{ animationDelay: "0.2s" }} />
              <span className="eq-bar" style={{ animationDelay: "0.4s" }} />
            </span>
          ) : null}
        </p>
        <p className="text-beige/80">{track.origin}</p>

        <div className="mt-5">
          <label htmlFor="lecteur-progression" className="sr-only">Position dans l’extrait</label>
          <input
            id="lecteur-progression"
            type="range"
            min={0}
            max={track.durationSec}
            value={Math.min(elapsed, track.durationSec)}
            onChange={(event) => setState((prev) => ({ ...prev, elapsed: Number(event.target.value) }))}
            className="w-full accent-[#c9a24d]"
          />
          <div className="flex justify-between text-sm text-beige/70">
            <span>{formatDuration(elapsed)}</span>
            <span>{formatDuration(track.durationSec)}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <button type="button" className={buttonClass} onClick={() => select(index - 1)} aria-label="Morceau précédent">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 5h2v14H6zM20 5v14L9 12z" /></svg>
          </button>
          <button
            type="button"
            onClick={() => setPlaying((value) => !value)}
            aria-label={playing ? "Mettre en pause" : "Lire"}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-or text-noir transition-colors hover:bg-ocre"
          >
            {playing ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4v16l13-8z" /></svg>
            )}
          </button>
          <button type="button" className={buttonClass} onClick={() => select(index + 1)} aria-label="Morceau suivant">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 5h2v14h-2zM4 5v14l11-7z" /></svg>
          </button>
        </div>
      </div>

      <div>
        <h3 className="font-display text-2xl">File de lecture</h3>
        <ol className="mt-4 divide-y divide-beige/10">
          {genres.map((genre, i) => (
            <li key={genre.id}>
              <button
                type="button"
                onClick={() => {
                  select(i);
                  setPlaying(true);
                }}
                aria-current={i === index ? "true" : undefined}
                className={cn(
                  "flex w-full items-center justify-between gap-4 rounded-lg px-3 py-3 text-left transition-colors hover:bg-beige/10",
                  i === index && "bg-beige/10 text-or",
                )}
              >
                <span>
                  <span className="block font-medium">{genre.name}</span>
                  <span className="block text-sm text-beige/65">{genre.artists.slice(0, 3).join(", ")}</span>
                </span>
                <span className="shrink-0 text-sm text-beige/65">{formatDuration(genre.durationSec)}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
