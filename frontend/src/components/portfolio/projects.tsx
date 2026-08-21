import { ExternalLink, Github } from "lucide-react";
import { useContent } from "@/lib/content-context";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { ActionLink } from "./action-button";

export function Projects() {
  const { projects } = useContent();

  return (
    <section id="projects" className="section-shell">
      <SectionHeading
        eyebrow="Projects"
        title="Full-stack builds, front to back"
        description="Client platforms and personal builds — a hiring portal, healthcare and business dashboards, a learning platform, an authenticated admin panel and responsive frontend work."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug ?? project.title} delay={(i % 2) * 0.08}>
            <article className="group glass flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glow">
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.title} interface preview`}
                  width={1024}
                  height={640}
                  loading="lazy"
                  className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-60"
                />
                <span className="absolute left-4 top-4 rounded-full glass-strong px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-primary">
                  {project.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl font-bold">{project.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <ul className="mt-4 space-y-1.5">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-brand" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-glass-border bg-secondary/50 px-2.5 py-1 font-mono text-[0.65rem] text-muted-foreground"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2.5 pt-1">
                  {project.live ? (
                    <ActionLink
                      href={project.live}
                      size="sm"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                    </ActionLink>
                  ) : null}
                  {project.repo ? (
                    <ActionLink
                      href={project.repo}
                      size="sm"
                      variant="outline"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <Github className="h-3.5 w-3.5" /> Source Code
                    </ActionLink>
                  ) : null}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
