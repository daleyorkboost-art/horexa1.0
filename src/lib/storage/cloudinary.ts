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

export async function validateUploadFileSecurity(file: File, allowedTypes = allowedUploadTypes) {
  const basicError = validateUploadFile(file, allowedTypes);
  if (basicError) return basicError;

  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const isPdf = bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46;
  const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  const isPng = bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
  const isWebp =
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50;
  const isDoc = bytes[0] === 0xd0 && bytes[1] === 0xcf && bytes[2] === 0x11 && bytes[3] === 0xe0;
  const isZipBasedOffice = bytes[0] === 0x50 && bytes[1] === 0x4b;

  const matches =
    (file.type === "application/pdf" && isPdf) ||
    (file.type === "image/jpeg" && isJpeg) ||
    (file.type === "image/png" && isPng) ||
    (file.type === "image/webp" && isWebp) ||
    (file.type === "application/msword" && isDoc) ||
    (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && isZipBasedOffice);

  return matches ? null : "File content does not match the declared file type.";
}

export async function uploadToCloudinary(file: File, folder = "horexa") {
  const bytes = Buffer.from(await file.arrayBuffer());
  const base64 = `data:${file.type};base64,${bytes.toString("base64")}`;

  return cloudinary.uploader.upload(base64, {
    folder,
    resource_type: "auto",
  });
}
