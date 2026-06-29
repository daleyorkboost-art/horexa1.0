import { UserPlus } from "lucide-react";
import { PortalPanel } from "@/components/portal/PortalPanel";
import { PortalShell } from "@/components/portal/PortalShell";
import { PortalTable } from "@/components/portal/PortalTable";

export default function PortalTeamPage() {
  return (
    <PortalShell activeHref="/portal/team" title="Team Access" description="Manage client-side users, roles, and permissions for AMC records.">
      <PortalPanel title="Access Controls" description="Invite and permission workflows will be enabled after client account policy is finalized.">
        <div className="flex items-center gap-3 text-sm font-bold text-primary">
          <UserPlus aria-hidden />
          No team members configured.
        </div>
      </PortalPanel>
      <div className="mt-8">
        <PortalTable title="Authorized Team Members" columns={["name", "role", "email", "access"]} rows={[]} />
      </div>
    </PortalShell>
  );
}
