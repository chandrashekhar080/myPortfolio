import { motion, useReducedMotion } from "motion/react";
import { skillGroups } from "@/data/portfolio";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const reduce = useReducedMotion();

  return (
    <li>
      <div className="flex items-baseline justify-between gap-3">
        <span className="min-w-0 truncate text-sm font-medium">{name}</span>
        <span className="shrink-0 font-mono text-[0.7rem] text-muted-foreground">{level}%</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <motion.div
          className="h-full rounded-full bg-gradient-brand"
          initial={{ width: reduce ? `${level}%` : 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </li>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative section-shell">
      <SectionHeading
        eyebrow="Skills"
        title="The stack I build production interfaces with"
        description="Frontend is where I go deepest, backed by enough backend and database knowledge to integrate confidently."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {skillGroups.map((group, gi) => (
          <Reveal key={group.label} delay={gi * 0.06}>
            <div className="glass h-full rounded-3xl p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-lg font-bold">{group.label}</h3>
                <span className="shrink-0 rounded-full border border-glass-border px-2.5 py-1 font-mono text-[0.65rem] text-muted-foreground">
                  {group.skills.length} skills
                </span>
              </div>
              <ul className="mt-5 space-y-4">
                {group.skills.map((skill, i) => (
                  <SkillBar
                    key={`${group.label}-${skill.name}`}
                    name={skill.name}
                    level={skill.level}
                    delay={i * 0.05}
                  />
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
