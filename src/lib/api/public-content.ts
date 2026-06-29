import { RecordStatus, type Prisma } from "@prisma/client";
import { cached, apiError } from "@/lib/api/response";
import { buildSearchWhere, paginationMeta, parseListQuery } from "@/lib/api/query";
import { prisma } from "@/lib/db";

const publicStatuses: RecordStatus[] = [RecordStatus.PUBLISHED, RecordStatus.ACTIVE];

export async function listServices(request: Request) {
  try {
    const query = parseListQuery(request);
    const searchWhere = buildSearchWhere(query.searchTerm, ["title", "summary", "description", "category"]);
    const where: Prisma.ServiceWhereInput = {
      status: { in: publicStatuses },
      ...(query.category ? { category: query.category } : {}),
      ...((searchWhere as Prisma.ServiceWhereInput | undefined) ?? {}),
    };
    const [items, total] = await Promise.all([
      prisma.service.findMany({
        where,
        take: query.take,
        skip: query.skip,
        orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
      }),
      prisma.service.count({ where }),
    ]);
    return cached({ items, pagination: paginationMeta(total, query.page, query.pageSize) }, 300);
  } catch (error) {
    return apiError(error);
  }
}

export async function getServiceBySlug(slug: string) {
  try {
    const item = await prisma.service.findFirst({
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
    return apiError(error);
  }
}

export async function listProjects(request: Request) {
  try {
    const query = parseListQuery(request);
    const searchWhere = buildSearchWhere(query.searchTerm, ["title", "location", "description", "category"]);
    const where: Prisma.ProjectWhereInput = {
      status: { in: publicStatuses },
      ...(query.category ? { category: query.category } : {}),
      ...(query.featured !== undefined ? { featured: query.featured } : {}),
      ...((searchWhere as Prisma.ProjectWhereInput | undefined) ?? {}),
    };
    const [items, total] = await Promise.all([
      prisma.project.findMany({
        where,
        take: query.take,
        skip: query.skip,
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        include: { service: true },
      }),
      prisma.project.count({ where }),
    ]);
    return cached({ items, pagination: paginationMeta(total, query.page, query.pageSize) }, 300);
  } catch (error) {
    return apiError(error);
  }
}

export async function listBlogPosts(request: Request) {
  try {
    const query = parseListQuery(request);
    const searchWhere = buildSearchWhere(query.searchTerm, ["title", "excerpt", "content", "category"]);
    const where: Prisma.BlogPostWhereInput = {
      status: "PUBLISHED" as const,
      ...(query.category ? { category: query.category } : {}),
      ...(query.featured !== undefined ? { featured: query.featured } : {}),
      ...((searchWhere as Prisma.BlogPostWhereInput | undefined) ?? {}),
    };
    const [items, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        take: query.take,
        skip: query.skip,
        orderBy: [{ featured: "desc" }, { publishedAt: "desc" }, { createdAt: "desc" }],
      }),
      prisma.blogPost.count({ where }),
    ]);
    return cached({ items, pagination: paginationMeta(total, query.page, query.pageSize) }, 300);
  } catch (error) {
    return apiError(error);
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const item = await prisma.blogPost.findFirst({
      where: { slug, status: "PUBLISHED" },
    });
    return item ? cached(item, 300) : Response.json({ error: { code: "NOT_FOUND", message: "Blog post not found" } }, { status: 404 });
  } catch (error) {
    return apiError(error);
  }
}

export async function listAmcPlans() {
  try {
    const items = await prisma.aMCPlan.findMany({
      where: { status: { in: publicStatuses } },
      orderBy: [{ recommended: "desc" }, { createdAt: "asc" }],
    });
    return cached({ items }, 300);
  } catch (error) {
    return apiError(error);
  }
}

export async function listCareers(request: Request) {
  try {
    const query = parseListQuery(request);
    const searchWhere = buildSearchWhere(query.searchTerm, ["title", "location", "type", "experience", "description"]);
    const where: Prisma.CareerWhereInput = {
      status: "ACTIVE" as const,
      ...((searchWhere as Prisma.CareerWhereInput | undefined) ?? {}),
    };
    const [items, total] = await Promise.all([
      prisma.career.findMany({
        where,
        take: query.take,
        skip: query.skip,
        orderBy: [{ createdAt: "desc" }],
      }),
      prisma.career.count({ where }),
    ]);
    return cached({ items, pagination: paginationMeta(total, query.page, query.pageSize) }, 300);
  } catch (error) {
    return apiError(error);
  }
}

export async function listTestimonials() {
  try {
    const items = await prisma.testimonial.findMany({
      where: { status: { in: publicStatuses }, featured: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    return cached({ items }, 300);
  } catch (error) {
    return apiError(error);
  }
}
