import Link from "next/link";
import {
  ArrowRight,
  Flame,
  Leaf,
  ShieldCheck,
  TimerReset,
  Users,
} from "lucide-react";
import {
  AMCPricingCard,
  AnimatedCounter,
  BeforeAfterSlider,
  CTASection,
  FeatureCard,
  HeroSection,
  SectionHeading,
  ServiceCard,
  SiteFrame,
  TestimonialCard,
  Timeline,
} from "@/components";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/button";
import { amcPlans, images, processSteps, services, standards, stats, testimonials } from "@/lib/site-data";

export default function HomePage() {
  return (
    <SiteFrame activeHref="/">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Horexa Solutions",
          url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://horexasolutions.com",
          image: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://horexasolutions.com"}${images.hero}`,
          telephone: "+91 98765 43210",
          areaServed: ["Delhi NCR", "Mumbai", "Bangalore", "Hyderabad", "Pune", "Chennai"],
          slogan: "Clean Air. Safe Kitchens.",
          description: "Commercial kitchen hygiene, exhaust duct cleaning, AMC plans, and compliance reporting across India.",
        }}
      />
      <HeroSection
        eyebrow="Commercial Kitchen Hygiene"
        title="Fire-safe exhaust systems. Audit-ready kitchens."
        description="Horexa Solutions maintains kitchen exhaust, ventilation and hygiene assets for hotels, restaurants, cloud kitchens, hospitals and corporate cafeterias through certified cleaning and AMC contracts."
        imageSrc={images.hero}
        primaryAction={{ label: "Request Inspection", href: "/contact" }}
        secondaryAction={{ label: "Explore Services", href: "/services" }}
      />

      <section className="py-20">
        <div className="industrial-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="flex flex-col gap-6">
            <SectionHeading
              align="left"
              eyebrow="Horexa Solutions"
              title="Built for kitchens where downtime is not an option."
              description="Our teams work around live hospitality operations with night service windows, protected work zones, supervisor handovers and documentation that engineering teams can use during audits."
            />
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="surface-card p-5">
                <p className="text-3xl font-black text-primary">7+</p>
                <p className="mt-2 text-sm text-muted-foreground">Hospitality markets covered</p>
              </div>
              <div className="surface-card p-5">
                <p className="text-3xl font-black text-primary">24h</p>
                <p className="mt-2 text-sm text-muted-foreground">AMC priority response</p>
              </div>
              <div className="surface-card p-5">
                <p className="text-3xl font-black text-primary">100%</p>
                <p className="mt-2 text-sm text-muted-foreground">Photo documentation</p>
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {standards.map((standard) => (
              <FeatureCard key={standard.title} {...standard} />
            ))}
            <FeatureCard
              icon={TimerReset}
              title="Minimal Disruption"
              description="Night and off-hour cleaning windows help kitchens reopen without service delays."
            />
          </div>
        </div>
      </section>

      <section className="section-band py-20">
        <div className="industrial-container relative">
          <SectionHeading
            eyebrow="Core Services"
            title="Hygiene services for high-risk food-service assets"
            description="From grease-loaded ductwork to stored water systems, each scope is planned around fire safety, operational continuity and inspection records."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service) => (
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

      <section className="py-20">
        <div className="industrial-container">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Built for High-Risk, High-Volume Kitchens"
            description="Horexa combines trained field teams, compliance-minded reporting and repeatable maintenance schedules for operators who cannot afford surprise shutdowns."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Trained Field Teams", description: "Supervised crews with PPE, isolation and handover discipline.", icon: Users },
              { title: "NFPA-Aligned Records", description: "Reports structured for audits, insurers and facility managers.", icon: ShieldCheck },
              { title: "Controlled Degreasing", description: "Industrial cleaning chemistry with careful containment.", icon: Leaf },
              { title: "Fire-Load Reduction", description: "Grease removal focused on hoods, ducts, risers and fans.", icon: Flame },
            ].map((item) => (
              <FeatureCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-band py-20">
        <div className="industrial-container relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            align="left"
            eyebrow="Before / After"
            title="Visible Results, Audit-Ready Proof"
            description="Compare grease-heavy extraction surfaces with cleaned handover conditions and documented visual proof."
          />
          <BeforeAfterSlider
            before={{ src: images.blog, alt: "Grease buildup before cleaning" }}
            after={{ src: images.projects, alt: "Cleaned commercial kitchen exhaust" }}
          />
        </div>
      </section>

      <section className="py-20">
        <div className="industrial-container">
          <SectionHeading
            eyebrow="Annual Maintenance Contracts"
            title="Protect Your Kitchen"
            highlight="Year-Round"
            description="Scheduled maintenance, priority support, and complete digital documentation to keep kitchens audit-ready."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {amcPlans.map((plan) => (
              <AMCPricingCard key={plan.name} {...plan} href="/amc-plans" />
            ))}
          </div>
        </div>
      </section>

      <section className="section-band py-20">
        <div className="industrial-container relative">
          <SectionHeading
            eyebrow="Our Process"
            title="A Six-Step Cleaning Workflow"
            description="From inspection to report, every step is clear enough for operations teams and compliance reviewers."
          />
          <div className="mt-12">
            <Timeline steps={processSteps} />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="industrial-container">
          <SectionHeading
            eyebrow="Operational Proof"
            title="Metrics facility teams can act on"
            description="The right maintenance partner should make risk, records and next steps easier to see."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <AnimatedCounter key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-band py-20">
        <div className="industrial-container relative">
          <SectionHeading
            eyebrow="Testimonials"
            title="Trusted by Hospitality Operators"
            description="Operations leaders choose Horexa when they need clean handovers, reliable scheduling and documentation that survives scrutiny."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">
                View Projects
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <CTASection />
    </SiteFrame>
  );
}
