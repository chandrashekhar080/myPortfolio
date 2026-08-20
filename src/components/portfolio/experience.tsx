import { Award, Briefcase, Check, GraduationCap } from "lucide-react";
import { certifications, education, experience } from "@/data/portfolio";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

export function Experience() {
  return (
    <section id="experience" className="section-shell">
      <SectionHeading
        eyebrow="Experience"
        title="Learning the stack by shipping on it"
        description="Internships, education and certifications behind my hands-on MERN stack experience."
      />

      <ol className="relative mt-12 space-y-6 border-l border-glass-border pl-6 sm:pl-10">
        {experience.map((job, i) => (
          <li key={`${job.company}-${job.duration}`} className="relative">
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
              <h3 className="font-display text-xl font-bold">Education</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {education.map((item) => (
                  <li
                    key={`${item.degree}-${item.year}`}
                    className="rounded-2xl border border-glass-border bg-secondary/40 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-display text-sm font-bold leading-snug">{item.degree}</p>
                      <span className="shrink-0 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-primary">
                        {item.year}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      {item.institute} · {item.location}
                    </p>
                    <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">
                      Score {item.score}
                    </p>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </li>

        <li className="relative">
          <span className="absolute -left-[1.9rem] top-6 grid h-8 w-8 place-items-center rounded-full bg-gradient-brand text-primary-foreground shadow-glow sm:-left-[3.15rem]">
            <Award className="h-3.5 w-3.5" />
          </span>
          <Reveal delay={(experience.length + 1) * 0.08}>
            <article className="glass rounded-3xl p-6">
              <h3 className="font-display text-xl font-bold">Certifications</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Job-simulation programmes completed with global engineering teams.
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {certifications.map((cert) => (
                  <li
                    key={`${cert.title}-${cert.issuer}`}
                    className="rounded-2xl border border-glass-border bg-secondary/40 p-4"
                  >
                    <p className="font-display text-sm font-bold leading-snug">{cert.title}</p>
                    <p className="mt-1.5 text-sm text-muted-foreground">{cert.issuer}</p>
                    <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-primary">
                      {cert.date}
                    </p>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </li>
      </ol>
    </section>
  );
}
