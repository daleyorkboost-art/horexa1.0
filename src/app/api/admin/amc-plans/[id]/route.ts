import { prisma } from "@/lib/db";
import { createItemHandlers } from "@/lib/api/crud";
import { roleGroups } from "@/lib/auth/rbac";
import { amcPlanSchema } from "@/lib/validators/admin";

export const { GET, PATCH, DELETE } = createItemHandlers(prisma.aMCPlan, amcPlanSchema, roleGroups.admin, {
  entity: "AMCPlan",
});
