import type { Food } from "@/types";

const img = (slug: string) => `/images/foods/${slug}.svg`;

export const foods: Food[] = [
  {
    id: "ndole", slug: "ndole", name: "Ndolé", origin: "Cameroun, littoral sawa", countrySlugs: ["cameroon"],
    description: "Plat emblématique du littoral camerounais : des feuilles de ndolé, légèrement amères, mijotées avec de la pâte d’arachide, accompagnées de viande, de poisson ou de crevettes.",
    ingredients: ["Feuilles de ndolé", "Pâte d’arachide", "Crevettes ou poisson fumé", "Viande de bœuf", "Oignon, ail, gingembre", "Huile", "Bâton de manioc ou plantain en accompagnement"],
    history: "Associé aux populations sawa de Douala, le ndolé est devenu un plat de fête et de réception dans tout le pays.",
    variants: "Chaque famille a sa recette : certaines préfèrent plus de crevettes, d’autres plus de viande ; le degré d’amertume des feuilles dépend du lavage.",
    image: img("ndole"),
  },
  {
    id: "jollof-rice", slug: "jollof-rice", name: "Jollof Rice", origin: "Afrique de l’Ouest", countrySlugs: ["senegal", "ghana", "nigeria"],
    description: "Riz cuit dans une base de tomate, d’oignon et de poivron relevée d’épices, partagé lors des fêtes dans plusieurs pays d’Afrique de l’Ouest.",
    ingredients: ["Riz", "Tomates et concentré de tomate", "Oignons", "Poivrons", "Piment", "Épices", "Bouillon", "Huile"],
    history: "On associe souvent l’origine du plat à la Sénégambie et à l’aire wolof, d’où il s’est diffusé. Les « débats du jollof » entre pays sont aujourd’hui un jeu populaire.",
    variants: "Au Sénégal, on parle de thiéboudienne ou de riz au poisson ; au Ghana et au Nigeria, les versions varient dans le riz, les épices et la cuisson.",
    image: img("jollof-rice"),
  },
  {
    id: "thieboudienne", slug: "thieboudienne", name: "Thiéboudienne", origin: "Sénégal", countrySlugs: ["senegal"],
    description: "Le « riz au poisson » sénégalais : du poisson farci d’herbes, mijoté avec des légumes et du riz cuit dans la sauce.",
    ingredients: ["Poisson", "Riz brisé", "Tomate", "Manioc, carotte, chou, aubergine", "Persil, ail, piment", "Huile"],
    history: "Souvent rattaché à Saint-Louis, le plat est devenu un symbole de la cuisine sénégalaise. Le thiéboudienne a été inscrit en 2021 au patrimoine culturel immatériel de l’UNESCO.",
    variants: "Variantes rouges ou blanches, au poisson ou à la viande ; le fond de riz grillé, le xoñ, est très recherché.",
    image: img("thieboudienne"),
  },
  {
    id: "injera", slug: "injera", name: "Injera", origin: "Éthiopie et Érythrée", countrySlugs: ["ethiopia"],
    description: "Galette souple et légèrement acidulée, servant à la fois d’assiette et de couvert, accompagnée de ragoûts et de légumes.",
    ingredients: ["Farine de teff", "Eau", "Levain naturel"],
    history: "Le teff est cultivé depuis longtemps dans les hautes terres. L’injera se partage dans un grand plat, en signe de convivialité.",
    variants: "Le teff peut être mélangé à d’autres céréales selon les régions ; les accompagnements incluent doro wat, tibs, shiro ou kitfo.",
    image: img("injera"),
  },
  {
    id: "couscous", slug: "couscous", name: "Couscous", origin: "Maghreb", countrySlugs: ["morocco"],
    description: "Semoule de blé roulée à la main et cuite à la vapeur, servie avec des légumes, de la viande ou du poisson. Il est inscrit à l’UNESCO (2020) au titre d’un dossier commun de plusieurs pays du Maghreb.",
    ingredients: ["Semoule", "Légumes de saison", "Pois chiches", "Viande ou poisson", "Épices", "Beurre ou huile"],
    history: "Plat de partage, souvent préparé le vendredi, le couscous accompagne naissances, mariages et fêtes.",
    variants: "Il en existe d’innombrables variantes : aux sept légumes, au poisson, sucrées-salées, ou à base d’orge et de mil.",
    image: img("couscous"),
  },
  {
    id: "fufu", slug: "fufu", name: "Fufu", origin: "Afrique de l’Ouest et centrale", countrySlugs: ["ghana", "dr-congo", "cote-d-ivoire"],
    description: "Pâte souple obtenue en pilant ou en cuisant du manioc, de l’igname ou du plantain, que l’on mange avec des soupes et des sauces.",
    ingredients: ["Manioc, igname ou plantain", "Eau", "Soupe d’accompagnement (légère, de graines, de feuilles)"],
    history: "Le fufu se prépare traditionnellement au pilon et au mortier, souvent en famille.",
    variants: "Au Ghana, on le sert avec une soupe légère ; en Côte d’Ivoire, le foutou banane ; en RD Congo, on parle de bidia ou de loso selon les régions.",
    image: img("fufu"),
  },
  {
    id: "bobotie", slug: "bobotie", name: "Bobotie", origin: "Afrique du Sud, Cap", countrySlugs: ["south-africa"],
    description: "Viande hachée épicée et légèrement sucrée, recouverte d’un appareil à base d’œuf et de lait, cuite au four.",
    ingredients: ["Viande hachée", "Oignon", "Curry doux", "Raisins secs", "Abricots secs", "Pain trempé dans du lait", "Œufs", "Feuilles de laurier"],
    history: "Le plat est lié à la cuisine cap-malaise, née de l’histoire de communautés du Cap venues d’Asie du Sud-Est et d’Afrique.",
    variants: "On le sert avec du riz jaune, des bananes et des chutneys ; certaines versions sont végétariennes.",
    image: img("bobotie"),
  },
  {
    id: "tajine", slug: "tajine", name: "Tajine", origin: "Maroc et Maghreb", countrySlugs: ["morocco"],
    description: "Ragoût mijoté lentement dans un plat en terre cuite à couvercle conique, qui donne son nom au plat.",
    ingredients: ["Viande ou poisson", "Légumes", "Olives ou citrons confits", "Épices (cumin, gingembre, safran)", "Huile d’olive"],
    history: "Le tajine est associé aux foyers amazighs et à la cuisine de la cour ; il est devenu emblématique de la cuisine marocaine.",
    variants: "Au poulet et aux olives, à l’agneau et aux pruneaux, au poisson : la cuisine varie d’une ville à l’autre.",
    image: img("tajine"),
  },
];
