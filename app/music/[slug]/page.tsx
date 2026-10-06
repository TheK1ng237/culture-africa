import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { genres } from "@/data/music";
import { getCountries, getGenre } from "@/lib/data";
import { imageAlt } from "@/lib/utils";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return genres.map((genre) => ({ slug: genre.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const genre = getGenre(slug);
  if (!genre) return {};
  return {
    title: genre.name,
    description: genre.description,
    openGraph: { title: `${genre.name} | Culture Africa`, description: genre.description },
  };
}

export default async function GenrePage({ params }: { params: Params }) {
  const { slug } = await params;
  const genre = getGenre(slug);
  if (!genre) notFound();
  const countries = getCountries(genre.countrySlugs);

  return (
    <>
      <header className="relative isolate overflow-hidden bg-noir text-ivoire">
        <Image src={genre.image} alt={imageAlt(genre.name)} fill priority sizes="100vw" className="-z-10 object-cover opacity-55" />
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-noir/80 via-noir/30 to-noir" />
        <div className="mx-auto max-w-5xl px-5 pb-16 pt-40 sm:px-8 md:pb-24 md:pt-52">
          <p className="text-or">{genre.origin}, {genre.period}</p>
          <h1 className="mt-3 font-display text-6xl leading-none md:text-8xl">{genre.name}</h1>
          <p className="mt-6 max-w-2xl text-xl text-beige/95">{genre.description}</p>
        </div>
      </header>
      <section className="bg-ivoire">
        <div className="mx-auto grid max-w-5xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-3">
          <div>
            <h2 className="font-display text-2xl">Caractéristiques</h2>
            <ul className="mt-3 space-y-2 text-noir/80">
              {genre.characteristics.map((item) => (<li key={item} className="border-l-2 border-or pl-3">{item}</li>))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl">Instruments</h2>
            <ul className="mt-3 space-y-2 text-noir/80">
              {genre.instruments.map((item) => (<li key={item} className="border-l-2 border-or pl-3">{item}</li>))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl">Artistes à écouter</h2>
            <ul className="mt-3 space-y-2 text-noir/80">
              {genre.artists.map((item) => (<li key={item} className="border-l-2 border-or pl-3">{item}</li>))}
            </ul>
          </div>
        </div>
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-4 px-5 pb-20 sm:px-8">
          <Link href="/music#lecteur" className="rounded-full bg-noir px-6 py-3 text-ivoire hover:bg-rouge">Ouvrir le lecteur de démonstration</Link>
          {countries.map((country) => (
            <Link key={country.slug} href={`/countries/${country.slug}`} className="rounded-full border border-noir/25 px-4 py-2 text-sm hover:border-terre hover:text-rouge">
              <span aria-hidden="true">{country.flag} </span>{country.name}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
