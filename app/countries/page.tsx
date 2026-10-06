import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CountriesExplorer } from "@/components/countries/CountriesExplorer";
import { countries } from "@/data/countries";

export const metadata: Metadata = {
  title: "Pays",
  description: "Parcourez des pays africains par région et par langue : capitale, peuples, traditions, musique, gastronomie et arts.",
  openGraph: { title: "Pays | Culture Africa", description: "Découvrez des pays africains par région et par langue." },
};

export default function CountriesPage() {
  return (
    <>
      <PageHero
        title="Pays d’Afrique"
        description="Quatorze portraits de démonstration, répartis sur cinq régions. Filtrez par région ou par langue."
        image="/images/countries/ethiopia.svg"
      />
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20">
        <CountriesExplorer countries={countries} />
      </div>
    </>
  );
}
