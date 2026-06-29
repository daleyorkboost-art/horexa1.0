import { apiError, ok, parseJson } from "@/lib/api/response";
import { requireRoles, roleGroups } from "@/lib/auth/rbac";
import { prisma } from "@/lib/db";
import { assertSameOrigin } from "@/lib/security/request";
import { portalNotificationUpdateSchema } from "@/lib/validators/portal";

export async function GET() {
  const auth = await requireRoles(roleGroups.client);
  if (!auth.ok) return auth.response;

  const notifications = await prisma.notification.findMany({
    where: { userId: auth.session.user?.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return ok({
    unreadCount: notifications.filter((item) => !item.readAt).length,
    items: notifications,
  });
}

export async function PATCH(request: Request) {
  const auth = await requireRoles(roleGroups.client);
  if (!auth.ok) return auth.response;

  try {
    assertSameOrigin(request);
    const data = portalNotificationUpdateSchema.parse(await parseJson(request));
    const readAt = data.read ? new Date() : null;
    const where = {
      userId: auth.session.user?.id,
      ...(data.notificationIds?.length ? { id: { in: data.notificationIds } } : {}),
    };

    await prisma.notification.updateMany({ where, data: { readAt } });
    const notifications = await prisma.notification.findMany({
      where: { userId: auth.session.user?.id },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return ok({ unreadCount: notifications.filter((item) => !item.readAt).length, items: notifications });
  } catch (error) {
    return apiError(error);
  }
}
