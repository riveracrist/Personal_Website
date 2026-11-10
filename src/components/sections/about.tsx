import { about } from "@/data/profile";
import { SectionHeading } from "../section-heading";
import { Reveal, RevealGroup, RevealItem } from "../reveal";
import { SpotlightCard } from "../spotlight-card";
import { TopicIcon } from "../icons";

export function About() {
  return (
    <section id="sobre-mi" aria-labelledby="sobre-mi-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="01"
          eyebrow="Sobre mí"
          title={
            <span id="sobre-mi-title">
              Curiosidad por los datos, <span className="text-gradient">el software y el hardware</span>
            </span>
          }
        />

        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <Reveal className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            {about.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "text-lg font-medium leading-relaxed text-fg sm:text-xl" : ""}>
                {p}
              </p>
            ))}
          </Reveal>

          <RevealGroup className="grid gap-4">
            {about.focus.map((f) => (
              <RevealItem key={f.title}>
                <SpotlightCard className="p-5 transition-transform duration-500 ease-out-expo hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent/15 to-accent-2/15 text-accent">
                      <TopicIcon name={f.icon} className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{f.text}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal className="mt-16">
          <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-muted">Otros intereses</h3>
          <ul className="flex flex-wrap gap-2.5">
            {about.interests.map((it) => (
              <li
                key={it}
                className="cursor-default rounded-full border border-border bg-surface px-4 py-2 text-sm transition duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                {it}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
