import { CareerApplicationForm, CTASection, FeatureCard, PageHero, SectionHeading, SiteFrame } from "@/components";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { careerBenefits, images, jobs, values } from "@/lib/site-data";

export default function CareersPage() {
  return (
    <SiteFrame activeHref="/careers">
      <PageHero
        activeLabel="Careers"
        eyebrow="Join Horexa"
        title="Build a career in"
        highlight="field service excellence"
        description="Join the teams that inspect, clean, document and maintain commercial kitchen hygiene systems for serious hospitality operators."
        imageSrc={images.hero}
      />

      <section className="py-20">
        <div className="industrial-container">
          <SectionHeading
            eyebrow="Open Positions"
            title="Roles for disciplined field and operations talent"
            description="Horexa hires people who can work safely at night, communicate clearly with clients and take pride in clean handovers."
          />
          <div className="mt-12 grid gap-5">
            {jobs.map((job) => (
              <Card key={job.title} className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant={job.status === "Open" ? "success" : "secondary"}>{job.status}</Badge>
                    <Badge variant="secondary">{job.location}</Badge>
                  </div>
                  <h2 className="mt-4 text-2xl font-black">{job.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {job.type} | {job.experience}
                  </p>
                </div>
                <Button variant={job.status === "Open" ? "default" : "outline"} disabled={job.status !== "Open"}>
                  Apply Now
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band py-20">
        <div className="industrial-container relative">
          <SectionHeading eyebrow="Why Join Horexa" title="Benefits Built Around Field Excellence" />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {careerBenefits.map((benefit) => (
              <FeatureCard key={benefit.title} icon={benefit.icon} title={benefit.title} description="Designed to support safe, skilled, and rewarding work across our service teams." />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="industrial-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Culture"
              title="Practical training, safer sites and accountable teamwork."
              description="Field work is demanding. Horexa supports crews with PPE, supervision, process checklists and growth paths into supervision, coordination and key accounts."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {values.slice(0, 4).map((value) => (
                <Card key={value.title} className="p-5">
                  <value.icon className="text-primary" aria-hidden />
                  <h3 className="mt-4 font-black">{value.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>

          <CareerApplicationForm />
        </div>
      </section>

      <CTASection
        title="Want to grow with a serious field-services company?"
        description="Horexa is building disciplined teams for commercial kitchen hygiene, compliance support and AMC operations across India."
      />
    </SiteFrame>
  );
}
