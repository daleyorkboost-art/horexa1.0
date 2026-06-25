import { v2 as cloudinary } from "cloudinary";

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

export const allowedUploadTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
  "image/webp",
]);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export function validateUploadFile(file: File, allowedTypes = allowedUploadTypes) {
  if (!allowedTypes.has(file.type)) {
    return `Unsupported file type. Allowed formats are PDF, DOC, DOCX, PNG, JPG, and WEBP.`;
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return "File size must be 10MB or less.";
  }

  return null;
}

export async function uploadToCloudinary(file: File, folder = "horexa") {
  const bytes = Buffer.from(await file.arrayBuffer());
  const base64 = `data:${file.type};base64,${bytes.toString("base64")}`;

  return cloudinary.uploader.upload(base64, {
    folder,
    resource_type: "auto",
  });
}
