import { Upload } from "lucide-react";
import { PortalPanel } from "@/components/portal/PortalPanel";
import { PortalShell } from "@/components/portal/PortalShell";
import { PortalTable } from "@/components/portal/PortalTable";
import { documents } from "@/lib/portal-data";

export default function PortalDocumentsPage() {
  return (
    <PortalShell activeHref="/portal/documents" title="Documents" description="Certificates, contracts, NOC documents, safety records, and site files.">
      <PortalPanel title="Document Vault" description="Upload and download UI is prepared for secure storage integration." action="Upload Document">
        <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-primary/40 bg-primary/5 text-center text-sm text-muted-foreground">
          <Upload className="text-primary" aria-hidden />
          Drop compliance files here or click to upload
          <input type="file" className="sr-only" />
        </label>
      </PortalPanel>
      <div className="mt-8">
        <PortalTable title="Shared Documents" columns={["name", "category", "updated", "owner"]} rows={documents} />
      </div>
    </PortalShell>
  );
}
