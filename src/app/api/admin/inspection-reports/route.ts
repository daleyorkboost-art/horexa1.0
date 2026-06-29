import { prisma } from "@/lib/db";
import { createCollectionHandlers } from "@/lib/api/crud";
import { roleGroups } from "@/lib/auth/rbac";
import { inspectionReportSchema } from "@/lib/validators/admin";

export const { GET, POST } = createCollectionHandlers(prisma.inspectionReport, inspectionReportSchema, roleGroups.admin, {
  entity: "InspectionReport",
  searchFields: ["inspectionId", "type", "inspector", "recommendations"],
  sortableFields: ["createdAt", "updatedAt", "scheduledAt", "completedAt", "score", "status"],
  filterFields: ["status"],
  include: { client: true },
});
