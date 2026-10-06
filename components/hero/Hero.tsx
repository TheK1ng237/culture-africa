"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE } from "@/lib/motion";

const LAYERS = [
  { src: "/images/hero/sky.svg", from: "0%", to: "8%" },
  { src: "/images/hero/far.svg", from: "0%", to: "14%" },
  { src: "/images/hero/mid.svg", from: "0%", to: "22%" },
  { src: "/images/hero/near.svg", from: "0%", to: "32%" },
  { src: "/images/hero/ground.svg", from: "0%", to: "40%" },
];

const LINES = ["L’Afrique.", "Mille histoires.", "Une identité."];

function ParallaxLayer({
  src,
  from,
  to,
  progress,
}: {
  src: string;
  from: string;
  to: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const y = useTransform(progress, [0, 1], [from, to]);
  return (
    <motion.div
      className="absolute -inset-x-4 -top-8 bottom-0 will-change-transform"
      style={{ y }}
    >
      <Image
        src={src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-bottom"
      />
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate min-h-[100svh] overflow-hidden bg-noir text-ivoire"
      aria-label="Introduction"
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {LAYERS.map((layer) => (
          <ParallaxLayer
            key={layer.src}
            {...layer}
            progress={scrollYProgress}
          />
        ))}
      </div>
      <div
        className="absolute inset-0 -z-10 bg-linear-to-r from-noir/75 via-noir/20 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-linear-to-t from-noir to-transparent"
        aria-hidden="true"
      />

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-24 pt-40 sm:px-8 md:pb-32"
      >
        <h1 className="font-display text-[clamp(3rem,10vw,8.5rem)] leading-[0.95]">
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className={i === 1 ? "block pl-[6vw] text-sable" : "block"}
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1.1,
                  delay: 0.25 + i * 0.18,
                  ease: EASE,
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-8 max-w-xl text-lg text-beige/95 md:text-xl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: EASE }}
        >
          Explorez les cultures, les traditions, les peuples et les histoires
          qui façonnent le continent africain.
        </motion.p>

        <motion.div
          className="mt-9 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.15, ease: EASE }}
        >
          <Link
            href="/cultures"
            className="rounded-full bg-or px-7 py-3.5 font-medium text-noir transition-colors hover:bg-ocre"
          >
            Explorer les cultures
          </Link>
          <Link
            href="/stories"
            className="rounded-full border border-beige/50 px-7 py-3.5 font-medium text-ivoire transition-colors hover:border-or hover:text-or"
          >
            Découvrir les récits
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
