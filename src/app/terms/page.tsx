import type { Metadata } from "next";
import { PageHero, SiteFrame } from "@/components";
import { Card } from "@/components/ui/card";
import { dynamicPublicImages as images } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for using Horexa Solutions website, inquiry forms, services, and client portal.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <SiteFrame activeHref="/">
      <PageHero
        activeLabel="Terms"
        eyebrow="Legal"
        title="Terms & Conditions"
        description="Terms for using Horexa Solutions website, service inquiry workflows, uploaded files, and client portal records."
        imageSrc={images.services}
        centered
      />
      <section className="py-20">
        <div className="industrial-container max-w-4xl">
          <Card className="space-y-6 p-6 md:p-10">
            {[
              ["Website Use", "Website information is provided for commercial kitchen hygiene and maintenance planning. Final service scope, timelines, and pricing are confirmed after site review."],
              ["Inquiries and Bookings", "Submitting an inquiry does not create a confirmed booking until Horexa accepts and schedules the request."],
              ["Client Portal", "Portal users are responsible for keeping account credentials secure and ensuring uploaded files are lawful, relevant, and safe."],
              ["Reports and Downloads", "Inspection reports and documents are provided for client operational records and should not be altered or misrepresented."],
              ["Limitations", "Horexa is not responsible for outages, delayed communications, or unavailable third-party services outside reasonable operational control."],
            ].map(([title, body]) => (
              <div key={title}>
                <h2 className="text-2xl font-black">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p>
              </div>
            ))}
          </Card>
        </div>
      </section>
    </SiteFrame>
  );
}
