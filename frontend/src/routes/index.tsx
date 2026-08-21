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
import { ContentProvider } from "@/lib/content-context";
import { fallbackContent, fetchSiteContent, type SiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/")({
  // Runs on the server for the initial render, so the live content is in the
  // HTML that search engines and social scrapers see.
  loader: () => fetchSiteContent(),
  head: ({ loaderData }) => {
    const content = (loaderData as SiteContent | undefined) ?? fallbackContent;
    const { profile, seo } = content;
    const title = seo.title || `${profile.name} — ${profile.title}`;
    const description = seo.description || profile.tagline;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "profile" },
        ...(seo.ogImage ? [{ property: "og:image", content: seo.ogImage }] : []),
        { name: "twitter:card", content: "summary_large_image" },
        ...(seo.keywords ? [{ name: "keywords", content: seo.keywords }] : []),
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: profile.name,
            jobTitle: profile.title,
            email: profile.email || undefined,
            telephone: profile.phone || undefined,
            address: { "@type": "PostalAddress", addressLocality: profile.location },
            worksFor: profile.company
              ? { "@type": "Organization", name: profile.company }
              : undefined,
            sameAs: [profile.github, profile.linkedin].filter(Boolean),
            knowsAbout: content.skillGroups.flatMap((group) =>
              group.skills.map((skill) => skill.name),
            ),
          }),
        },
      ],
    };
  },
  component: Index,
});

function Index() {
  const content = Route.useLoaderData();

  return (
    <ContentProvider content={content}>
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
    </ContentProvider>
  );
}
