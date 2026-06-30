import { firestoreModels } from "@/firebase/firestore";
import { createCollectionHandlers } from "@/lib/api/crud";
import { roleGroups } from "@/lib/auth/rbac";
import { faqSchema } from "@/lib/validators/admin";

export const { GET, POST } = createCollectionHandlers(firestoreModels.fAQ, faqSchema, roleGroups.admin, {
  entity: "FAQ",
  searchFields: ["question", "answer", "category"],
  sortableFields: ["createdAt", "updatedAt", "sortOrder", "category", "status"],
  filterFields: ["status", "category"],
  include: { service: true },
});
