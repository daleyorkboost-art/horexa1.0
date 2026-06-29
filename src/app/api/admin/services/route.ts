import { prisma } from "@/lib/db";
import { createCollectionHandlers } from "@/lib/api/crud";
import { roleGroups } from "@/lib/auth/rbac";
import { serviceSchema } from "@/lib/validators/admin";

export const { GET, POST } = createCollectionHandlers(prisma.service, serviceSchema, roleGroups.admin, {
  entity: "Service",
  searchFields: ["title", "summary", "description", "category"],
  sortableFields: ["createdAt", "updatedAt", "title", "sortOrder", "status"],
  filterFields: ["status", "category"],
});
