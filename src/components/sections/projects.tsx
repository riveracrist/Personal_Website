import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/profile";
import { SectionHeading } from "../section-heading";
import { Reveal, RevealGroup, RevealItem } from "../reveal";
import { GithubIcon } from "../icons";

type Project = (typeof projects)[number];

function Tags({ tags }: { tags: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Tecnologías">
      {tags.map((t) => (
        <li key={t} className="rounded-full border border-border bg-surface-2 px-2.5 py-1 font-mono text-[11px] font-medium text-muted">
          {t}
        </li>
      ))}
    </ul>
  );
}

function ProjectCard({ p, featured = false }: { p: Project; featured?: boolean }) {
  return (
    <article
      className={`card card-glow group relative flex h-full flex-col overflow-hidden transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-accent/10 ${
        featured ? "lg:grid lg:grid-cols-[1.35fr_1fr]" : ""
      }`}
    >
      <div className={`relative overflow-hidden border-b border-border bg-surface-2 ${featured ? "aspect-[16/9] lg:aspect-auto lg:border-b-0 lg:border-r" : "aspect-[16/9]"}`}>
        <Image
          src={p.image}
          alt={`Captura del proyecto ${p.title}`}
          fill
          sizes={featured ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
      </div>
      <div className={`flex flex-1 flex-col gap-4 p-6 ${featured ? "lg:justify-center lg:p-10" : ""}`}>
        {featured ? <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Proyecto destacado</p> : null}
        <h3 className={`font-display font-semibold tracking-tight ${featured ? "text-2xl sm:text-3xl" : "text-xl"}`}>
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {p.title}
          </a>
        </h3>
        <p className="text-sm leading-relaxed text-muted sm:text-[15px]">{p.description}</p>
        <div className="mt-auto flex items-end justify-between gap-4 pt-2">
          <Tags tags={p.tags} />
          <span
            aria-hidden
            className="grid size-10 shrink-0 place-items-center rounded-full border border-border transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-transparent group-hover:bg-accent-solid group-hover:text-accent-fg"
          >
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
      <span className="sr-only">(abre en una pestaña nueva)</span>
    </article>
  );
}

export function Projects() {
  const [featured, ...rest] = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured));
  return (
    <section id="proyectos" aria-labelledby="proyectos-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          eyebrow="Proyectos"
          title={<span id="proyectos-title">Proyectos personales</span>}
          description="Dashboards, aplicaciones y documentos interactivos construidos principalmente con R, Shiny, Quarto y Arduino."
        />
        <Reveal className="mb-6">
          <ProjectCard p={featured} featured />
        </Reveal>
        <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <RevealItem key={p.title} className="h-full">
              <ProjectCard p={p} />
            </RevealItem>
          ))}
          <RevealItem className="h-full">
            <a
              href="https://github.com/riveracrist"
              target="_blank"
              rel="noopener noreferrer"
              className="card group relative flex h-full min-h-64 flex-col justify-between overflow-hidden border-dashed p-7 transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-solid hover:border-accent"
            >
              <span aria-hidden className="absolute -right-16 -top-16 size-48 rounded-full bg-[var(--glow)] blur-3xl transition-transform duration-700 group-hover:scale-150" />
              <span className="relative grid size-12 place-items-center rounded-xl bg-fg text-bg transition-transform duration-500 ease-out-expo group-hover:rotate-[-8deg] group-hover:scale-110">
                <GithubIcon className="size-6" />
              </span>
              <span className="relative">
                <span className="block font-display text-xl font-semibold tracking-tight">Más en GitHub</span>
                <span className="mt-2 block text-sm leading-relaxed text-muted">Explora otros repositorios y experimentos en mi perfil.</span>
                <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-sm text-accent">
                  github.com/riveracrist
                  <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </span>
              <span className="sr-only">(pestaña nueva)</span>
            </a>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
