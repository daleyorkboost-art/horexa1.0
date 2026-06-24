import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadToCloudinary(file: File, folder = "horexa") {
  const bytes = Buffer.from(await file.arrayBuffer());
  const base64 = `data:${file.type};base64,${bytes.toString("base64")}`;

  return cloudinary.uploader.upload(base64, {
    folder,
    resource_type: "auto",
  });
}
