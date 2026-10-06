import type { MusicGenre } from "@/types";

const img = (slug: string) => `/images/music/${slug}.svg`;

export const genres: MusicGenre[] = [
  {
    id: "afrobeats", slug: "afrobeats", name: "Afrobeats", origin: "Nigeria et Ghana", period: "Années 2000 à aujourd’hui",
    description: "Genre populaire contemporain mêlant influences ouest-africaines, hip-hop, dancehall et électronique. À ne pas confondre avec l’afrobeat de Fela Kuti, un style distinct des années 1970.",
    characteristics: ["Rythmes syncopés et percussions", "Mélodies chantées en anglais, pidgin, yoruba, twi", "Production électronique"],
    instruments: ["Boîtes à rythmes", "Synthétiseurs", "Percussions"],
    artists: ["Burna Boy", "Wizkid", "Tems", "Yemi Alade"],
    countrySlugs: ["nigeria", "ghana"], image: img("afrobeats"), durationSec: 187,
  },
  {
    id: "amapiano", slug: "amapiano", name: "Amapiano", origin: "Afrique du Sud, Gauteng", period: "Années 2010 à aujourd’hui",
    description: "Genre de house sud-africain caractérisé par des lignes de piano, des basses profondes et des « log drums ».",
    characteristics: ["Tempo modéré", "Piano jazzy", "Basse « log drum »"],
    instruments: ["Piano", "Synthétiseurs", "Basses électroniques"],
    artists: ["Kabza De Small", "DJ Maphorisa", "Major League DJz"],
    countrySlugs: ["south-africa"], image: img("amapiano"), durationSec: 214,
  },
  {
    id: "highlife", slug: "highlife", name: "Highlife", origin: "Ghana et Nigeria", period: "Années 1920 à aujourd’hui",
    description: "Genre né dans les villes côtières, mêlant guitares, cuivres et rythmes locaux. Il a marqué l’époque des indépendances.",
    characteristics: ["Guitares aux lignes mélodiques", "Cuivres", "Rythmes de danse"],
    instruments: ["Guitare", "Trompette", "Saxophone", "Percussions"],
    artists: ["E.T. Mensah", "Victor Olaiya", "Osita Osadebe"],
    countrySlugs: ["ghana", "nigeria"], image: img("highlife"), durationSec: 203,
  },
  {
    id: "makossa", slug: "makossa", name: "Makossa", origin: "Cameroun, Douala", period: "Années 1950 à aujourd’hui",
    description: "Genre né au Cameroun, ancré dans la culture sawa de Douala, réputé pour ses lignes de basse dansantes et ses cuivres. Son nom évoque le verbe « danser » en douala.",
    characteristics: ["Basse en avant", "Guitares rythmiques", "Cuivres et chœurs"],
    instruments: ["Basse", "Guitare", "Saxophone", "Batterie"],
    artists: ["Manu Dibango", "Eboa Lotin", "Sam Fan Thomas", "Petit Pays"],
    countrySlugs: ["cameroon"], image: img("makossa"), durationSec: 226,
  },
  {
    id: "mbalax", slug: "mbalax", name: "Mbalax", origin: "Sénégal", period: "Années 1970 à aujourd’hui",
    description: "Musique de danse sénégalaise reposant sur les percussions sabar et sur un chant wolof puissant.",
    characteristics: ["Percussions sabar", "Chant wolof", "Orchestre moderne"],
    instruments: ["Sabar", "Tama (tambour d’aisselle)", "Guitare électrique", "Clavier"],
    artists: ["Youssou N’Dour", "Thione Seck", "Omar Pène"],
    countrySlugs: ["senegal"], image: img("mbalax"), durationSec: 241,
  },
  {
    id: "soukous", slug: "soukous", name: "Soukous", origin: "RD Congo et Congo", period: "Années 1960 à aujourd’hui",
    description: "Dérivé de la rumba congolaise, le soukous accélère le tempo et met en avant la guitare soliste et le sebene.",
    characteristics: ["Guitares entrelacées", "Section de danse (sebene)", "Chant en lingala"],
    instruments: ["Guitare", "Basse", "Batterie", "Cuivres"],
    artists: ["Franco Luambo", "Tabu Ley Rochereau", "Papa Wemba", "Kanda Bongo Man"],
    countrySlugs: ["dr-congo"], image: img("soukous"), durationSec: 258,
  },
  {
    id: "afro-jazz", slug: "afro-jazz", name: "Afro-jazz", origin: "Plusieurs pays", period: "Années 1950 à aujourd’hui",
    description: "Famille de styles où le jazz rencontre des rythmes et des gammes africains : éthio-jazz, jazz sud-africain, afro-jazz camerounais.",
    characteristics: ["Improvisation", "Modes et gammes locales", "Rythmes africains"],
    instruments: ["Saxophone", "Piano", "Vibraphone", "Percussions"],
    artists: ["Hugh Masekela", "Mulatu Astatke", "Abdullah Ibrahim", "Manu Dibango"],
    countrySlugs: ["south-africa", "ethiopia", "cameroon", "nigeria"], image: img("afro-jazz"), durationSec: 272,
  },
  {
    id: "traditional-music", slug: "traditional-music", name: "Musiques traditionnelles", origin: "Tout le continent", period: "Pratiques anciennes et vivantes",
    description: "Chants, tambours, cordes, xylophones : des musiques associées à des cérémonies, des récits, des danses et des métiers.",
    characteristics: ["Transmission orale", "Rôles sociaux des musiciens", "Polyrythmie"],
    instruments: ["Kora", "Balafon", "Mbira", "Djembé", "Ngoni", "Tambour parleur", "Valiha"],
    artists: ["Toumani Diabaté", "Ali Farka Touré", "Tinariwen"],
    countrySlugs: ["mali", "senegal", "madagascar", "morocco", "ethiopia"], image: img("traditional-music"), durationSec: 198,
  },
];
