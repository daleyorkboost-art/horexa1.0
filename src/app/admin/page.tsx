"use client";

import Link from "next/link";
import { ArrowRight, Database } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { CrudModule } from "@/components/admin/CrudModule";
import { EmptyState } from "@/design-system";
import { Card } from "@/components/ui/card";
import { adminModules, getAdminModule } from "@/lib/admin-data";

export default function AdminDashboardPage() {
  const inquiries = getAdminModule("inquiries")!;

  return (
    <AdminShell
      activeHref="/admin"
      title="Admin Dashboard"
      description="Operational overview for leads, projects, website content, AMC clients, careers, SEO, and internal users."
    >
      <EmptyState
        icon={Database}
        title="Admin metrics are ready for production data"
        description="Demo counters and activity rows were removed. The dashboard can now be wired to the existing admin APIs without mixing static records with live operations."
      />

      <div className="mt-8">
        <Card className="p-6">
          <div>
            <h2 className="text-2xl font-black">Management Modules</h2>
            <p className="mt-2 text-sm text-muted-foreground">Quick access to all CMS and operations areas required by the PRD.</p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {adminModules.map((module) => {
              const Icon = module.icon;
              return (
                <Link
                  key={module.key}
                  href={module.href}
                  className="orange-glow rounded-lg border border-border bg-background/45 p-4 transition"
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
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-black">Lead Queue</h2>
        <CrudModule module={inquiries} />
      </div>
    </AdminShell>
  );
}
