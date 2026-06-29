import { hash } from "bcryptjs";
import { apiError, created, ok, parseJson } from "@/lib/api/response";
import { writeAuditLog } from "@/lib/api/audit";
import { resolveClientScope } from "@/lib/auth/portal-access";
import { requireRoles, roleGroups } from "@/lib/auth/rbac";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email/mailer";
import { assertSameOrigin } from "@/lib/security/request";
import { portalTeamMemberSchema } from "@/lib/validators/portal";

function temporaryPassword() {
  return crypto.randomUUID().replaceAll("-", "").slice(0, 14);
}

export async function GET() {
  const auth = await requireRoles(roleGroups.client);
  if (!auth.ok) return auth.response;

  const scope = await resolveClientScope(auth);
  const where = "clientId" in scope ? { clientId: scope.clientId } : undefined;

  const members = await prisma.clientMember.findMany({
    where,
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  return ok({ items: members });
}

export async function POST(request: Request) {
  const auth = await requireRoles(roleGroups.client);
  if (!auth.ok) return auth.response;

  try {
    assertSameOrigin(request);
    const scope = await resolveClientScope(auth);
    if (!("clientId" in scope)) {
      return Response.json({ error: "A client account is required to invite team members" }, { status: 403 });
    }

    const data = portalTeamMemberSchema.parse(await parseJson(request));
    const clientId = String(scope.clientId);
    const email = data.email.toLowerCase();
    const password = temporaryPassword();
    const existingUser = await prisma.user.findUnique({ where: { email } });

    const user = await prisma.user.upsert({
      where: { email },
      update: {
        name: data.name,
        phone: data.phone || undefined,
        role: "CLIENT",
        isActive: true,
      },
      create: {
        name: data.name,
        email,
        phone: data.phone || undefined,
        role: "CLIENT",
        isActive: true,
        passwordHash: await hash(password, 12),
      },
    });

    const member = await prisma.clientMember.upsert({
      where: { clientId_userId: { clientId, userId: user.id } },
      update: {
        title: data.title || null,
        permissions: data.permissions ?? [],
        status: "ACTIVE",
      },
      create: {
        clientId,
        userId: user.id,
        title: data.title || null,
        permissions: data.permissions ?? [],
      },
      include: { user: true },
    });

    await Promise.allSettled([
      sendEmail({
        to: email,
        subject: "Horexa client portal access",
        html: `<p>Hello ${data.name},</p><p>You have been added to the Horexa client portal.</p><p>Login email: ${email}</p><p>${existingUser ? "Use your existing password, or reset it from the login page." : `Temporary password: ${password}`}</p>`,
      }),
      writeAuditLog({
        actorId: auth.session.user?.id,
        action: "CREATE",
        entity: "ClientMember",
        entityId: member.id,
        request,
      }),
    ]);

    return created(member);
  } catch (error) {
    return apiError(error);
  }
}
