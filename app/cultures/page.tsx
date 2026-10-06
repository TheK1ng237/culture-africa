import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CultureCard } from "@/components/cards/CultureCard";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { cultureCategories, languageFamilies, traditions } from "@/data/cultures";

export const metadata: Metadata = {
  title: "Cultures",
  description: "Traditions, arts, musique, gastronomie, langues et histoire : six façons d’explorer les cultures africaines.",
  openGraph: { title: "Cultures | Culture Africa", description: "Six façons d’explorer les cultures africaines." },
};

export default function CulturesPage() {
  return (
    <>
      <PageHero
        title="Des cultures, au pluriel"
        description="Traditions, arts, musique, gastronomie, langues, histoire : choisissez une porte d’entrée et suivez le fil."
        image="/images/cultures/traditions.svg"
      />

      <section className="bg-ivoire" aria-label="Catégories">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <Stagger className="grid gap-5 md:grid-cols-3">
            {cultureCategories.map((category) => (
              <StaggerItem key={category.id}>
                <CultureCard category={category} className="h-full" />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="traditions" className="scroll-mt-20 bg-beige/50" aria-labelledby="titre-traditions">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
          <Reveal>
            <h2 id="titre-traditions" className="font-display text-4xl md:text-5xl">Traditions</h2>
            <p className="mt-4 max-w-2xl text-noir/75">Quelques pratiques vivantes, choisies pour montrer la diversité des formes de célébration, de transmission et de vie en commun.</p>
          </Reveal>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {traditions.map((tradition) => (
              <StaggerItem key={tradition.id}>
                <article className="h-full rounded-2xl border border-noir/10 bg-ivoire p-6">
                  <h3 className="font-display text-2xl">{tradition.title}</h3>
                  <p className="mt-1 text-sm text-rouge">{tradition.origin}</p>
                  <p className="mt-3 text-noir/80">{tradition.description}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="langues" className="scroll-mt-20 bg-noir text-ivoire" aria-labelledby="titre-langues">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
          <Reveal>
            <h2 id="titre-langues" className="font-display text-4xl md:text-5xl">Langues</h2>
            <p className="mt-4 max-w-2xl text-beige/80">Les estimations dépassent deux mille langues. Voici de grands ensembles, présentés de manière simplifiée.</p>
          </Reveal>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {languageFamilies.map((family) => (
              <StaggerItem key={family.id}>
                <article className="h-full rounded-2xl border border-beige/15 p-6">
                  <h3 className="font-display text-2xl text-or">{family.name}</h3>
                  <p className="mt-1 text-sm text-beige/70">{family.region}</p>
                  <p className="mt-3 text-beige/85">{family.description}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
