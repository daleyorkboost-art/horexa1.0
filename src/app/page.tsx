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
import { Button } from "@/components/ui/button";
import { amcPlans, images, processSteps, services, standards, stats, testimonials } from "@/lib/site-data";

export default function HomePage() {
  return (
    <SiteFrame activeHref="/">
      <HeroSection
        eyebrow="Prevent. Clean. Protect."
        title="Modern Hygiene Standards for Hospitality Spaces"
        description="Kitchen exhaust hygiene, ventilation maintenance, fire-risk reduction and AMC services for hotels, restaurants and commercial kitchens."
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
              title="Clean air, safer kitchens, stronger compliance."
              description="Horexa supports hospitality brands with specialist cleaning teams, photo-backed reporting, and maintenance schedules designed for fire safety and audit readiness."
            />
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="surface-card p-5">
                <p className="text-3xl font-black text-primary">7+</p>
                <p className="mt-2 text-sm text-muted-foreground">Major cities covered</p>
              </div>
              <div className="surface-card p-5">
                <p className="text-3xl font-black text-primary">24h</p>
                <p className="mt-2 text-sm text-muted-foreground">Rapid inspection slots</p>
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
          <SectionHeading eyebrow="Our Services" title="What We Do" />
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
            description="The visual language stays close to your references: heavy dark surfaces, precise typography, crisp cards, and orange glow interactions."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Trained Professionals", description: "Field teams with safety-first workflows.", icon: Users },
              { title: "NFPA Focused", description: "Reports designed for audit conversations.", icon: ShieldCheck },
              { title: "Eco-Friendly Chemicals", description: "Effective degreasing with controlled handling.", icon: Leaf },
              { title: "Fire Risk Reduction", description: "Grease-load reduction where it matters most.", icon: Flame },
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
            description="Compare real-world grease buildup with cleaned exhaust surfaces using the same interactive before/after treatment required across project sections."
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
          <SectionHeading eyebrow="Performance" title="Numbers That Matter" />
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
            description="Realistic sample testimonials for the static frontend while backend content is pending."
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
