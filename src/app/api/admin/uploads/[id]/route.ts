import { prisma } from "@/lib/db";
import { createItemHandlers } from "@/lib/api/crud";
import { roleGroups } from "@/lib/auth/rbac";
import { uploadAssetSchema } from "@/lib/validators/admin";

export const { GET, PATCH, DELETE } = createItemHandlers(prisma.uploadAsset, uploadAssetSchema, roleGroups.admin, {
  entity: "UploadAsset",
});
