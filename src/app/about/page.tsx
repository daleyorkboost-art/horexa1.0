import Image from "next/image";
import type { Metadata } from "next";
import { Award, ShieldCheck } from "lucide-react";
import { AnimatedCounter, CTASection, FeatureCard, PageHero, SectionHeading, SiteFrame } from "@/components";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { images, standards, stats, values } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About Horexa Solutions",
  description:
    "Learn how Horexa Solutions supports hotels, restaurants, cloud kitchens, hospitals and cafeterias with commercial kitchen hygiene, safety and compliance maintenance.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Horexa Solutions",
    description: "Commercial kitchen hygiene specialists built for safety, compliance and disciplined field execution.",
    images: [images.hero],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Horexa Solutions",
    description: "Commercial kitchen hygiene specialists built for safety, compliance and disciplined field execution.",
    images: [images.hero],
  },
};

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
            description="Horexa combines site supervisors, trained cleaning crews, operations coordinators and documentation support for predictable service quality."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {["Senior Inspection Lead", "AMC Operations Coordinator", "Compliance Documentation Specialist"].map((role, index) => (
              <Card key={role} className="overflow-hidden p-0">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={images.projects}
                    alt={`${role} at Horexa Solutions`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <Badge variant="secondary">{["Site Safety", "Service Calendar", "Audit Records"][index]}</Badge>
                  <h3 className="mt-4 text-2xl font-black">{role}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Responsible for safe execution, clear client communication, clean handovers and reliable follow-up records.
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
