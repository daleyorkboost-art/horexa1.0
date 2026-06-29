import { z } from "zod";

const MAX_PAGE_SIZE = 100;

export const listQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(MAX_PAGE_SIZE).default(20),
  take: z.coerce.number().int().min(1).max(MAX_PAGE_SIZE).optional(),
  skip: z.coerce.number().int().min(0).optional(),
  q: z.string().trim().optional(),
  search: z.string().trim().optional(),
  status: z.string().trim().optional(),
  category: z.string().trim().optional(),
  city: z.string().trim().optional(),
  featured: z.coerce.boolean().optional(),
  sort: z.string().trim().default("-createdAt"),
});

export type ListQuery = z.infer<typeof listQuerySchema>;

export function parseListQuery(request: Request) {
  const params = Object.fromEntries(new URL(request.url).searchParams.entries());
  const parsed = listQuerySchema.parse(params);
  const take = parsed.take ?? parsed.pageSize;
  const skip = parsed.skip ?? (parsed.page - 1) * take;

  return {
    ...parsed,
    take,
    skip,
    page: Math.floor(skip / take) + 1,
    pageSize: take,
    searchTerm: parsed.q ?? parsed.search,
  };
}

export function buildSearchWhere(searchTerm: string | undefined, searchFields: readonly string[] = []) {
  if (!searchTerm || searchFields.length === 0) {
    return undefined;
  }

  return {
    OR: searchFields.map((field) => ({
      [field]: {
        contains: searchTerm,
        mode: "insensitive",
      },
    })),
  };
}

export function buildOrderBy(sort: string, sortableFields: readonly string[] = ["createdAt"]) {
  const direction = sort.startsWith("-") ? "desc" : "asc";
  const field = sort.replace(/^-/, "");
  const safeField = sortableFields.includes(field) ? field : "createdAt";

  return { [safeField]: direction };
}

export function paginationMeta(total: number, page: number, pageSize: number) {
  return {
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
    hasNextPage: page * pageSize < total,
    hasPreviousPage: page > 1,
  };
}
