import { Brain, Layers, Users, Rocket } from "lucide-react";
import { useContent } from "@/lib/content-context";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

const pillars = [
  {
    icon: Layers,
    title: "Full-stack thinking",
    text: "One mental model from the React component down to the Express route and the MongoDB document.",
  },
  {
    icon: Brain,
    title: "Problem solving",
    text: "Debugging tricky UI state, API edge cases and data flows until the whole feature feels effortless.",
  },
  {
    icon: Users,
    title: "Teamwork",
    text: "Daily collaboration with senior developers, designers and QA on real client deliverables.",
  },
  {
    icon: Rocket,
    title: "Continuous learning",
    text: "Steadily widening my stack — Next.js, GraphQL, Docker and cloud deployment on AWS and GCP.",
  },
];

export function About() {
  const { education, profile } = useContent();
  // The paragraph below names the most recent qualification; skip it entirely
  // if the education section has been emptied from the admin.
  const degree = education[0];

  return (
    <section id="about" className="section-shell">
      <SectionHeading
        eyebrow="About me"
        title="A MERN developer who owns the feature end to end"
      />

      <div className="mt-12">
        <Reveal className="text-base leading-relaxed text-muted-foreground lg:columns-2 lg:gap-12 [&>p]:mb-5 [&>p]:break-inside-avoid lg:[&>p:last-child]:mb-0">
          <p>
            My name is <span className="font-semibold text-foreground">{profile.name}</span> and I am
            a dedicated MERN stack developer with a strong foundation in frontend and full-stack
            development, building responsive, scalable and user-friendly web applications.
          </p>
          {degree ? (
            <p>
              I completed my <span className="font-semibold text-foreground">{degree.degree}</span>{" "}
              at <span className="font-semibold text-foreground">{degree.institute}</span>,{" "}
              {degree.location.replace(", India", "")}, in {degree.year}, after a{" "}
              <span className="font-semibold text-foreground">DCA from MCRPV Bhopal</span>. That mix
              of fundamentals and hands-on practice is what pulled me into web development as a
              career.
            </p>
          ) : null}
          <p>
            I started with remote internships at{" "}
            <span className="font-semibold text-foreground">Unified Mentors</span> and{" "}
            <span className="font-semibold text-foreground">Code Alpha</span>, building full-stack
            practice applications and responsive interfaces, and I continue to work remotely with{" "}
            <span className="font-semibold text-foreground">The Developers Arena</span> on assigned
            web modules delivered against weekly sprint deadlines.
          </p>
          <p>
            I joined <span className="font-semibold text-foreground">{profile.company}</span> in
            Indore as an onsite intern and converted that six-month internship into a full-time
            on-role position as a{" "}
            <span className="font-semibold text-foreground">Junior MERN Stack Developer</span> —
            building responsive React interfaces, Express REST endpoints and Mongoose data models on
            live client work.
          </p>
          <p>
            Today I handle development on a live tractor platform project end to end: scoping
            features with the client, designing the API and data models, building the interface and
            keeping the codebase clean and scalable as it grows.
          </p>
          <p>
            My work spans client platforms across healthcare, business operations and e-learning —
            Share To Care, Bizlaxy and KidsKloud — alongside my own builds: a full-stack job portal
            with real-time application tracking, a cafe website with an authenticated admin panel and
            a drag-and-drop task manager. Practical experience with authentication, CRUD APIs,
            WebSockets, file uploads, form validation and SQL as well as NoSQL databases.
          </p>
          <p>
            I care about clean, maintainable and scalable code, adapt quickly to new requirements,
            and I am excited to keep growing into AI-driven applications and cloud-based solutions on
            AWS and GCP.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
