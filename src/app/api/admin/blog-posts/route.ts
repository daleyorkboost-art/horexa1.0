import { firestoreModels } from "@/firebase/firestore";
import { createCollectionHandlers } from "@/lib/api/crud";
import { roleGroups } from "@/lib/auth/rbac";
import { blogPostSchema } from "@/lib/validators/admin";

export const { GET, POST } = createCollectionHandlers(firestoreModels.blogPost, blogPostSchema, roleGroups.admin, {
  entity: "BlogPost",
  searchFields: ["title", "excerpt", "content", "category"],
  sortableFields: ["createdAt", "updatedAt", "publishedAt", "title", "status"],
  filterFields: ["status", "category", "featured"],
});
