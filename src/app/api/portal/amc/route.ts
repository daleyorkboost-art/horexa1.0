import { ok } from "@/lib/api/response";
import { resolveClientScope } from "@/lib/auth/portal-access";
import { requireRoles, roleGroups } from "@/lib/auth/rbac";
import { prisma } from "@/lib/db";

export async function GET() {
  const auth = await requireRoles(roleGroups.client);
  if (!auth.ok) return auth.response;

  const scope = await resolveClientScope(auth);
  const clientWhere = "clientId" in scope ? { clientId: scope.clientId } : undefined;
  const client =
    "client" in scope
      ? await prisma.client.findUnique({ where: { id: scope.clientId }, include: { amcPlan: true } })
      : null;

  const [nextService, serviceHistory, invoices] = await Promise.all([
    prisma.inspectionReport.findFirst({
      where: { ...clientWhere, status: "SCHEDULED", scheduledAt: { gte: new Date() } },
      orderBy: { scheduledAt: "asc" },
    }),
    prisma.inspectionReport.findMany({
      where: clientWhere,
      orderBy: [{ completedAt: "desc" }, { createdAt: "desc" }],
      take: 20,
    }),
    prisma.invoice.findMany({
      where: clientWhere,
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
  ]);

  return ok({ client, plan: client?.amcPlan ?? null, nextService, serviceHistory, invoices });
}
