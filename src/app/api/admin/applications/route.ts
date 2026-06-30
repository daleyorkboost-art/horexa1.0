import { firestoreModels } from "@/firebase/firestore";
import { createCollectionHandlers } from "@/lib/api/crud";
import { roleGroups } from "@/lib/auth/rbac";
import { applicationSchema } from "@/lib/validators/admin";

export const { GET, POST } = createCollectionHandlers(firestoreModels.application, applicationSchema, roleGroups.admin, {
  entity: "Application",
  searchFields: ["fullName", "email", "phone", "message"],
  sortableFields: ["createdAt", "updatedAt", "fullName", "status"],
  filterFields: ["status"],
  include: { career: true },
});
