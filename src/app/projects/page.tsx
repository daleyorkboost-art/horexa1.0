import type { Metadata } from "next";
import { CTASection, DatabaseEmptyState, PageHero, SectionHeading, SiteFrame } from "@/components";
import { ProjectsFilter } from "@/components/sections/ProjectsFilter";
import { dynamicPublicImages as images, getPublicProjects } from "@/lib/public-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Commercial Kitchen Cleaning Projects",
  description:
    "Review Horexa case examples for kitchen exhaust deep cleaning, cloud kitchen ventilation hygiene, restaurant hood cleaning and hospital kitchen compliance audits.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Horexa Project Evidence",
    description: "Before/after documentation and field examples from commercial kitchen hygiene projects.",
    images: [images.projects],
  },
  twitter: {
    card: "summary_large_image",
    title: "Horexa Project Evidence",
    description: "Before/after documentation and field examples from commercial kitchen hygiene projects.",
    images: [images.projects],
  },
};

export default async function ProjectsPage() {
  const projects = await getPublicProjects();

  return (
    <SiteFrame activeHref="/projects">
      <PageHero
        activeLabel="Our Projects"
        eyebrow="Project Evidence"
        title="Commercial kitchens cleaned,"
        highlight="documented and handed over"
        description="Selected examples of exhaust restoration, ventilation hygiene and AMC rollouts across hotels, restaurants, cloud kitchens and hospitals."
        imageSrc={images.projects}
        centered
      />

      <section className="py-20">
        <div className="industrial-container">
          <SectionHeading
            eyebrow="Case Examples"
            title="Field work with measurable handovers"
            description="Review projects by asset type, grease level, duration and service scope to understand how Horexa plans work around live operations."
          />
          <div className="mt-12">
            {projects.length ? (
              <ProjectsFilter projects={projects} />
            ) : (
              <DatabaseEmptyState title="No projects published yet" description="Publish project records in the database to populate the portfolio." />
            )}
          </div>
        </div>
      </section>

      <CTASection
        title="Need this level of documentation for your site?"
        description="Book a site inspection and Horexa will map grease load, access constraints, service frequency and reporting requirements before quoting."
      />
    </SiteFrame>
  );
}
