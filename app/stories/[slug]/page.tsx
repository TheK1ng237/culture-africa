import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReadingProgress } from "@/components/stories/ReadingProgress";
import { StoryCard } from "@/components/stories/StoryCard";
import { Timeline } from "@/components/stories/Timeline";
import { Reveal } from "@/components/ui/Reveal";
import { stories } from "@/data/stories";
import { getCountries, getStory, getStories } from "@/lib/data";
import { imageAlt } from "@/lib/utils";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return {};
  return {
    title: story.title,
    description: story.excerpt,
    openGraph: { title: `${story.title} | Culture Africa`, description: story.excerpt, type: "article" },
    twitter: { card: "summary_large_image", title: story.title, description: story.excerpt },
  };
}

export default async function StoryPage({ params }: { params: Params }) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();
  const related = getStories(story.related);
  const countries = getCountries(story.countries);

  return (
    <>
      <ReadingProgress />
      <header className="relative isolate overflow-hidden bg-noir text-ivoire">
        <Image src={story.image} alt={imageAlt(story.title)} fill priority sizes="100vw" className="-z-10 object-cover opacity-55" />
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-noir/80 via-noir/30 to-noir" />
        <div className="mx-auto max-w-4xl px-5 pb-16 pt-40 sm:px-8 md:pb-24 md:pt-52">
          <p className="text-or">{story.category}, {story.readingTime} min de lecture</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] text-balance md:text-7xl">{story.title}</h1>
          <p className="mt-8 max-w-2xl font-sans text-xl leading-relaxed text-beige/95 md:text-2xl">{story.intro}</p>
        </div>
      </header>

      <article className="bg-ivoire">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 md:py-24">
          {story.sections.map((section, sectionIndex) => (
            <section key={section.heading} className="mb-16" aria-labelledby={`section-${sectionIndex}`}>
              <Reveal>
                <h2 id={`section-${sectionIndex}`} className="font-display text-3xl text-balance md:text-4xl">
                  {section.heading}
                </h2>
              </Reveal>
              <div className="prose-africa mt-6 space-y-5">
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex}>{paragraph}</p>
                ))}
              </div>
              {section.quote ? (
                <Reveal>
                  <blockquote className="my-10 border-l-4 border-or pl-6">
                    <p className="font-display text-2xl leading-snug text-rouge md:text-3xl">« {section.quote.text} »</p>
                    <footer className="mt-3 text-sm text-noir/70">{section.quote.author}</footer>
                  </blockquote>
                </Reveal>
              ) : null}
              {section.image ? (
                <Reveal>
                  <figure className="my-10">
                    <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-noir">
                      <Image src={section.image.src} alt={section.image.alt} fill sizes="(min-width: 768px) 48rem, 100vw" className="object-cover" />
                    </div>
                    <figcaption className="mt-3 text-sm text-noir/70">{section.image.caption}</figcaption>
                  </figure>
                </Reveal>
              ) : null}
            </section>
          ))}

          {story.timeline ? (
            <section className="mt-8" aria-labelledby="titre-chronologie">
              <h2 id="titre-chronologie" className="mb-8 font-display text-3xl md:text-4xl">Repères chronologiques</h2>
              <Timeline events={story.timeline} />
            </section>
          ) : null}

          {countries.length > 0 ? (
            <section className="mt-16" aria-labelledby="titre-pays-lies">
              <h2 id="titre-pays-lies" className="font-display text-2xl">Pays concernés</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {countries.map((country) => (
                  <li key={country.slug}>
                    <Link href={`/countries/${country.slug}`} className="inline-block rounded-full border border-noir/25 px-4 py-1.5 text-sm hover:border-terre hover:text-rouge">
                      <span aria-hidden="true">{country.flag} </span>{country.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </article>

      {related.length > 0 ? (
        <section className="bg-beige/50" aria-labelledby="titre-similaires">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
            <h2 id="titre-similaires" className="font-display text-4xl">Articles similaires</h2>
            <ul className="mt-10 grid gap-8 md:grid-cols-3">
              {related.map((item) => (
                <li key={item.id}>
                  <StoryCard story={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
