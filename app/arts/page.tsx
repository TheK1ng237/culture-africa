import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ArtGallery } from "@/components/arts/ArtGallery";
import { artCategories, artPieces } from "@/data/arts";

export const metadata: Metadata = {
  title: "Arts",
  description: "Textiles, sculptures, bijoux, poteries, architecture, photographie, peinture et artisanat : une galerie immersive.",
  openGraph: { title: "Arts | Culture Africa", description: "Une galerie des arts africains, avec visionneuse." },
};

export default function ArtsPage() {
  return (
    <>
      <PageHero
        title="Arts d’Afrique"
        description="Huit familles de création, de la parure à l’architecture. Ouvrez une œuvre pour la regarder de plus près."
        image="/images/cultures/arts.svg"
      />
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20">
        <ArtGallery pieces={artPieces} categories={artCategories} />
        <p className="mt-12 max-w-2xl text-sm text-noir/65">
          Les visuels de cette version sont des illustrations abstraites générées localement. Elles évoquent les œuvres
          décrites sans les reproduire.
        </p>
      </div>
    </>
  );
}
