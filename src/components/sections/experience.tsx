import { ArrowUpRight } from "lucide-react";
import { experience } from "@/data/profile";
import { SectionHeading } from "../section-heading";
import { RevealGroup, RevealItem } from "../reveal";

export function Experience() {
  return (
    <section id="experiencia" aria-labelledby="experiencia-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="05"
          eyebrow="Experiencia"
          title={<span id="experiencia-title">Liderazgo y trayectoria</span>}
          description="Roles de representación, apoyo académico e investigación desarrollados durante mi formación."
        />
        <RevealGroup className="divide-y divide-border border-y border-border" stagger={0.06}>
          {experience.map((x, i) => (
            <RevealItem key={x.role}>
              <div className="group grid gap-2 py-7 transition-colors sm:grid-cols-[4rem_1fr_auto] sm:items-baseline sm:gap-6 sm:px-4 sm:hover:bg-surface/70">
                <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-tight transition-transform duration-500 ease-out-expo sm:text-xl sm:group-hover:translate-x-1.5">
                    {x.role}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-fg/80">{x.org}</p>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{x.detail}</p>
                </div>
                {"url" in x && x.url ? (
                  <a
                    href={x.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 self-start text-sm font-medium text-accent hover:underline sm:self-center"
                  >
                    Ver sitio <ArrowUpRight aria-hidden className="size-4" />
                    <span className="sr-only">del semillero (pestaña nueva)</span>
                  </a>
                ) : (
                  <span aria-hidden />
                )}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
