import { ok, apiError } from "@/lib/api/response";
import { buildSearchWhere, paginationMeta, parseListQuery } from "@/lib/api/query";
import { requireRoles, roleGroups } from "@/lib/auth/rbac";
import { firestoreModels } from "@/firebase/firestore";

export async function GET(request: Request) {
  const auth = await requireRoles(roleGroups.admin);
  if (!auth.ok) return auth.response;

  try {
    const query = parseListQuery(request);
    const searchWhere = buildSearchWhere(query.searchTerm, ["to", "subject", "provider", "messageId", "error"]);
    const where = searchWhere ?? undefined;
    const [items, total] = await Promise.all([
      firestoreModels.emailLog.findMany({
        where,
        take: query.take,
        skip: query.skip,
        orderBy: { createdAt: "desc" },
      }),
      firestoreModels.emailLog.count({ where }),
    ]);

    return ok({ items, pagination: paginationMeta(total, query.page, query.pageSize) });
  } catch (error) {
    return apiError(error);
  }
}
