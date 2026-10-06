import { countries } from "@/data/countries";
import { stories } from "@/data/stories";
import { cultureCategories, traditions } from "@/data/cultures";
import { foods } from "@/data/foods";
import { genres } from "@/data/music";
import { artPieces } from "@/data/arts";
import type { SearchCategory, SearchItem } from "@/types";
import { normalize } from "@/lib/utils";

const index: SearchItem[] = [
  ...countries.map((c): SearchItem => ({
    id: `country-${c.id}`, title: c.name, description: `${c.capital} · ${c.region}`, category: "Pays", href: `/countries/${c.slug}`,
    keywords: [c.description, c.capital, c.region, ...c.languages, ...c.peoples].join(" "),
  })),
  ...stories.map((s): SearchItem => ({
    id: `story-${s.id}`, title: s.title, description: s.excerpt, category: "Histoires", href: `/stories/${s.slug}`,
    keywords: [s.category, s.intro].join(" "),
  })),
  ...cultureCategories.map((c): SearchItem => ({
    id: `culture-${c.id}`, title: c.title, description: c.description, category: "Cultures", href: c.href,
    keywords: c.highlights.join(" "),
  })),
  ...traditions.map((t): SearchItem => ({
    id: `tradition-${t.id}`, title: t.title, description: t.origin, category: "Cultures", href: "/cultures#traditions",
    keywords: t.description,
  })),
  ...foods.map((f): SearchItem => ({
    id: `food-${f.id}`, title: f.name, description: f.origin, category: "Gastronomie", href: `/food/${f.slug}`,
    keywords: [f.description, ...f.ingredients].join(" "),
  })),
  ...genres.map((g): SearchItem => ({
    id: `music-${g.id}`, title: g.name, description: g.origin, category: "Musique", href: `/music/${g.slug}`,
    keywords: [g.description, ...g.artists, ...g.instruments].join(" "),
  })),
  ...artPieces.map((a): SearchItem => ({
    id: `art-${a.id}`, title: a.title, description: `${a.category} · ${a.origin}`, category: "Arts", href: "/arts",
    keywords: a.description,
  })),
];

const indexNormalized = index.map((item) => ({
  item,
  title: normalize(item.title),
  haystack: normalize(`${item.title} ${item.description} ${item.keywords}`),
}));

export interface SearchGroup {
  category: SearchCategory;
  items: SearchItem[];
}

const ORDER: SearchCategory[] = ["Pays", "Histoires", "Cultures", "Gastronomie", "Musique", "Arts"];

export function searchAll(query: string, limitPerCategory = 5): SearchGroup[] {
  const tokens = normalize(query).split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [];
  const scored = indexNormalized
    .filter((entry) => tokens.every((t) => entry.haystack.includes(t)))
    .map((entry) => ({
      item: entry.item,
      score: tokens.reduce((acc, t) => acc + (entry.title.includes(t) ? 3 : 1), 0),
    }))
    .sort((a, b) => b.score - a.score);

  return ORDER.map((category) => ({
    category,
    items: scored.filter((s) => s.item.category === category).slice(0, limitPerCategory).map((s) => s.item),
  })).filter((group) => group.items.length > 0);
}

export const SUGGESTIONS = ["Makossa", "Tombouctou", "Kente", "Ndolé", "Swahili"];
