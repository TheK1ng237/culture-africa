"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Country } from "@/types";
import { imageAlt } from "@/lib/utils";

export function CountryCard({ country }: { country: Country }) {
  return (
    <motion.article whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 24 }} className="h-full">
      <Link href={`/countries/${country.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl bg-beige/60 ring-1 ring-noir/10 transition-shadow hover:shadow-xl">
        <div className="relative aspect-[3/2] overflow-hidden bg-noir">
          <Image
            src={country.image}
            alt={imageAlt(country.name)}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 rounded-full bg-ivoire/95 px-3 py-1 text-xl" aria-hidden="true">
            {country.flag}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-2xl group-hover:text-rouge">{country.name}</h3>
          <p className="mt-1 text-sm text-noir/70">
            {country.capital}, {country.region}
          </p>
          <p className="mt-3 line-clamp-3 text-noir/80">{country.description}</p>
          <p className="mt-auto pt-4 text-sm text-rouge">{country.languages.slice(0, 3).join(", ")}</p>
        </div>
      </Link>
    </motion.article>
  );
}
