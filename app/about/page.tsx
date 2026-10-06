import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "À propos",
  description: "La mission de Culture Africa : découvrir, transmettre et valoriser la richesse culturelle africaine, dans sa pluralité.",
  openGraph: { title: "À propos | Culture Africa", description: "Mission et principes éditoriaux de Culture Africa." },
};

const principles = [
  { title: "Le pluriel avant tout", text: "Aucune culture n’est homogène. Les fiches rappellent les variantes, les débats et les voix multiples." },
  { title: "Des sources à renforcer", text: "Les textes de cette version sont des contenus de démonstration. Ils sont faits pour être relus, corrigés et enrichis avec des spécialistes et des communautés." },
  { title: "Des images honnêtes", text: "Les visuels sont des illustrations abstraites générées localement, pas des reproductions d’œuvres ou de personnes." },
  { title: "Un prototype autonome", text: "Aucune donnée n’est collectée, aucune API externe n’est appelée. Tout fonctionne en local." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="À propos de Culture Africa"
        description="Une plateforme pour découvrir, transmettre et valoriser la richesse culturelle du continent."
        image="/images/cultures/history.svg"
      />
      <section className="bg-ivoire">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
          <Reveal>
            <p className="font-display text-3xl leading-snug text-balance md:text-4xl">
              Culture Africa réunit pays, récits, musiques, cuisines et arts dans une même expérience, pour que la
              curiosité mène d’un sujet à l’autre.
            </p>
          </Reveal>
          <ul className="mt-16 grid gap-6 md:grid-cols-2">
            {principles.map((principle) => (
              <li key={principle.title} className="rounded-2xl border border-noir/10 bg-beige/50 p-6">
                <h2 className="font-display text-2xl">{principle.title}</h2>
                <p className="mt-3 text-noir/80">{principle.text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-16 flex flex-wrap gap-4">
            <Link href="/countries" className="rounded-full bg-noir px-6 py-3 text-ivoire hover:bg-rouge">Explorer les pays</Link>
            <Link href="/stories" className="rounded-full border border-noir/30 px-6 py-3 hover:border-terre hover:text-rouge">Lire les récits</Link>
          </div>
        </div>
      </section>
    </>
  );
}
