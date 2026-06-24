import { BlogExplorer } from "@/components/sections/BlogExplorer";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero, SectionHeading, SiteFrame } from "@/components";
import { images } from "@/lib/site-data";

export default function BlogPage() {
  return (
    <SiteFrame activeHref="/blog">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Horexa Blog",
          description: "Kitchen hygiene, exhaust systems, fire safety, compliance and maintenance insights.",
        }}
      />
      <PageHero
        activeLabel="Blog"
        eyebrow="Knowledge Hub"
        title="Kitchen safety and"
        highlight="compliance notes"
        description="Practical guidance for facility managers, chefs, owners and safety teams responsible for commercial kitchen hygiene."
        imageSrc={images.blog}
      />

      <section className="py-20">
        <div className="industrial-container">
          <SectionHeading
            eyebrow="Articles"
            title="Maintenance guidance written for operators"
            description="Clear checklists and field notes covering exhaust cleaning frequency, fire-risk causes, AMC planning and report readiness."
          />
          <div className="mt-12">
            <BlogExplorer />
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
