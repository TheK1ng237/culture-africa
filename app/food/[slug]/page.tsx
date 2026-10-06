import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { foods } from "@/data/foods";
import { getCountries, getFood } from "@/lib/data";
import { imageAlt } from "@/lib/utils";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return foods.map((food) => ({ slug: food.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const food = getFood(slug);
  if (!food) return {};
  return {
    title: food.name,
    description: food.description,
    openGraph: { title: `${food.name} | Culture Africa`, description: food.description },
  };
}

export default async function FoodPage({ params }: { params: Params }) {
  const { slug } = await params;
  const food = getFood(slug);
  if (!food) notFound();
  const countries = getCountries(food.countrySlugs);

  return (
    <>
      <header className="relative isolate overflow-hidden bg-noir text-ivoire">
        <Image src={food.image} alt={imageAlt(food.name)} fill priority sizes="100vw" className="-z-10 object-cover opacity-55" />
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-noir/80 via-noir/30 to-noir" />
        <div className="mx-auto max-w-5xl px-5 pb-16 pt-40 sm:px-8 md:pb-24 md:pt-52">
          <p className="text-or">{food.origin}</p>
          <h1 className="mt-3 font-display text-6xl leading-none md:text-8xl">{food.name}</h1>
          <p className="mt-6 max-w-2xl text-xl text-beige/95">{food.description}</p>
        </div>
      </header>
      <section className="bg-ivoire">
        <div className="mx-auto grid max-w-5xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="font-display text-3xl">Ingrédients</h2>
            <ul className="mt-4 space-y-2 text-noir/85">
              {food.ingredients.map((item) => (<li key={item} className="border-l-2 border-or pl-3">{item}</li>))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-3xl">Histoire</h2>
            <p className="prose-africa mt-4"><span className="block font-display text-[1.1875rem] leading-[1.8] text-[#2b221a]">{food.history}</span></p>
            <h2 className="mt-10 font-display text-3xl">Variantes</h2>
            <p className="prose-africa mt-4"><span className="block font-display text-[1.1875rem] leading-[1.8] text-[#2b221a]">{food.variants}</span></p>
          </div>
        </div>
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-3 px-5 pb-20 sm:px-8">
          <Link href="/food" className="rounded-full bg-noir px-6 py-3 text-ivoire hover:bg-rouge">Toutes les cuisines</Link>
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
