import { cached, apiError } from "@/lib/api/response";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const [settings, seo] = await Promise.all([
      prisma.websiteSetting.findMany(),
      prisma.seoMetadata.findMany({ where: { status: "ACTIVE" } }),
    ]);

    return cached({ settings, seo }, 300);
  } catch (error) {
    return apiError(error);
  }
}
