/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ZodType } from "zod";
import { NextResponse } from "next/server";
import { apiError, created, ok, parseJson } from "@/lib/api/response";
import { requireRoles } from "@/lib/auth/rbac";

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

export function createCollectionHandlers(delegate: CrudDelegate, schema: ZodType, allowedRoles: readonly string[]) {
  async function GET(request: Request) {
    const auth = await requireRoles(allowedRoles);
    if (!auth.ok) return auth.response;

    const { searchParams } = new URL(request.url);
    const take = Number(searchParams.get("take") ?? 20);
    const skip = Number(searchParams.get("skip") ?? 0);
    const status = searchParams.get("status");

    const where = status ? { status } : undefined;
    const [items, total] = await Promise.all([
      delegate.findMany({ where, take, skip, orderBy: { createdAt: "desc" } }),
      delegate.count({ where }),
    ]);

    return ok({ items, total, take, skip });
  }

  async function POST(request: Request) {
    const auth = await requireRoles(allowedRoles);
    if (!auth.ok) return auth.response;

    try {
      const body = await parseJson(request);
      const data = schema.parse(body);
      const item = await delegate.create({ data });
      return created(item);
    } catch (error) {
      return apiError(error);
    }
  }

  return { GET, POST };
}

export function createItemHandlers(delegate: CrudDelegate, schema: ZodType, allowedRoles: readonly string[]) {
  async function GET(_request: Request, context: RouteContext) {
    const auth = await requireRoles(allowedRoles);
    if (!auth.ok) return auth.response;

    const { id } = await context.params;
    const item = await delegate.findUnique({ where: { id } });

    if (!item) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    return ok(item);
  }

  async function PATCH(request: Request, context: RouteContext) {
    const auth = await requireRoles(allowedRoles);
    if (!auth.ok) return auth.response;

    try {
      const { id } = await context.params;
      const body = await parseJson(request);
      const data = (schema as any).partial().parse(body);
      const item = await delegate.update({ where: { id }, data });
      return ok(item);
    } catch (error) {
      return apiError(error);
    }
  }

  async function DELETE(_request: Request, context: RouteContext) {
    const auth = await requireRoles(allowedRoles);
    if (!auth.ok) return auth.response;

    try {
      const { id } = await context.params;
      await delegate.delete({ where: { id } });
      return ok({ deleted: true });
    } catch (error) {
      return apiError(error);
    }
  }

  return { GET, PATCH, DELETE };
}
