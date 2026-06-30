import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const defaultAllowedTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const extensionByMime: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "application/pdf": ".pdf",
  "application/msword": ".doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
};

function safeFolder(folder: string) {
  return folder
    .replace(/^\/+/, "")
    .replace(/\\/g, "/")
    .split("/")
    .filter(Boolean)
    .map((segment) => segment.replace(/[^a-zA-Z0-9-_]/g, "-"))
    .join("/");
}

export async function validateUploadFileSecurity(file: File, allowedTypes = defaultAllowedTypes) {
  if (file.size <= 0) {
    return "File is empty";
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return "File exceeds the 10MB upload limit";
  }

  if (!allowedTypes.has(file.type)) {
    return "File type is not allowed";
  }

  if (!(await hasExpectedFileSignature(file))) {
    return "File content does not match the declared file type";
  }

  return null;
}

async function hasExpectedFileSignature(file: File) {
  const header = new Uint8Array(await file.slice(0, 12).arrayBuffer());

  switch (file.type) {
    case "image/jpeg":
      return header[0] === 0xff && header[1] === 0xd8 && header[2] === 0xff;
    case "image/png":
      return matchesBytes(header, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    case "image/webp":
      return matchesAscii(header, 0, "RIFF") && matchesAscii(header, 8, "WEBP");
    case "application/pdf":
      return matchesAscii(header, 0, "%PDF");
    case "application/msword":
      return matchesBytes(header, [0xd0, 0xcf, 0x11, 0xe0]);
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return matchesAscii(header, 0, "PK");
    default:
      return false;
  }
}

function matchesBytes(buffer: Uint8Array, bytes: number[]) {
  return bytes.every((byte, index) => buffer[index] === byte);
}

function matchesAscii(buffer: Uint8Array, offset: number, value: string) {
  return Array.from(value).every((character, index) => buffer[offset + index] === character.charCodeAt(0));
}

export async function saveLocalUpload(file: File, folder = "general") {
  const normalizedFolder = safeFolder(folder);
  const extension = extensionByMime[file.type] ?? path.extname(file.name).toLowerCase();
  const filename = `${crypto.randomUUID()}${extension}`;
  const relativePath = `/uploads/${normalizedFolder}/${filename}`;
  const absoluteFolder = path.join(process.cwd(), "public", "uploads", normalizedFolder);
  const absolutePath = path.join(absoluteFolder, filename);

  await mkdir(absoluteFolder, { recursive: true });
  await writeFile(absolutePath, Buffer.from(await file.arrayBuffer()));

  return {
    url: relativePath,
    relativePath,
    publicId: relativePath,
    resourceType: file.type.startsWith("image/") ? "image" : "raw",
    bytes: file.size,
    format: extension.replace(".", ""),
    folder: normalizedFolder,
    originalName: file.name,
    mimeType: file.type,
  };
}
