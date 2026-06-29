import { PortalAMCView } from "@/components/portal/PortalClientViews";
import { PortalShell } from "@/components/portal/PortalShell";

export default function PortalAMCPage() {
  return (
    <PortalShell activeHref="/portal/amc" title="AMC & Services" description="Current AMC plan details, service history, renewals, and next scheduled maintenance.">
      <PortalAMCView />
    </PortalShell>
  );
}
