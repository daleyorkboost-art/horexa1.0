import { ok, apiError } from "@/lib/api/response";
import { buildSearchWhere, paginationMeta, parseListQuery } from "@/lib/api/query";
import { requireRoles, roleGroups } from "@/lib/auth/rbac";
import { firestoreModels } from "@/firebase/firestore";

export async function GET(request: Request) {
  const auth = await requireRoles(roleGroups.superAdmin);
  if (!auth.ok) return auth.response;

  try {
    const query = parseListQuery(request);
    const searchWhere = buildSearchWhere(query.searchTerm, ["entity", "entityId", "ipAddress"]);
    const where = searchWhere ?? undefined;
    const [items, total] = await Promise.all([
      firestoreModels.auditLog.findMany({
        where,
        take: query.take,
        skip: query.skip,
        orderBy: { createdAt: "desc" },
        include: { actor: { select: { id: true, name: true, email: true, role: true } } },
      }),
      firestoreModels.auditLog.count({ where }),
    ]);

    return ok({ items, pagination: paginationMeta(total, query.page, query.pageSize) });
  } catch (error) {
    return apiError(error);
  }
}
