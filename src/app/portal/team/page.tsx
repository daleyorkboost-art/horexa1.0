import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortalPanel } from "@/components/portal/PortalPanel";
import { PortalShell } from "@/components/portal/PortalShell";
import { PortalTable } from "@/components/portal/PortalTable";
import { teamMembers } from "@/lib/portal-data";

export default function PortalTeamPage() {
  return (
    <PortalShell activeHref="/portal/team" title="Team Access" description="Manage client-side users, roles, and permissions for AMC records.">
      <PortalPanel title="Access Controls" description="Invite team members and assign access scopes when backend auth is connected." action="Invite Member">
        <div className="flex flex-wrap gap-3">
          <Button variant="outline"><UserPlus data-icon="inline-start" /> Add Operations User</Button>
          <Button variant="outline">Export Access Log</Button>
          <Button variant="outline">Review Permissions</Button>
        </div>
      </PortalPanel>
      <div className="mt-8">
        <PortalTable title="Authorized Team Members" columns={["name", "role", "email", "access"]} rows={teamMembers} />
      </div>
    </PortalShell>
  );
}
