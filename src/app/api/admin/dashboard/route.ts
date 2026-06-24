import { ok } from "@/lib/api/response";
import { requireRoles, roleGroups } from "@/lib/auth/rbac";
import { prisma } from "@/lib/db";

export async function GET() {
  const auth = await requireRoles(roleGroups.admin);
  if (!auth.ok) return auth.response;

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const [
    todaysInquiries,
    totalLeads,
    activeProjects,
    applications,
    pendingTickets,
    recentInquiries,
    recentActivity,
  ] = await Promise.all([
    prisma.inquiry.count({ where: { createdAt: { gte: startOfToday } } }),
    prisma.inquiry.count(),
    prisma.project.count({ where: { status: "ACTIVE" } }),
    prisma.application.count(),
    prisma.ticket.count({ where: { status: { in: ["OPEN", "WAITING"] } } }),
    prisma.inquiry.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
    prisma.notification.findMany({ take: 8, orderBy: { createdAt: "desc" } }),
  ]);

  return ok({
    metrics: {
      todaysInquiries,
      totalLeads,
      activeProjects,
      websiteTraffic: null,
      applications,
      pendingTickets,
    },
    recentInquiries,
    recentActivity,
  });
}
