import { cached } from "@/lib/api/response";
import { buildSearchWhere, paginationMeta, parseListQuery } from "@/lib/api/query";
import { firestoreModels } from "@/firebase/firestore";
import {
  getPublicAmcPlans,
  getPublicBlogPost,
  getPublicBlogPosts,
  getPublicCareers,
  getPublicProjects,
  getPublicService,
  getPublicServices,
  getPublicTestimonials,
  type PublicService,
} from "@/lib/public-data";

const publicStatuses = ["PUBLISHED", "ACTIVE"];

export function warnUnlessMissingFirebaseAdmin(message: string, error: unknown) {
  if (error instanceof Error && error.message === "Firebase Admin credentials are missing") {
    return;
  }

  console.warn(message, error);
}

function paginateFallback<T>(items: T[], page: number, pageSize: number) {
  const start = (page - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    pagination: paginationMeta(items.length, page, pageSize),
  };
}

function matchesSearch(item: Record<string, unknown>, searchTerm?: string) {
  if (!searchTerm) {
    return true;
  }

  const needle = searchTerm.toLowerCase();
  return Object.values(item).some((value) => String(value ?? "").toLowerCase().includes(needle));
}

function publicServiceJson({
  id,
  slug,
  title,
  category,
  shortTitle,
  summary,
  description,
  longDescription,
  image,
  benefits,
  includes,
  faqs,
}: PublicService) {
  return {
    id,
    slug,
    title,
    category,
    shortTitle,
    summary,
    description,
    longDescription,
    image,
    benefits,
    includes,
    faqs,
  };
}

export async function listServices(request: Request) {
  try {
    const query = parseListQuery(request);
    const searchWhere = buildSearchWhere(query.searchTerm, ["title", "summary", "description", "category"]);
    const where = {
      status: { in: publicStatuses },
      ...(query.category ? { category: query.category } : {}),
      ...((searchWhere as Record<string, unknown> | undefined) ?? {}),
    };
    const [items, total] = await Promise.all([
      firestoreModels.service.findMany({
        where,
        take: query.take,
        skip: query.skip,
        orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
      }),
      firestoreModels.service.count({ where }),
    ]);
    return cached({ items, pagination: paginationMeta(total, query.page, query.pageSize) }, 300);
  } catch (error) {
    warnUnlessMissingFirebaseAdmin("Public services API fallback used", error);
    const query = parseListQuery(request);
    const services = (await getPublicServices())
      .filter((service) => (query.category ? service.category === query.category : true))
      .filter((service) => matchesSearch(service as unknown as Record<string, unknown>, query.searchTerm))
      .map(publicServiceJson);
    return cached(paginateFallback(services, query.page, query.pageSize), 300);
  }
}

export async function getServiceBySlug(slug: string) {
  try {
    const item = await firestoreModels.service.findFirst({
      where: { slug, status: { in: publicStatuses } },
      include: {
        projects: {
          where: { status: { in: publicStatuses } },
          take: 3,
          orderBy: { createdAt: "desc" },
        },
      },
    });
    return item ? cached(item, 300) : Response.json({ error: { code: "NOT_FOUND", message: "Service not found" } }, { status: 404 });
  } catch (error) {
    warnUnlessMissingFirebaseAdmin("Public service detail API fallback used", error);
    const item = await getPublicService(slug);
    return item
      ? cached(publicServiceJson(item), 300)
      : Response.json({ error: { code: "NOT_FOUND", message: "Service not found" } }, { status: 404 });
  }
}

export async function listProjects(request: Request) {
  try {
    const query = parseListQuery(request);
    const searchWhere = buildSearchWhere(query.searchTerm, ["title", "location", "description", "category"]);
    const where = {
      status: { in: publicStatuses },
      ...(query.category ? { category: query.category } : {}),
      ...(query.featured !== undefined ? { featured: query.featured } : {}),
      ...((searchWhere as Record<string, unknown> | undefined) ?? {}),
    };
    const [items, total] = await Promise.all([
      firestoreModels.project.findMany({
        where,
        take: query.take,
        skip: query.skip,
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        include: { service: true },
      }),
      firestoreModels.project.count({ where }),
    ]);
    return cached({ items, pagination: paginationMeta(total, query.page, query.pageSize) }, 300);
  } catch (error) {
    warnUnlessMissingFirebaseAdmin("Public projects API fallback used", error);
    const query = parseListQuery(request);
    const projects = (await getPublicProjects())
      .filter((project) => (query.category ? project.category === query.category : true))
      .filter((project) => (query.featured !== undefined ? project.featured === query.featured : true))
      .filter((project) => matchesSearch(project as unknown as Record<string, unknown>, query.searchTerm));
    return cached(paginateFallback(projects, query.page, query.pageSize), 300);
  }
}

export async function listBlogPosts(request: Request) {
  try {
    const query = parseListQuery(request);
    const searchWhere = buildSearchWhere(query.searchTerm, ["title", "excerpt", "content", "category"]);
    const where = {
      status: "PUBLISHED" as const,
      ...(query.category ? { category: query.category } : {}),
      ...(query.featured !== undefined ? { featured: query.featured } : {}),
      ...((searchWhere as Record<string, unknown> | undefined) ?? {}),
    };
    const [items, total] = await Promise.all([
      firestoreModels.blogPost.findMany({
        where,
        take: query.take,
        skip: query.skip,
        orderBy: [{ featured: "desc" }, { publishedAt: "desc" }, { createdAt: "desc" }],
      }),
      firestoreModels.blogPost.count({ where }),
    ]);
    return cached({ items, pagination: paginationMeta(total, query.page, query.pageSize) }, 300);
  } catch (error) {
    warnUnlessMissingFirebaseAdmin("Public blog API fallback used", error);
    const query = parseListQuery(request);
    const posts = (await getPublicBlogPosts())
      .filter((post) => (query.category ? post.category === query.category : true))
      .filter((post) => (query.featured !== undefined ? Boolean((post as { featured?: boolean }).featured) === query.featured : true))
      .filter((post) => matchesSearch(post as unknown as Record<string, unknown>, query.searchTerm));
    return cached(paginateFallback(posts, query.page, query.pageSize), 300);
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const item = await firestoreModels.blogPost.findFirst({
      where: { slug, status: "PUBLISHED" },
    });
    return item ? cached(item, 300) : Response.json({ error: { code: "NOT_FOUND", message: "Blog post not found" } }, { status: 404 });
  } catch (error) {
    warnUnlessMissingFirebaseAdmin("Public blog detail API fallback used", error);
    const item = await getPublicBlogPost(slug);
    return item ? cached(item, 300) : Response.json({ error: { code: "NOT_FOUND", message: "Blog post not found" } }, { status: 404 });
  }
}

export async function listAmcPlans() {
  try {
    const items = await firestoreModels.aMCPlan.findMany({
      where: { status: { in: publicStatuses } },
      orderBy: [{ recommended: "desc" }, { createdAt: "asc" }],
    });
    return cached({ items }, 300);
  } catch (error) {
    warnUnlessMissingFirebaseAdmin("Public AMC API fallback used", error);
    return cached({ items: await getPublicAmcPlans() }, 300);
  }
}

export async function listCareers(request: Request) {
  try {
    const query = parseListQuery(request);
    const searchWhere = buildSearchWhere(query.searchTerm, ["title", "location", "type", "experience", "description"]);
    const where = {
      status: "ACTIVE" as const,
      ...((searchWhere as Record<string, unknown> | undefined) ?? {}),
    };
    const [items, total] = await Promise.all([
      firestoreModels.career.findMany({
        where,
        take: query.take,
        skip: query.skip,
        orderBy: [{ createdAt: "desc" }],
      }),
      firestoreModels.career.count({ where }),
    ]);
    return cached({ items, pagination: paginationMeta(total, query.page, query.pageSize) }, 300);
  } catch (error) {
    warnUnlessMissingFirebaseAdmin("Public careers API fallback used", error);
    const query = parseListQuery(request);
    const careers = (await getPublicCareers()).filter((career) =>
      matchesSearch(career as unknown as Record<string, unknown>, query.searchTerm),
    );
    return cached(paginateFallback(careers, query.page, query.pageSize), 300);
  }
}

export async function listTestimonials() {
  try {
    const items = await firestoreModels.testimonial.findMany({
      where: { status: { in: publicStatuses }, featured: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    return cached({ items }, 300);
  } catch (error) {
    warnUnlessMissingFirebaseAdmin("Public testimonials API fallback used", error);
    return cached({ items: await getPublicTestimonials() }, 300);
  }
}
