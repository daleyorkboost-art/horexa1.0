import { prisma } from "@/lib/db";
import { createCollectionHandlers } from "@/lib/api/crud";
import { roleGroups } from "@/lib/auth/rbac";
import { invoiceSchema } from "@/lib/validators/admin";

export const { GET, POST } = createCollectionHandlers(prisma.invoice, invoiceSchema, roleGroups.admin, {
  entity: "Invoice",
  searchFields: ["invoiceNo", "currency", "notes"],
  sortableFields: ["createdAt", "updatedAt", "dueDate", "amount", "status"],
  filterFields: ["status"],
  include: { client: true },
});
