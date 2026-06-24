import { prisma } from "@/lib/db";
import { createCollectionHandlers } from "@/lib/api/crud";
import { roleGroups } from "@/lib/auth/rbac";
import { amcPlanSchema } from "@/lib/validators/admin";

export const { GET, POST } = createCollectionHandlers(prisma.aMCPlan, amcPlanSchema, roleGroups.admin);
