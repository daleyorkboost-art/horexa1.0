import { NextResponse } from "next/server";
import { apiError, ok, parseJson } from "@/lib/api/response";
import { writeAuditLog } from "@/lib/api/audit";
import { requireRoles, roleGroups } from "@/lib/auth/rbac";
import { firestoreModels } from "@/firebase/firestore";
import { adminAuth } from "@/firebase/admin";
import { assertSameOrigin } from "@/lib/security/request";
import { userUpdateSchema } from "@/lib/validators/admin";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const auth = await requireRoles(roleGroups.admin);
  if (!auth.ok) return auth.response;

  const { id } = await context.params;
  const user = await firestoreModels.user.findUnique({
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
    return NextResponse.json({ error: { code: "NOT_FOUND", message: "User not found" } }, { status: 404 });
  }

  return ok(user);
}

export async function PATCH(request: Request, context: RouteContext) {
  const auth = await requireRoles(roleGroups.superAdmin);
  if (!auth.ok) return auth.response;

  try {
    assertSameOrigin(request);
    const { id } = await context.params;
    const body = await parseJson(request);
    const { password, email, ...data } = userUpdateSchema.parse(body);
    await adminAuth().updateUser(id, {
      ...(email ? { email: email.toLowerCase() } : {}),
      ...(password ? { password } : {}),
      ...(data.name ? { displayName: data.name } : {}),
      ...(data.phone ? { phoneNumber: data.phone } : {}),
      ...(data.isActive !== undefined ? { disabled: data.isActive === false } : {}),
    });
    if (data.role) {
      await adminAuth().setCustomUserClaims(id, { role: data.role });
    }

    const user = await firestoreModels.user.update({
      where: { id },
      data: {
        ...data,
        ...(email ? { email: email.toLowerCase() } : {}),
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

    await writeAuditLog({
      actorId: auth.session.user?.id,
      action: "UPDATE",
      entity: "User",
      entityId: id,
      request,
    });

    return ok(user);
  } catch (error) {
    return apiError(error);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const auth = await requireRoles(roleGroups.superAdmin);
  if (!auth.ok) return auth.response;

  try {
    assertSameOrigin(_request);
    const { id } = await context.params;
    await adminAuth().deleteUser(id).catch(() => undefined);
    await firestoreModels.user.delete({ where: { id } });
    await writeAuditLog({
      actorId: auth.session.user?.id,
      action: "DELETE",
      entity: "User",
      entityId: id,
      request: _request,
    });
    return ok({ deleted: true });
  } catch (error) {
    return apiError(error);
  }
}
