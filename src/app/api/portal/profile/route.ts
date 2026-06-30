import { apiError, ok, parseJson } from "@/lib/api/response";
import { writeAuditLog } from "@/lib/api/audit";
import { resolveClientScope } from "@/lib/auth/portal-access";
import { requireRoles, roleGroups } from "@/lib/auth/rbac";
import { firestoreModels } from "@/firebase/firestore";
import { assertSameOrigin } from "@/lib/security/request";
import { portalProfileSchema } from "@/lib/validators/portal";

export async function GET() {
  const auth = await requireRoles(roleGroups.client);
  if (!auth.ok) return auth.response;

  const scope = await resolveClientScope(auth);
  const client =
    "clientId" in scope
      ? await firestoreModels.client.findUnique({ where: { id: scope.clientId }, include: { user: true, amcPlan: true } })
      : null;

  return ok({ client, user: auth.session.user });
}

export async function PATCH(request: Request) {
  const auth = await requireRoles(roleGroups.client);
  if (!auth.ok) return auth.response;

  try {
    assertSameOrigin(request);
    const scope = await resolveClientScope(auth);
    if (!("clientId" in scope)) {
      return Response.json({ error: "A client account is required to update profile details" }, { status: 403 });
    }

    const data = portalProfileSchema.parse(await parseJson(request));
    const client = await firestoreModels.client.update({
      where: { id: scope.clientId },
      data: {
        companyName: data.companyName,
        contactName: data.contactName || null,
        email: data.email || null,
        phone: data.phone || null,
        city: data.city || null,
        address: data.address || null,
      },
      include: { user: true, amcPlan: true },
    });

    await writeAuditLog({
      actorId: auth.session.user?.id,
      action: "UPDATE",
      entity: "Client",
      entityId: client.id,
      request,
    });

    return ok({ client });
  } catch (error) {
    return apiError(error);
  }
}
