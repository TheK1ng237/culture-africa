import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/hero/Hero";
import { GlobeSection } from "@/components/globe/GlobeSection";
import { CultureCard } from "@/components/cards/CultureCard";
import { StoryCard } from "@/components/stories/StoryCard";
import { CountryCard } from "@/components/countries/CountryCard";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { countries } from "@/data/countries";
import { cultureCategories } from "@/data/cultures";
import { stories } from "@/data/stories";
import { foods } from "@/data/foods";
import { genres } from "@/data/music";
import { imageAlt } from "@/lib/utils";

export default function HomePage() {
  const featuredStories = stories.slice(0, 3);
  const featuredCountries = ["cameroon", "ethiopia", "senegal", "south-africa"]
    .map((slug) => countries.find((c) => c.slug === slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const food = foods.find((f) => f.slug === "ndole") ?? foods[0];
  const genre = genres.find((g) => g.slug === "makossa") ?? genres[0];

  return (
    <>
      <Hero />

      <section className="bg-ivoire" aria-labelledby="titre-intro">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 sm:px-8 md:grid-cols-[1fr_2fr] md:py-32">
          <Reveal>
            <h2 id="titre-intro" className="font-display text-2xl text-rouge">Une invitation</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-display text-3xl leading-snug text-balance md:text-5xl md:leading-tight">
              Le continent compte plus de cinquante pays et plus de deux mille langues. Ici, on ne résume pas : on
              explore, on écoute, on goûte, on lit.
            </p>
          </Reveal>
        </div>
      </section>

      <GlobeSection countries={countries} />

      <section className="bg-beige/50" aria-labelledby="titre-cultures">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
          <Reveal>
            <h2 id="titre-cultures" className="max-w-2xl font-display text-4xl text-balance md:text-5xl">Six portes d’entrée vers les cultures africaines</h2>
          </Reveal>
          <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
            {cultureCategories.map((category, i) => (
              <StaggerItem key={category.id} className={i === 0 || i === 5 ? "md:col-span-2" : ""}>
                <CultureCard category={category} className="h-full" />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-ivoire" aria-labelledby="titre-recits">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Reveal>
              <h2 id="titre-recits" className="font-display text-4xl md:text-5xl">Récits à lire</h2>
            </Reveal>
            <Link href="/stories" className="text-rouge underline-offset-4 hover:underline">Tous les récits</Link>
          </div>
          <div className="mt-12 grid gap-12">
            <StoryCard story={featuredStories[0]} featured />
            <div className="grid gap-8 md:grid-cols-2">
              {featuredStories.slice(1).map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-beige/50" aria-labelledby="titre-pays">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Reveal>
              <h2 id="titre-pays" className="font-display text-4xl md:text-5xl">Pays à découvrir</h2>
            </Reveal>
            <Link href="/countries" className="text-rouge underline-offset-4 hover:underline">Tous les pays</Link>
          </div>
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCountries.map((country) => (
              <StaggerItem key={country.id}>
                <CountryCard country={country} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="grid md:grid-cols-2" aria-label="Musique et gastronomie">
        <Link href={`/music/${genre.slug}`} className="group relative isolate flex min-h-[28rem] items-end overflow-hidden bg-noir p-8 text-ivoire md:p-14">
          <Image src={genre.image} alt={imageAlt(genre.name)} fill sizes="(min-width: 768px) 50vw, 100vw" className="-z-10 object-cover opacity-70 transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 -z-10 bg-linear-to-t from-noir via-noir/30 to-transparent" />
          <div>
            <h2 className="font-display text-4xl md:text-5xl">{genre.name}</h2>
            <p className="mt-3 max-w-md text-beige/90">{genre.description}</p>
            <p className="mt-4 text-or">Écouter les musiques d’Afrique</p>
          </div>
        </Link>
        <Link href={`/food/${food.slug}`} className="group relative isolate flex min-h-[28rem] items-end overflow-hidden bg-noir p-8 text-ivoire md:p-14">
          <Image src={food.image} alt={imageAlt(food.name)} fill sizes="(min-width: 768px) 50vw, 100vw" className="-z-10 object-cover opacity-70 transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 -z-10 bg-linear-to-t from-noir via-noir/30 to-transparent" />
          <div>
            <h2 className="font-display text-4xl md:text-5xl">{food.name}</h2>
            <p className="mt-3 max-w-md text-beige/90">{food.description}</p>
            <p className="mt-4 text-or">Parcourir les cuisines d’Afrique</p>
          </div>
        </Link>
      </section>
    </>
  );
}
