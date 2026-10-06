import type { Story } from "@/types";

const img = (slug: string) => `/images/stories/${slug}.svg`;

export const stories: Story[] = [
  {
    id: "african-kingdoms",
    slug: "african-kingdoms",
    title: "Les royaumes africains",
    category: "Histoire",
    readingTime: 7,
    excerpt: "De Koush à l’empire du Mali, des royaumes d’Aksoum et du Kongo à l’Asante : des États, des savoirs et des arts qui ont structuré le continent.",
    intro:
      "Avant les frontières héritées du XIXe siècle, le continent africain a connu une grande diversité d’États : empires sahéliens, royaumes forestiers, cités-États côtières, monarchies des hautes terres. Ces histoires ne se ressemblent pas, et c’est précisément ce qui les rend précieuses.",
    image: img("african-kingdoms"),
    sections: [
      {
        heading: "Des pouvoirs nés des fleuves, des routes et des marchés",
        paragraphs: [
          "Le long du Nil, le royaume de Koush a bâti ses propres pyramides et dirigé l’Égypte au VIIIe siècle avant notre ère. Plus au sud, Aksoum, sur les hautes terres éthiopiennes, a contrôlé des routes maritimes reliant la mer Rouge à l’océan Indien et frappé sa propre monnaie.",
          "En Afrique de l’Ouest, l’or, le sel et le cuivre ont nourri de grands ensembles. L’empire du Ghana, dont la capitale était à l’époque une cité marchande du Sahel, précède l’empire du Mali, puis l’empire songhaï, dirigé depuis Gao.",
        ],
      },
      {
        heading: "Le Mali de Soundiata à Mansa Moussa",
        paragraphs: [
          "Selon l’épopée mandingue, Soundiata Keïta fédère au XIIIe siècle les peuples malinkés. Son récit, transmis par les griots, est l’un des grands textes oraux de l’humanité. Quand Mansa Moussa part en pèlerinage à La Mecque en 1324, l’éclat de sa caravane marque les chroniqueurs du monde arabe.",
        ],
      },
      {
        heading: "Forêts, côtes et hautes terres",
        paragraphs: [
          "Dans la forêt, le royaume de Bénin, dirigé par un oba, est connu pour ses bronzes et ses plaques de cour. Le royaume du Kongo, structuré autour de Mbanza Kongo, entretient dès la fin du XIVe siècle des relations diplomatiques étendues. Le royaume asante, fondé au début du XVIIIe siècle, s’organise autour du Tabouret d’or.",
          "Au sud, Grand Zimbabwe, édifié entre le XIe et le XVe siècle, témoigne d’une maîtrise remarquable de la pierre sèche et d’un commerce reliant l’intérieur à la côte de l’océan Indien.",
        ],
        image: { src: "/images/arts/lalibela-churches.svg", alt: "Illustration abstraite d’une architecture monumentale au crépuscule", caption: "Les églises monolithes de Lalibela, XIIe-XIIIe siècles, rappellent la force de l’héritage éthiopien." },
      },
      {
        heading: "Ce que ces royaumes nous apprennent",
        paragraphs: [
          "Parler de « royaumes africains » au pluriel, c’est refuser l’idée d’une histoire uniforme. Chaque État a eu ses lois, ses rituels, ses relations avec ses voisins et sa manière de conserver la mémoire. Les sources écrites, les archéologies et les traditions orales se complètent pour en reconstituer le récit.",
        ],
      },
    ],
    timeline: [
      { period: "VIIIe s. av. J.-C.", title: "Koush", text: "Les souverains koushites gouvernent la vallée du Nil jusqu’en Égypte." },
      { period: "IVe s.", title: "Aksoum", text: "Le roi Ezana adopte le christianisme, qui structure durablement l’Éthiopie." },
      { period: "XIIIe s.", title: "Empire du Mali", text: "Soundiata Keïta unifie les Malinkés, dont l’histoire est portée par les griots." },
      { period: "1324", title: "Pèlerinage de Mansa Moussa", text: "La caravane du souverain du Mali marque les mémoires du monde arabe." },
      { period: "XIe-XVe s.", title: "Grand Zimbabwe", text: "Une cité de pierre sèche domine l’intérieur du plateau austral." },
      { period: "Début XVIIIe s.", title: "Royaume asante", text: "Le Tabouret d’or devient le symbole de l’unité de l’État." },
    ],
    related: ["griots", "timbuktu", "trade-routes"],
    countries: ["mali", "ethiopia", "ghana", "nigeria", "dr-congo", "cameroon"],
  },
  {
    id: "griots",
    slug: "griots",
    title: "Les griots, gardiens de la mémoire",
    category: "Traditions",
    readingTime: 6,
    excerpt: "Généalogistes, musiciens, médiateurs : en Afrique de l’Ouest, le griot transmet l’histoire par la parole et par la musique.",
    intro:
      "Dans l’aire mandingue, on les appelle jeliw (au singulier, jeli). Chez les Wolof, ce sont les géwël. Leur rôle varie selon les sociétés, mais ils partagent une mission : transmettre ce qui mérite de ne pas être oublié.",
    image: img("griots"),
    sections: [
      {
        heading: "Une parole qui engage",
        paragraphs: [
          "Le griot est généalogiste, chroniqueur, conseiller et médiateur. Il connaît les lignées, rappelle les alliances, chante les exploits. Dans bien des familles, ce savoir se transmet de génération en génération, au sein de lignages spécialisés comme les Kouyaté ou les Diabaté.",
        ],
        quote: { text: "En Afrique, quand un vieillard meurt, c’est une bibliothèque qui brûle.", author: "Amadou Hampâté Bâ" },
      },
      {
        heading: "Des instruments qui racontent",
        paragraphs: [
          "La kora, harpe-luth à vingt et une cordes, le balafon, xylophone à lames de bois, et le ngoni, luth traditionnel, accompagnent les récits. Chaque instrument a son répertoire et son histoire. Les mélodies servent de repères mnémoniques pour des récits parfois très longs.",
        ],
        image: { src: "/images/music/traditional-music.svg", alt: "Illustration abstraite de barres verticales évoquant des cordes et des rythmes", caption: "Les cordes de la kora, les lames du balafon : des formes sonores qui portent l’histoire." },
      },
      {
        heading: "Un héritage vivant",
        paragraphs: [
          "La Charte du Manden, proclamée à Kurukan Fuga selon la tradition orale, a été inscrite en 2009 au patrimoine culturel immatériel de l’UNESCO. Aujourd’hui, des artistes comme Toumani Diabaté ou Salif Keïta prolongent ce rôle sur les scènes du monde entier, tandis que de jeunes générations réinventent le métier avec de nouveaux médias.",
          "Il faut se garder de toute image figée : le statut des griots évolue, se discute et diffère d’une région à l’autre. Écouter leurs propres voix reste le meilleur chemin.",
        ],
      },
    ],
    related: ["african-kingdoms", "timbuktu"],
    countries: ["mali", "senegal"],
  },
  {
    id: "timbuktu",
    slug: "timbuktu",
    title: "Tombouctou, cité du savoir",
    category: "Histoire",
    readingTime: 6,
    excerpt: "Carrefour du Sahara et du fleuve Niger, Tombouctou a connu une brillante vie intellectuelle dont témoignent ses mosquées et ses manuscrits.",
    intro:
      "Aux portes du désert, Tombouctou s’est imposée du XIVe au XVIe siècle comme une ville de commerce, d’enseignement et de copie de manuscrits. Sa réputation dépasse largement le Sahel.",
    image: img("timbuktu"),
    sections: [
      {
        heading: "Une ville de passage devenue ville de savoir",
        paragraphs: [
          "Située près du fleuve Niger, Tombouctou relie les caravanes du Sahara aux réseaux fluviaux de l’Afrique de l’Ouest. L’or, le sel et les livres circulent. Après le pèlerinage de Mansa Moussa en 1324, la mosquée de Djinguereber est bâtie en 1327 avec l’aide d’un architecte venu d’Andalousie, Abu Ishaq al-Sahili.",
        ],
      },
      {
        heading: "Sankoré, Djinguereber, Sidi Yahia",
        paragraphs: [
          "Les trois grandes mosquées de la ville, bâties en terre, accueillent des cercles d’étude où l’on enseigne le droit, l’astronomie, la grammaire, la médecine. Des savants comme Ahmed Baba (1556-1627) sont connus bien au-delà du Sahel pour leurs écrits.",
        ],
        image: { src: "/images/arts/djenne-mosque.svg", alt: "Illustration abstraite d’une architecture de terre à poutres saillantes", caption: "L’architecture soudano-sahélienne : terre, bois de rônier et crépissage régulier." },
      },
      {
        heading: "Des manuscrits protégés",
        paragraphs: [
          "Des centaines de milliers de manuscrits, conservés par des familles et des bibliothèques, traitent de théologie, de sciences, de poésie et de commerce. En 2012-2013, face aux menaces qui pèsent sur la ville, bibliothécaires et familles ont organisé la mise à l’abri d’une grande partie de ces textes. La ville est inscrite au patrimoine mondial depuis 1988.",
        ],
      },
    ],
    timeline: [
      { period: "1324", title: "Retour de Mansa Moussa", text: "Le souverain du Mali revient de La Mecque et renforce le rayonnement de la ville." },
      { period: "1327", title: "Mosquée de Djinguereber", text: "Construction de l’édifice en terre, toujours debout." },
      { period: "XVe-XVIe s.", title: "Âge d’or", text: "Sous l’empire songhaï, la ville est un centre de commerce et d’enseignement." },
      { period: "1988", title: "Patrimoine mondial", text: "Tombouctou est inscrite sur la liste de l’UNESCO." },
      { period: "2012-2013", title: "Sauvegarde des manuscrits", text: "Des familles et des bibliothécaires mettent à l’abri des collections entières." },
    ],
    related: ["african-kingdoms", "trade-routes", "griots"],
    countries: ["mali"],
  },
  {
    id: "textile-traditions",
    slug: "textile-traditions",
    title: "Les traditions textiles",
    category: "Arts",
    readingTime: 5,
    excerpt: "Kente, bògòlanfini, étoffes en raphia, indigo : les textiles africains sont des langages de couleurs, de motifs et de statuts.",
    intro:
      "Un textile n’est jamais seulement un vêtement. Il dit un lignage, une occasion, une région, parfois une histoire. À travers le continent, les techniques de tissage, de teinture et d’impression ont donné lieu à des arts d’une extraordinaire diversité.",
    image: img("textile-traditions"),
    sections: [
      {
        heading: "Le kente, des bandes qui s’assemblent",
        paragraphs: [
          "Chez les Asante et les Éwé du Ghana, le kente est tissé en longues bandes étroites, ensuite cousues entre elles. Les motifs et les couleurs portent des noms et des significations, associés à des proverbes ou à des événements.",
        ],
        image: { src: "/images/arts/kente-asante.svg", alt: "Illustration abstraite de bandes tissées multicolores", caption: "Bandes tissées, couleurs contrastées : l’esprit du kente." },
      },
      {
        heading: "La terre et l’indigo",
        paragraphs: [
          "Au Mali, le bògòlanfini est teint avec de la boue fermentée et des décoctions végétales sur du coton tissé à la main. Au Nigeria, les Yoruba produisent le adire, tissu teint à l’indigo selon des techniques de réserve. L’indigo, par sa profondeur, est aussi associé aux Touaregs.",
        ],
      },
      {
        heading: "Raphia, wax et inventions contemporaines",
        paragraphs: [
          "Les Kuba, en RD Congo, tissent le raphia en étoffes brodées de motifs géométriques. Les tissus imprimés dits « wax », inspirés des batiks javanais fabriqués aux Pays-Bas au XIXe siècle, sont devenus, par les choix des créatrices et des marchandes d’Afrique de l’Ouest, des supports d’identités locales et de messages.",
          "Aujourd’hui, de nombreux créateurs réinterprètent ces savoir-faire dans la mode, l’architecture d’intérieur et le design.",
        ],
      },
    ],
    related: ["african-kingdoms", "trade-routes"],
    countries: ["ghana", "mali", "nigeria", "dr-congo", "cote-d-ivoire"],
  },
  {
    id: "trade-routes",
    slug: "trade-routes",
    title: "Les grandes routes commerciales africaines",
    category: "Commerce",
    readingTime: 6,
    excerpt: "Pistes sahariennes, fleuves, ports de l’océan Indien : des réseaux d’échanges qui ont fait circuler biens, savoirs, croyances et personnes.",
    intro:
      "Les routes commerciales africaines ne sont pas de simples lignes sur une carte. Ce sont des chemins de rencontre, de négociation et d’emprunts, qui ont aussi connu des violences, notamment la traite des êtres humains.",
    image: img("trade-routes"),
    sections: [
      {
        heading: "Les routes transsahariennes",
        paragraphs: [
          "Du Maghreb au Sahel, les caravanes reliaient des cités comme Sijilmassa, Tombouctou, Gao ou Agadez. Elles transportaient du sel, de l’or, du cuivre, des tissus, des livres, des noix de kola. Ces échanges ont favorisé la diffusion de l’islam, des savoirs et de nouveaux styles architecturaux.",
        ],
      },
      {
        heading: "Fleuves et forêts",
        paragraphs: [
          "Le Niger, le Sénégal, le Congo : les fleuves servaient d’axes de circulation pour les marchandises et les idées. Les marchés régionaux fournissaient du poisson séché, des étoffes, du fer, de la poterie.",
        ],
      },
      {
        heading: "Un océan Indien animé",
        paragraphs: [
          "De la corne de l’Afrique à Madagascar, les ports swahilis échangeaient de l’or, de l’ivoire et des produits agricoles contre des céramiques et des tissus d’Arabie, d’Inde et de Chine. Ces échanges ont aussi alimenté des traites d’esclaves, un chapitre difficile de cette histoire.",
          "L’Atlantique a ensuite été le théâtre d’une traite transatlantique d’une ampleur dramatique, dont les conséquences continuent de marquer les sociétés africaines et de la diaspora.",
        ],
      },
    ],
    timeline: [
      { period: "Antiquité", title: "Nil et mer Rouge", text: "Aksoum et ses ports de la mer Rouge relient l’intérieur à la Méditerranée et à l’Inde." },
      { period: "VIIIe-XVe s.", title: "Caravanes sahariennes", text: "Le commerce de l’or et du sel structure les empires sahéliens." },
      { period: "XIIe-XVe s.", title: "Cités swahilies", text: "Kilwa, Mombasa et d’autres ports animent le commerce de l’océan Indien." },
      { period: "XVIe s.", title: "Atlantique", text: "Les routes maritimes européennes bouleversent les équilibres côtiers." },
    ],
    related: ["timbuktu", "swahili-coast", "african-kingdoms"],
    countries: ["morocco", "mali", "senegal", "kenya", "tanzania", "ethiopia"],
  },
  {
    id: "swahili-coast",
    slug: "swahili-coast",
    title: "La côte swahilie, ouverte sur l’océan Indien",
    category: "Langues",
    readingTime: 5,
    excerpt: "De Mogadiscio à Kilwa, une civilisation urbaine, marchande et lettrée a donné naissance à une langue devenue langue de communication régionale.",
    intro:
      "Le kiswahili est une langue bantoue enrichie, au fil des siècles, d’emprunts à l’arabe, au persan, au portugais ou à l’anglais. Sa histoire raconte celle d’une façade maritime très connectée.",
    image: img("swahili-coast"),
    sections: [
      {
        heading: "Des villes de pierre et de corail",
        paragraphs: [
          "Kilwa, Gedi, Lamu, Zanzibar : des villes aux maisons de pierre corallienne, aux mosquées, aux marchés animés. Kilwa Kisiwani et Songo Mnara ont été inscrites au patrimoine mondial en 1981, la vieille ville de Zanzibar en 2000, celle de Lamu en 2001.",
        ],
        image: { src: "/images/arts/keita-portraits.svg", alt: "Illustration abstraite d’un paysage côtier chaud", caption: "La côte de l’océan Indien : un horizon d’échanges." },
      },
      {
        heading: "Une langue, plusieurs univers",
        paragraphs: [
          "Le kiswahili est aujourd’hui parlé par des dizaines de millions de personnes en Afrique de l’Est et au-delà. Il est langue nationale ou officielle dans plusieurs pays. Son essor doit beaucoup au commerce, à l’enseignement et, en Tanzanie, au rôle joué par Julius Nyerere.",
        ],
      },
      {
        heading: "Poésie, taarab et portes sculptées",
        paragraphs: [
          "La poésie swahilie, écrite depuis plusieurs siècles, côtoie le taarab, genre musical né dans les cours de Zanzibar. Les portes sculptées de Lamu et de Stone Town racontent les alliances et les statuts des familles qui les ont commandées.",
        ],
      },
    ],
    related: ["trade-routes", "african-kingdoms"],
    countries: ["kenya", "tanzania", "madagascar"],
  },
];
