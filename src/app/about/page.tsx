import { Award, ShieldCheck } from "lucide-react";
import { AnimatedCounter, CTASection, FeatureCard, PageHero, SectionHeading, SiteFrame } from "@/components";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { images, standards, stats, values } from "@/lib/site-data";

export default function AboutPage() {
  return (
    <SiteFrame activeHref="/about">
      <PageHero
        activeLabel="About Us"
        eyebrow="Who We Are"
        title="India's Hospitality Hygiene Partner"
        highlight="Built for Safety"
        description="Horexa Solutions helps hotels, restaurants, cloud kitchens, hospitals, and cafeterias run cleaner, safer, more compliant kitchens."
        imageSrc={images.hero}
      />

      <section className="py-20">
        <div className="industrial-container grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <SectionHeading
            align="left"
            eyebrow="Company Story"
            title="Professional hygiene for kitchens that never slow down."
            description="Horexa was created for commercial food-service operators who need more than basic cleaning. Our teams combine exhaust expertise, structured maintenance, and photo-backed records so kitchen leaders can focus on service while staying audit-ready."
          />
          <Card className="p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-background/45 p-5">
                <Award className="text-primary" aria-hidden />
                <h3 className="mt-4 text-2xl font-black">Mission</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Make commercial kitchens cleaner, safer, and easier to maintain through disciplined hygiene systems.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-background/45 p-5">
                <ShieldCheck className="text-primary" aria-hidden />
                <h3 className="mt-4 text-2xl font-black">Vision</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Become India&apos;s most trusted kitchen hygiene partner for hospitality and food-service brands.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="section-band py-20">
        <div className="industrial-container relative">
          <SectionHeading eyebrow="Values" title="What Guides Our Work" />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {values.map((value) => (
              <FeatureCard key={value.title} {...value} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="industrial-container">
          <SectionHeading
            eyebrow="Team"
            title="Field Experts, Coordinators, and Compliance Support"
            description="Placeholder team profiles for the static site, ready to be connected to CMS content later."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {["Inspection Lead", "AMC Coordinator", "Compliance Specialist"].map((role, index) => (
              <Card key={role} className="overflow-hidden p-0">
                <div className="aspect-[4/3] bg-cover bg-center" style={{ backgroundImage: `url(${images.projects})` }} />
                <div className="p-6">
                  <Badge variant="secondary">Team {index + 1}</Badge>
                  <h3 className="mt-4 text-2xl font-black">{role}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Experienced operator focused on safe execution, clean handovers, and clear reporting.
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band py-20">
        <div className="industrial-container relative">
          <SectionHeading eyebrow="Safety Standards" title="Compliance-Minded From Start to Report" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {standards.map((standard) => (
              <FeatureCard key={standard.title} {...standard} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="industrial-container">
          <SectionHeading eyebrow="Statistics" title="Built for Measurable Outcomes" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <AnimatedCounter key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </SiteFrame>
  );
}
