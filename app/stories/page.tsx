import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { StoryCard } from "@/components/stories/StoryCard";
import { Reveal } from "@/components/ui/Reveal";
import { stories } from "@/data/stories";

export const metadata: Metadata = {
  title: "Histoires",
  description: "Des récits culturels pour comprendre les royaumes, les griots, Tombouctou, les textiles et les routes commerciales africaines.",
  openGraph: { title: "Histoires | Culture Africa", description: "Récits culturels sur l’histoire et les traditions africaines." },
};

export default function StoriesPage() {
  const [first, ...others] = stories;
  return (
    <>
      <PageHero
        title="Récits d’Afrique"
        description="Des lectures longues, des citations, des repères chronologiques : prenez le temps d’entrer dans une histoire."
        image="/images/stories/african-kingdoms.svg"
      />
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <Reveal>
          <StoryCard story={first} featured />
        </Reveal>
        <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((story) => (
            <li key={story.id}>
              <Reveal className="h-full">
                <StoryCard story={story} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
