import { ArrowUpRight } from "lucide-react";
import { social } from "@/data/profile";
import { Reveal, RevealGroup, RevealItem } from "../reveal";
import { SocialIcon } from "../icons";

export function Contact() {
  return (
    <section id="contacto" aria-labelledby="contacto-title" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute left-1/2 top-1/2 -z-10 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--glow)] blur-[120px]" aria-hidden />
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
            <span className="text-muted">07</span> · Contacto
          </p>
          <h2 id="contacto-title" className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            ¿Conversamos sobre <span className="text-gradient">tecnología y datos</span>?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Si tienes una pregunta, una idea o quieres colaborar, encuéntrame en mis redes.
          </p>
        </Reveal>
        <RevealGroup className="mx-auto mt-12 grid max-w-2xl gap-4 sm:grid-cols-2">
          {social.map((s) => (
            <RevealItem key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-glow group flex items-center gap-4 p-5 text-left transition-transform duration-500 ease-out-expo hover:-translate-y-1"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-fg text-bg transition-transform duration-500 ease-out-expo group-hover:scale-110 group-hover:rotate-[-6deg]">
                  <SocialIcon name={s.icon} className="size-5" />
                </span>
                <span className="flex-1">
                  <span className="block font-display font-semibold">{s.label}</span>
                  <span className="block font-mono text-sm text-muted">{s.handle}</span>
                </span>
                <ArrowUpRight aria-hidden className="size-5 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                <span className="sr-only">(pestaña nueva)</span>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
