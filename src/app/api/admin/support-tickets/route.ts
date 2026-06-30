import { firestoreModels } from "@/firebase/firestore";
import { createCollectionHandlers } from "@/lib/api/crud";
import { roleGroups } from "@/lib/auth/rbac";
import { supportTicketSchema } from "@/lib/validators/admin";

export const { GET, POST } = createCollectionHandlers(firestoreModels.ticket, supportTicketSchema, roleGroups.admin, {
  entity: "Ticket",
  searchFields: ["subject", "message", "assignedTo"],
  sortableFields: ["createdAt", "updatedAt", "subject", "priority", "status"],
  filterFields: ["status"],
  include: { client: true },
});
