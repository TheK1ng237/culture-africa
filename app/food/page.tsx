import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { FoodCard } from "@/components/food/FoodCard";
import { Reveal } from "@/components/ui/Reveal";
import { foods } from "@/data/foods";

export const metadata: Metadata = {
  title: "Gastronomie",
  description: "Ndolé, jollof rice, thiéboudienne, injera, couscous, fufu, bobotie, tajine : huit plats pour entrer dans les cuisines africaines.",
  openGraph: { title: "Gastronomie | Culture Africa", description: "Huit plats, huit histoires, et des variantes à ne pas oublier." },
};

export default function FoodPage() {
  return (
    <>
      <PageHero
        title="Cuisines d’Afrique"
        description="Aucun plat ne représente un pays entier, encore moins un continent. Chaque fiche rappelle ses variantes."
        image="/images/cultures/food.svg"
      />
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {foods.map((food) => (
            <li key={food.id}>
              <Reveal className="h-full">
                <FoodCard food={food} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
