import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StoryCard } from "@/components/stories/StoryCard";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { countries } from "@/data/countries";
import { getCountry, getFoods, getGenres, getStories } from "@/lib/data";
import { imageAlt } from "@/lib/utils";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return countries.map((country) => ({ slug: country.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const country = getCountry(slug);
  if (!country) return {};
  return {
    title: country.name,
    description: country.description,
    openGraph: { title: `${country.name} | Culture Africa`, description: country.description },
    twitter: { card: "summary_large_image", title: country.name, description: country.description },
  };
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-display text-2xl">{title}</h3>
      <ul className="mt-3 space-y-2 text-noir/80">
        {items.map((item) => (
          <li key={item} className="border-l-2 border-or pl-3">{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default async function CountryPage({ params }: { params: Params }) {
  const { slug } = await params;
  const country = getCountry(slug);
  if (!country) notFound();
  const stories = getStories(country.storySlugs);
  const foods = getFoods(country.foodSlugs);
  const genres = getGenres(country.musicSlugs);

  return (
    <>
      <header className="relative isolate overflow-hidden bg-noir text-ivoire">
        <Image src={country.image} alt={imageAlt(country.name)} fill priority sizes="100vw" className="-z-10 object-cover opacity-60" />
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-noir/80 via-noir/20 to-noir" />
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-40 sm:px-8 md:pb-24 md:pt-52">
          <p className="text-or">{country.region}</p>
          <h1 className="mt-3 font-display text-6xl leading-none md:text-8xl">
            <span aria-hidden="true">{country.flag} </span>{country.name}
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-beige/95">{country.description}</p>
        </div>
      </header>

      <section className="bg-ivoire" aria-labelledby="titre-presentation">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-[1.6fr_1fr]">
          <Reveal>
            <h2 id="titre-presentation" className="font-display text-4xl">Histoire</h2>
            <p className="prose-africa mt-5"><span className="block max-w-[68ch] font-display text-[1.1875rem] leading-[1.8] text-[#2b221a]">{country.history}</span></p>
          </Reveal>
          <Reveal delay={0.1}>
            <aside aria-label="Repères" className="rounded-2xl bg-beige/70 p-6">
              <dl className="space-y-4">
                <div><dt className="text-sm text-noir/65">Capitale</dt><dd className="font-display text-2xl">{country.capital}</dd></div>
                <div><dt className="text-sm text-noir/65">Région</dt><dd>{country.region}</dd></div>
                <div><dt className="text-sm text-noir/65">Langues</dt><dd>{country.languages.join(", ")}</dd></div>
              </dl>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="bg-beige/50" aria-label="Peuples, langues et traditions">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-3">
          <ListBlock title="Peuples" items={country.peoples} />
          <ListBlock title="Langues" items={country.languages} />
          <ListBlock title="Traditions" items={country.traditions} />
        </div>
      </section>

      <section className="bg-ivoire" aria-label="Musique, gastronomie et arts">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-3">
          <div>
            <ListBlock title="Musique" items={country.music} />
            {genres.length > 0 ? (
              <p className="mt-4 text-sm">
                {genres.map((genre, i) => (
                  <span key={genre.slug}>
                    {i > 0 ? ", " : "Genres liés : "}
                    <Link href={`/music/${genre.slug}`} className="text-rouge underline-offset-4 hover:underline">{genre.name}</Link>
                  </span>
                ))}
              </p>
            ) : null}
          </div>
          <div>
            <ListBlock title="Gastronomie" items={country.gastronomy} />
            {foods.length > 0 ? (
              <p className="mt-4 text-sm">
                {foods.map((food, i) => (
                  <span key={food.slug}>
                    {i > 0 ? ", " : "Fiches : "}
                    <Link href={`/food/${food.slug}`} className="text-rouge underline-offset-4 hover:underline">{food.name}</Link>
                  </span>
                ))}
              </p>
            ) : null}
          </div>
          <div>
            <ListBlock title="Arts" items={country.arts} />
            <p className="mt-4 text-sm"><Link href="/arts" className="text-rouge underline-offset-4 hover:underline">Voir la galerie des arts</Link></p>
          </div>
        </div>
      </section>

      <section className="bg-noir text-ivoire" aria-labelledby="titre-lieux">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <h2 id="titre-lieux" className="font-display text-4xl md:text-5xl">Lieux culturels</h2>
          <Stagger className="mt-10 grid gap-6 md:grid-cols-3">
            {country.places.map((place) => (
              <StaggerItem key={place.name}>
                <article className="h-full rounded-2xl border border-beige/15 p-6">
                  <h3 className="font-display text-2xl text-or">{place.name}</h3>
                  <p className="mt-3 text-beige/85">{place.description}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {stories.length > 0 ? (
        <section className="bg-ivoire" aria-labelledby="titre-recits-associes">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
            <h2 id="titre-recits-associes" className="font-display text-4xl md:text-5xl">Récits associés</h2>
            <ul className="mt-10 grid gap-8 md:grid-cols-3">
              {stories.slice(0, 3).map((story) => (
                <li key={story.id}>
                  <StoryCard story={story} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
