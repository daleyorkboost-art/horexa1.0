"use client";

import { WorkspaceShell } from "@/design-system";
import { adminNav } from "@/lib/admin-data";

type AdminShellProps = {
  activeHref: string;
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function AdminShell({ activeHref, title, description, children }: AdminShellProps) {
  return (
    <WorkspaceShell
      activeHref={activeHref}
      title={title}
      description={description}
      label="Admin Panel"
      homeHref="/admin"
      navItems={adminNav}
      brandSuffix="Admin Control"
      sidebarTitle="Horexa CMS"
      sidebarDescription="Public site, AMC portal, and operations data."
      searchPlaceholder="Search CMS records, leads, projects..."
      avatarLabel="HX"
    >
      {children}
    </WorkspaceShell>
  );
}
