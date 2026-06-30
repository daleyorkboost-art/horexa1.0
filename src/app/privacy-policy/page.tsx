import type { Metadata } from "next";
import { PageHero, SiteFrame } from "@/components";
import { Card } from "@/components/ui/card";
import { dynamicPublicImages as images } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Horexa Solutions website, inquiries, client portal, and service communications.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <SiteFrame activeHref="/">
      <PageHero
        activeLabel="Privacy Policy"
        eyebrow="Legal"
        title="Privacy Policy"
        description="How Horexa Solutions handles website inquiries, client portal records, uploaded documents, and service communications."
        imageSrc={images.contact}
        centered
      />
      <section className="py-20">
        <div className="industrial-container max-w-4xl">
          <Card className="space-y-6 p-6 md:p-10">
            {[
              ["Information We Collect", "We collect contact details, business information, service requirements, uploaded documents, portal account data, and communication history needed to respond to inquiries and deliver services."],
              ["How We Use Information", "Information is used for inspections, quotations, AMC management, reports, invoices, support tickets, compliance records, and operational communication."],
              ["Storage and Security", "Production systems use authenticated access, role permissions, audit logs, secure uploads, rate limiting, validation, and transport security controls."],
              ["Sharing", "We do not sell personal information. Information may be shared with service providers only where required for hosting, email delivery, storage, analytics, or legal compliance."],
              ["Requests", "Clients may request correction or removal of account information where retention is not required for service, compliance, invoicing, or legal records."],
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
