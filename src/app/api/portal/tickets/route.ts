import { apiError, created, ok, parseJson } from "@/lib/api/response";
import { requireRoles, roleGroups } from "@/lib/auth/rbac";
import { prisma } from "@/lib/db";
import { supportTicketSchema } from "@/lib/validators/admin";

export async function GET() {
  const auth = await requireRoles(roleGroups.client);
  if (!auth.ok) return auth.response;

  const userId = auth.session.user?.id;
  const client = auth.role === "CLIENT" && userId ? await prisma.client.findUnique({ where: { userId } }) : null;
  const where = client ? { clientId: client.id } : undefined;

  const tickets = await prisma.supportTicket.findMany({
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
    const userId = auth.session.user?.id;
    const client = auth.role === "CLIENT" && userId ? await prisma.client.findUnique({ where: { userId } }) : null;

    const ticket = await prisma.supportTicket.create({
      data: {
        ...data,
        clientId: data.clientId ?? client?.id,
      },
    });

    return created(ticket);
  } catch (error) {
    return apiError(error);
  }
}
