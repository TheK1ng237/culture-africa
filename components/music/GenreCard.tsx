"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { MusicGenre } from "@/types";
import { imageAlt } from "@/lib/utils";

export function GenreCard({ genre }: { genre: MusicGenre }) {
  return (
    <motion.article whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 24 }} className="h-full">
      <Link href={`/music/${genre.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl bg-noir text-ivoire">
        <div className="relative aspect-[3/2] overflow-hidden">
          <Image src={genre.image} alt={imageAlt(genre.name)} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-2xl group-hover:text-or">{genre.name}</h3>
          <p className="mt-1 text-sm text-beige/70">{genre.origin}, {genre.period}</p>
          <p className="mt-3 line-clamp-3 text-beige/85">{genre.description}</p>
        </div>
      </Link>
    </motion.article>
  );
}
