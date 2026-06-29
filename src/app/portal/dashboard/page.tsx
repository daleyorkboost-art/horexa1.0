import { Activity, ClipboardCheck, Gauge } from "lucide-react";
import { ComplianceDonut } from "@/components/portal/ComplianceDonut";
import { PortalShell } from "@/components/portal/PortalShell";
import { PortalTable } from "@/components/portal/PortalTable";
import { TrendChart } from "@/components/portal/TrendChart";
import { EmptyState, MetricCard } from "@/design-system";

export default function PortalDashboardPage() {
  return (
    <PortalShell
      activeHref="/portal/dashboard"
      title="Compliance Dashboard"
      description="Overview of AMC inspections, hygiene scores, reports, tickets, and upcoming maintenance activity."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total Inspections" value="0" helper="Awaiting client records" icon={ClipboardCheck} />
        <MetricCard label="Compliance Score" value="0%" helper="No score calculated yet" icon={Gauge} tone="warning" />
        <MetricCard label="Next Inspection" value="--" helper="No visit scheduled" icon={Activity} />
        <MetricCard label="Open Tickets" value="0" helper="No active support tickets" icon={Activity} />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <ComplianceDonut />
        <TrendChart />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <PortalTable
          title="Recent Inspections"
          columns={["id", "date", "type", "inspector", "score", "status", "report"]}
          rows={[]}
        />
        <EmptyState
          title="No recent activity"
          description="Inspection, report, ticket, and document events will appear after the portal is connected to live client data."
        />
      </div>
    </PortalShell>
  );
}
