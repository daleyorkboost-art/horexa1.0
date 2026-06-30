import { ok } from "@/lib/api/response";
import { resolveClientScope } from "@/lib/auth/portal-access";
import { requireRoles, roleGroups } from "@/lib/auth/rbac";
import { firestoreModels } from "@/firebase/firestore";

export async function GET() {
  const auth = await requireRoles(roleGroups.client);
  if (!auth.ok) return auth.response;

  const scope = await resolveClientScope(auth);
  const clientWhere = "clientId" in scope ? { clientId: scope.clientId } : undefined;
  const client = "client" in scope ? scope.client : null;
  const clientRecord = client && typeof client === "object" ? (client as Record<string, unknown>) : {};
  const amcPlanId = typeof clientRecord.amcPlanId === "string" ? clientRecord.amcPlanId : undefined;

  const [plan, nextService, serviceHistory, invoices] = await Promise.all([
    amcPlanId ? firestoreModels.aMCPlan.findUnique({ where: { id: amcPlanId } }) : Promise.resolve(null),
    firestoreModels.inspectionReport.findFirst({
      where: { ...clientWhere, status: "SCHEDULED", scheduledAt: { gte: new Date() } },
      orderBy: { scheduledAt: "asc" },
    }),
    firestoreModels.inspectionReport.findMany({
      where: clientWhere,
      orderBy: [{ completedAt: "desc" }, { createdAt: "desc" }],
      take: 20,
    }),
    firestoreModels.invoice.findMany({
      where: clientWhere,
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
  ]);

  return ok({ client, plan, nextService, serviceHistory, invoices });
}
