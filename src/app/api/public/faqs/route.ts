import { cached, apiError } from "@/lib/api/response";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") ?? undefined;
    const serviceId = searchParams.get("serviceId") ?? undefined;

    const items = await prisma.fAQ.findMany({
      where: {
        status: { in: ["ACTIVE", "PUBLISHED"] },
        ...(category ? { category } : {}),
        ...(serviceId ? { serviceId } : {}),
      },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });

    return cached({ items }, 300);
  } catch (error) {
    return apiError(error);
  }
}
