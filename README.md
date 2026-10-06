# Culture Africa

## 1. Présentation

**Culture Africa** est une plateforme web immersive dédiée à la découverte, à la transmission et à la valorisation de la richesse culturelle africaine : pays, peuples, traditions, histoire, arts, musique, gastronomie, langues et récits.

Fonctionnalités principales :

- accueil immersif avec hero à parallaxe et **globe 3D interactif** de l’Afrique (Three.js, chargé dynamiquement, avec carte 2D de secours si WebGL est indisponible) ;
- **14 pays** (cinq régions) avec recherche et filtres par région et par langue ;
- **6 récits** longs avec barre de progression, citations, chronologie et articles similaires ;
- **musique** (8 genres, fiches détaillées, lecteur audio *mock* sans aucun fichier audio) ;
- **gastronomie** (8 plats, fiches détaillées) ;
- **arts** (16 œuvres, 8 catégories, galerie avec lightbox) ;
- **recherche globale** (touche `Ctrl/Cmd + K` ou bouton de la barre de navigation) ;
- animations Framer Motion respectueuses de `prefers-reduced-motion`, navigation clavier, HTML sémantique, metadata SEO, `sitemap.xml`, `robots.txt` et image Open Graph.

Le projet **ne dépend d’aucun backend, d’aucune API, d’aucun compte ni service payant**. Toutes les données sont des fichiers TypeScript statiques et toutes les illustrations sont des SVG locaux.

## 2. Technologies

- Next.js 16 (App Router, Server Components, Turbopack)
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Three.js

## 3. Prérequis

- **Node.js 20.9 ou supérieur** (Node 22 LTS recommandé)
- npm 10 ou supérieur

## 4. Installation

```bash
npm install
```

## 5. Lancement

```bash
npm run dev
```

Puis ouvrir <http://localhost:3000>.

## 6. Build production

```bash
npm run build
npm start
```

Autres commandes utiles :

```bash
npm run lint        # ESLint
npm run typecheck   # tsc --noEmit
npm run images      # régénère les illustrations SVG dans public/images
```

## 7. Structure du projet

```text
app/              Routes (App Router) : accueil, cultures, stories, countries, music, food, arts, about
                  + layout, template (transition de page), sitemap, robots, opengraph-image
components/       navbar, hero, globe (Three.js), cards, stories, countries, music, food, arts, search, ui
data/             Contenus statiques : countries, cultures, stories, foods, music, arts
lib/              utils, constants, motion, data (accès par slug), search (index de recherche)
types/            Interfaces TypeScript partagées
public/images/    Illustrations SVG locales (hero, pays, récits, plats, genres, œuvres)
public/icons/     Logo
scripts/          generate-images.mjs (illustrations), check-data.mjs (cohérence des données)
```

## 8. Données

Tout le contenu se modifie dans `data/` :

| Fichier | Contenu |
| --- | --- |
| `data/countries.ts` | Pays (capitale, région, langues, histoire, peuples, traditions, musique, gastronomie, arts, lieux, coordonnées du globe) |
| `data/stories.ts` | Récits (sections, citations, chronologie, articles liés) |
| `data/cultures.ts` | Catégories de cultures, traditions, familles de langues |
| `data/foods.ts` | Plats (ingrédients, histoire, variantes) |
| `data/music.ts` | Genres musicaux (artistes, instruments, durée du lecteur mock) |
| `data/arts.ts` | Œuvres de la galerie et catégories |

Pour ajouter un pays : ajouter une entrée dans `data/countries.ts` (avec ses `coordinates`, qui placent le repère sur le globe) et une illustration `public/images/countries/<slug>.svg` (ou référencer votre propre image). Les routes `/countries/<slug>`, le sitemap, la recherche et le globe se mettent à jour automatiquement.

Pour vérifier la cohérence des références croisées (Node 22.6+) :

```bash
node --experimental-strip-types scripts/check-data.mjs
```

> Les textes fournis sont des contenus de démonstration, courts et respectueux. Ils sont destinés à être relus, corrigés et enrichis avec des spécialistes et des communautés concernées avant toute publication.

## 9. Variables d’environnement

**Aucune variable n’est nécessaire** pour installer, lancer ou construire le projet.

Optionnel : `NEXT_PUBLIC_SITE_URL` (par exemple `https://mon-domaine.org`) définit l’URL de base utilisée pour les métadonnées Open Graph, le sitemap et robots.txt. Valeur par défaut : `http://localhost:3000`.

Aucune clé API ni aucun secret n’est inclus dans ce projet.
