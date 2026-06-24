import { ActivityFeed } from "@/components/portal/ActivityFeed";
import { ComplianceDonut } from "@/components/portal/ComplianceDonut";
import { MetricCard } from "@/components/portal/MetricCard";
import { PortalShell } from "@/components/portal/PortalShell";
import { PortalTable } from "@/components/portal/PortalTable";
import { TrendChart } from "@/components/portal/TrendChart";
import { inspections, kpis } from "@/lib/portal-data";

export default function PortalDashboardPage() {
  return (
    <PortalShell
      activeHref="/portal/dashboard"
      title="Compliance Dashboard"
      description="Overview of AMC inspections, hygiene scores, reports, tickets, and upcoming maintenance activity."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <MetricCard key={kpi.label} {...kpi} />
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <ComplianceDonut />
        <TrendChart />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <PortalTable
          title="Recent Inspections"
          columns={["id", "date", "type", "inspector", "score", "status", "report"]}
          rows={inspections}
        />
        <ActivityFeed />
      </div>
    </PortalShell>
  );
}
