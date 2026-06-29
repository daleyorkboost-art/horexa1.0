import { PortalInspectionsView } from "@/components/portal/PortalClientViews";
import { PortalShell } from "@/components/portal/PortalShell";

export default function PortalInspectionsPage() {
  return (
    <PortalShell activeHref="/portal/inspections" title="Inspections" description="View full inspection history, filter by service type, and download reports.">
      <PortalInspectionsView />
    </PortalShell>
  );
}
