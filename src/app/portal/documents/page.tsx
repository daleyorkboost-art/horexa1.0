import { PortalDocumentsView } from "@/components/portal/PortalClientViews";
import { PortalShell } from "@/components/portal/PortalShell";

export default function PortalDocumentsPage() {
  return (
    <PortalShell activeHref="/portal/documents" title="Documents" description="Certificates, contracts, NOC documents, safety records, and site files.">
      <PortalDocumentsView />
    </PortalShell>
  );
}
