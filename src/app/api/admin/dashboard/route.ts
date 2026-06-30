import { ok } from "@/lib/api/response";
import { requireRoles, roleGroups } from "@/lib/auth/rbac";
import { firestoreModels } from "@/firebase/firestore";

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
    firestoreModels.inquiry.count({ where: { createdAt: { gte: startOfToday } } }),
    firestoreModels.inquiry.count(),
    firestoreModels.project.count({ where: { status: "ACTIVE" } }),
    firestoreModels.application.count(),
    firestoreModels.ticket.count({ where: { status: { in: ["OPEN", "WAITING"] } } }),
    firestoreModels.inquiry.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
    firestoreModels.notification.findMany({ take: 8, orderBy: { createdAt: "desc" } }),
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
