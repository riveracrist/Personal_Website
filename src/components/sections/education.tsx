import Image from "next/image";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import { certifications, education } from "@/data/profile";
import { SectionHeading } from "../section-heading";
import { Reveal, RevealGroup, RevealItem } from "../reveal";
import { SpotlightCard } from "../spotlight-card";

export function Education() {
  return (
    <section id="formacion" aria-labelledby="formacion-title" className="theme-fade relative border-y border-border bg-surface/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          eyebrow="Formación académica"
          title={<span id="formacion-title">Educación y certificaciones</span>}
        />

        {/* Línea de tiempo */}
        <ol className="relative ml-3 border-l border-border sm:ml-4">
          {education.map((e, i) => (
            <li key={e.title} className="relative pb-12 pl-8 last:pb-0 sm:pl-12">
              <span
                aria-hidden
                className={`absolute -left-[13px] top-1 grid size-6 place-items-center rounded-full border ${
                  e.status === "current" ? "border-accent bg-bg" : "border-border bg-bg"
                }`}
              >
                <span className={`size-2.5 rounded-full ${e.status === "current" ? "bg-accent" : "bg-muted/50"}`} />
                {e.status === "current" ? <span className="absolute inset-0 animate-pulse-ring rounded-full border border-accent" /> : null}
              </span>
              <Reveal delay={i * 0.05}>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{e.date}</p>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-tight sm:text-2xl">{e.title}</h3>
                <a
                  href={e.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline mt-1 inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg"
                >
                  <GraduationCap aria-hidden className="size-4" />
                  {e.school}
                </a>
                <div className="mt-4 max-w-2xl">
                  <p className="mb-2 text-sm font-medium">Actividades extracurriculares</p>
                  <ul className="space-y-1.5 text-sm leading-relaxed text-muted">
                    {e.activities.map((a) => (
                      <li key={a} className="flex gap-2.5">
                        <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent/70" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* Formación complementaria */}
        <div className="mt-24">
          <Reveal>
            <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Formación complementaria</h3>
            <p className="mt-3 max-w-2xl text-muted">Cursos y certificaciones en datos, nube, inteligencia artificial y programación.</p>
          </Reveal>
          <RevealGroup className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
            {certifications.map((c, i) => (
              <RevealItem
                key={c.provider}
                // 5 tarjetas: 3 arriba (2/6 c/u) y 2 abajo (3/6 c/u) en escritorio; la última ocupa 2 columnas en tableta
                className={`h-full ${i < 3 ? "lg:col-span-2" : "lg:col-span-3"} ${i === certifications.length - 1 && certifications.length % 2 ? "md:col-span-2 lg:col-span-3" : ""}`}
              >
                <SpotlightCard className="flex h-full flex-col p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="font-display text-lg font-semibold leading-snug">{c.provider}</h4>
                  </div>
                  <ul className="mt-4 space-y-2.5 text-sm">
                    {c.courses.map((course) => (
                      <li key={course.name} className="flex gap-2.5 leading-snug">
                        <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gradient-to-r from-accent to-accent-2" />
                        {course.url ? (
                          <a
                            href={course.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/link inline-flex items-start gap-1 text-fg/90 transition-colors hover:text-accent"
                          >
                            <span className="link-underline">{course.name}</span>
                            <ArrowUpRight aria-hidden className="mt-0.5 size-3.5 shrink-0 opacity-50 transition-all group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:opacity-100" />
                            <span className="sr-only">(ver certificado o descripción, pestaña nueva)</span>
                          </a>
                        ) : (
                          <span className="text-fg/90">{course.name}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                  {c.badges.length ? (
                    <ul className="mt-auto flex flex-wrap gap-3 pt-6">
                      {c.badges.map((b) => (
                        <li key={b.src} className="rounded-xl bg-white p-1.5 shadow-sm ring-1 ring-border transition-transform duration-500 ease-out-expo hover:-translate-y-1 hover:rotate-3">
                          <Image src={b.src} alt={b.alt} width={56} height={56} className="size-12 object-contain sm:size-14" />
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </SpotlightCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
