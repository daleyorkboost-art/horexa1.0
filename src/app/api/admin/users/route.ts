import { created, apiError, ok, parseJson } from "@/lib/api/response";
import { writeAuditLog } from "@/lib/api/audit";
import { buildSearchWhere, paginationMeta, parseListQuery } from "@/lib/api/query";
import { requireRoles, roleGroups } from "@/lib/auth/rbac";
import { firestoreModels } from "@/firebase/firestore";
import { adminAuth } from "@/firebase/admin";
import { assertSameOrigin } from "@/lib/security/request";
import { userCreateSchema } from "@/lib/validators/admin";

export async function GET(request: Request) {
  const auth = await requireRoles(roleGroups.admin);
  if (!auth.ok) return auth.response;

  const { searchParams } = new URL(request.url);
  const query = parseListQuery(request);
  const role = searchParams.get("role") ?? undefined;

  const searchWhere = buildSearchWhere(query.searchTerm, ["name", "email", "phone"]);
  const where = searchWhere || role ? { ...(searchWhere ?? {}), ...(role ? { role } : {}) } : undefined;
  const [items, total] = await Promise.all([
    firestoreModels.user.findMany({
      where,
      take: query.take,
      skip: query.skip,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    firestoreModels.user.count({ where }),
  ]);

  return ok({ items, pagination: paginationMeta(total, query.page, query.pageSize) });
}

export async function POST(request: Request) {
  const auth = await requireRoles(roleGroups.superAdmin);
  if (!auth.ok) return auth.response;

  try {
    assertSameOrigin(request);
    const body = await parseJson(request);
    const { password, ...data } = userCreateSchema.parse(body);
    const authUser = await adminAuth().createUser({
      email: data.email.toLowerCase(),
      password,
      displayName: data.name,
      phoneNumber: data.phone,
      disabled: data.isActive === false,
    });
    await adminAuth().setCustomUserClaims(authUser.uid, { role: data.role });
    const user = await firestoreModels.user.update({
      where: { id: authUser.uid },
      data: {
        ...data,
        email: data.email.toLowerCase(),
        firebaseUid: authUser.uid,
      },
    });

    if (!user || typeof user !== "object" || !("id" in user)) {
      throw new Error("User record could not be created");
    }

    await writeAuditLog({
      actorId: auth.session.user?.id,
      action: "CREATE",
      entity: "User",
      entityId: String(user.id),
      request,
    });

    return created(user);
  } catch (error) {
    return apiError(error);
  }
}
