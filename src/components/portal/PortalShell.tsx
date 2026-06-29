"use client";

import { WorkspaceShell } from "@/design-system";
import { portalNav } from "@/lib/portal-data";

type PortalShellProps = {
  activeHref: string;
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function PortalShell({ activeHref, title, description, children }: PortalShellProps) {
  return (
    <WorkspaceShell
      activeHref={activeHref}
      title={title}
      description={description}
      label="AMC Portal"
      homeHref="/portal/dashboard"
      navItems={portalNav}
      brandSuffix="AMC Client Portal"
      sidebarTitle="Client Workspace"
      sidebarDescription="Reports, compliance records, tickets, invoices, and service history."
      searchPlaceholder="Search reports, invoices, AMC records..."
      avatarLabel="CL"
    >
      {children}
    </WorkspaceShell>
  );
}
