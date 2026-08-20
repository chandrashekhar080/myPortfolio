import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/portfolio/navbar";
import { Hero } from "@/components/portfolio/hero";
import { About } from "@/components/portfolio/about";
import { Skills } from "@/components/portfolio/skills";
import { Experience } from "@/components/portfolio/experience";
import { Projects } from "@/components/portfolio/projects";
import { Services } from "@/components/portfolio/services";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";
import { ScrollToTop } from "@/components/portfolio/scroll-to-top";

const title = "Chandrashekhar Ghosh — MERN Stack Developer in Indore";
const description =
  "MERN stack developer building responsive, scalable full-stack web applications with React.js, Next.js, Node.js, Express.js and MongoDB. Based in Indore, India.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "keywords",
        content:
          "Chandrashekhar Ghosh, MERN stack developer Indore, full stack developer, React.js, Next.js, Node.js, Express.js, MongoDB portfolio",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Chandrashekhar Ghosh",
          jobTitle: "MERN Stack Developer",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Indore",
            addressRegion: "Madhya Pradesh",
            addressCountry: "IN",
          },
          worksFor: { "@type": "Organization", name: "Fovty Solutions Pvt. Ltd." },
          knowsAbout: [
            "React.js",
            "Next.js",
            "Node.js",
            "Express.js",
            "MongoDB",
            "REST APIs",
            "Tailwind CSS",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Services />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <Toaster />
    </div>
  );
}
