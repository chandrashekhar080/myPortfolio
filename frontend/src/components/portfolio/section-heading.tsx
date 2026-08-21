import { Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="max-w-2xl">
      <span className="inline-flex items-center gap-2 rounded-full border border-glass-border glass px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary">
        {eyebrow}
      </span>
      <h2 className="mt-5 text-3xl font-bold leading-[1.1] sm:text-4xl md:text-[2.75rem]">{title}</h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </Reveal>
  );
}
