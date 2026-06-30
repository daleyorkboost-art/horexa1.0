import { firestoreModels } from "@/firebase/firestore";
import { createCollectionHandlers } from "@/lib/api/crud";
import { roleGroups } from "@/lib/auth/rbac";
import { uploadAssetSchema } from "@/lib/validators/admin";

export const { GET, POST } = createCollectionHandlers(firestoreModels.uploadAsset, uploadAssetSchema, roleGroups.admin, {
  entity: "UploadAsset",
  searchFields: ["url", "publicId", "folder", "originalName", "mimeType"],
  sortableFields: ["createdAt", "bytes", "folder", "resourceType"],
  filterFields: [],
});
