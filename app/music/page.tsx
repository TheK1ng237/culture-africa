import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { GenreCard } from "@/components/music/GenreCard";
import { MockPlayer } from "@/components/music/MockPlayer";
import { Reveal } from "@/components/ui/Reveal";
import { genres } from "@/data/music";

export const metadata: Metadata = {
  title: "Musique",
  description: "Afrobeats, amapiano, highlife, makossa, mbalax, soukous, afro-jazz et musiques traditionnelles.",
  openGraph: { title: "Musique | Culture Africa", description: "Huit familles de musiques africaines à explorer." },
};

export default function MusicPage() {
  return (
    <>
      <PageHero
        title="Musiques d’Afrique"
        description="Du tambour parleur à l’amapiano, huit univers sonores pour comprendre comment le continent s’écoute et se danse."
        image="/images/cultures/music.svg"
      />
      <section className="bg-ivoire" aria-labelledby="titre-genres">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <h2 id="titre-genres" className="font-display text-4xl md:text-5xl">Genres et familles</h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {genres.map((genre) => (
              <li key={genre.id}>
                <Reveal className="h-full">
                  <GenreCard genre={genre} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section id="lecteur" className="scroll-mt-20 bg-beige/50" aria-labelledby="titre-lecteur">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <h2 id="titre-lecteur" className="font-display text-4xl md:text-5xl">Lecteur de démonstration</h2>
          <p className="mt-4 max-w-2xl text-noir/75">Cette interface simule la lecture pour illustrer l’expérience. Aucun fichier audio n’est inclus et aucun service externe n’est utilisé.</p>
          <div className="mt-10">
            <MockPlayer genres={genres} />
          </div>
        </div>
      </section>
    </>
  );
}
