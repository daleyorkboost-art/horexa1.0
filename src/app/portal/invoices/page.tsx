import { PortalInvoicesView } from "@/components/portal/PortalClientViews";
import { PortalShell } from "@/components/portal/PortalShell";

export default function PortalInvoicesPage() {
  return (
    <PortalShell activeHref="/portal/invoices" title="Invoices & Payments" description="Invoice history, payment status, receipts, and AMC billing records.">
      <PortalInvoicesView />
    </PortalShell>
  );
}
