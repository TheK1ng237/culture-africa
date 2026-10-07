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

      {/* Intro Manifesto Section */}
      <section className="relative bg-noir py-24 sm:py-32 overflow-hidden" aria-labelledby="titre-intro">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-or/10 blur-[160px] rounded-full pointer-events-none" />
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 md:grid-cols-[1fr_2.2fr] md:items-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-terre/40 bg-terre/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-terre">
              <span>Une Invitation</span>
            </div>
            <h2 id="titre-intro" className="mt-4 font-display text-4xl sm:text-5xl font-extrabold text-ivoire leading-tight">
              L&apos;Afrique dans toute sa richesse
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="font-sans text-2xl sm:text-4xl md:text-5xl leading-snug text-balance text-beige/95 font-medium">
              Le continent compte plus de cinquante pays et plus de deux mille langues. Ici, on ne résume pas : <span className="text-gold-gradient font-bold">on explore, on écoute, on goûte, on lit.</span>
            </p>
          </Reveal> 
        </div>
      </section>

      {/* 3D Globe Section */}
      <GlobeSection countries={countries} />

      {/* Culture Categories Grid */}
      <section className="relative bg-noir-surface/70 py-24 sm:py-32 border-t border-b border-beige/10" aria-labelledby="titre-cultures">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-widest text-or mb-2">Piliers de Transmission</p>
              <h2 id="titre-cultures" className="max-w-2xl font-display text-4xl font-extrabold text-balance sm:text-5xl text-ivoire">
                Six portes d’entrée vers les cultures africaines
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                href="/cultures"
                className="group inline-flex items-center gap-2 rounded-full border border-beige/25 bg-noir/40 px-6 py-3 text-sm font-semibold text-ivoire transition-all hover:border-or hover:text-or"
              >
                <span>Découvrir toutes les thématiques</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </Reveal>
          </div>

          <Stagger className="grid gap-6 md:grid-cols-3">
            {cultureCategories.map((category, i) => (
              <StaggerItem key={category.id} className={i === 0 || i === 5 ? "md:col-span-2" : ""}>
                <CultureCard category={category} className="h-full" />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Stories Section */}
      <section className="relative bg-noir py-24 sm:py-32" aria-labelledby="titre-recits">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-16">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-widest text-terre mb-2">Récits & Mémoire</p>
              <h2 id="titre-recits" className="font-display text-4xl font-extrabold sm:text-5xl text-ivoire">
                Récits à lire & transmission orale
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                href="/stories"
                className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-or transition-colors hover:text-or-light"
              >
                <span>Tous les récits</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </Reveal>
          </div>

          <div className="grid gap-10">
            <StoryCard story={featuredStories[0]} featured />
            <div className="grid gap-8 md:grid-cols-2">
              {featuredStories.slice(1).map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Countries Showcase Section */}
      <section className="relative bg-noir-surface/60 py-24 sm:py-32 border-t border-beige/10" aria-labelledby="titre-pays">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-16">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-widest text-or mb-2">Cartographie Vivante</p>
              <h2 id="titre-pays" className="font-display text-4xl font-extrabold sm:text-5xl text-ivoire">
                Pays & Territoires à découvrir
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                href="/countries"
                className="group inline-flex items-center gap-2 rounded-full border border-beige/25 bg-noir/40 px-6 py-3 text-sm font-semibold text-ivoire transition-all hover:border-or hover:text-or"
              >
                <span>Voir les 14 pays</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </Reveal>
          </div>

          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCountries.map((country) => (
              <StaggerItem key={country.id}>
                <CountryCard country={country} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Music & Gastronomy Dual Banner */}
      <section className="grid md:grid-cols-2 border-t border-beige/15" aria-label="Musique et gastronomie">
        <Link
          href={`/music/${genre.slug}`}
          className="group relative isolate flex min-h-[32rem] flex-col justify-end overflow-hidden bg-noir p-8 sm:p-14 text-ivoire"
        >
          <Image
            src={genre.image}
            alt={imageAlt(genre.name)}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="-z-10 object-cover opacity-60 transition duration-700 group-hover:scale-108 group-hover:opacity-75"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-t from-noir via-noir/50 to-transparent" />
          <span className="mb-3 inline-block self-start rounded-full border border-or/40 bg-noir/70 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-or backdrop-blur-md">
            Patrimoine Musical
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-ivoire transition-colors group-hover:text-gold-gradient">
            {genre.name}
          </h2>
          <p className="mt-3 max-w-md text-sm sm:text-base text-beige/90 leading-relaxed font-normal">
            {genre.description}
          </p>
          <div className="mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-or">
            <span>Écouter les musiques d’Afrique</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        <Link
          href={`/food/${food.slug}`}
          className="group relative isolate flex min-h-[32rem] flex-col justify-end overflow-hidden bg-noir p-8 sm:p-14 text-ivoire border-t md:border-t-0 md:border-l border-beige/15"
        >
          <Image
            src={food.image}
            alt={imageAlt(food.name)}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="-z-10 object-cover opacity-60 transition duration-700 group-hover:scale-108 group-hover:opacity-75"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-t from-noir via-noir/50 to-transparent" />
          <span className="mb-3 inline-block self-start rounded-full border border-terre/40 bg-noir/70 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-terre backdrop-blur-md">
            Art Culinaire
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-ivoire transition-colors group-hover:text-gold-gradient">
            {food.name}
          </h2>
          <p className="mt-3 max-w-md text-sm sm:text-base text-beige/90 leading-relaxed font-normal">
            {food.description}
          </p>
          <div className="mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-or">
            <span>Parcourir les cuisines d’Afrique</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </section>
    </>
  );
}

