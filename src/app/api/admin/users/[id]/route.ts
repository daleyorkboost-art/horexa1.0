import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { apiError, ok, parseJson } from "@/lib/api/response";
import { requireRoles, roleGroups } from "@/lib/auth/rbac";
import { prisma } from "@/lib/db";
import { userUpdateSchema } from "@/lib/validators/admin";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const auth = await requireRoles(roleGroups.admin);
  if (!auth.ok) return auth.response;

  const { id } = await context.params;
  const user = await prisma.user.findUnique({
    where: { id },
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
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return ok(user);
}

export async function PATCH(request: Request, context: RouteContext) {
  const auth = await requireRoles(roleGroups.superAdmin);
  if (!auth.ok) return auth.response;

  try {
    const { id } = await context.params;
    const body = await parseJson(request);
    const { password, email, ...data } = userUpdateSchema.parse(body);
    const passwordHash = password ? await hash(password, 12) : undefined;

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...data,
        ...(email ? { email: email.toLowerCase() } : {}),
        ...(passwordHash ? { passwordHash } : {}),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        updatedAt: true,
      },
    });

    return ok(user);
  } catch (error) {
    return apiError(error);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const auth = await requireRoles(roleGroups.superAdmin);
  if (!auth.ok) return auth.response;

  const { id } = await context.params;
  await prisma.user.delete({ where: { id } });
  return ok({ deleted: true });
}
