import { prisma } from "@/lib/db";
import { createItemHandlers } from "@/lib/api/crud";
import { roleGroups } from "@/lib/auth/rbac";
import { applicationSchema } from "@/lib/validators/admin";

export const { GET, PATCH, DELETE } = createItemHandlers(prisma.application, applicationSchema, roleGroups.admin, {
  entity: "Application",
});
