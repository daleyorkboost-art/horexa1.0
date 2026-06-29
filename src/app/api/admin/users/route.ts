import { hash } from "bcryptjs";
import type { UserRole } from "@prisma/client";
import { created, apiError, ok, parseJson } from "@/lib/api/response";
import { writeAuditLog } from "@/lib/api/audit";
import { buildSearchWhere, paginationMeta, parseListQuery } from "@/lib/api/query";
import { requireRoles, roleGroups } from "@/lib/auth/rbac";
import { prisma } from "@/lib/db";
import { userCreateSchema } from "@/lib/validators/admin";

export async function GET(request: Request) {
  const auth = await requireRoles(roleGroups.admin);
  if (!auth.ok) return auth.response;

  const { searchParams } = new URL(request.url);
  const query = parseListQuery(request);
  const role = (searchParams.get("role") as UserRole | null) ?? undefined;

  const searchWhere = buildSearchWhere(query.searchTerm, ["name", "email", "phone"]);
  const where = searchWhere || role ? { ...(searchWhere ?? {}), ...(role ? { role } : {}) } : undefined;
  const [items, total] = await Promise.all([
    prisma.user.findMany({
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
    prisma.user.count({ where }),
  ]);

  return ok({ items, pagination: paginationMeta(total, query.page, query.pageSize) });
}

export async function POST(request: Request) {
  const auth = await requireRoles(roleGroups.superAdmin);
  if (!auth.ok) return auth.response;

  try {
    const body = await parseJson(request);
    const { password, ...data } = userCreateSchema.parse(body);
    const passwordHash = password ? await hash(password, 12) : undefined;
    const user = await prisma.user.create({
      data: { ...data, email: data.email.toLowerCase(), passwordHash },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    await writeAuditLog({
      actorId: auth.session.user?.id,
      action: "CREATE",
      entity: "User",
      entityId: user.id,
      request,
    });

    return created(user);
  } catch (error) {
    return apiError(error);
  }
}
