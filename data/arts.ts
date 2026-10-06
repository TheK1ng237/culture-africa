import type { ArtCategory, ArtPiece } from "@/types";

const img = (id: string) => `/images/arts/${id}.svg`;

export const artCategories: { name: ArtCategory; description: string }[] = [
  { name: "Textiles", description: "Tissage, teinture, impression : des étoffes qui portent des récits." },
  { name: "Sculptures", description: "Bois, bronze, pierre : des formes liées à la mémoire et aux cérémonies." },
  { name: "Bijoux", description: "Perles, argent, métaux : des parures qui disent l’appartenance." },
  { name: "Poteries", description: "Terre modelée et cuite, entre usage quotidien et rituels." },
  { name: "Architecture", description: "Terre crue, pierre taillée, bois : des bâtisseurs inventifs." },
  { name: "Photographie", description: "Studios, portraits, photographes de la vie quotidienne." },
  { name: "Peinture", description: "Peinture murale et peinture populaire, couleurs franches." },
  { name: "Artisanat", description: "Vannerie, teinture, travail du cuir : des savoir-faire transmis." },
];

export const artPieces: ArtPiece[] = [
  { id: "kente-asante", title: "Kente asante", category: "Textiles", origin: "Ghana", description: "Bandes de soie ou de coton tissées sur un métier étroit puis assemblées. Chaque motif possède un nom et une signification.", image: img("kente-asante") },
  { id: "bogolan-bamana", title: "Bògòlanfini bamana", category: "Textiles", origin: "Mali", description: "Étoffe de coton teinte avec de la boue fermentée et des plantes, ornée de motifs géométriques qui évoquent des proverbes et des événements.", image: img("bogolan-bamana") },
  { id: "bronzes-benin", title: "Bronzes du Bénin", category: "Sculptures", origin: "Nigeria, royaume de Bénin", description: "Plaques et têtes en laiton et bronze réalisées pour la cour de l’oba. Leur restitution est l’objet de débats et de démarches entre musées et États.", image: img("bronzes-benin") },
  { id: "chokwe-statuary", title: "Statuaire chokwe", category: "Sculptures", origin: "RD Congo, Angola", description: "Figures sculptées dans le bois, liées au pouvoir et aux ancêtres, dotées de coiffures et de scarifications soignées.", image: img("chokwe-statuary") },
  { id: "maasai-beadwork", title: "Perlage maasai", category: "Bijoux", origin: "Kenya, Tanzanie", description: "Colliers larges et ornements en perles de verre. Les couleurs et les dispositions indiquent l’âge, le statut ou l’occasion.", image: img("maasai-beadwork") },
  { id: "berber-silver", title: "Bijoux amazighs en argent", category: "Bijoux", origin: "Maroc, Algérie", description: "Fibules, colliers et bracelets en argent, parfois ornés d’émail et de corail, portés lors des fêtes et des mariages.", image: img("berber-silver") },
  { id: "zulu-ukhamba", title: "Ukhamba zoulou", category: "Poteries", origin: "Afrique du Sud", description: "Récipient en terre cuite pour la bière traditionnelle, décoré de motifs en relief et d’un fini brillant.", image: img("zulu-ukhamba") },
  { id: "safi-pottery", title: "Poterie de Safi", category: "Poteries", origin: "Maroc", description: "Céramique émaillée et peinte à la main, réputée pour ses couleurs profondes et ses motifs géométriques.", image: img("safi-pottery") },
  { id: "djenne-mosque", title: "Grande Mosquée de Djenné", category: "Architecture", origin: "Mali", description: "Édifice de terre crue aux poutres saillantes. Chaque année, les habitants se réunissent pour en renouveler le crépi.", image: img("djenne-mosque") },
  { id: "lalibela-churches", title: "Églises de Lalibela", category: "Architecture", origin: "Éthiopie", description: "Églises taillées dans la roche, reliées par des tranchées et des tunnels, lieu de pèlerinage vivant.", image: img("lalibela-churches") },
  { id: "keita-portraits", title: "Portraits de Seydou Keïta", category: "Photographie", origin: "Mali", description: "Photographe de Bamako (1921-2001), il a réalisé dans son studio des portraits en noir et blanc d’une grande élégance, où chacun choisit sa pose.", image: img("keita-portraits") },
  { id: "sidibe-bamako", title: "Nuits de Bamako de Malick Sidibé", category: "Photographie", origin: "Mali", description: "Malick Sidibé (1936-2016) a documenté la jeunesse et les soirées de Bamako dans les années 1960 et 1970.", image: img("sidibe-bamako") },
  { id: "congolese-popular-painting", title: "Peinture populaire congolaise", category: "Peinture", origin: "RD Congo", description: "Une peinture narrative, aux couleurs vives, qui commente la vie urbaine, la politique et l’humour. Chéri Samba (né en 1956) en est une figure majeure.", image: img("congolese-popular-painting") },
  { id: "ndebele-murals", title: "Peintures murales ndebele", category: "Peinture", origin: "Afrique du Sud", description: "Façades ornées de motifs géométriques colorés, un art transmis par les femmes ; Esther Mahlangu en a porté le style à l’international.", image: img("ndebele-murals") },
  { id: "agaseke-baskets", title: "Paniers agaseke", category: "Artisanat", origin: "Rwanda", description: "Paniers tressés en fibres végétales, à couvercle pointu, offerts traditionnellement lors des cérémonies de mariage.", image: img("agaseke-baskets") },
  { id: "adire-indigo", title: "Adire à l’indigo", category: "Artisanat", origin: "Nigeria, pays yoruba", description: "Tissu teint à l’indigo selon des techniques de réserve : ligatures, couture, amidon ou cire pour créer des motifs.", image: img("adire-indigo") },
];
