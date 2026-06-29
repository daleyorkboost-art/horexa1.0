import { prisma } from "@/lib/db";
import { createCollectionHandlers } from "@/lib/api/crud";
import { roleGroups } from "@/lib/auth/rbac";
import { seoMetadataSchema } from "@/lib/validators/admin";

export const { GET, POST } = createCollectionHandlers(prisma.seoMetadata, seoMetadataSchema, roleGroups.admin, {
  entity: "SeoMetadata",
  searchFields: ["route", "title", "description"],
  sortableFields: ["createdAt", "updatedAt", "route", "status"],
  filterFields: ["status"],
});
