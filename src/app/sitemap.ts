import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://horexasolutions.com";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/amc-plans",
    "/projects",
    "/blog",
    "/careers",
    "/contact",
  ];

  const services = await prisma.service
    .findMany({
      where: { status: { in: ["ACTIVE", "PUBLISHED"] } },
      select: { slug: true, updatedAt: true },
    })
    .catch(() => []);

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...services.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: service.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
