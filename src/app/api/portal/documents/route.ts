import { apiError, created, ok } from "@/lib/api/response";
import { writeAuditLog } from "@/lib/api/audit";
import { resolveClientScope } from "@/lib/auth/portal-access";
import { requireRoles, roleGroups } from "@/lib/auth/rbac";
import { prisma } from "@/lib/db";
import { assertSameOrigin } from "@/lib/security/request";
import { uploadToCloudinary, validateUploadFileSecurity } from "@/lib/storage/cloudinary";
import { portalDocumentUploadSchema } from "@/lib/validators/portal";

export async function GET() {
  const auth = await requireRoles(roleGroups.client);
  if (!auth.ok) return auth.response;

  const scope = await resolveClientScope(auth);
  const where = "clientId" in scope ? { clientId: scope.clientId } : undefined;

  const documents = await prisma.document.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return ok({ items: documents });
}

export async function POST(request: Request) {
  const auth = await requireRoles(roleGroups.client);
  if (!auth.ok) return auth.response;

  try {
    assertSameOrigin(request);
    const scope = await resolveClientScope(auth);
    const formData = await request.formData();
    const file = formData.get("file");
    const data = portalDocumentUploadSchema.parse({
      title: String(formData.get("title") ?? ""),
      category: String(formData.get("category") ?? ""),
    });

    if (!("clientId" in scope)) {
      return Response.json({ error: "A client account is required to upload documents" }, { status: 403 });
    }

    if (!(file instanceof File)) {
      return Response.json({ error: "A file field is required" }, { status: 422 });
    }

    const validationError = await validateUploadFileSecurity(file);
    if (validationError) {
      return Response.json({ error: validationError }, { status: 422 });
    }

    const result = await uploadToCloudinary(file, `horexa/clients/${scope.clientId}/documents`);
    const [document, asset] = await prisma.$transaction([
      prisma.document.create({
        data: {
          ...data,
          clientId: scope.clientId,
          fileUrl: result.secure_url,
          fileType: file.type,
          fileSize: result.bytes,
          uploadedBy: auth.session.user?.email ?? auth.session.user?.id,
        },
      }),
      prisma.uploadAsset.create({
        data: {
          url: result.secure_url,
          publicId: result.public_id,
          resourceType: result.resource_type,
          bytes: result.bytes,
          format: result.format,
          folder: `horexa/clients/${scope.clientId}/documents`,
          ownerType: "DOCUMENT",
          ownerId: scope.clientId,
          mimeType: file.type,
          originalName: file.name,
          uploadedById: auth.session.user?.id,
        },
      }),
    ]);

    await writeAuditLog({
      actorId: auth.session.user?.id,
      action: "UPLOAD",
      entity: "Document",
      entityId: document.id,
      request,
      metadata: { assetId: asset.id, clientId: scope.clientId },
    });

    return created(document);
  } catch (error) {
    return apiError(error);
  }
}
