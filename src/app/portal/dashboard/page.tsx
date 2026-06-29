import { PortalDashboardView } from "@/components/portal/PortalClientViews";
import { PortalShell } from "@/components/portal/PortalShell";

export default function PortalDashboardPage() {
  return (
    <PortalShell
      activeHref="/portal/dashboard"
      title="Compliance Dashboard"
      description="Overview of AMC inspections, hygiene scores, reports, tickets, and upcoming maintenance activity."
    >
      <PortalDashboardView />
    </PortalShell>
  );
}
