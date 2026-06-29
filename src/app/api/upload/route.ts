import { apiError, created } from "@/lib/api/response";
import { writeAuditLog } from "@/lib/api/audit";
import { requireRoles, roleGroups } from "@/lib/auth/rbac";
import { prisma } from "@/lib/db";
import { assertSameOrigin } from "@/lib/security/request";
import { uploadToCloudinary, validateUploadFileSecurity } from "@/lib/storage/cloudinary";

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

    const result = await uploadToCloudinary(file, folder);
    const asset = await prisma.uploadAsset.create({
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        resourceType: result.resource_type,
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
      url: result.secure_url,
      publicId: result.public_id,
      resourceType: result.resource_type,
      bytes: result.bytes,
      format: result.format,
    });
  } catch (error) {
    return apiError(error);
  }
}
