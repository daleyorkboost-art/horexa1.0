"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, BarChart3, Bell, Loader2 } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { CrudModule } from "@/components/admin/CrudModule";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { adminModules, getAdminModule } from "@/lib/admin-data";

type DashboardPayload = {
  metrics: {
    todaysInquiries: number;
    totalLeads: number;
    activeProjects: number;
    websiteTraffic: number | null;
    applications: number;
    pendingTickets: number;
  };
  recentInquiries: Array<Record<string, unknown>>;
  recentActivity: Array<Record<string, unknown>>;
};

export default function AdminDashboardPage() {
  const inquiries = getAdminModule("inquiries")!;
  const [data, setData] = useState<DashboardPayload | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const response = await fetch("/api/admin/dashboard", { cache: "no-store" });
        const payload = await response.json();
        if (!response.ok) throw new Error(payload?.error?.message ?? payload?.error ?? "Unable to load dashboard");
        setData(payload.data as DashboardPayload);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Unable to load dashboard");
      }
    }

    void loadDashboard();
  }, []);

  const chartItems = data
    ? [
        { label: "Today", value: data.metrics.todaysInquiries },
        { label: "Leads", value: data.metrics.totalLeads },
        { label: "Projects", value: data.metrics.activeProjects },
        { label: "Applications", value: data.metrics.applications },
        { label: "Tickets", value: data.metrics.pendingTickets },
      ]
    : [];
  const max = Math.max(1, ...chartItems.map((item) => item.value));

  return (
    <AdminShell
      activeHref="/admin"
      title="Admin Dashboard"
      description="Live operational overview for leads, content, AMC clients, careers, SEO, media, and internal users."
    >
      {error ? (
        <Card className="border-destructive/40 bg-destructive/10 p-5 text-sm text-destructive">{error}</Card>
      ) : null}

      {!data && !error ? (
        <Card className="flex items-center gap-3 p-6 text-muted-foreground">
          <Loader2 className="animate-spin text-primary" aria-hidden />
          Loading dashboard...
        </Card>
      ) : null}

      {data ? (
        <>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {chartItems.map((item) => (
              <Card key={item.label} className="p-5">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-muted-foreground">{item.label}</p>
                <p className="mt-3 text-4xl font-black text-primary">{item.value}</p>
              </Card>
            ))}
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <BarChart3 className="text-primary" aria-hidden />
                <h2 className="text-2xl font-black">Operations Chart</h2>
              </div>
              <div className="mt-6 flex flex-col gap-4">
                {chartItems.map((item) => (
                  <div key={item.label}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="font-bold">{item.label}</span>
                      <span className="text-muted-foreground">{item.value}</span>
                    </div>
                    <div className="h-3 rounded-full bg-secondary">
                      <div className="h-3 rounded-full bg-primary" style={{ width: `${Math.max(6, (item.value / max) * 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <Bell className="text-primary" aria-hidden />
                <h2 className="text-2xl font-black">Notifications</h2>
              </div>
              <div className="mt-6 flex flex-col gap-4">
                {data.recentActivity.length ? (
                  data.recentActivity.map((item) => (
                    <div key={String(item.id)} className="rounded-lg border border-border p-4">
                      <Badge variant="secondary">{String(item.type ?? "SYSTEM")}</Badge>
                      <h3 className="mt-3 font-black">{String(item.title ?? "Notification")}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{String(item.body ?? "")}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No notifications yet.</p>
                )}
              </div>
            </Card>
          </div>
        </>
      ) : null}

      <div className="mt-8">
        <Card className="p-6">
          <div>
            <h2 className="text-2xl font-black">Management Modules</h2>
            <p className="mt-2 text-sm text-muted-foreground">Every module is backed by REST APIs with search, filters, pagination, permissions, and audit trails.</p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {adminModules.map((module) => {
              const Icon = module.icon;
              return (
                <Link key={module.key} href={module.href} className="orange-glow rounded-lg border border-border bg-background/45 p-4 transition">
                  <Icon className="text-primary" aria-hidden />
                  <h3 className="mt-4 font-black">{module.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{module.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-primary">
                    Open <ArrowRight aria-hidden />
                  </span>
                </Link>
              );
            })}
          </div>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-black">Lead Queue</h2>
        <CrudModule module={inquiries} />
      </div>
    </AdminShell>
  );
}
