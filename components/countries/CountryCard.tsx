"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Country } from "@/types";
import { imageAlt } from "@/lib/utils";

export function CountryCard({ country }: { country: Country }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="h-full"
    >
      <Link
        href={`/countries/${country.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-beige/15 bg-noir-card text-ivoire glow-card"
      >
        <div className="relative aspect-[3/2] overflow-hidden bg-noir">
          <Image
            src={country.image}
            alt={imageAlt(country.name)}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-108"
          />
          <div className="absolute inset-0 bg-linear-to-t from-noir via-transparent to-transparent opacity-80" />
          <span className="absolute left-4 top-4 rounded-full border border-beige/20 bg-noir/75 px-3 py-1 text-lg backdrop-blur-md shadow-md" aria-hidden="true">
            {country.flag}
          </span>
          <span className="absolute right-4 top-4 rounded-full border border-or/30 bg-noir/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-or backdrop-blur-md">
            {country.region}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-2xl font-bold text-ivoire transition-colors group-hover:text-gold-gradient">
            {country.name}
          </h3>
          <p className="mt-1 text-xs font-medium uppercase tracking-wider text-sable">
            Capitale : {country.capital}
          </p>
          <p className="mt-3 line-clamp-3 text-sm text-beige/80 leading-relaxed">
            {country.description}
          </p>
          <div className="mt-auto pt-4 flex flex-wrap gap-1.5 border-t border-beige/10">
            {country.languages.slice(0, 3).map((lang) => (
              <span key={lang} className="inline-block rounded-md border border-beige/15 bg-noir/40 px-2 py-0.5 text-[11px] text-beige/70">
                {lang}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

