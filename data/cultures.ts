import type { CultureCategory, LanguageFamily, Tradition } from "@/types";

export const cultureCategories: CultureCategory[] = [
  {
    id: "traditions",
    title: "Traditions",
    description: "Fêtes, rites, cérémonies et savoirs vivants qui rythment la vie des communautés.",
    href: "/cultures#traditions",
    image: "/images/cultures/traditions.svg",
    highlights: ["Ngondo", "Timkat", "Homowo"],
  },
  {
    id: "arts",
    title: "Arts",
    description: "Textiles, sculptures, architecture, photographie : un foisonnement de formes et d’inventions.",
    href: "/arts",
    image: "/images/cultures/arts.svg",
    highlights: ["Kente", "Bronzes du Bénin", "Lalibela"],
  },
  {
    id: "music",
    title: "Musique",
    description: "Des rythmes traditionnels aux scènes les plus actuelles, la musique relie les générations.",
    href: "/music",
    image: "/images/cultures/music.svg",
    highlights: ["Makossa", "Amapiano", "Mbalax"],
  },
  {
    id: "food",
    title: "Gastronomie",
    description: "Plats de fête, plats du quotidien : une cuisine de terroirs, de marchés et de partage.",
    href: "/food",
    image: "/images/cultures/food.svg",
    highlights: ["Ndolé", "Injera", "Tajine"],
  },
  {
    id: "languages",
    title: "Langues",
    description: "Plus de deux mille langues selon les estimations : poésie, proverbes, écritures.",
    href: "/cultures#langues",
    image: "/images/cultures/languages.svg",
    highlights: ["Kiswahili", "Amharique", "Yoruba"],
  },
  {
    id: "history",
    title: "Histoire",
    description: "Royaumes, routes commerciales, luttes pour l’indépendance : des récits pluriels.",
    href: "/stories",
    image: "/images/cultures/history.svg",
    highlights: ["Tombouctou", "Aksoum", "Grand Zimbabwe"],
  },
];

export const traditions: Tradition[] = [
  { id: "ngondo", title: "Ngondo", origin: "Cameroun, peuple sawa", description: "Assemblée et fête de l’eau organisée autour du fleuve Wouri, où l’on honore les ancêtres et la mémoire collective." },
  { id: "timkat", title: "Timkat", origin: "Éthiopie", description: "Célébration de l’Épiphanie par des processions colorées, des chants et des tabots portés en cortège ; inscrite par l’UNESCO en 2019." },
  { id: "homowo", title: "Homowo", origin: "Ghana, peuple ga", description: "Fête des récoltes dont le nom évoque l’idée de « railler la faim », rythmée par des plats communautaires et des danses." },
  { id: "gnaoua", title: "Rituels gnaoua", origin: "Maroc", description: "Musique et cérémonies de transe nées d’histoires de circulation et de mémoire, aujourd’hui célébrées à Essaouira." },
  { id: "the", title: "Thé à la menthe", origin: "Maghreb", description: "Un rituel d’hospitalité où chaque service, versé de haut, accompagne la conversation." },
  { id: "palabre", title: "Palabre", origin: "Afrique de l’Ouest et centrale", description: "Pratique de discussion collective, souvent sous un arbre, visant à résoudre un différend ou à décider ensemble." },
];

export const languageFamilies: LanguageFamily[] = [
  { id: "bantu", name: "Langues bantoues", region: "Afrique centrale, orientale et australe", description: "Kiswahili, lingala, zoulou, xhosa : une vaste famille de langues liées, parlées par des centaines de millions de personnes." },
  { id: "afroasiatic", name: "Langues afro-asiatiques", region: "Afrique du Nord et corne de l’Afrique", description: "Arabe, amazigh, amharique, oromo, haoussa : des langues parlées de l’Atlantique à la mer Rouge." },
  { id: "niger-congo", name: "Autres langues nigéro-congolaises", region: "Afrique de l’Ouest", description: "Wolof, yoruba, igbo, twi : des langues de grandes traditions orales et écrites." },
  { id: "nilo-saharan", name: "Langues nilo-sahariennes", region: "Sahel et Afrique de l’Est", description: "Songhay, kanouri, luo : des langues d’histoires et de géographies variées." },
  { id: "khoisan", name: "Langues à clics", region: "Afrique australe", description: "Des langues connues pour leurs consonnes à clics, au cœur d’un patrimoine ancien." },
  { id: "austronesian", name: "Malgache", region: "Madagascar", description: "Langue austronésienne, héritage du peuplement de l’île par des navigateurs venus d’Asie du Sud-Est." },
];
