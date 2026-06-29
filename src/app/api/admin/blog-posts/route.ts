import { prisma } from "@/lib/db";
import { createCollectionHandlers } from "@/lib/api/crud";
import { roleGroups } from "@/lib/auth/rbac";
import { blogPostSchema } from "@/lib/validators/admin";

export const { GET, POST } = createCollectionHandlers(prisma.blogPost, blogPostSchema, roleGroups.admin, {
  entity: "BlogPost",
  searchFields: ["title", "excerpt", "content", "category"],
  sortableFields: ["createdAt", "updatedAt", "publishedAt", "title", "status"],
  filterFields: ["status", "category", "featured"],
});
