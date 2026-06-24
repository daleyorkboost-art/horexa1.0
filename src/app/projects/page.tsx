import { CTASection, PageHero, SectionHeading, SiteFrame } from "@/components";
import { ProjectsFilter } from "@/components/sections/ProjectsFilter";
import { images } from "@/lib/site-data";

export default function ProjectsPage() {
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
            <ProjectsFilter />
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
