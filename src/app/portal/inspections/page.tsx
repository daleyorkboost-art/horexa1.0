import { CalendarPlus, ClipboardCheck, FileText, Gauge } from "lucide-react";
import { PortalPanel } from "@/components/portal/PortalPanel";
import { PortalShell } from "@/components/portal/PortalShell";
import { PortalTable } from "@/components/portal/PortalTable";
import { MetricCard } from "@/design-system";

export default function PortalInspectionsPage() {
  return (
    <PortalShell activeHref="/portal/inspections" title="Inspections" description="View full inspection history, filter by service type, and download reports.">
      <div className="grid gap-5 md:grid-cols-3">
        <MetricCard label="Completed" value="0" helper="No inspection records" icon={ClipboardCheck} />
        <MetricCard label="Average Score" value="0%" helper="No reports scored" icon={Gauge} tone="warning" />
        <MetricCard label="Reports" value="0" helper="No downloads available" icon={FileText} />
      </div>
      <div className="mt-8">
        <PortalPanel title="Inspection Request Workflow" description="Scheduling controls will be enabled after authenticated client records and availability rules are connected.">
          <div className="flex items-center gap-3 text-sm font-bold text-primary">
            <CalendarPlus aria-hidden />
            API-backed inspection scheduling pending next phase.
          </div>
        </PortalPanel>
      </div>
      <div className="mt-8">
        <PortalTable title="Inspection History" columns={["id", "date", "type", "inspector", "score", "status", "report"]} rows={[]} />
      </div>
    </PortalShell>
  );
}
