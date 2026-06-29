import { ShieldCheck } from "lucide-react";
import { ComplianceDonut } from "@/components/portal/ComplianceDonut";
import { PortalPanel } from "@/components/portal/PortalPanel";
import { PortalShell } from "@/components/portal/PortalShell";
import { EmptyState } from "@/design-system";

export default function PortalCompliancePage() {
  return (
    <PortalShell activeHref="/portal/compliance" title="Compliance" description="Track audit readiness, score breakdown, and current NOC/compliance status.">
      <ComplianceDonut />
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <PortalPanel title="Audit Readiness Checklist" description="Checklist items will sync to inspection and compliance workflows.">
          <EmptyState
            icon={ShieldCheck}
            title="No checklist records"
            description="Audit readiness items will appear after compliance records are connected."
          />
        </PortalPanel>
        <EmptyState
          title="No score breakdown"
          description="Compliance categories will be calculated from inspection reports and records."
        />
      </div>
    </PortalShell>
  );
}
