import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { countries } from "@/data/countries";
import { stories } from "@/data/stories";
import { foods } from "@/data/foods";
import { genres } from "@/data/music";

export default function sitemap(): MetadataRoute.Sitemap {
  const fixed = ["", "/cultures", "/stories", "/countries", "/arts", "/music", "/food", "/about"];
  return [
    ...fixed.map((path) => ({ url: `${SITE_URL}${path}` })),
    ...countries.map((c) => ({ url: `${SITE_URL}/countries/${c.slug}` })),
    ...stories.map((s) => ({ url: `${SITE_URL}/stories/${s.slug}` })),
    ...foods.map((f) => ({ url: `${SITE_URL}/food/${f.slug}` })),
    ...genres.map((g) => ({ url: `${SITE_URL}/music/${g.slug}` })),
  ];
}
