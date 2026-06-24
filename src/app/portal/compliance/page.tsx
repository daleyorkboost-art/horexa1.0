import { CheckCircle2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ComplianceDonut } from "@/components/portal/ComplianceDonut";
import { PortalPanel } from "@/components/portal/PortalPanel";
import { PortalShell } from "@/components/portal/PortalShell";
import { complianceBreakdown, auditChecklist } from "@/lib/portal-data";

export default function PortalCompliancePage() {
  return (
    <PortalShell activeHref="/portal/compliance" title="Compliance" description="Track audit readiness, score breakdown, and current NOC/compliance status.">
      <ComplianceDonut />
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <PortalPanel title="Audit Readiness Checklist" description="Checklist items can later sync to inspection workflows.">
          <div className="flex flex-col gap-4">
            {auditChecklist.map((item) => (
              <div key={item.item} className="flex items-center gap-4 rounded-lg border border-border bg-background/45 p-4">
                {item.status === "Complete" ? <CheckCircle2 className="text-success" aria-hidden /> : <Clock className="text-warning" aria-hidden />}
                <span className="flex-1 text-sm font-bold">{item.item}</span>
                <Badge variant={item.status === "Complete" ? "success" : "warning"}>{item.status}</Badge>
              </div>
            ))}
          </div>
        </PortalPanel>
        <Card className="p-6">
          <h2 className="text-2xl font-black">Score Breakdown</h2>
          <div className="mt-6 flex flex-col gap-5">
            {complianceBreakdown.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-bold">{item.label}</span>
                  <span className="text-primary">{item.value}%</span>
                </div>
                <div className="h-3 rounded-full bg-border">
                  <div className="h-full rounded-full bg-orange-sheen" style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PortalShell>
  );
}
