import { prisma } from "@/lib/db";
import { createCollectionHandlers } from "@/lib/api/crud";
import { roleGroups } from "@/lib/auth/rbac";
import { testimonialSchema } from "@/lib/validators/admin";

export const { GET, POST } = createCollectionHandlers(prisma.testimonial, testimonialSchema, roleGroups.admin);
