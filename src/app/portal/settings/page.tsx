import { PortalProfileView } from "@/components/portal/PortalClientViews";
import { PortalShell } from "@/components/portal/PortalShell";

export default function PortalSettingsPage() {
  return (
    <PortalShell activeHref="/portal/settings" title="Profile Settings" description="Update account details, password, notification channels, and portal preferences.">
      <PortalProfileView />
    </PortalShell>
  );
}
