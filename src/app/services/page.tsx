import { Filter, Search } from "lucide-react";
import { CTASection, PageHero, SectionHeading, ServiceCard, SiteFrame } from "@/components";
import { Badge } from "@/components/ui/badge";
import { images, services } from "@/lib/site-data";

const filters = ["All Services", "Exhaust Systems", "Maintenance", "Compliance", "Water Hygiene"];

export default function ServicesPage() {
  return (
    <SiteFrame activeHref="/services">
      <PageHero
        activeLabel="Services"
        eyebrow="Our Services"
        title="Complete Hygiene & Maintenance Solutions"
        highlight="for Hospitality Spaces"
        description="From kitchen exhaust cleaning to water tank maintenance, Horexa delivers end-to-end hygiene, safety, and compliance services."
        imageSrc={images.services}
      />

      <section className="py-20">
        <div className="industrial-container">
          <SectionHeading eyebrow="Our Services" title="What We Do" />
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {filters.map((filter, index) => (
              <Badge key={filter} variant={index === 0 ? "default" : "secondary"} className="min-h-11 px-5">
                {index === 0 ? <Search aria-hidden /> : <Filter aria-hidden />}
                {filter}
              </Badge>
            ))}
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard
                key={service.slug}
                icon={service.icon}
                title={service.title}
                description={service.description}
                href={`/services/${service.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Need help choosing the right service?"
        description="Tell us your kitchen type, grease level, and city. We will recommend the right service scope."
      />
    </SiteFrame>
  );
}
