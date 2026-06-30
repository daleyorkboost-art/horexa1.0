import { firestoreModels } from "@/firebase/firestore";

type AuditInput = {
  actorId?: string | null;
  action: "CREATE" | "UPDATE" | "DELETE" | "LOGIN" | "LOGOUT" | "UPLOAD" | "EMAIL" | "STATUS_CHANGE" | "EXPORT";
  entity: string;
  entityId?: string | null;
  request?: Request;
  metadata?: Record<string, unknown>;
};

export async function writeAuditLog(input: AuditInput) {
  try {
    await firestoreModels.auditLog.create({
      data: {
        actorId: input.actorId ?? undefined,
        action: input.action,
        entity: input.entity,
        entityId: input.entityId ?? undefined,
        ipAddress: input.request?.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? input.request?.headers.get("x-real-ip") ?? undefined,
        userAgent: input.request?.headers.get("user-agent") ?? undefined,
        metadata: input.metadata,
      },
    });
  } catch (error) {
    console.warn("Audit log write failed", error);
  }
}
