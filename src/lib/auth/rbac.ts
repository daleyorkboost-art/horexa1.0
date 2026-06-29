import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/db";

export const roleGroups = {
  admin: ["SUPER_ADMIN", "ADMIN", "EDITOR", "OPERATIONS"],
  superAdmin: ["SUPER_ADMIN"],
  client: ["CLIENT", "SUPER_ADMIN", "ADMIN", "OPERATIONS"],
} as const;

export type AppRole = (typeof roleGroups)[keyof typeof roleGroups][number];
export type AdminPermission =
  | "dashboard:read"
  | "content:write"
  | "users:write"
  | "clients:write"
  | "reports:write"
  | "settings:write";
export type ClientPermission = "reports" | "documents" | "tickets" | "team" | "billing" | "compliance";

const adminRolePermissions: Record<string, AdminPermission[]> = {
  SUPER_ADMIN: ["dashboard:read", "content:write", "users:write", "clients:write", "reports:write", "settings:write"],
  ADMIN: ["dashboard:read", "content:write", "clients:write", "reports:write", "settings:write"],
  OPERATIONS: ["dashboard:read", "clients:write", "reports:write"],
  EDITOR: ["dashboard:read", "content:write"],
  CLIENT: [],
};

export async function requireRoles(allowedRoles: readonly string[]) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  if (!session?.user?.email || !role) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Authentication required" }, { status: 401 }),
    };
  }

  if (!allowedRoles.includes(role)) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Insufficient permissions" }, { status: 403 }),
    };
  }

  return {
    ok: true as const,
    session,
    role,
  };
}

export function hasAdminPermission(role: string | undefined, permission: AdminPermission) {
  return Boolean(role && adminRolePermissions[role]?.includes(permission));
}

export async function requireAdminPermission(permission: AdminPermission) {
  const auth = await requireRoles(roleGroups.admin);
  if (!auth.ok) return auth;

  if (!hasAdminPermission(auth.role, permission)) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Insufficient permissions" }, { status: 403 }),
    };
  }

  return auth;
}

export async function requireClientPermission(clientId: string, permission: ClientPermission) {
  const auth = await requireRoles(roleGroups.client);
  if (!auth.ok) return auth;

  if (auth.role !== "CLIENT") return auth;

  const userId = auth.session.user?.id;
  const client = userId
    ? await prisma.client.findFirst({
        where: {
          id: clientId,
          portalEnabled: true,
          status: "ACTIVE",
          OR: [
            { userId },
            {
              members: {
                some: {
                  userId,
                  status: "ACTIVE",
                  OR: [{ permissions: { has: permission } }, { permissions: { isEmpty: true } }],
                },
              },
            },
          ],
        },
      })
    : null;

  if (!client) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Insufficient client permissions" }, { status: 403 }),
    };
  }

  return auth;
}
