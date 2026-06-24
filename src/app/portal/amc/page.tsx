import { CalendarClock, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PortalPanel } from "@/components/portal/PortalPanel";
import { PortalShell } from "@/components/portal/PortalShell";
import { inspections, portalClient } from "@/lib/portal-data";

export default function PortalAMCPage() {
  return (
    <PortalShell activeHref="/portal/amc" title="AMC & Services" description="Current AMC plan details, service history, renewals, and next scheduled maintenance.">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="p-7">
          <Badge>Active Plan</Badge>
          <h2 className="mt-4 text-h3 font-black">{portalClient.plan}</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">Bi-monthly exhaust hygiene service with priority scheduling, reports, photo evidence, and WhatsApp support.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {["Renewal: Jan 04, 2027", "Frequency: Bi-monthly", "Site: Main kitchen", "Support: Priority"].map((item) => (
              <div key={item} className="rounded-lg border border-border bg-background/45 p-4 text-sm font-bold text-muted-foreground">
                {item}
              </div>
            ))}
          </div>
        </Card>
        <PortalPanel title="Next Service Window" description="Next visit is planned for July 8, 2026 between 11:30 PM and 4:30 AM." action="Reschedule">
          <div className="flex items-center gap-4 rounded-lg border border-primary/30 bg-primary/10 p-5">
            <CalendarClock className="text-primary" aria-hidden />
            <div>
              <p className="font-black">14 days remaining</p>
              <p className="text-sm text-muted-foreground">Engineering team and chef contact will be notified.</p>
            </div>
          </div>
        </PortalPanel>
      </div>
      <div className="mt-8">
        <PortalPanel title="Service History" description="Recent AMC-linked services.">
          <div className="grid gap-4 md:grid-cols-2">
            {inspections.map((item) => (
              <div key={item.id} className="flex gap-4 rounded-lg border border-border bg-background/45 p-4">
                <CheckCircle2 className="text-primary" aria-hidden />
                <div>
                  <h3 className="font-black">{item.type}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.date} | {item.score}</p>
                </div>
              </div>
            ))}
          </div>
        </PortalPanel>
      </div>
    </PortalShell>
  );
}
