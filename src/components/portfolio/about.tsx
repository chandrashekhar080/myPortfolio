import { Brain, Layers, Users, Rocket } from "lucide-react";
import { profile } from "@/data/portfolio";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

const pillars = [
  {
    icon: Layers,
    title: "Component thinking",
    text: "Reusable, well-typed components and shared layouts that keep large codebases predictable.",
  },
  {
    icon: Brain,
    title: "Problem solving",
    text: "Debugging tricky UI state, API edge cases and performance bottlenecks until the flow feels effortless.",
  },
  {
    icon: Users,
    title: "Teamwork",
    text: "Daily collaboration with backend developers, designers and QA to ship on schedule.",
  },
  {
    icon: Rocket,
    title: "Continuous learning",
    text: "Constantly refining my grasp of the React ecosystem, tooling and modern CSS.",
  },
];

export function About() {
  return (
    <section id="about" className="section-shell">
      <SectionHeading
        eyebrow="About me"
        title="A React developer who cares about how the interface feels"
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal className="space-y-5 text-base leading-relaxed text-muted-foreground">
          <p>
            My name is <span className="font-semibold text-foreground">{profile.name}</span> and I am a
            passionate React.js developer with over two years of experience building responsive,
            scalable and user-friendly web applications.
          </p>
          <p>
            I currently work as a React Developer at{" "}
            <span className="font-semibold text-foreground">{profile.company}</span> in Indore, where I
            have completed one year and continue to work on production-level projects. Day to day I
            build clean UI, reusable components, Redux Toolkit state layers and REST API integrations
            for real users.
          </p>
          <p>
            I have delivered multiple live client projects and admin dashboards — travel management,
            healthcare, business operations and legal consultation platforms — which taught me how to
            handle role-based access, data-heavy tables, and interfaces that must stay fast on every
            device.
          </p>
          <p>
            I enjoy solving layout and state problems, collaborating closely with backend developers
            and designers, and continuously learning whatever the next project needs.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.08}>
              <article className="glass h-full rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-primary-foreground">
                  <pillar.icon className="h-4.5 w-4.5" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pillar.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
