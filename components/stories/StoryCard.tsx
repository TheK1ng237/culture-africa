"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Story } from "@/types";
import { cn, imageAlt } from "@/lib/utils";

interface StoryCardProps {
  story: Story;
  featured?: boolean;
}

export function StoryCard({ story, featured = false }: StoryCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="h-full"
    >
      <Link
        href={`/stories/${story.slug}`}
        className={cn(
          "group grid h-full gap-6 rounded-3xl border border-beige/15 bg-noir-card p-5 sm:p-6 text-ivoire glow-card transition-all duration-300",
          featured && "md:grid-cols-[1.3fr_1fr] md:items-center md:gap-10 md:p-8",
        )}
      >
        <div className={cn("relative overflow-hidden rounded-2xl bg-noir", featured ? "aspect-[4/3]" : "aspect-[3/2]")}>
          <Image
            src={story.image}
            alt={imageAlt(story.title)}
            fill
            sizes={featured ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
            className="object-cover transition duration-700 group-hover:scale-108"
          />
          <div className="absolute inset-0 bg-linear-to-t from-noir/70 via-transparent to-transparent opacity-60" />
          <span className="absolute top-4 left-4 rounded-full border border-or/30 bg-noir/75 px-3 py-1 text-[11px] font-semibold text-or backdrop-blur-md">
            {story.readingTime} min de lecture
          </span>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-terre">
            {story.category}
          </p>
          <h3
            className={cn(
              "mt-2 font-display font-extrabold leading-tight text-balance text-ivoire transition-colors group-hover:text-gold-gradient",
              featured ? "text-3xl sm:text-4xl md:text-5xl" : "text-2xl",
            )}
          >
            {story.title}
          </h3>
          <p className="mt-3 text-sm sm:text-base text-beige/80 leading-relaxed font-normal">
            {story.excerpt}
          </p>
          <div className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-or">
            <span>Lire le récit complet</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

