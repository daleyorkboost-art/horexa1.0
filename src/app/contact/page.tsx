import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { ContactForm, PageHero, SectionHeading, SiteFrame } from "@/components";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { contactDetails, images } from "@/lib/site-data";
import { serviceAreas } from "@/lib/navigation";

export default function ContactPage() {
  return (
    <SiteFrame activeHref="/contact">
      <PageHero
        activeLabel="Contact Us"
        eyebrow="Get in Touch"
        title="Let's Secure Your"
        highlight="Kitchen Together"
        description="Have a question about AMC plans, need an emergency inspection, or want to request a quote? Our team is ready to assist you."
        imageSrc={images.contact}
      />

      <section className="py-20">
        <div className="industrial-container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="flex flex-col gap-8">
            <SectionHeading
              align="left"
              eyebrow="Contact Details"
              title="Fast answers for high-pressure kitchen teams."
              description="Reach Horexa by phone, email, inquiry form, or WhatsApp. Placeholder contact details match the PRD and screenshots."
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
            description="Local search-ready service area content from the PRD."
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
              <h3 className="text-h3 font-black">Map Placeholder</h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                Embed Google Maps here when the production address and API key are available.
              </p>
            </div>
          </Card>
        </div>
      </section>
    </SiteFrame>
  );
}
