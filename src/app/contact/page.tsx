import Link from "next/link";
import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { ContactForm, PageHero, SectionHeading, SiteFrame } from "@/components";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { contactDetails, images } from "@/lib/site-data";
import { serviceAreas } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Request a Kitchen Hygiene Inspection",
  description:
    "Contact Horexa Solutions for commercial kitchen exhaust inspection, AMC contracts, fire-risk checks, ventilation hygiene and report requests across major Indian cities.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Request a Horexa Kitchen Hygiene Inspection",
    description: "Schedule an inspection for exhaust cleaning, AMC planning and audit-ready documentation.",
    images: [images.contact],
  },
  twitter: {
    card: "summary_large_image",
    title: "Request a Horexa Kitchen Hygiene Inspection",
    description: "Schedule an inspection for exhaust cleaning, AMC planning and audit-ready documentation.",
    images: [images.contact],
  },
};

export default function ContactPage() {
  return (
    <SiteFrame activeHref="/contact">
      <PageHero
        activeLabel="Contact Us"
        eyebrow="Request Inspection"
        title="Schedule a kitchen hygiene"
        highlight="risk assessment"
        description="Share your kitchen type, city, operating hours and audit timeline. Horexa will recommend the right cleaning scope, frequency and documentation plan."
        imageSrc={images.contact}
      />

      <section className="py-20">
        <div className="industrial-container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="flex flex-col gap-8">
            <SectionHeading
              align="left"
              eyebrow="Contact Details"
              title="Fast answers for high-pressure kitchen teams."
              description="Reach Horexa by phone, email, inquiry form or WhatsApp for site inspections, AMC renewals, urgent grease-load checks and report requests."
            />
            <div className="flex flex-col gap-5">
              {contactDetails.map((item) => (
                <Card key={item.label} className="flex gap-5 p-5">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                    <item.icon aria-hidden />
                  </div>
                  <div>
                    <h3 className="font-black">{item.label}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.helper}</p>
                    <p className="mt-2 font-black text-foreground">{item.value}</p>
                  </div>
                </Card>
              ))}
            </div>
            <Button asChild size="lg" className="w-fit">
              <Link href="https://wa.me/919876543210">
                <MessageCircle data-icon="inline-start" />
                WhatsApp +91 98765 43210
              </Link>
            </Button>
          </div>
          <ContactForm />
        </div>
      </section>

      <section className="section-band py-20">
        <div className="industrial-container relative">
          <SectionHeading
            eyebrow="Service Areas"
            title="Serving Major Indian Hospitality Markets"
            description="Regional teams support planned AMC work and inspection requests across India's largest hospitality and food-service clusters."
          />
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {serviceAreas.map((area) => (
              <Badge key={area} className="min-h-11 px-5">
                {area}
              </Badge>
            ))}
          </div>
          <Card className="mt-12 flex min-h-72 items-center justify-center bg-secondary/40 p-8 text-center">
            <div>
              <h3 className="text-h3 font-black">Regional Service Coordination</h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                Horexa coordinates city-wise crews for night cleaning windows, AMC visits and urgent inspections across hotels, restaurants, hospitals and cafeterias.
              </p>
            </div>
          </Card>
        </div>
      </section>
    </SiteFrame>
  );
}
