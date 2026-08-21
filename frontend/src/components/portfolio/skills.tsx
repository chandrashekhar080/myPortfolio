import { motion, useReducedMotion } from "motion/react";
import { Code2, Database, MonitorSmartphone, Server, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useContent } from "@/lib/content-context";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

type GroupMeta = { icon: LucideIcon; blurb: string };

// Groups the admin adds under a new name still need an icon and a blurb.
const fallbackMeta: GroupMeta = {
  icon: Code2,
  blurb: "Tools and technologies I work with day to day.",
};

const groupMeta: Record<string, GroupMeta> = {
  Frontend: {
    icon: MonitorSmartphone,
    blurb: "The layer users actually touch — React, Next.js and modern CSS.",
  },
  Backend: {
    icon: Server,
    blurb: "Node and Express APIs, auth and real-time connections.",
  },
  Database: {
    icon: Database,
    blurb: "Modelling and querying data across NoSQL and SQL.",
  },
  Tools: {
    icon: Wrench,
    blurb: "The daily workflow around writing, testing and shipping code.",
  },
};

function SkillChip({ name, level, delay }: { name: string; level: number; delay: number }) {
  const reduce = useReducedMotion();

  return (
    <li className="relative overflow-hidden rounded-xl border border-glass-border bg-secondary/40 px-3.5 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/45 hover:shadow-glow">
      <div className="flex items-baseline gap-2.5">
        <span className="text-sm font-medium">{name}</span>
        <span className="font-mono text-[0.65rem] text-muted-foreground">{level}</span>
      </div>
      <span aria-hidden className="absolute inset-x-0 bottom-0 block h-[2px] bg-background/60">
        <motion.span
          className="block h-full bg-gradient-brand"
          initial={{ width: reduce ? `${level}%` : 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </span>
    </li>
  );
}

export function Skills() {
  const { skillGroups } = useContent();

  return (
    <section id="skills" className="relative section-shell">
      <SectionHeading
        eyebrow="Skills"
        title="The MERN stack, end to end"
        description="React and Next.js on the surface, Node and Express underneath, MongoDB and SQL behind them — plus the tooling that ships it all."
      />

      <div className="glass mt-12 overflow-hidden rounded-3xl">
        {skillGroups.map((group, gi) => {
          const meta = groupMeta[group.label] ?? fallbackMeta;

          return (
            <Reveal key={group.label} delay={gi * 0.06}>
              <div
                className={`grid gap-4 p-5 sm:p-6 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-10 ${
                  gi > 0 ? "border-t border-glass-border" : ""
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow">
                    <meta.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-bold leading-tight">{group.label}</h3>
                    <p className="mt-1 hidden text-xs leading-snug text-muted-foreground lg:block">
                      {meta.blurb}
                    </p>
                    <p className="mt-0.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground lg:hidden">
                      {group.skills.length} skills
                    </p>
                  </div>
                </div>

                <ul className="flex flex-wrap content-start gap-2.5">
                  {group.skills.map((skill, i) => (
                    <SkillChip
                      key={`${group.label}-${skill.name}`}
                      name={skill.name}
                      level={skill.level}
                      delay={i * 0.04}
                    />
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
