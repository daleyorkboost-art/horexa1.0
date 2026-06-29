import { prisma } from "@/lib/db";
import { createItemHandlers } from "@/lib/api/crud";
import { roleGroups } from "@/lib/auth/rbac";
import { inquirySchema } from "@/lib/validators/admin";

export const { GET, PATCH, DELETE } = createItemHandlers(prisma.inquiry, inquirySchema, roleGroups.admin, {
  entity: "Inquiry",
});
