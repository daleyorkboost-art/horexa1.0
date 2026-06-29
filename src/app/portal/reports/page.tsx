import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PortalPanel } from "@/components/portal/PortalPanel";
import { PortalShell } from "@/components/portal/PortalShell";
import { PortalTable } from "@/components/portal/PortalTable";

export default function PortalReportsPage() {
  return (
    <PortalShell activeHref="/portal/reports" title="Reports" description="Search and download inspection reports, photo packs, and compliance summaries.">
      <PortalPanel title="Report Library" description="Report search is ready for API-backed document records.">
        <div className="flex max-w-xl items-center gap-3 rounded-lg border border-border bg-input px-3">
          <Search className="text-muted-foreground" aria-hidden />
          <Input className="border-0 bg-transparent focus-visible:ring-0" placeholder="Search reports..." />
        </div>
      </PortalPanel>
      <div className="mt-8">
        <PortalTable title="Available Downloads" columns={["name", "type", "date", "size", "status"]} rows={[]} />
      </div>
    </PortalShell>
  );
}
