import { firestoreModels } from "@/firebase/firestore";
import { createCollectionHandlers } from "@/lib/api/crud";
import { roleGroups } from "@/lib/auth/rbac";
import { amcPlanSchema } from "@/lib/validators/admin";

export const { GET, POST } = createCollectionHandlers(firestoreModels.aMCPlan, amcPlanSchema, roleGroups.admin, {
  entity: "AMCPlan",
  searchFields: ["name", "audience", "frequency", "description"],
  sortableFields: ["createdAt", "updatedAt", "name", "status"],
  filterFields: ["status"],
});
