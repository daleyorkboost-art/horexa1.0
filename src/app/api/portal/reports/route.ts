import { ok } from "@/lib/api/response";
import { resolveClientScope } from "@/lib/auth/portal-access";
import { requireRoles, roleGroups } from "@/lib/auth/rbac";
import { firestoreModels } from "@/firebase/firestore";

export async function GET() {
  const auth = await requireRoles(roleGroups.client);
  if (!auth.ok) return auth.response;

  const scope = await resolveClientScope(auth);
  const where = "clientId" in scope ? { clientId: scope.clientId } : undefined;

  const reports = await firestoreModels.inspectionReport.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return ok({ items: reports });
}
