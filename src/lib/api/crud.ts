/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ZodType } from "zod";
import { NextResponse } from "next/server";
import { ApiError, apiError, created, ok, parseJson } from "@/lib/api/response";
import { writeAuditLog } from "@/lib/api/audit";
import { buildOrderBy, buildSearchWhere, paginationMeta, parseListQuery } from "@/lib/api/query";
import { requireRoles } from "@/lib/auth/rbac";
import { assertSameOrigin } from "@/lib/security/request";

type CrudDelegate = {
  findMany: (args?: any) => Promise<unknown>;
  count: (args?: any) => Promise<number>;
  findUnique: (args: any) => Promise<unknown>;
  create: (args: any) => Promise<unknown>;
  update: (args: any) => Promise<unknown>;
  delete: (args: any) => Promise<unknown>;
};

type RouteContext = {
  params: Promise<{ id: string }>;
};

type CrudOptions = {
  entity: string;
  searchFields?: readonly string[];
  sortableFields?: readonly string[];
  filterFields?: readonly string[];
  include?: Record<string, unknown>;
};

function getEntityId(item: unknown) {
  return typeof item === "object" && item && "id" in item ? String((item as { id: unknown }).id) : undefined;
}

function buildWhere(
  query: ReturnType<typeof parseListQuery>,
  options: CrudOptions,
) {
  const searchWhere = buildSearchWhere(query.searchTerm, options.searchFields);
  const filters: Record<string, unknown> = {};

  for (const field of options.filterFields ?? ["status"]) {
    const value = query[field as keyof typeof query];
    if (value !== undefined && value !== "") {
      filters[field] = value;
    }
  }

  const clauses = [searchWhere, Object.keys(filters).length ? filters : undefined].filter(Boolean);

  if (clauses.length === 0) return undefined;
  if (clauses.length === 1) return clauses[0];
  return { AND: clauses };
}

export function createCollectionHandlers(
  delegate: CrudDelegate,
  schema: ZodType,
  allowedRoles: readonly string[],
  options: CrudOptions = { entity: "Record" },
) {
  async function GET(request: Request) {
    const auth = await requireRoles(allowedRoles);
    if (!auth.ok) return auth.response;

    try {
      const query = parseListQuery(request);
      const where = buildWhere(query, options);
      const orderBy = buildOrderBy(query.sort, options.sortableFields);

      const [items, total] = await Promise.all([
        delegate.findMany({
          where,
          take: query.take,
          skip: query.skip,
          orderBy,
          include: options.include,
        }),
        delegate.count({ where }),
      ]);

      return ok({
        items,
        pagination: paginationMeta(total, query.page, query.pageSize),
      });
    } catch (error) {
      return apiError(error);
    }
  }

  async function POST(request: Request) {
    const auth = await requireRoles(allowedRoles);
    if (!auth.ok) return auth.response;

    try {
      assertSameOrigin(request);
      const body = await parseJson(request);
      const data = schema.parse(body);
      const item = await delegate.create({ data });
      await writeAuditLog({
        actorId: auth.session.user?.id,
        action: "CREATE",
        entity: options.entity,
        entityId: getEntityId(item),
        request,
      });
      return created(item);
    } catch (error) {
      return apiError(error);
    }
  }

  return { GET, POST };
}

export function createItemHandlers(
  delegate: CrudDelegate,
  schema: ZodType,
  allowedRoles: readonly string[],
  options: CrudOptions = { entity: "Record" },
) {
  async function GET(_request: Request, context: RouteContext) {
    const auth = await requireRoles(allowedRoles);
    if (!auth.ok) return auth.response;

    const { id } = await context.params;
    const item = await delegate.findUnique({ where: { id } });

    if (!item) {
      return NextResponse.json({ error: { code: "NOT_FOUND", message: "Record not found" } }, { status: 404 });
    }

    return ok(item);
  }

  async function PATCH(request: Request, context: RouteContext) {
    const auth = await requireRoles(allowedRoles);
    if (!auth.ok) return auth.response;

    try {
      assertSameOrigin(request);
      const { id } = await context.params;
      const body = await parseJson(request);
      const data = (schema as any).partial().parse(body);
      const item = await delegate.update({ where: { id }, data });
      await writeAuditLog({
        actorId: auth.session.user?.id,
        action: "UPDATE",
        entity: options.entity,
        entityId: id,
        request,
      });
      return ok(item);
    } catch (error) {
      return apiError(error);
    }
  }

  async function DELETE(_request: Request, context: RouteContext) {
    const auth = await requireRoles(allowedRoles);
    if (!auth.ok) return auth.response;

    try {
      assertSameOrigin(_request);
      const { id } = await context.params;
      const existing = await delegate.findUnique({ where: { id } });
      if (!existing) throw new ApiError("Record not found", 404, "NOT_FOUND");
      await delegate.delete({ where: { id } });
      await writeAuditLog({
        actorId: auth.session.user?.id,
        action: "DELETE",
        entity: options.entity,
        entityId: id,
        request: _request,
      });
      return ok({ deleted: true });
    } catch (error) {
      return apiError(error);
    }
  }

  return { GET, PATCH, DELETE };
}
