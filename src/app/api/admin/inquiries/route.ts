import { firestoreModels } from "@/firebase/firestore";
import { createCollectionHandlers } from "@/lib/api/crud";
import { roleGroups } from "@/lib/auth/rbac";
import { inquirySchema } from "@/lib/validators/admin";

export const { GET, POST } = createCollectionHandlers(firestoreModels.inquiry, inquirySchema, roleGroups.admin, {
  entity: "Inquiry",
  searchFields: ["fullName", "email", "phone", "businessName", "city", "message"],
  sortableFields: ["createdAt", "updatedAt", "fullName", "status"],
  filterFields: ["status", "city"],
  include: { service: true, amcPlan: true, client: true },
});
