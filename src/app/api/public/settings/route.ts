import { cached } from "@/lib/api/response";
import { firestoreModels } from "@/firebase/firestore";
import { getPublicContactSettings } from "@/lib/public-data";
import { warnUnlessMissingFirebaseAdmin } from "@/lib/api/public-content";

export async function GET() {
  try {
    const [settings, seo] = await Promise.all([
      firestoreModels.websiteSetting.findMany(),
      firestoreModels.seoMetadata.findMany({ where: { status: "ACTIVE" } }),
    ]);

    return cached({ settings, seo }, 300);
  } catch (error) {
    warnUnlessMissingFirebaseAdmin("Public settings API fallback used", error);
    return cached({ settings: [{ key: "contact", value: await getPublicContactSettings() }], seo: [] }, 300);
  }
}
