"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Food } from "@/types";
import { imageAlt } from "@/lib/utils";

export function FoodCard({ food }: { food: Food }) {
  return (
    <motion.article whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 24 }} className="h-full">
      <Link href={`/food/${food.slug}`} className="group block h-full overflow-hidden rounded-2xl bg-beige/60 ring-1 ring-noir/10 transition-shadow hover:shadow-xl">
        <div className="relative aspect-square overflow-hidden bg-noir">
          <Image src={food.image} alt={imageAlt(food.name)} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
        </div>
        <div className="p-5">
          <h3 className="font-display text-2xl group-hover:text-rouge">{food.name}</h3>
          <p className="mt-1 text-sm text-rouge">{food.origin}</p>
          <p className="mt-3 line-clamp-3 text-noir/80">{food.description}</p>
        </div>
      </Link>
    </motion.article>
  );
}
