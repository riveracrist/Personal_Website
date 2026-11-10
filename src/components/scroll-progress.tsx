"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useState } from "react";
import { ArrowUp } from "lucide-react";

/** Indicador circular de progreso de lectura; al hacer clic vuelve al inicio. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const [visible, setVisible] = useState(false);
  const [pct, setPct] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setVisible(v > 0.04);
    setPct(Math.round(v * 100));
  });

  return (
    <motion.button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
      aria-label={`Volver arriba (${pct}% leído)`}
      initial={false}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.6, pointerEvents: visible ? "auto" : "none" }}
      transition={{ duration: 0.3 }}
      tabIndex={visible ? 0 : -1}
      className="group fixed bottom-5 right-5 z-40 grid size-12 place-items-center rounded-full border border-border bg-surface/80 shadow-lg backdrop-blur-md transition-colors hover:border-accent sm:bottom-8 sm:right-8 sm:size-14"
    >
      <svg viewBox="0 0 48 48" className="absolute inset-0 -rotate-90" aria-hidden>
        <circle cx="24" cy="24" r="21" fill="none" stroke="var(--border)" strokeWidth="2" />
        <motion.circle
          cx="24"
          cy="24"
          r="21"
          fill="none"
          stroke="url(#progress-gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ pathLength: progress }}
        />
        <defs>
          <linearGradient id="progress-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--accent-2)" />
          </linearGradient>
        </defs>
      </svg>
      <span className="font-mono text-[10px] font-medium text-accent transition-all duration-300 group-hover:-translate-y-3 group-hover:opacity-0">
        {pct}%
      </span>
      <ArrowUp aria-hidden className="absolute size-4 translate-y-3 text-accent opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" />
    </motion.button>
  );
}
