import { apiError, created } from "@/lib/api/response";
import { writeAuditLog } from "@/lib/api/audit";
import { requireRoles, roleGroups } from "@/lib/auth/rbac";
import { firestoreModels } from "@/firebase/firestore";
import { assertSameOrigin } from "@/lib/security/request";
import { saveLocalUpload, validateUploadFileSecurity } from "@/lib/storage/local-upload";

export async function POST(request: Request) {
  const auth = await requireRoles([...roleGroups.admin, "CLIENT"]);
  if (!auth.ok) return auth.response;

  try {
    assertSameOrigin(request);
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = String(formData.get("folder") ?? "horexa");
    const ownerType = String(formData.get("ownerType") ?? "GENERAL");
    const ownerId = String(formData.get("ownerId") ?? "") || undefined;

    if (!(file instanceof File)) {
      return Response.json({ error: "A file field is required" }, { status: 422 });
    }

    const validationError = await validateUploadFileSecurity(file);
    if (validationError) {
      return Response.json({ error: validationError }, { status: 422 });
    }

    const result = await saveLocalUpload(file, folder);
    const asset = await firestoreModels.uploadAsset.create({
      data: {
        url: result.url,
        publicId: result.publicId,
        resourceType: result.resourceType,
        bytes: result.bytes,
        format: result.format,
        folder,
        ownerType: ownerType as never,
        ownerId,
        mimeType: file.type,
        originalName: file.name,
        uploadedById: auth.session.user?.id,
      },
    });

    await writeAuditLog({
      actorId: auth.session.user?.id,
      action: "UPLOAD",
      entity: "UploadAsset",
      entityId: asset.id,
      request,
      metadata: {
        folder,
        ownerType,
        ownerId,
      },
    });

    return created({
      id: asset.id,
      url: result.url,
      publicId: result.publicId,
      resourceType: result.resourceType,
      bytes: result.bytes,
      format: result.format,
    });
  } catch (error) {
    return apiError(error);
  }
}
