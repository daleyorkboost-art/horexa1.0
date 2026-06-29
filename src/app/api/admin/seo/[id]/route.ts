import { prisma } from "@/lib/db";
import { createItemHandlers } from "@/lib/api/crud";
import { roleGroups } from "@/lib/auth/rbac";
import { seoMetadataSchema } from "@/lib/validators/admin";

export const { GET, PATCH, DELETE } = createItemHandlers(prisma.seoMetadata, seoMetadataSchema, roleGroups.admin, {
  entity: "SeoMetadata",
});
