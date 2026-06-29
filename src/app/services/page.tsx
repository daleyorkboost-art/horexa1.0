import type { Metadata } from "next";
import { Filter, Search } from "lucide-react";
import { CTASection, PageHero, SectionHeading, ServiceCard, SiteFrame } from "@/components";
import { Badge } from "@/components/ui/badge";
import { images, services } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Commercial Kitchen Hygiene Services",
  description:
    "Explore Horexa services for kitchen exhaust duct cleaning, hood and filter cleaning, ventilation hygiene, water tank cleaning, access panels, AMC contracts and fire-risk reduction.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Horexa Commercial Kitchen Hygiene Services",
    description: "Specialist cleaning and compliance maintenance for high-risk food-service assets.",
    images: [images.services],
  },
  twitter: {
    card: "summary_large_image",
    title: "Horexa Commercial Kitchen Hygiene Services",
    description: "Specialist cleaning and compliance maintenance for high-risk food-service assets.",
    images: [images.services],
  },
};

const filters = ["All Services", "Exhaust Systems", "Maintenance", "Compliance", "Water Hygiene"];

export default function ServicesPage() {
  return (
    <SiteFrame activeHref="/services">
      <PageHero
        activeLabel="Services"
        eyebrow="Service Scope"
        title="Commercial Kitchen Hygiene"
        highlight="with Compliance Records"
        description="Exhaust cleaning, ventilation hygiene, water tank maintenance and AMC support for kitchens that need safer operations and inspection-ready documentation."
        imageSrc={images.services}
      />

      <section className="py-20">
        <div className="industrial-container">
          <SectionHeading
            eyebrow="Service Directory"
            title="Choose the right scope for your risk profile"
            description="Each service is built around a clear business outcome: reduce fire load, improve airflow, protect stored water or keep audit records current."
          />
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
