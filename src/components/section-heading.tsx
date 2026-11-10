import { Reveal } from "./reveal";

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <Reveal className="mb-10 max-w-3xl sm:mb-14">
      <p className="mb-4 flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
        <span className="text-muted">{index}</span>
        <span aria-hidden className="h-px w-8 bg-accent/60" />
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-balance sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? <p className="mt-5 text-base leading-relaxed text-muted text-pretty sm:text-lg">{description}</p> : null}
    </Reveal>
  );
}
