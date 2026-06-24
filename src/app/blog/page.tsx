import { BlogExplorer } from "@/components/sections/BlogExplorer";
import { PageHero, SectionHeading, SiteFrame } from "@/components";
import { images } from "@/lib/site-data";

export default function BlogPage() {
  return (
    <SiteFrame activeHref="/blog">
      <PageHero
        activeLabel="Blog"
        title="Horexa"
        highlight="Blog"
        description="Insights, tips, and expert advice on kitchen hygiene, exhaust systems, safety compliance, and maintenance."
        imageSrc={images.blog}
      />

      <section className="py-20">
        <div className="industrial-container">
          <SectionHeading eyebrow="Knowledge Hub" title="Compliance Insights for Operators" />
          <div className="mt-12">
            <BlogExplorer />
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
