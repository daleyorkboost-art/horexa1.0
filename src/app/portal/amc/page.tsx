import { CalendarClock } from "lucide-react";
import { PortalPanel } from "@/components/portal/PortalPanel";
import { PortalShell } from "@/components/portal/PortalShell";
import { PortalTable } from "@/components/portal/PortalTable";
import { EmptyState } from "@/design-system";

export default function PortalAMCPage() {
  return (
    <PortalShell activeHref="/portal/amc" title="AMC & Services" description="Current AMC plan details, service history, renewals, and next scheduled maintenance.">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <EmptyState
          icon={CalendarClock}
          title="No AMC plan linked"
          description="The active contract summary will appear after the authenticated client account is linked to an AMC plan."
        />
        <PortalPanel title="Next Service Window" description="Upcoming visit details will be calculated from live inspection schedules.">
          <div className="flex items-center gap-3 text-sm font-bold text-primary">
            <CalendarClock aria-hidden />
            No scheduled service window.
          </div>
        </PortalPanel>
      </div>
      <div className="mt-8">
        <PortalTable title="Service History" columns={["id", "date", "type", "inspector", "score", "status", "report"]} rows={[]} />
      </div>
    </PortalShell>
  );
}
