import { CalendarPlus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/portal/MetricCard";
import { PortalPanel } from "@/components/portal/PortalPanel";
import { PortalShell } from "@/components/portal/PortalShell";
import { PortalTable } from "@/components/portal/PortalTable";
import { inspections, kpis } from "@/lib/portal-data";

export default function PortalInspectionsPage() {
  return (
    <PortalShell activeHref="/portal/inspections" title="Inspections" description="View full inspection history, filter by service type, and download reports.">
      <div className="grid gap-5 md:grid-cols-3">
        {kpis.slice(0, 3).map((kpi) => (
          <MetricCard key={kpi.label} {...kpi} />
        ))}
      </div>
      <div className="mt-8">
        <PortalPanel title="Inspection Filters" description="Static UI controls now, ready for API-backed filtering later.">
          <div className="flex flex-wrap gap-3">
            <Button variant="outline"><Filter data-icon="inline-start" /> All Types</Button>
            <Button variant="outline">This Year</Button>
            <Button variant="outline">Completed</Button>
            <Button><CalendarPlus data-icon="inline-start" /> Request Inspection</Button>
          </div>
        </PortalPanel>
      </div>
      <div className="mt-8">
        <PortalTable title="Inspection History" columns={["id", "date", "type", "inspector", "score", "status", "report"]} rows={inspections} />
      </div>
    </PortalShell>
  );
}
