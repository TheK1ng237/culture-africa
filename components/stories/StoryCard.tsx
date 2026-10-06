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
    <motion.article whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 24 }} className="h-full">
      <Link href={`/stories/${story.slug}`} className={cn("group grid h-full gap-5", featured && "md:grid-cols-[1.3fr_1fr] md:items-center md:gap-10")}>
        <div className={cn("relative overflow-hidden rounded-2xl bg-noir", featured ? "aspect-[4/3]" : "aspect-[3/2]")}>
          <Image
            src={story.image}
            alt={imageAlt(story.title)}
            fill
            sizes={featured ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        </div>
        <div>
          <p className="text-sm text-rouge">
            {story.category}, {story.readingTime} min de lecture
          </p>
          <h3 className={cn("mt-2 font-display leading-tight text-balance group-hover:text-rouge", featured ? "text-4xl md:text-5xl" : "text-2xl")}>
            {story.title}
          </h3>
          <p className="mt-3 text-noir/75">{story.excerpt}</p>
        </div>
      </Link>
    </motion.article>
  );
}
