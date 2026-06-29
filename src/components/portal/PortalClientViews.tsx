"use client";

import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import {
  Activity,
  Bell,
  CalendarClock,
  ClipboardCheck,
  CreditCard,
  FileArchive,
  FileText,
  Gauge,
  LifeBuoy,
  ShieldCheck,
  UserPlus,
  Users,
} from "lucide-react";
import { ComplianceDonut } from "@/components/portal/ComplianceDonut";
import { PortalDownloadLink } from "@/components/portal/PortalDownloadLink";
import { PortalPanel } from "@/components/portal/PortalPanel";
import { PortalTable } from "@/components/portal/PortalTable";
import { TrendChart } from "@/components/portal/TrendChart";
import { Button, EmptyState, Input, Label, MetricCard, Textarea } from "@/design-system";

type ApiEnvelope<T> = { data: T; error?: { message?: string } };
type ClientRecord = {
  id: string;
  companyName: string;
  contactName?: string | null;
  email?: string | null;
  phone?: string | null;
  city?: string | null;
  address?: string | null;
  amcPlan?: AmcPlan | null;
};
type AmcPlan = { name: string; audience: string; frequency: string; description: string; features?: string[]; priceLabel?: string | null };
type Inspection = {
  id: string;
  inspectionId: string;
  type: string;
  inspector: string;
  score: number;
  reportUrl?: string | null;
  recommendations?: string | null;
  status: string;
  scheduledAt?: string | null;
  completedAt?: string | null;
  createdAt: string;
};
type Compliance = { id: string; category: string; score: number; status: string; notes?: string | null; checkedAt: string };
type DocumentItem = { id: string; title: string; category: string; fileUrl: string; fileType: string; fileSize?: number | null; uploadedBy?: string | null; createdAt: string };
type Invoice = { id: string; invoiceNo: string; amount: string | number; currency: string; status: string; dueDate?: string | null; paidAt?: string | null; pdfUrl?: string | null; createdAt: string };
type Ticket = { id: string; subject: string; message: string; priority: string; status: string; createdAt: string; updatedAt: string };
type TeamMember = { id: string; title?: string | null; permissions: string[]; status: string; createdAt: string; user: { name?: string | null; email?: string | null; phone?: string | null } };
type Notification = { id: string; type: string; title: string; body: string; readAt?: string | null; createdAt: string };

function usePortalApi<T>(url: string, refreshKey = 0) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");
    fetch(url, { cache: "no-store" })
      .then(async (response) => {
        const payload = (await response.json()) as ApiEnvelope<T>;
        if (!response.ok) throw new Error(payload.error?.message ?? "Unable to load portal records");
        return payload.data;
      })
      .then((payload) => mounted && setData(payload))
      .catch((err) => mounted && setError(err instanceof Error ? err.message : "Unable to load portal records"))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [url, refreshKey]);

  return { data, loading, error };
}

function StatusMessage({ loading, error }: { loading: boolean; error: string }) {
  if (loading) return <EmptyState title="Loading records" description="Fetching the latest portal data from the database." />;
  if (error) return <EmptyState title="Unable to load records" description={error} />;
  return null;
}

function formatDate(value?: string | null) {
  if (!value) return "Not set";
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(new Date(value));
}

function formatMoney(value: string | number, currency = "INR") {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency, maximumFractionDigits: 0 }).format(Number(value));
}

function bytes(value?: number | null) {
  if (!value) return "Unknown";
  if (value < 1024 * 1024) return `${Math.round(value / 1024)} KB`;
  return `${(value / (1024 * 1024)).toFixed(1)} MB`;
}

function inspectionRows(items: Inspection[]) {
  return items.map((item) => ({
    id: item.inspectionId,
    date: formatDate(item.completedAt ?? item.scheduledAt ?? item.createdAt),
    type: item.type,
    inspector: item.inspector,
    score: `${item.score}%`,
    status: titleCase(item.status),
    report: <PortalDownloadLink href={item.reportUrl} label="Report" />,
  }));
}

function titleCase(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function RefreshableSubmit({
  children,
  status,
}: {
  children: ReactNode;
  status: { submitting: boolean; message: string; error: string };
}) {
  return (
    <div className="space-y-3">
      {children}
      {status.message ? <p className="text-sm font-bold text-success">{status.message}</p> : null}
      {status.error ? <p className="text-sm font-bold text-destructive">{status.error}</p> : null}
    </div>
  );
}

export function PortalDashboardView() {
  const { data, loading, error } = usePortalApi<{
    client: ClientRecord | null;
    metrics: { totalInspections: number; complianceScore: number | null; nextInspection: Inspection | null; openTickets: number };
    compliance: Compliance[];
    recentInspections: Inspection[];
    documents: DocumentItem[];
  }>("/api/portal/dashboard");

  const trend = useMemo(() => buildTrend(data?.recentInspections ?? []), [data]);
  const score = data?.metrics.complianceScore ?? 0;

  return (
    <>
      <StatusMessage loading={loading} error={error} />
      {data ? (
        <>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard label="Total Inspections" value={String(data.metrics.totalInspections)} helper={data.client?.companyName ?? "Client account"} icon={ClipboardCheck} />
            <MetricCard label="Compliance Score" value={`${score}%`} helper={score ? "Current recorded average" : "No scored records"} icon={Gauge} tone={score >= 85 ? "success" : "warning"} />
            <MetricCard label="Next Inspection" value={data.metrics.nextInspection ? formatDate(data.metrics.nextInspection.scheduledAt) : "Not set"} helper={data.metrics.nextInspection?.type ?? "No scheduled visit"} icon={Activity} />
            <MetricCard label="Open Tickets" value={String(data.metrics.openTickets)} helper="Active support requests" icon={LifeBuoy} />
          </div>
          <div className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <ComplianceDonut score={score} breakdown={complianceBreakdown(data.compliance)} />
            <TrendChart data={trend} />
          </div>
          <div className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <PortalTable title="Recent Inspections" columns={["id", "date", "type", "inspector", "score", "status", "report"]} rows={inspectionRows(data.recentInspections)} />
            <PortalTable
              title="Recent Documents"
              columns={["name", "category", "updated", "download"]}
              rows={data.documents.map((item) => ({
                name: item.title,
                category: item.category,
                updated: formatDate(item.createdAt),
                download: <PortalDownloadLink href={item.fileUrl} />,
              }))}
            />
          </div>
        </>
      ) : null}
    </>
  );
}

export function PortalReportsView() {
  const [search, setSearch] = useState("");
  const { data, loading, error } = usePortalApi<{ items: Inspection[] }>("/api/portal/reports");
  const items = (data?.items ?? []).filter((item) => [item.inspectionId, item.type, item.inspector, item.status].join(" ").toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <PortalPanel title="Report Library" description="Search inspection reports and download available files.">
        <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search reports..." aria-label="Search reports" />
      </PortalPanel>
      <div className="mt-8">
        <StatusMessage loading={loading} error={error} />
        {data ? <PortalTable title="Available Downloads" columns={["id", "type", "date", "score", "status", "download"]} rows={inspectionRows(items).map(({ report, ...row }) => ({ ...row, download: report }))} /> : null}
      </div>
    </>
  );
}

export function PortalInspectionsView() {
  const { data, loading, error } = usePortalApi<{ items: Inspection[] }>("/api/portal/reports");
  const items = data?.items ?? [];
  const completed = items.filter((item) => item.status === "COMPLETED");
  const average = completed.length ? Math.round(completed.reduce((sum, item) => sum + item.score, 0) / completed.length) : 0;

  return (
    <>
      <div className="grid gap-5 md:grid-cols-3">
        <MetricCard label="Completed" value={String(completed.length)} helper="Completed inspection records" icon={ClipboardCheck} />
        <MetricCard label="Average Score" value={`${average}%`} helper={completed.length ? "Average of completed reports" : "No completed reports"} icon={Gauge} tone={average >= 85 ? "success" : "warning"} />
        <MetricCard label="Reports" value={String(items.filter((item) => item.reportUrl).length)} helper="Available downloads" icon={FileText} />
      </div>
      <div className="mt-8">
        <StatusMessage loading={loading} error={error} />
        {data ? <PortalTable title="Inspection History" columns={["id", "date", "type", "inspector", "score", "status", "report"]} rows={inspectionRows(items)} /> : null}
      </div>
    </>
  );
}

export function PortalAMCView() {
  const { data, loading, error } = usePortalApi<{ client: ClientRecord | null; plan: AmcPlan | null; nextService: Inspection | null; serviceHistory: Inspection[]; invoices: Invoice[] }>("/api/portal/amc");

  return (
    <>
      <StatusMessage loading={loading} error={error} />
      {data ? (
        <>
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <PortalPanel title={data.plan?.name ?? "AMC Plan"} description={data.plan?.description ?? "No AMC plan is linked to this client account."}>
              {data.plan ? (
                <div className="grid gap-3 text-sm">
                  <p><strong>Audience:</strong> {data.plan.audience}</p>
                  <p><strong>Frequency:</strong> {data.plan.frequency}</p>
                  <p><strong>Commercials:</strong> {data.plan.priceLabel ?? "As per contract"}</p>
                  {data.plan.features?.length ? <ul className="grid gap-2">{data.plan.features.map((item) => <li key={item} className="text-muted-foreground">{item}</li>)}</ul> : null}
                </div>
              ) : null}
            </PortalPanel>
            <PortalPanel title="Next Service Window" description={data.nextService ? data.nextService.type : "No scheduled service is currently recorded."}>
              <div className="flex items-center gap-3 text-sm font-bold text-primary">
                <CalendarClock aria-hidden />
                {data.nextService ? `${formatDate(data.nextService.scheduledAt)} with ${data.nextService.inspector}` : "No scheduled service window"}
              </div>
            </PortalPanel>
          </div>
          <div className="mt-8">
            <PortalTable title="Service History" columns={["id", "date", "type", "inspector", "score", "status", "report"]} rows={inspectionRows(data.serviceHistory)} />
          </div>
        </>
      ) : null}
    </>
  );
}

export function PortalComplianceView() {
  const { data, loading, error } = usePortalApi<{ score: number | null; breakdown: { label: string; value: number }[]; items: Compliance[] }>("/api/portal/compliance");

  return (
    <>
      <StatusMessage loading={loading} error={error} />
      {data ? (
        <>
          <ComplianceDonut score={data.score ?? 0} breakdown={data.breakdown} />
          <div className="mt-8">
            <PortalTable
              title="Compliance Records"
              columns={["category", "score", "status", "checked", "notes"]}
              rows={data.items.map((item) => ({
                category: item.category,
                score: `${item.score}%`,
                status: titleCase(item.status),
                checked: formatDate(item.checkedAt),
                notes: item.notes ?? "No notes",
              }))}
            />
          </div>
        </>
      ) : null}
    </>
  );
}

export function PortalInvoicesView() {
  const { data, loading, error } = usePortalApi<{ items: Invoice[] }>("/api/portal/invoices");
  const items = data?.items ?? [];
  const paid = items.filter((item) => item.status === "PAID");
  const outstanding = items.filter((item) => ["SENT", "OVERDUE"].includes(item.status));

  return (
    <>
      <div className="grid gap-5 md:grid-cols-3">
        <MetricCard label="Paid" value={String(paid.length)} helper="Paid invoices" icon={CreditCard} tone="success" />
        <MetricCard label="Outstanding" value={String(outstanding.length)} helper={formatMoney(outstanding.reduce((sum, item) => sum + Number(item.amount), 0))} icon={CreditCard} tone={outstanding.length ? "warning" : "success"} />
        <MetricCard label="Receipts" value={String(items.filter((item) => item.pdfUrl).length)} helper="Invoice PDFs available" icon={FileArchive} />
      </div>
      <div className="mt-8">
        <StatusMessage loading={loading} error={error} />
        {data ? (
          <PortalTable
            title="Invoice History"
            columns={["invoice", "date", "amount", "status", "due", "download"]}
            rows={items.map((item) => ({
              invoice: item.invoiceNo,
              date: formatDate(item.createdAt),
              amount: formatMoney(item.amount, item.currency),
              status: titleCase(item.status),
              due: formatDate(item.dueDate),
              download: <PortalDownloadLink href={item.pdfUrl} label="PDF" />,
            }))}
          />
        ) : null}
      </div>
    </>
  );
}

export function PortalDocumentsView() {
  const [refresh, setRefresh] = useState(0);
  const [status, setStatus] = useState({ submitting: false, message: "", error: "" });
  const { data, loading, error } = usePortalApi<{ items: DocumentItem[] }>("/api/portal/documents", refresh);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ submitting: true, message: "", error: "" });
    const formData = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/portal/documents", { method: "POST", body: formData });
      const payload = (await response.json()) as ApiEnvelope<unknown>;
      if (!response.ok) throw new Error(payload.error?.message ?? "Document upload failed");
      event.currentTarget.reset();
      setStatus({ submitting: false, message: "Document uploaded.", error: "" });
      setRefresh((value) => value + 1);
    } catch (err) {
      setStatus({ submitting: false, message: "", error: err instanceof Error ? err.message : "Document upload failed" });
    }
  }

  return (
    <>
      <PortalPanel title="Document Upload" description="Upload certificates, contracts, NOC documents, safety records, and site files.">
        <form className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end" onSubmit={submit}>
          <Field name="title" label="Document title" required />
          <Field name="category" label="Category" required />
          <div className="space-y-2">
            <Label htmlFor="file">File</Label>
            <Input id="file" name="file" type="file" required />
          </div>
          <RefreshableSubmit status={status}>
            <Button type="submit" disabled={status.submitting}>{status.submitting ? "Uploading..." : "Upload Document"}</Button>
          </RefreshableSubmit>
        </form>
      </PortalPanel>
      <div className="mt-8">
        <StatusMessage loading={loading} error={error} />
        {data ? (
          <PortalTable
            title="Shared Documents"
            columns={["name", "category", "updated", "size", "download"]}
            rows={data.items.map((item) => ({
              name: item.title,
              category: item.category,
              updated: formatDate(item.createdAt),
              size: bytes(item.fileSize),
              download: <PortalDownloadLink href={item.fileUrl} />,
            }))}
          />
        ) : null}
      </div>
    </>
  );
}

export function PortalTicketsView() {
  const [refresh, setRefresh] = useState(0);
  const [status, setStatus] = useState({ submitting: false, message: "", error: "" });
  const { data, loading, error } = usePortalApi<{ items: Ticket[] }>("/api/portal/tickets", refresh);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ submitting: true, message: "", error: "" });
    const formData = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/portal/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: formData.get("subject"),
          priority: formData.get("priority"),
          message: formData.get("message"),
        }),
      });
      const payload = (await response.json()) as ApiEnvelope<unknown>;
      if (!response.ok) throw new Error(payload.error?.message ?? "Ticket creation failed");
      event.currentTarget.reset();
      setStatus({ submitting: false, message: "Support ticket created.", error: "" });
      setRefresh((value) => value + 1);
    } catch (err) {
      setStatus({ submitting: false, message: "", error: err instanceof Error ? err.message : "Ticket creation failed" });
    }
  }

  return (
    <>
      <PortalPanel title="Create Ticket" description="Raise report, billing, AMC scheduling, and site-access requests.">
        <form className="grid gap-4" onSubmit={submit}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field name="subject" label="Subject" required />
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <select id="priority" name="priority" className="h-11 rounded-md border border-input bg-background px-3 text-sm">
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
                <option value="LOW">Low</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" required />
          </div>
          <RefreshableSubmit status={status}>
            <Button type="submit" disabled={status.submitting}>{status.submitting ? "Creating..." : "Create Ticket"}</Button>
          </RefreshableSubmit>
        </form>
      </PortalPanel>
      <div className="mt-8">
        <StatusMessage loading={loading} error={error} />
        {data ? (
          <PortalTable
            title="Ticket History"
            columns={["id", "subject", "priority", "status", "updated"]}
            rows={data.items.map((item) => ({
              id: item.id.slice(-8).toUpperCase(),
              subject: item.subject,
              priority: titleCase(item.priority),
              status: titleCase(item.status),
              updated: formatDate(item.updatedAt),
            }))}
          />
        ) : null}
      </div>
    </>
  );
}

export function PortalTeamView() {
  const [refresh, setRefresh] = useState(0);
  const [status, setStatus] = useState({ submitting: false, message: "", error: "" });
  const { data, loading, error } = usePortalApi<{ items: TeamMember[] }>("/api/portal/team", refresh);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ submitting: true, message: "", error: "" });
    const formData = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/portal/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          title: formData.get("title"),
          permissions: ["reports", "documents", "tickets"],
        }),
      });
      const payload = (await response.json()) as ApiEnvelope<unknown>;
      if (!response.ok) throw new Error(payload.error?.message ?? "Team invite failed");
      event.currentTarget.reset();
      setStatus({ submitting: false, message: "Team member added.", error: "" });
      setRefresh((value) => value + 1);
    } catch (err) {
      setStatus({ submitting: false, message: "", error: err instanceof Error ? err.message : "Team invite failed" });
    }
  }

  return (
    <>
      <PortalPanel title="Invite Team Member" description="Add client-side users who can access AMC records.">
        <form className="grid gap-4 md:grid-cols-2" onSubmit={submit}>
          <Field name="name" label="Full name" required />
          <Field name="email" label="Email" type="email" required />
          <Field name="phone" label="Phone" />
          <Field name="title" label="Role title" />
          <RefreshableSubmit status={status}>
            <Button type="submit" disabled={status.submitting}>
              <UserPlus className="mr-2 size-4" aria-hidden />
              {status.submitting ? "Adding..." : "Add Member"}
            </Button>
          </RefreshableSubmit>
        </form>
      </PortalPanel>
      <div className="mt-8">
        <StatusMessage loading={loading} error={error} />
        {data ? (
          <PortalTable
            title="Authorized Team Members"
            columns={["name", "role", "email", "phone", "access"]}
            rows={data.items.map((item) => ({
              name: item.user.name ?? "Unnamed user",
              role: item.title ?? "Client user",
              email: item.user.email ?? "No email",
              phone: item.user.phone ?? "No phone",
              access: item.permissions.length ? item.permissions.join(", ") : titleCase(item.status),
            }))}
          />
        ) : null}
      </div>
    </>
  );
}

export function PortalProfileView() {
  const [refresh, setRefresh] = useState(0);
  const [status, setStatus] = useState({ submitting: false, message: "", error: "" });
  const { data, loading, error } = usePortalApi<{ client: ClientRecord | null }>("/api/portal/profile", refresh);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ submitting: true, message: "", error: "" });
    const formData = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/portal/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const payload = (await response.json()) as ApiEnvelope<unknown>;
      if (!response.ok) throw new Error(payload.error?.message ?? "Profile update failed");
      setStatus({ submitting: false, message: "Profile updated.", error: "" });
      setRefresh((value) => value + 1);
    } catch (err) {
      setStatus({ submitting: false, message: "", error: err instanceof Error ? err.message : "Profile update failed" });
    }
  }

  return (
    <>
      <StatusMessage loading={loading} error={error} />
      {data?.client ? (
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <PortalPanel title="Company Profile" description="These details are used for portal records, invoices, and report notices.">
            <form className="grid gap-4 md:grid-cols-2" onSubmit={submit}>
              <Field name="companyName" label="Company name" defaultValue={data.client.companyName} required />
              <Field name="contactName" label="Contact name" defaultValue={data.client.contactName ?? ""} />
              <Field name="email" label="Email" type="email" defaultValue={data.client.email ?? ""} />
              <Field name="phone" label="Phone" defaultValue={data.client.phone ?? ""} />
              <Field name="city" label="City" defaultValue={data.client.city ?? ""} />
              <Field name="address" label="Address" defaultValue={data.client.address ?? ""} />
              <RefreshableSubmit status={status}>
                <Button type="submit" disabled={status.submitting}>{status.submitting ? "Saving..." : "Save Profile"}</Button>
              </RefreshableSubmit>
            </form>
          </PortalPanel>
          <PortalPanel title="Account Access" description="Security is managed through password login, OTP login, and registered portal team members.">
            <div className="grid gap-4">
              {[
                ["Password protected account", Users],
                ["OTP login enabled", ShieldCheck],
                ["Email notifications", Bell],
                ["Inspection reminders", CalendarClock],
              ].map(([label, Icon]) => (
                <div key={String(label)} className="flex items-center gap-3 rounded-lg border border-border bg-background/45 p-4 text-sm font-bold text-muted-foreground">
                  <Icon className="text-primary" aria-hidden />
                  {label as string}
                </div>
              ))}
            </div>
          </PortalPanel>
        </div>
      ) : null}
    </>
  );
}

export function PortalNotificationsView() {
  const [refresh, setRefresh] = useState(0);
  const { data, loading, error } = usePortalApi<{ unreadCount: number; items: Notification[] }>("/api/portal/notifications", refresh);

  async function markRead() {
    await fetch("/api/portal/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: true }),
    });
    setRefresh((value) => value + 1);
  }

  return (
    <>
      <PortalPanel title="Notification Center" description={`${data?.unreadCount ?? 0} unread notifications`}>
        <Button type="button" onClick={markRead} disabled={!data?.items.length}>Mark All Read</Button>
      </PortalPanel>
      <div className="mt-8">
        <StatusMessage loading={loading} error={error} />
        {data ? (
          <PortalTable
            title="Notifications"
            columns={["type", "title", "message", "status", "date"]}
            rows={data.items.map((item) => ({
              type: titleCase(item.type),
              title: item.title,
              message: item.body,
              status: item.readAt ? "Read" : "Open",
              date: formatDate(item.createdAt),
            }))}
          />
        ) : null}
      </div>
    </>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  defaultValue,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} required={required} defaultValue={defaultValue} />
    </div>
  );
}

function complianceBreakdown(records: Compliance[]) {
  const groups = records.reduce<Record<string, { count: number; total: number }>>((acc, item) => {
    acc[item.category] ??= { count: 0, total: 0 };
    acc[item.category].count += 1;
    acc[item.category].total += item.score;
    return acc;
  }, {});

  return Object.entries(groups).map(([label, item]) => ({ label, value: Math.round(item.total / item.count) }));
}

function buildTrend(inspections: Inspection[]) {
  const buckets = new Map<string, number>();
  inspections.forEach((item) => {
    const date = new Date(item.completedAt ?? item.scheduledAt ?? item.createdAt);
    const month = new Intl.DateTimeFormat("en-IN", { month: "short" }).format(date);
    buckets.set(month, (buckets.get(month) ?? 0) + 1);
  });
  return Array.from(buckets.entries())
    .slice(0, 6)
    .reverse()
    .map(([month, inspections]) => ({ month, inspections }));
}
