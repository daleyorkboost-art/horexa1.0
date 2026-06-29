import { prisma } from "@/lib/db";
import { createCollectionHandlers } from "@/lib/api/crud";
import { roleGroups } from "@/lib/auth/rbac";
import { documentSchema } from "@/lib/validators/admin";

export const { GET, POST } = createCollectionHandlers(prisma.document, documentSchema, roleGroups.admin, {
  entity: "Document",
  searchFields: ["title", "category", "fileType", "uploadedBy"],
  sortableFields: ["createdAt", "updatedAt", "title", "category", "status"],
  filterFields: ["status", "category"],
  include: { client: true },
});
