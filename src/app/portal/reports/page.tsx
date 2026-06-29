import { PortalReportsView } from "@/components/portal/PortalClientViews";
import { PortalShell } from "@/components/portal/PortalShell";

export default function PortalReportsPage() {
  return (
    <PortalShell activeHref="/portal/reports" title="Reports" description="Search and download inspection reports, photo packs, and compliance summaries.">
      <PortalReportsView />
    </PortalShell>
  );
}
