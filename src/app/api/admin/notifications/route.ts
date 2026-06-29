import { prisma } from "@/lib/db";
import { createCollectionHandlers } from "@/lib/api/crud";
import { roleGroups } from "@/lib/auth/rbac";
import { notificationSchema } from "@/lib/validators/admin";

export const { GET, POST } = createCollectionHandlers(prisma.notification, notificationSchema, roleGroups.admin, {
  entity: "Notification",
  searchFields: ["title", "body"],
  sortableFields: ["createdAt", "type"],
  filterFields: [],
});
