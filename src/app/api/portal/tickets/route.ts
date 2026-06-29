import { apiError, created, ok, parseJson } from "@/lib/api/response";
import { writeAuditLog } from "@/lib/api/audit";
import { resolveClientScope } from "@/lib/auth/portal-access";
import { requireRoles, roleGroups } from "@/lib/auth/rbac";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email/mailer";
import { assertSameOrigin } from "@/lib/security/request";
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
    assertSameOrigin(request);
    const body = await parseJson(request);
    const data = supportTicketSchema.parse(body);
    const scope = await resolveClientScope(auth);

    const ticket = await prisma.ticket.create({
      data: {
        ...data,
        clientId: "clientId" in scope ? scope.clientId : data.clientId,
      },
    });
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL ?? process.env.SMTP_USER;

    await Promise.allSettled([
      prisma.notification.create({
        data: {
          userId: auth.session.user?.id,
          type: "TICKET",
          title: "Support ticket created",
          body: `${ticket.subject} has been submitted to the Horexa support team.`,
          metadata: { ticketId: ticket.id },
        },
      }),
      adminEmail
        ? sendEmail({
            to: adminEmail,
            subject: "New Horexa client portal ticket",
            html: `<p>A client portal ticket was created.</p><p><strong>${ticket.subject}</strong></p><p>${ticket.message}</p><p>Priority: ${ticket.priority}</p>`,
          })
        : Promise.resolve({ skipped: true }),
      writeAuditLog({
        actorId: auth.session.user?.id,
        action: "CREATE",
        entity: "Ticket",
        entityId: ticket.id,
        request,
      }),
    ]);

    return created(ticket);
  } catch (error) {
    return apiError(error);
  }
}
