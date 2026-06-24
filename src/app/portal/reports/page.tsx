import { Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PortalPanel } from "@/components/portal/PortalPanel";
import { PortalShell } from "@/components/portal/PortalShell";
import { PortalTable } from "@/components/portal/PortalTable";
import { reports } from "@/lib/portal-data";

export default function PortalReportsPage() {
  return (
    <PortalShell activeHref="/portal/reports" title="Reports" description="Search and download inspection reports, photo packs, and compliance summaries.">
      <PortalPanel title="Report Library" description="Documents are static placeholders until the report API is connected." action="Upload Request">
        <div className="flex max-w-xl items-center gap-3 rounded-lg border border-border bg-input px-3">
          <Search className="text-muted-foreground" aria-hidden />
          <Input className="border-0 bg-transparent focus-visible:ring-0" placeholder="Search reports..." />
        </div>
      </PortalPanel>
      <div className="mt-8">
        <PortalTable title="Available Downloads" columns={["name", "type", "date", "size", "status"]} rows={reports} />
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {reports.slice(0, 3).map((report) => (
          <PortalPanel key={report.name} title={report.name} description={`${report.type} | ${report.size}`} action="Download">
            <Download className="text-primary" aria-hidden />
          </PortalPanel>
        ))}
      </div>
    </PortalShell>
  );
}
