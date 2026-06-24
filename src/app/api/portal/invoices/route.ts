import { ok } from "@/lib/api/response";
import { requireRoles, roleGroups } from "@/lib/auth/rbac";
import { prisma } from "@/lib/db";

export async function GET() {
  const auth = await requireRoles(roleGroups.client);
  if (!auth.ok) return auth.response;

  const userId = auth.session.user?.id;
  const client = auth.role === "CLIENT" && userId ? await prisma.client.findUnique({ where: { userId } }) : null;
  const where = client ? { clientId: client.id } : undefined;

  const invoices = await prisma.invoice.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return ok({ items: invoices });
}
