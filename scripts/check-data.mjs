// Vérifie la cohérence des données locales (références croisées, images).
// Usage : node --experimental-strip-types scripts/check-data.mjs   (Node 22.6+)
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const load = async (name) => import(join(root, "data", name));
const { countries } = await load("countries.ts");
const { stories } = await load("stories.ts");
const { foods } = await load("foods.ts");
const { genres } = await load("music.ts");
const { artPieces } = await load("arts.ts");
const { cultureCategories } = await load("cultures.ts");

const errors = [];
const has = (list, slug) => list.some((x) => x.slug === slug);
const checkImage = (src, where) => {
  if (!existsSync(join(root, "public", src))) errors.push(`Image manquante ${src} (${where})`);
};

for (const c of countries) {
  checkImage(c.image, c.slug);
  c.storySlugs.forEach((s) => !has(stories, s) && errors.push(`${c.slug}: histoire inconnue ${s}`));
  c.foodSlugs.forEach((s) => !has(foods, s) && errors.push(`${c.slug}: plat inconnu ${s}`));
  c.musicSlugs.forEach((s) => !has(genres, s) && errors.push(`${c.slug}: genre inconnu ${s}`));
}
for (const s of stories) {
  checkImage(s.image, s.slug);
  s.related.forEach((r) => !has(stories, r) && errors.push(`${s.slug}: lié inconnu ${r}`));
  s.countries.forEach((r) => !has(countries, r) && errors.push(`${s.slug}: pays inconnu ${r}`));
  s.sections.forEach((sec) => sec.image && checkImage(sec.image.src, s.slug));
}
for (const f of foods) { checkImage(f.image, f.slug); f.countrySlugs.forEach((r) => !has(countries, r) && errors.push(`${f.slug}: pays inconnu ${r}`)); }
for (const g of genres) { checkImage(g.image, g.slug); g.countrySlugs.forEach((r) => !has(countries, r) && errors.push(`${g.slug}: pays inconnu ${r}`)); }
artPieces.forEach((a) => checkImage(a.image, a.id));
cultureCategories.forEach((c) => checkImage(c.image, c.id));

console.log(`${countries.length} pays, ${stories.length} histoires, ${foods.length} plats, ${genres.length} genres, ${artPieces.length} œuvres`);
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log("Données cohérentes.");
