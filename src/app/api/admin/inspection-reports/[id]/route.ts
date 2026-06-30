import { firestoreModels } from "@/firebase/firestore";
import { createItemHandlers } from "@/lib/api/crud";
import { roleGroups } from "@/lib/auth/rbac";
import { inspectionReportSchema } from "@/lib/validators/admin";

export const { GET, PATCH, DELETE } = createItemHandlers(firestoreModels.inspectionReport, inspectionReportSchema, roleGroups.admin, {
  entity: "InspectionReport",
});
