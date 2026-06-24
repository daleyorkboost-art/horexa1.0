import { CTASection, PageHero, SectionHeading, SiteFrame } from "@/components";
import { ProjectsFilter } from "@/components/sections/ProjectsFilter";
import { images } from "@/lib/site-data";

export default function ProjectsPage() {
  return (
    <SiteFrame activeHref="/projects">
      <PageHero
        activeLabel="Our Projects"
        eyebrow="Portfolio"
        title="Our Track Record of"
        highlight="Excellence"
        description="Explore impactful hygiene and maintenance projects across the hospitality industry."
        imageSrc={images.projects}
        centered
      />

      <section className="py-20">
        <div className="industrial-container">
          <SectionHeading
            eyebrow="Portfolio Grid"
            title="Before, After, and Everything Between"
            description="Filter realistic placeholder projects by category and review visual cleaning outcomes."
          />
          <div className="mt-12">
            <ProjectsFilter />
          </div>
        </div>
      </section>

      <CTASection title="Want similar results in your kitchen?" />
    </SiteFrame>
  );
}
