import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

interface PageHeroProps {
  title: string;
  description?: string;
  image: string;
  children?: ReactNode;
}

export function PageHero({ title, description, image, children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-noir text-ivoire">
      <Image src={image} alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-50" />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-noir/80 via-noir/30 to-noir" />
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-36 sm:px-8 md:pb-24 md:pt-48">
        <Reveal>
          <h1 className="max-w-4xl font-display text-5xl leading-[1.02] text-balance sm:text-6xl md:text-7xl">{title}</h1>
        </Reveal>
        {description ? (
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg text-beige/90 md:text-xl">{description}</p>
          </Reveal>
        ) : null}
        {children ? (
          <Reveal delay={0.2}>
            <div className="mt-8">{children}</div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
