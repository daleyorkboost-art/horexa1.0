import { cached } from "@/lib/api/response";
import { firestoreModels } from "@/firebase/firestore";
import { getPublicFaqs } from "@/lib/public-data";
import { warnUnlessMissingFirebaseAdmin } from "@/lib/api/public-content";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") ?? undefined;
    const serviceId = searchParams.get("serviceId") ?? undefined;

    const items = await firestoreModels.fAQ.findMany({
      where: {
        status: { in: ["ACTIVE", "PUBLISHED"] },
        ...(category ? { category } : {}),
        ...(serviceId ? { serviceId } : {}),
      },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });

    return cached({ items }, 300);
  } catch (error) {
    warnUnlessMissingFirebaseAdmin("Public FAQs API fallback used", error);
    const { searchParams } = new URL(request.url);
    return cached({ items: await getPublicFaqs(searchParams.get("category") ?? undefined) }, 300);
  }
}
