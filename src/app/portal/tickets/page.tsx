import { MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PortalPanel } from "@/components/portal/PortalPanel";
import { PortalShell } from "@/components/portal/PortalShell";
import { PortalTable } from "@/components/portal/PortalTable";
import { tickets } from "@/lib/portal-data";

export default function PortalTicketsPage() {
  return (
    <PortalShell activeHref="/portal/tickets" title="Support Tickets" description="Raise report, billing, AMC scheduling and site-access requests for the Horexa operations team.">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <PortalPanel title="Create Ticket" description="Share the asset, urgency and preferred service window so Horexa can route the request correctly.">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="ticket-subject">Subject</Label>
              <Input id="ticket-subject" placeholder="Banquet duct access panel review" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="ticket-priority">Priority</Label>
                <select id="ticket-priority" className="min-h-12 rounded-lg border border-border bg-input px-4 text-foreground">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="ticket-module">Module</Label>
                <select id="ticket-module" className="min-h-12 rounded-lg border border-border bg-input px-4 text-foreground">
                  <option>Reports</option>
                  <option>Inspection</option>
                  <option>Billing</option>
                  <option>AMC Schedule</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="ticket-message">Message</Label>
              <Textarea id="ticket-message" placeholder="Describe the kitchen area, issue, urgency and preferred response window." />
            </div>
            <Button type="submit"><MessageSquarePlus data-icon="inline-start" /> Submit Ticket</Button>
          </form>
        </PortalPanel>
        <PortalPanel title="Support SLA" description="Risk Control AMC clients receive priority response for safety and service continuity issues." action="WhatsApp Support">
          <div className="grid gap-4 sm:grid-cols-3">
            {["Urgent: 2h", "High: Same Day", "Normal: 24h"].map((item) => (
              <div key={item} className="rounded-lg border border-border bg-background/45 p-4 text-center font-black text-primary">
                {item}
              </div>
            ))}
          </div>
        </PortalPanel>
      </div>
      <div className="mt-8">
        <PortalTable title="Ticket History" columns={["id", "subject", "priority", "status", "updated"]} rows={tickets} />
      </div>
    </PortalShell>
  );
}
