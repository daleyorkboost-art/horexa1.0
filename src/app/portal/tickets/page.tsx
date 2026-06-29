import { MessageSquarePlus } from "lucide-react";
import { PortalPanel } from "@/components/portal/PortalPanel";
import { PortalShell } from "@/components/portal/PortalShell";
import { PortalTable } from "@/components/portal/PortalTable";

export default function PortalTicketsPage() {
  return (
    <PortalShell activeHref="/portal/tickets" title="Support Tickets" description="Raise report, billing, AMC scheduling and site-access requests for the Horexa operations team.">
      <PortalPanel title="Ticket Workflow" description="Ticket creation will connect to the existing portal ticket API after authenticated client ownership rules are finalized.">
        <div className="flex items-center gap-3 text-sm font-bold text-primary">
          <MessageSquarePlus aria-hidden />
          No support tickets yet.
        </div>
      </PortalPanel>
      <div className="mt-8">
        <PortalTable title="Ticket History" columns={["id", "subject", "priority", "status", "updated"]} rows={[]} />
      </div>
    </PortalShell>
  );
}
