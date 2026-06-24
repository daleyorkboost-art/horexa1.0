import { CreditCard, Download } from "lucide-react";
import { MetricCard } from "@/components/portal/MetricCard";
import { PortalPanel } from "@/components/portal/PortalPanel";
import { PortalShell } from "@/components/portal/PortalShell";
import { PortalTable } from "@/components/portal/PortalTable";
import { invoices } from "@/lib/portal-data";

export default function PortalInvoicesPage() {
  return (
    <PortalShell activeHref="/portal/invoices" title="Invoices & Payments" description="Invoice history, payment status, receipts, and AMC billing records.">
      <div className="grid gap-5 md:grid-cols-3">
        <MetricCard label="FY 2026 Paid" value="₹1.44L" helper="All invoices settled" icon={CreditCard} tone="success" />
        <MetricCard label="Outstanding" value="₹0" helper="No overdue invoices" icon={CreditCard} tone="primary" />
        <MetricCard label="Receipts" value="4" helper="Available to download" icon={Download} tone="warning" />
      </div>
      <div className="mt-8">
        <PortalTable title="Invoice History" columns={["id", "date", "amount", "status", "due"]} rows={invoices} />
      </div>
      <div className="mt-8">
        <PortalPanel title="Billing Preferences" description="Invoices are currently sent to finance@grandmeridian.in with copies to operations." action="Update Billing Email" />
      </div>
    </PortalShell>
  );
}
