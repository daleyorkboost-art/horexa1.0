"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AdminActivity } from "@/components/admin/AdminActivity";
import { AdminMetricCard } from "@/components/admin/AdminMetricCard";
import { AdminShell } from "@/components/admin/AdminShell";
import { CrudModule } from "@/components/admin/CrudModule";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { adminMetrics, adminModules, getAdminModule } from "@/lib/admin-data";

export default function AdminDashboardPage() {
  const inquiries = getAdminModule("inquiries")!;

  return (
    <AdminShell
      activeHref="/admin"
      title="Admin Dashboard"
      description="Operational overview for leads, projects, website content, AMC clients, careers, SEO, and internal users."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {adminMetrics.map((metric) => (
          <AdminMetricCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black">Management Modules</h2>
              <p className="mt-2 text-sm text-muted-foreground">Quick access to all CMS and operations areas.</p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {adminModules.slice(0, 8).map((module) => {
              const Icon = module.icon;
              return (
                <Link
                  key={module.key}
                  href={module.href}
                  className="orange-glow rounded-xl border border-border bg-background/45 p-4 transition"
                >
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
        <AdminActivity />
      </div>

      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-black">Lead Queue</h2>
          <Button asChild variant="outline">
            <Link href="/admin/inquiries">Manage All Leads</Link>
          </Button>
        </div>
        <CrudModule module={inquiries} />
      </div>
    </AdminShell>
  );
}
