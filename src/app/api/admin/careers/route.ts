import { firestoreModels } from "@/firebase/firestore";
import { createCollectionHandlers } from "@/lib/api/crud";
import { roleGroups } from "@/lib/auth/rbac";
import { careerSchema } from "@/lib/validators/admin";

export const { GET, POST } = createCollectionHandlers(firestoreModels.career, careerSchema, roleGroups.admin, {
  entity: "Career",
  searchFields: ["title", "location", "type", "experience", "description"],
  sortableFields: ["createdAt", "updatedAt", "title", "location", "status"],
  filterFields: ["status"],
});
