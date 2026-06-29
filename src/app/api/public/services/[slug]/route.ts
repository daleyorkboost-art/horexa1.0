import { getServiceBySlug } from "@/lib/api/public-content";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  return getServiceBySlug(slug);
}
