import { Upload } from "lucide-react";
import { PortalPanel } from "@/components/portal/PortalPanel";
import { PortalShell } from "@/components/portal/PortalShell";
import { PortalTable } from "@/components/portal/PortalTable";

export default function PortalDocumentsPage() {
  return (
    <PortalShell activeHref="/portal/documents" title="Documents" description="Certificates, contracts, NOC documents, safety records, and site files.">
      <PortalPanel title="Document Vault" description="Secure upload and download workflows will connect to the existing upload and document APIs in the next phase.">
        <div className="flex items-center gap-3 text-sm font-bold text-primary">
          <Upload aria-hidden />
          Production storage integration pending.
        </div>
      </PortalPanel>
      <div className="mt-8">
        <PortalTable title="Shared Documents" columns={["name", "category", "updated", "owner"]} rows={[]} />
      </div>
    </PortalShell>
  );
}
