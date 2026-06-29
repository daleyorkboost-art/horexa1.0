import { apiError, created, ok, parseJson } from "@/lib/api/response";
import { writeAuditLog } from "@/lib/api/audit";
import { resolveClientScope } from "@/lib/auth/portal-access";
import { requireRoles, roleGroups } from "@/lib/auth/rbac";
import { prisma } from "@/lib/db";
import { supportTicketSchema } from "@/lib/validators/admin";

export async function GET() {
  const auth = await requireRoles(roleGroups.client);
  if (!auth.ok) return auth.response;

  const scope = await resolveClientScope(auth);
  const where = "clientId" in scope ? { clientId: scope.clientId } : undefined;

  const tickets = await prisma.ticket.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return ok({ items: tickets });
}

export async function POST(request: Request) {
  const auth = await requireRoles(roleGroups.client);
  if (!auth.ok) return auth.response;

  try {
    const body = await parseJson(request);
    const data = supportTicketSchema.parse(body);
    const scope = await resolveClientScope(auth);

    const ticket = await prisma.ticket.create({
      data: {
        ...data,
        clientId: "clientId" in scope ? scope.clientId : data.clientId,
      },
    });

    await writeAuditLog({
      actorId: auth.session.user?.id,
      action: "CREATE",
      entity: "Ticket",
      entityId: ticket.id,
      request,
    });

    return created(ticket);
  } catch (error) {
    return apiError(error);
  }
}
