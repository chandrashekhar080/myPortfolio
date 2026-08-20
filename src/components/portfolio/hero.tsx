import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, Download, Mail, MapPin, Sparkles } from "lucide-react";
import { profile, typedRoles } from "@/data/portfolio";
import { ActionButton, ActionLink } from "./action-button";
import { downloadResume } from "@/lib/resume";

function useTypedText(words: readonly string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    const done = !deleting && text === word;
    const cleared = deleting && text === "";

    const timeout = window.setTimeout(
      () => {
        if (done) {
          setDeleting(true);
        } else if (cleared) {
          setDeleting(false);
          setIndex((i) => (i + 1) % words.length);
        } else {
          setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
        }
      },
      done ? 1600 : deleting ? 35 : 70,
    );

    return () => window.clearTimeout(timeout);
  }, [text, deleting, index, words]);

  return text;
}

const stack = ["React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"];

export function Hero() {
  const typed = useTypedText(typedRoles);
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden pt-32 sm:pt-36">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-40 h-[38rem] halo" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-float-slow"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-72 h-64 w-64 rounded-full bg-accent/20 blur-3xl animate-float-slow"
      />

      <div className="section-shell relative grid items-center gap-12 pt-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-glass-border glass px-3.5 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Available for full-stack work
          </motion.span>

          <motion.h1
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-6 text-[2.6rem] font-bold leading-[1.02] sm:text-6xl lg:text-[4.25rem]"
          >
            {profile.name}
            <span className="mt-2 block text-gradient">MERN Stack Developer</span>
          </motion.h1>

          <p className="mt-5 font-mono text-sm text-muted-foreground sm:text-base" aria-live="polite">
            <span className="text-primary">&gt;</span> {typed}
            <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-primary animate-caret" />
          </p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            {profile.tagline}
          </motion.p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ActionButton onClick={downloadResume}>
              <Download className="h-4 w-4" /> Download Resume
            </ActionButton>
            <ActionLink href="#contact" variant="outline">
              <Mail className="h-4 w-4" /> Contact Me
            </ActionLink>
            <ActionLink href="#projects" variant="outline">
              <ArrowDown className="h-4 w-4" /> View Projects
            </ActionLink>
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
            <div>
              <dt className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                Experience
              </dt>
              <dd className="mt-1 font-display text-xl font-bold">{profile.experience}</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                Projects built
              </dt>
              <dd className="mt-1 font-display text-xl font-bold">9+</dd>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <dt className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                Based in
              </dt>
              <dd className="mt-1 flex items-center gap-1.5 font-display text-sm font-bold">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
                <span className="truncate">Indore, India</span>
              </dd>
            </div>
          </dl>
        </div>

        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="glass rounded-3xl p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
              <span className="ml-2 truncate font-mono text-[0.65rem] text-muted-foreground">
                Developer.jsx
              </span>
            </div>
            <pre className="mt-4 overflow-x-auto font-mono text-[0.72rem] leading-6 text-muted-foreground sm:text-xs">
              <code>{`const chandrashekhar = {
  role: "MERN Stack Developer",
  company: "Fovty Solutions",
  stack: ["React", "Node", "Express", "MongoDB"],
  focus: ["UI", "REST APIs", "Databases"],
  ships: () => "clean, scalable code",
};`}</code>
            </pre>
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              {stack.map((item) => (
                <span
                  key={item}
                  className="truncate rounded-xl border border-glass-border bg-secondary/50 px-3 py-2 text-center text-xs font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div
            aria-hidden
            className="absolute -bottom-6 -right-3 hidden rounded-2xl bg-gradient-brand px-4 py-3 text-primary-foreground shadow-glow sm:block"
          >
            <p className="font-display text-lg font-bold leading-none">MERN</p>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] opacity-80">
              Full Stack
            </p>
          </div>
        </motion.div>
      </div>

      <div aria-hidden className="relative overflow-hidden border-y border-glass-border py-4">
        <div className="flex w-max animate-marquee gap-10 pr-10">
          {[...stack, ...stack, ...stack, ...stack].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
