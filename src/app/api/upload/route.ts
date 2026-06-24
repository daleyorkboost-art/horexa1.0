import { apiError, created } from "@/lib/api/response";
import { requireRoles, roleGroups } from "@/lib/auth/rbac";
import { uploadToCloudinary } from "@/lib/storage/cloudinary";

export async function POST(request: Request) {
  const auth = await requireRoles([...roleGroups.admin, "CLIENT"]);
  if (!auth.ok) return auth.response;

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = String(formData.get("folder") ?? "horexa");

    if (!(file instanceof File)) {
      return Response.json({ error: "A file field is required" }, { status: 422 });
    }

    const result = await uploadToCloudinary(file, folder);

    return created({
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
