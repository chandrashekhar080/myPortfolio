import { Brain, Layers, Users, Rocket } from "lucide-react";
import { education, profile } from "@/data/portfolio";
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

      <div className="mt-12">
        <Reveal className="text-base leading-relaxed text-muted-foreground lg:columns-2 lg:gap-12 [&>p]:mb-5 [&>p]:break-inside-avoid lg:[&>p:last-child]:mb-0">
          <p>
            My name is <span className="font-semibold text-foreground">{profile.name}</span> and I am a
            passionate React.js developer with over two years of experience building responsive,
            scalable and user-friendly web applications.
          </p>
          <p>
            I completed my{" "}
            <span className="font-semibold text-foreground">{education.degree}</span> from{" "}
            <span className="font-semibold text-foreground">{education.institute}</span>,{" "}
            {education.location.replace(", India", "")}, in {education.year}. During my academic
            journey I developed a strong interest in web development, which motivated me to build a
            career in the software industry.
          </p>
          <p>
            I began as a{" "}
            <span className="font-semibold text-foreground">MERN Stack Intern at Siya Technology</span>
            , working hands-on with JavaScript, React.js, Node.js, Express.js and MongoDB across
            practice builds and live projects, while attending client meetings and collaborating with
            cross-functional teams. I then joined{" "}
            <span className="font-semibold text-foreground">Technoriz Software Solution</span> as a
            Junior React Developer, where I built responsive applications, reusable components and REST
            API integrations.
          </p>
          <p>
            Today I work as a React Developer at{" "}
            <span className="font-semibold text-foreground">{profile.company}</span> in Indore, where I
            have completed one year building production-ready applications for real clients — clean
            responsive UI, reusable components, Redux Toolkit state layers and REST API integrations,
            alongside backend developers, designers and QA.
          </p>
          <p>
            I have delivered live client projects and admin dashboards across childcare booking, travel
            management, healthcare, e-learning, business operations, legal consultation and property
            rental — practical experience with role-based authentication, payment integrations,
            data-heavy dashboards, form validation and performance optimisation on every device.
          </p>
          <p>
            I care about clean, maintainable and scalable code, enjoy solving complex UI and state
            problems, and adapt quickly to new business requirements. My goal is to keep growing as a
            frontend engineer while expanding my expertise across the MERN stack.
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
