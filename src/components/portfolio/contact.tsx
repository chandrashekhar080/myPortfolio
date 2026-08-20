import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { toast } from "sonner";
import { profile } from "@/data/portfolio";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { ActionButton } from "./action-button";

const inputClass =
  "w-full rounded-xl border border-glass-border bg-secondary/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring/40";

export function Contact() {
  const [sending, setSending] = useState(false);

  return (
    <section id="contact" className="relative section-shell">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-72 halo" />
      <div className="relative">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something end to end"
          description="Open to MERN stack developer roles, full-stack builds and freelance projects."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="space-y-4">
            <a
              href={`mailto:${profile.email}`}
              className="glass flex items-center gap-4 rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-brand text-primary-foreground">
                <Mail className="h-4.5 w-4.5" />
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
                  Email
                </span>
                <span className="block truncate text-sm font-medium">{profile.email}</span>
              </span>
            </a>

            <a
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
              className="glass flex items-center gap-4 rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-brand text-primary-foreground">
                <Phone className="h-4.5 w-4.5" />
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
                  Phone
                </span>
                <span className="block truncate text-sm font-medium">{profile.phone}</span>
                <span className="block truncate text-xs text-muted-foreground">
                  Alt · {profile.phoneAlt}
                </span>
              </span>
            </a>

            <div className="glass flex items-center gap-4 rounded-2xl p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-brand text-primary-foreground">
                <MapPin className="h-4.5 w-4.5" />
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
                  Location
                </span>
                <span className="block text-sm font-medium">{profile.location}</span>
              </span>
            </div>

            <div className="flex gap-3">
              {profile.linkedin ? (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="LinkedIn profile"
                  className="glass grid h-12 flex-1 place-items-center rounded-2xl text-lg transition-colors hover:text-primary"
                >
                  <FaLinkedinIn />
                </a>
              ) : null}
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub profile"
                className="glass grid h-12 flex-1 place-items-center rounded-2xl text-lg transition-colors hover:text-primary"
              >
                <FaGithub />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              className="glass rounded-3xl p-6 sm:p-8"
              onSubmit={(event) => {
                event.preventDefault();
                const form = event.currentTarget;
                setSending(true);
                window.setTimeout(() => {
                  setSending(false);
                  form.reset();
                  toast.success("Message sent", {
                    description: "Thanks for reaching out — I'll reply within 24 hours.",
                  });
                }, 700);
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-xs font-medium">
                    Name
                  </label>
                  <input id="name" name="name" required placeholder="Your name" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="subject" className="mb-1.5 block text-xs font-medium">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  required
                  placeholder="Project, role or collaboration"
                  className={inputClass}
                />
              </div>

              <div className="mt-4">
                <label htmlFor="message" className="mb-1.5 block text-xs font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me a bit about what you're building..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <ActionButton type="submit" disabled={sending} className="mt-6 w-full sm:w-auto">
                <Send className="h-4 w-4" /> {sending ? "Sending..." : "Send Message"}
              </ActionButton>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
