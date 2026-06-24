"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { CrudModule } from "@/components/admin/CrudModule";
import { getAdminModule } from "@/lib/admin-data";

type AdminModulePageProps = {
  moduleKey: string;
};

export function AdminModulePage({ moduleKey }: AdminModulePageProps) {
  const adminModule = getAdminModule(moduleKey);

  if (!adminModule) {
    return null;
  }

  return (
    <AdminShell activeHref={adminModule.href} title={adminModule.title} description={adminModule.description}>
      <CrudModule module={adminModule} />
    </AdminShell>
  );
}
