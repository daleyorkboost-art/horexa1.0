import { firestoreModels } from "@/firebase/firestore";
import { createItemHandlers } from "@/lib/api/crud";
import { roleGroups } from "@/lib/auth/rbac";
import { invoiceSchema } from "@/lib/validators/admin";

export const { GET, PATCH, DELETE } = createItemHandlers(firestoreModels.invoice, invoiceSchema, roleGroups.admin, {
  entity: "Invoice",
});
