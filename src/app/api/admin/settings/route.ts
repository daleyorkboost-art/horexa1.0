import { firestoreModels } from "@/firebase/firestore";
import { createCollectionHandlers } from "@/lib/api/crud";
import { roleGroups } from "@/lib/auth/rbac";
import { websiteSettingSchema } from "@/lib/validators/admin";

export const { GET, POST } = createCollectionHandlers(firestoreModels.websiteSetting, websiteSettingSchema, roleGroups.admin, {
  entity: "WebsiteSetting",
  searchFields: ["key"],
  sortableFields: ["createdAt", "updatedAt", "key"],
  filterFields: [],
});
