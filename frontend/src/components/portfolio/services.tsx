import { useContent } from "@/lib/content-context";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

export function Services() {
  const { services, achievements } = useContent();

  return (
    <section id="services" className="section-shell">
      <SectionHeading
        eyebrow="Services"
        title="What I can take off your plate"
        description="From a single responsive landing page to a complete admin dashboard with API integration."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <Reveal key={service.title} delay={(i % 3) * 0.07}>
            <article className="group glass relative h-full overflow-hidden rounded-2xl p-6 transition-all duration-400 hover:-translate-y-1 hover:shadow-glow">
              <span
                aria-hidden
                className="absolute right-4 top-3 font-display text-4xl font-bold text-muted-foreground/15"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-base font-bold">{service.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <span
                aria-hidden
                className="mt-5 block h-0.5 w-10 rounded-full bg-gradient-brand transition-all duration-500 group-hover:w-20"
              />
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-14">
        <div className="glass grid gap-6 rounded-3xl p-8 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((item) => (
            <div key={item.label} className="text-center sm:text-left">
              <p className="font-display text-4xl font-bold text-gradient">{item.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
