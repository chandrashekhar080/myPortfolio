import { Briefcase, Check, GraduationCap } from "lucide-react";
import { education, experience } from "@/data/portfolio";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

export function Experience() {
  return (
    <section id="experience" className="section-shell">
      <SectionHeading
        eyebrow="Experience"
        title="Shipping production React, every sprint"
        description="A timeline of the work behind my 2+ years in frontend development, from my B.Tech to production React."
      />

      <ol className="relative mt-12 space-y-6 border-l border-glass-border pl-6 sm:pl-10">
        {experience.map((job, i) => (
          <li key={job.company} className="relative">
            <span className="absolute -left-[1.9rem] top-6 grid h-8 w-8 place-items-center rounded-full bg-gradient-brand text-primary-foreground shadow-glow sm:-left-[3.15rem]">
              <Briefcase className="h-3.5 w-3.5" />
            </span>
            <Reveal delay={i * 0.08}>
              <article className="glass rounded-3xl p-6">
                <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="truncate font-display text-xl font-bold">{job.role}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {job.company} · {job.location}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-glass-border bg-secondary/50 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-primary">
                    {job.duration}
                  </span>
                </header>
                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {job.responsibilities.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        ))}

        <li className="relative">
          <span className="absolute -left-[1.9rem] top-6 grid h-8 w-8 place-items-center rounded-full bg-gradient-brand text-primary-foreground shadow-glow sm:-left-[3.15rem]">
            <GraduationCap className="h-3.5 w-3.5" />
          </span>
          <Reveal delay={experience.length * 0.08}>
            <article className="glass rounded-3xl p-6">
              <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-bold">{education.degree}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {education.institute} · {education.location}
                  </p>
                </div>
                <span className="shrink-0 rounded-full border border-glass-border bg-secondary/50 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-primary">
                  {education.year}
                </span>
              </header>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Built a strong interest in web development during my degree, which led me straight into
                the software industry after graduating.
              </p>
            </article>
          </Reveal>
        </li>
      </ol>
    </section>
  );
}
