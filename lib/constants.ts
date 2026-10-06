export const SITE_NAME = "Culture Africa";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const SITE_TAGLINE = "L’Afrique. Mille histoires. Une identité.";
export const SITE_DESCRIPTION =
  "Explorez les cultures, les traditions, les peuples et les histoires qui façonnent le continent africain.";

export const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Cultures", href: "/cultures" },
  { label: "Histoires", href: "/stories" },
  { label: "Pays", href: "/countries" },
  { label: "Arts", href: "/arts" },
  { label: "Musique", href: "/music" },
  { label: "Gastronomie", href: "/food" },
  { label: "À propos", href: "/about" },
] as const;
