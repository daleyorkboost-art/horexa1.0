import { PortalComplianceView } from "@/components/portal/PortalClientViews";
import { PortalShell } from "@/components/portal/PortalShell";

export default function PortalCompliancePage() {
  return (
    <PortalShell activeHref="/portal/compliance" title="Compliance" description="Track audit readiness, score breakdown, and current NOC/compliance status.">
      <PortalComplianceView />
    </PortalShell>
  );
}
