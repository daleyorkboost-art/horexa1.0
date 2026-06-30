import { firestoreModels } from "@/firebase/firestore";
import { createCollectionHandlers } from "@/lib/api/crud";
import { roleGroups } from "@/lib/auth/rbac";
import { projectSchema } from "@/lib/validators/admin";

export const { GET, POST } = createCollectionHandlers(firestoreModels.project, projectSchema, roleGroups.admin, {
  entity: "Project",
  searchFields: ["title", "location", "description", "category"],
  sortableFields: ["createdAt", "updatedAt", "title", "location", "status"],
  filterFields: ["status", "category", "featured"],
});
