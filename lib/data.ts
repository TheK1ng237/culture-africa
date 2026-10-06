import { countries } from "@/data/countries";
import { stories } from "@/data/stories";
import { foods } from "@/data/foods";
import { genres } from "@/data/music";

export const getCountry = (slug: string) => countries.find((c) => c.slug === slug);
export const getStory = (slug: string) => stories.find((s) => s.slug === slug);
export const getFood = (slug: string) => foods.find((f) => f.slug === slug);
export const getGenre = (slug: string) => genres.find((g) => g.slug === slug);

export const getStories = (slugs: string[]) =>
  slugs.map((slug) => getStory(slug)).filter((s): s is NonNullable<typeof s> => Boolean(s));
export const getFoods = (slugs: string[]) =>
  slugs.map((slug) => getFood(slug)).filter((s): s is NonNullable<typeof s> => Boolean(s));
export const getGenres = (slugs: string[]) =>
  slugs.map((slug) => getGenre(slug)).filter((s): s is NonNullable<typeof s> => Boolean(s));
export const getCountries = (slugs: string[]) =>
  slugs.map((slug) => getCountry(slug)).filter((s): s is NonNullable<typeof s> => Boolean(s));
