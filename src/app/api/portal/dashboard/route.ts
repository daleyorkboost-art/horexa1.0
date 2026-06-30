import { ok } from "@/lib/api/response";
import { resolveClientScope } from "@/lib/auth/portal-access";
import { requireRoles, roleGroups } from "@/lib/auth/rbac";
import { firestoreModels } from "@/firebase/firestore";

export async function GET() {
  const auth = await requireRoles(roleGroups.client);
  if (!auth.ok) return auth.response;

  const scope = await resolveClientScope(auth);
  const client = "client" in scope ? scope.client : null;

  const clientWhere = client ? { clientId: client.id } : undefined;
  const [totalInspections, openTickets, recentInspections, compliance, documents] = await Promise.all([
    firestoreModels.inspectionReport.count({ where: clientWhere }),
    firestoreModels.ticket.count({ where: { ...clientWhere, status: { in: ["OPEN", "WAITING"] } } }),
    firestoreModels.inspectionReport.findMany({ where: clientWhere, take: 5, orderBy: { createdAt: "desc" } }),
    firestoreModels.complianceRecord.findMany({ where: clientWhere, take: 8, orderBy: { checkedAt: "desc" } }),
    firestoreModels.document.findMany({ where: clientWhere, take: 5, orderBy: { createdAt: "desc" } }),
  ]);

  const complianceScore = compliance.length
    ? Math.round(compliance.reduce((sum, item) => sum + item.score, 0) / compliance.length)
    : null;

  return ok({
    client,
    metrics: {
      totalInspections,
      complianceScore,
      nextInspection: await firestoreModels.inspectionReport.findFirst({
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
