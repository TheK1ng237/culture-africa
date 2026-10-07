"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CultureCategory } from "@/types";
import { imageAlt } from "@/lib/utils";

export function CultureCard({ category, className }: { category: CultureCategory; className?: string }) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={className}
    >
      <Link
        href={category.href}
        className="group relative block h-full min-h-[24rem] overflow-hidden rounded-3xl border border-beige/15 bg-noir-card text-ivoire glow-card"
      >
        <Image
          src={category.image}
          alt={imageAlt(category.title)}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover opacity-75 transition duration-700 group-hover:scale-108 group-hover:opacity-95"
        />
        <div className="absolute inset-0 bg-linear-to-t from-noir via-noir/50 to-transparent" />
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-noir/60" />

        {/* Top Badge */}
        <div className="absolute top-5 right-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-or/40 bg-noir/70 text-or backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-or group-hover:text-noir shadow-lg">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>

        {/* Card Content */}
        <div className="absolute inset-x-0 bottom-0 p-7 z-10">
          <h3 className="font-display text-3xl font-extrabold text-ivoire transition-colors group-hover:text-gold-gradient">
            {category.title}
          </h3>
          <p className="mt-2 text-sm text-beige/85 line-clamp-2 leading-relaxed font-normal">
            {category.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5 pt-1">
            {category.highlights.slice(0, 3).map((item) => (
              <span
                key={item}
                className="inline-block rounded-md border border-beige/20 bg-noir/60 px-2.5 py-1 text-[11px] font-semibold text-or backdrop-blur-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

