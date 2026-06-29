import { CreditCard, Download } from "lucide-react";
import { PortalPanel } from "@/components/portal/PortalPanel";
import { PortalShell } from "@/components/portal/PortalShell";
import { PortalTable } from "@/components/portal/PortalTable";
import { MetricCard } from "@/design-system";

export default function PortalInvoicesPage() {
  return (
    <PortalShell activeHref="/portal/invoices" title="Invoices & Payments" description="Invoice history, payment status, receipts, and AMC billing records.">
      <div className="grid gap-5 md:grid-cols-3">
        <MetricCard label="Paid" value="0" helper="No invoice records" icon={CreditCard} />
        <MetricCard label="Outstanding" value="0" helper="No overdue invoices" icon={CreditCard} />
        <MetricCard label="Receipts" value="0" helper="No downloads available" icon={Download} />
      </div>
      <div className="mt-8">
        <PortalTable title="Invoice History" columns={["id", "date", "amount", "status", "due"]} rows={[]} />
      </div>
      <div className="mt-8">
        <PortalPanel title="Billing Preferences" description="Billing contacts and invoice-copy rules will be managed after client profile data is connected." />
      </div>
    </PortalShell>
  );
}
