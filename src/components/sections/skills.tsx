import { skills } from "@/data/profile";
import { SectionHeading } from "../section-heading";
import { RevealGroup, RevealItem } from "../reveal";
import { SpotlightCard } from "../spotlight-card";
import { TopicIcon } from "../icons";

export function Skills() {
  return (
    <section id="habilidades" aria-labelledby="habilidades-title" className="theme-fade relative border-y border-border bg-surface/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          eyebrow="Habilidades"
          title={<span id="habilidades-title">Herramientas con las que construyo</span>}
          description="Lenguajes, plataformas y tecnologías que he utilizado en mis proyectos, cursos y formación."
        />
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((g) => (
            <RevealItem key={g.group} className="h-full">
              <SpotlightCard className="h-full p-6">
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-white shadow-md shadow-accent/20 transition-transform duration-500 ease-out-expo group-hover/spot:rotate-[-8deg] group-hover/spot:scale-110">
                    <TopicIcon name={g.icon} className="size-5" />
                  </span>
                  <h3 className="font-display text-lg font-semibold">{g.group}</h3>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li key={s} className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 font-mono text-xs font-medium sm:text-[13px]">
                      {s}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
