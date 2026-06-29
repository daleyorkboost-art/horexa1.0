import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";

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
    await prisma.auditLog.create({
      data: {
        actorId: input.actorId ?? undefined,
        action: input.action,
        entity: input.entity,
        entityId: input.entityId ?? undefined,
        ipAddress: input.request?.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? input.request?.headers.get("x-real-ip") ?? undefined,
        userAgent: input.request?.headers.get("user-agent") ?? undefined,
        metadata: input.metadata as Prisma.InputJsonValue | undefined,
      },
    });
  } catch (error) {
    console.warn("Audit log write failed", error);
  }
}
