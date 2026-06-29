import { PortalNotificationsView } from "@/components/portal/PortalClientViews";
import { PortalShell } from "@/components/portal/PortalShell";

export default function PortalNotificationsPage() {
  return (
    <PortalShell activeHref="/portal/notifications" title="Notifications" description="Inspection, report, ticket, invoice, and system updates for your account.">
      <PortalNotificationsView />
    </PortalShell>
  );
}
