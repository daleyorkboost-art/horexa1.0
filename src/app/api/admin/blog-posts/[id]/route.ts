import { firestoreModels } from "@/firebase/firestore";
import { createItemHandlers } from "@/lib/api/crud";
import { roleGroups } from "@/lib/auth/rbac";
import { blogPostSchema } from "@/lib/validators/admin";

export const { GET, PATCH, DELETE } = createItemHandlers(firestoreModels.blogPost, blogPostSchema, roleGroups.admin, {
  entity: "BlogPost",
});
