import { prisma } from "@/lib/db";
import { createCollectionHandlers } from "@/lib/api/crud";
import { roleGroups } from "@/lib/auth/rbac";
import { complianceRecordSchema } from "@/lib/validators/admin";

export const { GET, POST } = createCollectionHandlers(prisma.complianceRecord, complianceRecordSchema, roleGroups.admin, {
  entity: "ComplianceRecord",
  searchFields: ["category", "notes"],
  sortableFields: ["createdAt", "updatedAt", "checkedAt", "category", "score", "status"],
  filterFields: ["status", "category"],
  include: { client: true, report: true },
});
