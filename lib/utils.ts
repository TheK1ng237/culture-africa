export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Minuscules, sans accents, apostrophes typographiques normalisées. */
export function normalize(value: string): string {
  return value
    .replace(/[’‘]/g, "'")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function imageAlt(title: string): string {
  return `Illustration abstraite évoquant ${title}`;
}

export function formatDuration(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
