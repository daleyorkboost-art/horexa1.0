import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Phone } from "lucide-react";
import {
  AnimatedCounter,
  CTASection,
  FAQAccordion,
  FeatureCard,
  PageHero,
  SectionHeading,
  SiteFrame,
  Timeline,
} from "@/components";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  getPublicService,
  industries,
  processSteps,
  stats,
} from "@/lib/public-data";

export const revalidate = 300;

type ServiceDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = await getPublicService(slug);

  return {
    title: service ? `${service.title} | Horexa Solutions` : "Service | Horexa Solutions",
    description: service?.description,
    alternates: {
      canonical: service ? `/services/${service.slug}` : "/services",
    },
    openGraph: service
      ? {
          title: `${service.title} | Horexa Solutions`,
          description: service.description,
          images: [service.image],
        }
      : undefined,
    twitter: service
      ? {
          card: "summary_large_image",
          title: `${service.title} | Horexa Solutions`,
          description: service.description,
          images: [service.image],
        }
      : undefined,
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = await getPublicService(slug);

  if (!service) {
    notFound();
  }

  return (
    <SiteFrame activeHref="/services">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.description,
          provider: {
            "@type": "LocalBusiness",
            name: "Horexa Solutions",
          },
          areaServed: "India",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }}
      />
      <PageHero
        activeLabel={service.shortTitle}
        eyebrow="Service Scope"
        title={service.title}
        highlight="by Horexa"
        description={service.description}
        imageSrc={service.image}
      />

      <section className="py-20">
        <div className="industrial-container grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
          <div className="flex flex-col gap-16">
            <section>
              <SectionHeading align="left" eyebrow="Business Benefit" title="Visible improvements with documented safety value." />
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {service.benefits.map((benefit) => (
                  <Card key={benefit} className="flex items-center gap-4 p-5">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <CheckCircle2 aria-hidden />
                    </div>
                    <h3 className="font-black">{benefit}</h3>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <SectionHeading align="left" eyebrow="What's Included" title="Clear scope from inspection to handover." />
              <Card className="mt-8 p-6">
                <ul className="grid gap-4 md:grid-cols-2">
                  {service.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-7 text-muted-foreground">
                      <CheckCircle2 className="mt-1 shrink-0 text-primary" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </section>

            <section>
              <SectionHeading align="left" eyebrow="Operational Signals" title="Why this service matters to facility teams." />
              <div className="mt-8 grid gap-5 sm:grid-cols-3">
                {stats.slice(0, 3).map((stat) => (
                  <AnimatedCounter key={stat.label} {...stat} />
                ))}
              </div>
            </section>

            <section>
              <SectionHeading align="left" eyebrow="Process" title="A controlled workflow from inspection to report." />
              <div className="mt-8">
                <Timeline steps={processSteps} />
              </div>
            </section>

            <section>
              <SectionHeading align="left" eyebrow="Industries" title="Adapted to each kitchen format and risk level." />
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {industries.map((industry) => (
                  <FeatureCard key={industry.title} icon={industry.icon} title={industry.title} description="Service scopes can be adjusted to operating hours, kitchen volume, and compliance needs." />
                ))}
              </div>
            </section>

            <section>
              <SectionHeading align="left" eyebrow="FAQ" title="Common questions." />
              <div className="mt-8">
                {service.faqs.length ? <FAQAccordion items={service.faqs} /> : <Card className="p-6 text-sm text-muted-foreground">No FAQs have been published for this service yet.</Card>}
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-24">
            <Card className="p-6">
              <h2 className="text-2xl font-black">Schedule Inspection</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Request a quick callback for {service.shortTitle.toLowerCase()}.
              </p>
              <Button asChild className="mt-6 w-full">
                <Link href="/contact">Request Inspection</Link>
              </Button>
              <div className="mt-6 rounded-lg border border-border bg-background/55 p-4">
                <a href="tel:+919876543210" className="flex items-center gap-3 text-sm font-bold text-foreground">
                  <Phone className="text-primary" aria-hidden />
                  +91 98765 43210
                </a>
              </div>
              <Button asChild variant="outline" className="mt-4 w-full">
                <Link href="/amc-plans">View AMC Plans</Link>
              </Button>
            </Card>
          </aside>
        </div>
      </section>

      <CTASection />
    </SiteFrame>
  );
}
