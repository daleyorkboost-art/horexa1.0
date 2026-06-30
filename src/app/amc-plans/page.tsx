import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { AMCPricingCard, ContactForm, DatabaseEmptyState, PageHero, SectionHeading, SiteFrame } from "@/components";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { dynamicPublicImages as images, getPublicAmcPlans, getPublicServices } from "@/lib/public-data";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Kitchen Exhaust AMC Contracts",
  description:
    "Horexa AMC plans keep kitchen exhaust cleaning, ventilation hygiene, compliance documentation and audit reminders on a scheduled maintenance calendar.",
  alternates: { canonical: "/amc-plans" },
  openGraph: {
    title: "Horexa Kitchen Exhaust AMC Contracts",
    description: "Scheduled maintenance programs for audit-ready commercial kitchens.",
    images: [images.amc],
  },
  twitter: {
    card: "summary_large_image",
    title: "Horexa Kitchen Exhaust AMC Contracts",
    description: "Scheduled maintenance programs for audit-ready commercial kitchens.",
    images: [images.amc],
  },
};

const comparisonRows = [
  ["Inspection frequency", "Quarterly", "Bi-monthly", "Custom"],
  ["Grease-load inspection", "Included", "Included", "Included"],
  ["Before/after photo report", "Included", "Included", "Included"],
  ["Priority scheduling", "Standard window", "Priority night window", "Dedicated calendar"],
  ["Digital report archive", "Email reports", "Portal-ready", "Executive dashboard"],
  ["Audit reminders", "Email", "WhatsApp + email", "Monthly review call"],
];

export default async function AMCPlansPage() {
  const [amcPlans, services] = await Promise.all([getPublicAmcPlans(), getPublicServices()]);
  const serviceOptions = services.map((service) => ({ id: service.slug, title: service.title }));

  return (
    <SiteFrame activeHref="/amc-plans">
      <PageHero
        activeLabel="AMC Plans"
        eyebrow="Annual Maintenance Contracts"
        title="Scheduled maintenance for"
        highlight="audit-ready kitchens"
        description="Horexa AMC contracts keep exhaust cleaning, ventilation hygiene, documentation and corrective recommendations on a predictable calendar."
        imageSrc={images.amc}
        centered
      />

      <section className="py-20">
        <div className="industrial-container">
          <SectionHeading
            eyebrow="AMC Programs"
            title="Maintenance plans based on kitchen volume and risk"
            description="AMC is not a discount package. It is a managed service rhythm that helps operators stay ready for audits, renewals and internal safety checks."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {amcPlans.length ? (
              amcPlans.map((plan) => <AMCPricingCard key={plan.id} {...plan} href="/contact" />)
            ) : (
              <div className="lg:col-span-3">
                <DatabaseEmptyState title="No AMC plans published yet" description="Publish AMC plan records in the database to populate this page." />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section-band py-20">
        <div className="industrial-container relative">
          <SectionHeading
            eyebrow="Comparison"
            title="Plan Feature Matrix"
            description="Compare the operational support included in each maintenance program before final scope and pricing are confirmed after inspection."
          />
          <Card className="mt-12 overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-primary text-primary-foreground">
                  <tr>
                    <th className="px-6 py-4 font-black uppercase tracking-[0.1em]">Feature</th>
                    <th className="px-6 py-4 font-black uppercase tracking-[0.1em]">Standard</th>
                    <th className="px-6 py-4 font-black uppercase tracking-[0.1em]">Premium</th>
                    <th className="px-6 py-4 font-black uppercase tracking-[0.1em]">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row[0]} className="border-b border-border last:border-b-0">
                      {row.map((cell, index) => (
                        <td key={`${row[0]}-${index}`} className="px-6 py-5 text-muted-foreground">
                          <span className={index === 0 ? "font-black text-foreground" : ""}>{cell}</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-20">
        <div className="industrial-container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <SectionHeading
              align="left"
              eyebrow="How AMC Works"
              title="Set the calendar once. Stay audit-ready all year."
              description="Horexa maintains the schedule, service record, photo evidence, and renewal reminders so your team can operate with fewer surprises."
            />
            <div className="mt-8 flex flex-col gap-4">
              {["Site assessment", "Service calendar", "Scheduled cleaning", "Digital documentation", "Renewal review"].map(
                (step, index) => (
                  <Card key={step} className="flex items-center gap-4 p-5">
                    <Badge>{index + 1}</Badge>
                    <span className="font-black">{step}</span>
                    <CheckCircle2 className="ml-auto text-primary" aria-hidden />
                  </Card>
                ),
              )}
            </div>
          </div>
          <ContactForm services={serviceOptions} amcPlans={amcPlans} sourcePage="/amc-plans" defaultService="AMC Inquiry" mode="amc" />
        </div>
      </section>
    </SiteFrame>
  );
}
