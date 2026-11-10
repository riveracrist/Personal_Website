"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { site, social, skills } from "@/data/profile";
import { NetworkCanvas } from "../network-canvas";
import { SocialIcon } from "../icons";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Revela el texto palabra por palabra con una máscara (efecto "subir desde abajo"). */
function SplitWords({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: delay + i * 0.07, ease: EASE }}
          >
            {word}
            {" "}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

const orbitA = ["R", "Python", "SQL"];
const orbitB = ["Arduino", "Shiny", "C++", "Cloud"];

function OrbitVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[26rem]" aria-hidden>
      {/* Halo */}
      <div className="absolute inset-[18%] rounded-full bg-gradient-to-br from-accent/30 to-accent-2/30 blur-3xl" />
      {/* Anillos */}
      <div className="absolute inset-0 rounded-full border border-dashed border-border" />
      <div className="absolute inset-[16%] rounded-full border border-border" />
      <div className="absolute inset-[32%] rounded-full border border-dashed border-border" />

      {/* Órbita exterior */}
      <div className="animate-orbit absolute inset-0">
        {orbitB.map((label, i) => {
          const angle = (i / orbitB.length) * Math.PI * 2;
          return (
            <span
              key={label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${50 + 50 * Math.cos(angle)}%`, top: `${50 + 50 * Math.sin(angle)}%` }}
            >
              <span className="animate-orbit-reverse block rounded-full border border-border bg-surface/90 px-3 py-1.5 font-mono text-xs font-medium shadow-sm backdrop-blur">
                {label}
              </span>
            </span>
          );
        })}
      </div>
      {/* Órbita interior */}
      <div className="animate-orbit-inner absolute inset-[16%]">
        {orbitA.map((label, i) => {
          const angle = (i / orbitA.length) * Math.PI * 2 + 0.6;
          return (
            <span
              key={label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${50 + 50 * Math.cos(angle)}%`, top: `${50 + 50 * Math.sin(angle)}%` }}
            >
              <span className="animate-orbit-inner-reverse block rounded-full bg-gradient-to-r from-accent to-accent-2 px-3 py-1.5 font-mono text-xs font-semibold text-white shadow-lg shadow-accent/25">
                {label}
              </span>
            </span>
          );
        })}
      </div>

      {/* Núcleo */}
      <div className="animate-float-slow absolute inset-[36%] grid place-items-center">
        <span className="absolute inset-0 animate-pulse-ring rounded-[2rem] border-2 border-accent/40" />
        <div className="relative grid size-full place-items-center rounded-[2rem] bg-gradient-to-br from-accent to-accent-2 font-display text-4xl font-bold text-white shadow-2xl shadow-accent/30 sm:text-5xl">
          {site.initials}
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yVisual = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const marquee = Array.from(new Set(skills.flatMap((s) => s.items)));

  return (
    <section ref={ref} id="inicio" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-16">
      {/* Fondo */}
      <div className="bg-grid absolute inset-0 -z-20" aria-hidden />
      <NetworkCanvas className="absolute inset-0 -z-10 size-full opacity-70" />
      <div className="absolute -right-32 -top-32 -z-10 size-[28rem] rounded-full bg-[var(--glow)] blur-[110px]" aria-hidden />
      <div className="absolute -bottom-40 -left-32 -z-10 size-[26rem] rounded-full bg-[var(--glow-2)] blur-[110px]" aria-hidden />

      <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1.25fr_1fr] lg:gap-8 lg:py-20">
        <motion.div style={{ y: yText, opacity: fade }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/70 px-4 py-1.5 text-xs font-medium text-muted backdrop-blur sm:text-sm"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            {site.role}
          </motion.p>

          <h1 id="hero-title" className="font-display text-[2.6rem] font-bold leading-[1.02] tracking-tight text-balance min-[400px]:text-5xl sm:text-6xl lg:text-7xl">
            <SplitWords text="Hola, soy" className="block text-muted" />
            <SplitWords text="Cristian Rivera G." className="block" delay={0.15} />
            <motion.span
              className="text-gradient mt-2 block text-[0.62em] leading-tight"
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.6, ease: EASE }}
            >
              {site.headline}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted text-pretty sm:text-lg"
          >
            Aprendiz de Ingeniería de Telecomunicaciones (UdeA) y de Análisis y Desarrollo de Software (SENA).{" "}
            {site.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link
              href="#proyectos"
              className="group inline-flex items-center gap-2 rounded-full bg-accent-solid px-6 py-3.5 text-sm font-semibold text-accent-fg shadow-lg shadow-accent/25 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/35 active:translate-y-0"
            >
              Ver proyectos
              <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="#sobre-mi"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-6 py-3.5 text-sm font-semibold backdrop-blur transition hover:-translate-y-0.5 hover:border-accent hover:text-accent active:translate-y-0"
            >
              Conóceme
            </Link>
            <ul className="ml-1 flex items-center gap-2" aria-label="Redes sociales">
              {social.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} (${s.handle})`}
                    className="grid size-11 place-items-center rounded-full text-muted transition hover:-translate-y-0.5 hover:bg-surface-2 hover:text-fg"
                  >
                    <SocialIcon name={s.icon} className="size-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: yVisual }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
          className="px-6 sm:px-14 lg:px-0"
        >
          <OrbitVisual />
        </motion.div>
      </div>

      {/* Franja de tecnologías */}
      <div className="marquee relative border-y border-border bg-surface/60 py-4 backdrop-blur">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg to-transparent sm:w-32" aria-hidden />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent sm:w-32" aria-hidden />
        <p className="sr-only">Tecnologías: {marquee.join(", ")}</p>
        <div className="flex overflow-hidden" aria-hidden>
          <div className="animate-marquee flex shrink-0 gap-10 pr-10">
            {[...marquee, ...marquee].map((t, i) => (
              <span key={i} className="flex items-center gap-3 whitespace-nowrap font-mono text-sm text-muted">
                <span className="size-1.5 rounded-full bg-gradient-to-r from-accent to-accent-2" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <a
        href="#sobre-mi"
        aria-label="Desplazarse a Sobre mí"
        className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-muted transition hover:text-fg lg:flex"
      >
        <ArrowDown className="size-4 animate-bounce motion-reduce:animate-none" aria-hidden />
      </a>
    </section>
  );
}
