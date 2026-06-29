import { ok } from "@/lib/api/response";
import { resolveClientScope } from "@/lib/auth/portal-access";
import { requireRoles, roleGroups } from "@/lib/auth/rbac";
import { prisma } from "@/lib/db";

export async function GET() {
  const auth = await requireRoles(roleGroups.client);
  if (!auth.ok) return auth.response;

  const scope = await resolveClientScope(auth);
  const client = "client" in scope ? scope.client : null;

  const clientWhere = client ? { clientId: client.id } : undefined;
  const [totalInspections, openTickets, recentInspections, compliance, documents] = await Promise.all([
    prisma.inspectionReport.count({ where: clientWhere }),
    prisma.ticket.count({ where: { ...clientWhere, status: { in: ["OPEN", "WAITING"] } } }),
    prisma.inspectionReport.findMany({ where: clientWhere, take: 5, orderBy: { createdAt: "desc" } }),
    prisma.complianceRecord.findMany({ where: clientWhere, take: 8, orderBy: { checkedAt: "desc" } }),
    prisma.document.findMany({ where: clientWhere, take: 5, orderBy: { createdAt: "desc" } }),
  ]);

  const complianceScore = compliance.length
    ? Math.round(compliance.reduce((sum, item) => sum + item.score, 0) / compliance.length)
    : null;

  return ok({
    client,
    metrics: {
      totalInspections,
      complianceScore,
      nextInspection: await prisma.inspectionReport.findFirst({
        where: { ...clientWhere, status: "SCHEDULED", scheduledAt: { gte: new Date() } },
        orderBy: { scheduledAt: "asc" },
      }),
      openTickets,
    },
    compliance,
    recentInspections,
    documents,
  });
}
