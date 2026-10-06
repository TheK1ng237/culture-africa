"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CultureCategory } from "@/types";
import { imageAlt } from "@/lib/utils";

export function CultureCard({ category, className }: { category: CultureCategory; className?: string }) {
  return (
    <motion.article whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 24 }} className={className}>
      <Link href={category.href} className="group relative block h-full min-h-[22rem] overflow-hidden rounded-2xl bg-noir text-ivoire">
        <Image
          src={category.image}
          alt={imageAlt(category.title)}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-linear-to-t from-noir via-noir/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <h3 className="font-display text-3xl">{category.title}</h3>
          <p className="mt-2 max-w-sm text-beige/90">{category.description}</p>
          <p className="mt-4 text-sm text-or transition-transform duration-300 group-hover:translate-x-1">
            {category.highlights.join(", ")}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
