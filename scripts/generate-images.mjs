// Génère les illustrations SVG locales (aucune dépendance, aucun réseau).
// Usage : npm run images
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
const W = 1200;
const H = 800;

function hash(str) {
  let h = 2166136261;
  for (const c of str) {
    h ^= c.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function rng(seed) {
  let a = hash(seed);
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PAL = {
  savanna: { sky: ["#f6d9a5", "#e59a54"], sun: "#fff1d0", ridges: ["#c97a43", "#9b522c", "#5f321d", "#2b170e"], tree: "#1a0f09" },
  sahara: { sky: ["#f6e2bb", "#e0a85f"], sun: "#fff6e0", ridges: ["#e0b273", "#c88f4b", "#a0682f", "#6e4220"], tree: "#3a2312" },
  dusk: { sky: ["#4a1c15", "#d0652f"], sun: "#f4c97a", ridges: ["#8d3a22", "#612417", "#391610", "#190b07"], tree: "#0d0604" },
  forest: { sky: ["#e2d3a1", "#98a45f"], sun: "#fbf1c8", ridges: ["#6b8a4c", "#356347", "#1d4333", "#0d2119"], tree: "#08130e" },
  night: { sky: ["#17110d", "#53301d"], sun: "#d9b055", ridges: ["#3e271a", "#2c1b12", "#1d120c", "#0d0705"], tree: "#050302" },
  coast: { sky: ["#f7e6c4", "#e0a05c"], sun: "#fff4d8", ridges: ["#3c7a68", "#27594e", "#173d36", "#0b221e"], tree: "#06140f" },
  sepia: { sky: ["#d8c3a0", "#8a6a47"], sun: "#f3e6cc", ridges: ["#6f5236", "#4d3623", "#2f2015", "#150e09"], tree: "#0a0604" },
};
const EARTH = ["#b2532b", "#c88a2e", "#1d4a38", "#110d0a", "#ebdfc8", "#8a2f1f", "#c9a24d"];
const INDIGO = ["#16294a", "#233f6e", "#ebdfc8", "#0d1a30", "#3d5a8c", "#c9a24d"];
const SAND = ["#d9c29a", "#b2532b", "#ebdfc8", "#8a2f1f", "#1d4a38", "#c88a2e"];

const GRAIN = `<filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 -0.35"/></filter>`;
const grainRect = `<rect width="100%" height="100%" filter="url(#grain)" opacity="0.35"/>`;

function wrap(inner, defs = "", w = W, h = H) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice">\n<defs>${GRAIN}${defs}</defs>\n${inner}\n</svg>\n`;
}
const skyDef = (p) => `<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.sky[0]}"/><stop offset="1" stop-color="${p.sky[1]}"/></linearGradient>`;

function ridge(r, y0, amp, color, w = W, h = H, opacity = 1) {
  const f1 = r() * 0.01 + 0.004;
  const f2 = r() * 0.02 + 0.01;
  const p1 = r() * 6.28;
  const p2 = r() * 6.28;
  const pts = [];
  for (let x = 0; x <= w; x += 16) {
    pts.push(`${x} ${(y0 + Math.sin(x * f1 + p1) * amp + Math.sin(x * f2 + p2) * amp * 0.4).toFixed(1)}`);
  }
  return `<path d="M0 ${h} L${pts.join(" L")} L${w} ${h} Z" fill="${color}" opacity="${opacity}"/>`;
}
function acacia(x, y, s, color) {
  return `<g fill="${color}" transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) scale(${s.toFixed(2)})"><path d="M-4 0 L4 0 L3 -62 Q12 -92 46 -102 L44 -97 Q14 -88 7 -62 Q-6 -92 -44 -98 L-42 -104 Q-9 -94 -3 -62 Z"/><ellipse cx="0" cy="-106" rx="74" ry="13"/><ellipse cx="-38" cy="-99" rx="42" ry="9"/><ellipse cx="42" cy="-99" rx="40" ry="9"/></g>`;
}

function landscape(seed, p, tree = true) {
  const r = rng(seed);
  const sx = 180 + r() * 840;
  const sy = 150 + r() * 150;
  const sr = 60 + r() * 55;
  const ys = [430, 520, 600, 690];
  const amps = [40, 34, 26, 18];
  let o = `<rect width="${W}" height="${H}" fill="url(#sky)"/>`;
  o += `<circle cx="${sx}" cy="${sy}" r="${sr * 2.4}" fill="${p.sun}" opacity="0.16"/><circle cx="${sx}" cy="${sy}" r="${sr}" fill="${p.sun}"/>`;
  o += ridge(r, ys[0], amps[0], p.ridges[0]);
  o += ridge(r, ys[1], amps[1], p.ridges[1]);
  if (tree) o += acacia(180 + r() * 840, ys[2] + 60, 0.9 + r() * 0.5, p.tree);
  o += ridge(r, ys[2], amps[2], p.ridges[2]);
  o += ridge(r, ys[3], amps[3], p.ridges[3]);
  return wrap(o + grainRect, skyDef(p));
}

function textile(seed, list, bg = "#110d0a") {
  const r = rng(seed);
  let x = 0;
  let o = `<rect width="${W}" height="${H}" fill="${bg}"/>`;
  while (x < W) {
    const w = 70 + Math.floor(r() * 90);
    const c = list[Math.floor(r() * list.length)];
    let c2 = list[Math.floor(r() * list.length)];
    if (c2 === c) c2 = bg;
    const kind = Math.floor(r() * 4);
    const step = 40 + Math.floor(r() * 30);
    o += `<rect x="${x}" y="0" width="${w}" height="${H}" fill="${c}"/>`;
    for (let y = 0; y < H; y += step) {
      const cx = x + w / 2;
      const cy = y + step / 2;
      const s = Math.min(w, step) * 0.34;
      if (kind === 0) o += `<polygon points="${cx},${cy - s} ${cx + s},${cy} ${cx},${cy + s} ${cx - s},${cy}" fill="${c2}"/>`;
      else if (kind === 1) o += `<rect x="${x + 6}" y="${cy - 3}" width="${w - 12}" height="6" fill="${c2}"/>`;
      else if (kind === 2) o += `<circle cx="${cx}" cy="${cy}" r="${s * 0.6}" fill="${c2}"/>`;
      else o += `<path d="M${x + 6} ${y + step} L${cx} ${y + 6} L${x + w - 6} ${y + step}" fill="none" stroke="${c2}" stroke-width="6"/>`;
    }
    o += `<rect x="${x}" y="0" width="3" height="${H}" fill="${bg}" opacity="0.6"/>`;
    x += w;
  }
  o += `<rect width="${W}" height="${H}" fill="url(#weave)"/>`;
  const defs = `<pattern id="weave" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0 0H6" stroke="#000" stroke-opacity="0.14"/><path d="M0 3H6" stroke="#fff" stroke-opacity="0.07"/></pattern>`;
  return wrap(o + grainRect, defs);
}

function plate(seed, f) {
  const r = rng(seed);
  let o = `<rect width="${W}" height="${H}" fill="${f.bg}"/>`;
  o += `<circle cx="612" cy="438" r="330" fill="#000" opacity="0.4" filter="url(#blur)"/>`;
  o += `<circle cx="600" cy="400" r="330" fill="${f.plate}"/><circle cx="600" cy="400" r="292" fill="${f.rim}"/><circle cx="600" cy="400" r="256" fill="${f.plate}"/>`;
  const rx = 190 + r() * 30;
  const ry = 135 + r() * 25;
  o += `<ellipse cx="600" cy="405" rx="${rx}" ry="${ry}" fill="${f.main}"/>`;
  for (let i = 0; i < 110; i++) {
    const a = r() * Math.PI * 2;
    const d = Math.sqrt(r());
    const px = 600 + Math.cos(a) * rx * 0.9 * d;
    const py = 405 + Math.sin(a) * ry * 0.9 * d;
    const col = f.acc[Math.floor(r() * f.acc.length)];
    o += `<circle cx="${px.toFixed(0)}" cy="${py.toFixed(0)}" r="${(3 + r() * 10).toFixed(1)}" fill="${col}" opacity="0.85"/>`;
  }
  for (let i = 0; i < 7; i++) {
    const a = r() * 360;
    const px = 600 + Math.cos((a * Math.PI) / 180) * (rx * 0.75);
    const py = 405 + Math.sin((a * Math.PI) / 180) * (ry * 0.75);
    o += `<ellipse cx="${px.toFixed(0)}" cy="${py.toFixed(0)}" rx="26" ry="9" fill="${f.leaf}" transform="rotate(${a.toFixed(0)} ${px.toFixed(0)} ${py.toFixed(0)})"/>`;
  }
  const defs = `<filter id="blur"><feGaussianBlur stdDeviation="22"/></filter>`;
  return wrap(o + grainRect, defs);
}

function music(seed, p) {
  const r = rng(seed);
  const ph = r() * 6;
  let o = `<rect width="${W}" height="${H}" fill="url(#sky)"/>`;
  o += `<circle cx="${300 + r() * 600}" cy="${300 + r() * 200}" r="${200 + r() * 120}" fill="${p.sun}" opacity="0.22"/>`;
  for (let x = 40; x < W - 20; x += 22) {
    const h = 50 + Math.abs(Math.sin(x * 0.011 + ph)) * 280 * (0.4 + r() * 0.8);
    const col = p.ridges[Math.floor(r() * p.ridges.length)];
    o += `<rect x="${x}" y="${((H - h) / 2).toFixed(0)}" width="10" height="${h.toFixed(0)}" rx="5" fill="${col}" opacity="0.9"/>`;
  }
  return wrap(o + grainRect, skyDef(p));
}

function art(seed, list, bg = "#ebdfc8") {
  const r = rng(seed);
  const cols = 4;
  const rows = 3;
  const tw = W / cols;
  const th = H / rows;
  let o = `<rect width="${W}" height="${H}" fill="${bg}"/>`;
  const pick = () => list[Math.floor(r() * list.length)];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = i * tw;
      const y = j * th;
      const c1 = pick();
      const c2 = pick();
      const t = Math.floor(r() * 6);
      const cx = x + tw / 2;
      const cy = y + th / 2;
      const rad = Math.min(tw, th) / 2 - 8;
      o += `<rect x="${x}" y="${y}" width="${tw}" height="${th}" fill="${c1}"/>`;
      if (t === 0) o += `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="${c2}"/>`;
      else if (t === 1) o += `<path d="M${cx - rad} ${cy} A${rad} ${rad} 0 0 1 ${cx + rad} ${cy} Z" fill="${c2}"/>`;
      else if (t === 2) o += `<path d="M${x} ${y + th} L${x} ${y} A${tw} ${th} 0 0 1 ${x + tw} ${y + th} Z" fill="${c2}"/>`;
      else if (t === 3) o += `<path d="M${cx - rad * 0.7} ${y + th} V${cy} A${rad * 0.7} ${rad * 0.7} 0 0 1 ${cx + rad * 0.7} ${cy} V${y + th} Z" fill="${c2}"/>`;
      else if (t === 4) o += `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="${c2}"/><circle cx="${cx}" cy="${cy}" r="${rad * 0.55}" fill="${c1}"/><circle cx="${cx}" cy="${cy}" r="${rad * 0.22}" fill="${pick()}"/>`;
      else o += `<polygon points="${x + 12},${y + th - 12} ${x + tw - 12},${y + th - 12} ${cx},${y + 14}" fill="${c2}"/>`;
    }
  }
  return wrap(o + grainRect);
}

function architecture(seed, p) {
  const r = rng(seed);
  const dark = p.ridges[2];
  const mid = p.ridges[1];
  const light = p.ridges[0];
  let o = `<rect width="${W}" height="${H}" fill="url(#sky)"/>`;
  o += `<circle cx="${200 + r() * 800}" cy="${160 + r() * 80}" r="70" fill="${p.sun}"/>`;
  o += ridge(r, 600, 20, light);
  o += `<rect x="260" y="400" width="680" height="320" fill="${mid}"/>`;
  const towers = [300, 540, 780];
  towers.forEach((tx, i) => {
    const th = 250 + Math.floor(r() * 90);
    const top = 720 - th;
    o += `<polygon points="${tx},720 ${tx + 12},${top + 20} ${tx + 24},${top} ${tx + 96},${top} ${tx + 108},${top + 20} ${tx + 120},720" fill="${light}"/>`;
    o += `<rect x="${tx + 36}" y="${top - 22}" width="48" height="24" fill="${light}"/>`;
    for (let k = 0; k < 6; k++) {
      const ky = top + 40 + k * 38;
      o += `<line x1="${tx - 10}" y1="${ky}" x2="${tx + 130}" y2="${ky}" stroke="${dark}" stroke-width="5" stroke-linecap="round"/>`;
    }
    o += `<path d="M${tx + 48} 720 V${top + 150} Q${tx + 60} ${top + 120} ${tx + 72} ${top + 150} V720 Z" fill="${dark}"/>`;
    if (i === 1) o += `<circle cx="${tx + 60}" cy="${top - 40}" r="3" fill="${dark}"/>`;
  });
  o += `<rect x="260" y="400" width="680" height="12" fill="${light}"/>`;
  o += ridge(r, 740, 12, dark);
  return wrap(o + grainRect, skyDef(p));
}

function save(rel, svgText) {
  const file = join(OUT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, svgText);
}

// ---- Pays
const countries = {
  morocco: ["sahara", "landscape"], egypt: ["sahara", "architecture"], senegal: ["coast", "landscape"],
  mali: ["sahara", "architecture"], "cote-d-ivoire": ["forest", "landscape"], ghana: ["savanna", "textile"],
  nigeria: ["dusk", "landscape"], cameroon: ["forest", "landscape"], "dr-congo": ["forest", "landscape"],
  ethiopia: ["savanna", "architecture"], kenya: ["savanna", "landscape"], tanzania: ["coast", "landscape"],
  "south-africa": ["dusk", "landscape"], madagascar: ["coast", "landscape"],
};
for (const [slug, [pal, kind]] of Object.entries(countries)) {
  const svgText = kind === "architecture" ? architecture(slug, PAL[pal]) : kind === "textile" ? textile(slug, EARTH) : landscape(slug, PAL[pal]);
  save(`countries/${slug}.svg`, svgText);
}

// ---- Histoires
const stories = {
  "african-kingdoms": ["dusk", "architecture"], griots: ["night", "music"], timbuktu: ["sahara", "architecture"],
  "textile-traditions": ["earth", "textile"], "trade-routes": ["sahara", "landscape"], "swahili-coast": ["coast", "landscape"],
};
for (const [slug, [pal, kind]] of Object.entries(stories)) {
  let s;
  if (kind === "architecture") s = architecture(slug, PAL[pal]);
  else if (kind === "music") s = music(slug, PAL[pal]);
  else if (kind === "textile") s = textile(slug, EARTH);
  else s = landscape(slug, PAL[pal]);
  save(`stories/${slug}.svg`, s);
}

// ---- Cultures
save("cultures/traditions.svg", art("traditions", EARTH, "#110d0a"));
save("cultures/arts.svg", textile("cultures-arts", SAND));
save("cultures/music.svg", music("cultures-music", PAL.dusk));
save("cultures/food.svg", plate("cultures-food", { bg: "#1a120d", plate: "#ebdfc8", rim: "#d9c29a", main: "#b2532b", acc: ["#c88a2e", "#8a2f1f", "#e9b86a", "#1d4a38"], leaf: "#1d4a38" }));
save("cultures/languages.svg", art("cultures-languages", SAND, "#ebdfc8"));
save("cultures/history.svg", architecture("cultures-history", PAL.sahara));

// ---- Gastronomie
const foods = {
  ndole: { bg: "#1a120d", plate: "#ebdfc8", rim: "#d9c29a", main: "#3d5a2a", acc: ["#6f8a3d", "#c88a2e", "#8a2f1f", "#e9b86a"], leaf: "#2f5a3a" },
  "jollof-rice": { bg: "#120d0a", plate: "#ebdfc8", rim: "#c9a24d", main: "#c2411f", acc: ["#e0742f", "#8a2f1f", "#f2c46d", "#6b2414"], leaf: "#1d4a38" },
  thieboudienne: { bg: "#17110c", plate: "#f3e8d2", rim: "#d9c29a", main: "#d4682a", acc: ["#f2c46d", "#8a2f1f", "#1d4a38", "#efe6d0"], leaf: "#1d4a38" },
  injera: { bg: "#140f0b", plate: "#d9c29a", rim: "#b99a68", main: "#a88a62", acc: ["#8a2f1f", "#c88a2e", "#3d5a2a", "#efe6d0"], leaf: "#3d5a2a" },
  couscous: { bg: "#1a130d", plate: "#ebdfc8", rim: "#c9a24d", main: "#e5c07b", acc: ["#f3dca3", "#c88a2e", "#8a2f1f", "#6f8a3d"], leaf: "#3d5a2a" },
  fufu: { bg: "#130e0a", plate: "#ebdfc8", rim: "#d9c29a", main: "#efe6d0", acc: ["#f7f1e6", "#d9c29a", "#3d5a2a", "#b2532b"], leaf: "#2f5a3a" },
  bobotie: { bg: "#17100b", plate: "#f3e8d2", rim: "#d9c29a", main: "#d9a441", acc: ["#f2c46d", "#b2532b", "#8a2f1f", "#efe6d0"], leaf: "#6f8a3d" },
  tajine: { bg: "#120d09", plate: "#b2532b", rim: "#8a2f1f", main: "#c2661f", acc: ["#e9b86a", "#6f8a3d", "#8a2f1f", "#f2c46d"], leaf: "#3d5a2a" },
};
for (const [slug, f] of Object.entries(foods)) save(`foods/${slug}.svg`, plate(slug, f));

// ---- Musique
const genres = {
  afrobeats: "savanna", amapiano: "forest", highlife: "sahara", makossa: "dusk",
  mbalax: "coast", soukous: "forest", "afro-jazz": "night", "traditional-music": "sepia",
};
for (const [slug, pal] of Object.entries(genres)) save(`music/${slug}.svg`, music(slug, PAL[pal]));

// ---- Arts
const arts = {
  "kente-asante": () => textile("kente", EARTH),
  "bogolan-bamana": () => textile("bogolan", ["#3a2a1c", "#ebdfc8", "#8a6a47", "#110d0a"], "#ebdfc8"),
  "bronzes-benin": () => art("bronzes", ["#c88a2e", "#8a5a1f", "#3a2412", "#c9a24d", "#110d0a"], "#2a1a0e"),
  "chokwe-statuary": () => art("chokwe", ["#6e4220", "#3a2412", "#b2532b", "#ebdfc8"], "#1c120b"),
  "maasai-beadwork": () => art("maasai", ["#8a2f1f", "#ebdfc8", "#1d4a38", "#c88a2e", "#16294a"], "#8a2f1f"),
  "berber-silver": () => art("berber", ["#d9d4c8", "#16294a", "#8a2f1f", "#c9a24d"], "#1c1f2a"),
  "zulu-ukhamba": () => art("ukhamba", ["#2a1a12", "#b2532b", "#3a2412", "#d9c29a"], "#2a1a12"),
  "safi-pottery": () => art("safi", ["#1d4a38", "#ebdfc8", "#16294a", "#c88a2e"], "#ebdfc8"),
  "djenne-mosque": () => architecture("djenne", PAL.sahara),
  "lalibela-churches": () => architecture("lalibela", PAL.dusk),
  "keita-portraits": () => landscape("keita", PAL.sepia, false),
  "sidibe-bamako": () => landscape("sidibe", PAL.night, true),
  "congolese-popular-painting": () => art("samba", ["#c2411f", "#f2c46d", "#1d4a38", "#16294a", "#ebdfc8"], "#f2c46d"),
  "ndebele-murals": () => art("ndebele", ["#ebdfc8", "#1d4a38", "#c2411f", "#16294a", "#f2c46d", "#110d0a"], "#ebdfc8"),
  "agaseke-baskets": () => textile("agaseke", ["#d9c29a", "#8a2f1f", "#110d0a", "#ebdfc8"], "#d9c29a"),
  "adire-indigo": () => textile("adire", INDIGO, "#0d1a30"),
};
for (const [id, fn] of Object.entries(arts)) save(`arts/${id}.svg`, fn());

// ---- Hero (calques pour la parallaxe)
const HW = 1920;
const HH = 1080;
{
  const p = PAL.dusk;
  const r = rng("hero");
  const sx = 1280;
  const sy = 360;
  const sky = `<rect width="${HW}" height="${HH}" fill="url(#sky)"/><circle cx="${sx}" cy="${sy}" r="420" fill="${p.sun}" opacity="0.10"/><circle cx="${sx}" cy="${sy}" r="260" fill="${p.sun}" opacity="0.16"/><circle cx="${sx}" cy="${sy}" r="120" fill="${p.sun}"/>`;
  save("hero/sky.svg", wrap(sky + grainRect, skyDef(p), HW, HH));
  save("hero/far.svg", wrap(ridge(r, 660, 60, "#9a4527", HW, HH, 0.9), "", HW, HH));
  save("hero/mid.svg", wrap(ridge(r, 780, 50, "#5b2316", HW, HH), "", HW, HH));
  const near = ridge(r, 880, 38, "#2a120b", HW, HH) + acacia(430, 930, 1.9, "#160a06") + acacia(1560, 940, 1.5, "#160a06");
  save("hero/near.svg", wrap(near, "", HW, HH));
  save("hero/ground.svg", wrap(ridge(r, 1000, 22, "#0d0705", HW, HH), "", HW, HH));
}

console.log("Illustrations générées dans public/images");
