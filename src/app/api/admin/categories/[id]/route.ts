import { firestoreModels } from "@/firebase/firestore";
import { createItemHandlers } from "@/lib/api/crud";
import { roleGroups } from "@/lib/auth/rbac";
import { categorySchema } from "@/lib/validators/admin";

export const { GET, PATCH, DELETE } = createItemHandlers(firestoreModels.category, categorySchema, roleGroups.admin, {
  entity: "Category",
});
