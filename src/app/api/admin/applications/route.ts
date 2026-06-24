import { prisma } from "@/lib/db";
import { createCollectionHandlers } from "@/lib/api/crud";
import { roleGroups } from "@/lib/auth/rbac";
import { applicationSchema } from "@/lib/validators/admin";

export const { GET, POST } = createCollectionHandlers(prisma.application, applicationSchema, roleGroups.admin);
