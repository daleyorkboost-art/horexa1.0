import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth/options";

export const roleGroups = {
  admin: ["SUPER_ADMIN", "ADMIN", "EDITOR", "OPERATIONS"],
  superAdmin: ["SUPER_ADMIN"],
  client: ["CLIENT", "SUPER_ADMIN", "ADMIN", "OPERATIONS"],
} as const;

export type AppRole = (typeof roleGroups)[keyof typeof roleGroups][number];

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
