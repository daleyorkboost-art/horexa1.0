import { ok } from "@/lib/api/response";
import { resolveClientScope } from "@/lib/auth/portal-access";
import { requireRoles, roleGroups } from "@/lib/auth/rbac";
import { firestoreModels } from "@/firebase/firestore";

export async function GET() {
  const auth = await requireRoles(roleGroups.client);
  if (!auth.ok) return auth.response;

  const scope = await resolveClientScope(auth);
  const where = "clientId" in scope ? { clientId: scope.clientId } : undefined;

  const records = await firestoreModels.complianceRecord.findMany({
    where,
    orderBy: { checkedAt: "desc" },
    include: { report: true },
  });

  const score = records.length ? Math.round(records.reduce((sum, item) => sum + item.score, 0) / records.length) : null;
  const grouped = records.reduce<Record<string, { total: number; count: number }>>((acc, record) => {
    acc[record.category] ??= { total: 0, count: 0 };
    acc[record.category].total += record.score;
    acc[record.category].count += 1;
    return acc;
  }, {});

  const breakdown = Object.entries(grouped).map(([label, value]) => ({
    label,
    value: Math.round(value.total / value.count),
  }));

  return ok({ score, breakdown, items: records });
}
