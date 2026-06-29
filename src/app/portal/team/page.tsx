import { PortalTeamView } from "@/components/portal/PortalClientViews";
import { PortalShell } from "@/components/portal/PortalShell";

export default function PortalTeamPage() {
  return (
    <PortalShell activeHref="/portal/team" title="Team Access" description="Manage client-side users, roles, and permissions for AMC records.">
      <PortalTeamView />
    </PortalShell>
  );
}
