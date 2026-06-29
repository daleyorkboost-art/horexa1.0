import { prisma } from "@/lib/db";
import { createCollectionHandlers } from "@/lib/api/crud";
import { roleGroups } from "@/lib/auth/rbac";
import { categorySchema } from "@/lib/validators/admin";

export const { GET, POST } = createCollectionHandlers(prisma.category, categorySchema, roleGroups.admin, {
  entity: "Category",
  searchFields: ["name", "slug", "description"],
  sortableFields: ["createdAt", "updatedAt", "name", "type", "status"],
  filterFields: ["status"],
});
