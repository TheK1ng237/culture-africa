"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1" role="progressbar" aria-label="Progression de lecture" aria-hidden="true">
      <motion.div className="h-full origin-left bg-or" style={{ scaleX }} />
    </div>
  );
}
