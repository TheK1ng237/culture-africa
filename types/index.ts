export type Region =
  | "Afrique du Nord"
  | "Afrique de l’Ouest"
  | "Afrique centrale"
  | "Afrique de l’Est"
  | "Afrique australe";

export interface Place {
  name: string;
  description: string;
}

export interface Country {
  id: string;
  name: string;
  slug: string;
  flag: string;
  capital: string;
  region: Region;
  languages: string[];
  description: string;
  image: string;
  coordinates: { lat: number; lng: number };
  history: string;
  peoples: string[];
  traditions: string[];
  music: string[];
  gastronomy: string[];
  arts: string[];
  places: Place[];
  storySlugs: string[];
  foodSlugs: string[];
  musicSlugs: string[];
}

export type StoryCategory = "Histoire" | "Traditions" | "Arts" | "Langues" | "Commerce";

export interface StorySection {
  heading: string;
  paragraphs: string[];
  quote?: { text: string; author: string };
  image?: { src: string; alt: string; caption: string };
}

export interface TimelineEvent {
  period: string;
  title: string;
  text: string;
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  category: StoryCategory;
  readingTime: number;
  excerpt: string;
  intro: string;
  image: string;
  sections: StorySection[];
  timeline?: TimelineEvent[];
  related: string[];
  countries: string[];
}

export interface CultureCategory {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  highlights: string[];
}

export interface Tradition {
  id: string;
  title: string;
  origin: string;
  description: string;
}

export interface LanguageFamily {
  id: string;
  name: string;
  region: string;
  description: string;
}

export interface Food {
  id: string;
  slug: string;
  name: string;
  origin: string;
  countrySlugs: string[];
  description: string;
  ingredients: string[];
  history: string;
  variants: string;
  image: string;
}

export interface MusicGenre {
  id: string;
  slug: string;
  name: string;
  origin: string;
  period: string;
  description: string;
  characteristics: string[];
  instruments: string[];
  artists: string[];
  countrySlugs: string[];
  image: string;
  durationSec: number;
}

export type ArtCategory =
  | "Textiles"
  | "Sculptures"
  | "Bijoux"
  | "Poteries"
  | "Architecture"
  | "Photographie"
  | "Peinture"
  | "Artisanat";

export interface ArtPiece {
  id: string;
  title: string;
  category: ArtCategory;
  origin: string;
  description: string;
  image: string;
}

export type SearchCategory = "Pays" | "Histoires" | "Cultures" | "Gastronomie" | "Musique" | "Arts";

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: SearchCategory;
  href: string;
  keywords: string;
}
