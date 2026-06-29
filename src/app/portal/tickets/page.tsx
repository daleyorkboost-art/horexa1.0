import { PortalTicketsView } from "@/components/portal/PortalClientViews";
import { PortalShell } from "@/components/portal/PortalShell";

export default function PortalTicketsPage() {
  return (
    <PortalShell activeHref="/portal/tickets" title="Support Tickets" description="Raise report, billing, AMC scheduling and site-access requests for the Horexa operations team.">
      <PortalTicketsView />
    </PortalShell>
  );
}
