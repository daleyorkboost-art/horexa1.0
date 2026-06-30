import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { siteUrl } from "@/lib/seo";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes = [
    { route: "", priority: 1, changeFrequency: "weekly" as const },
    { route: "/services", priority: 0.9, changeFrequency: "weekly" as const },
    { route: "/amc-plans", priority: 0.85, changeFrequency: "weekly" as const },
    { route: "/projects", priority: 0.8, changeFrequency: "weekly" as const },
    { route: "/about", priority: 0.75, changeFrequency: "monthly" as const },
    { route: "/blog", priority: 0.75, changeFrequency: "weekly" as const },
    { route: "/careers", priority: 0.7, changeFrequency: "weekly" as const },
    { route: "/contact", priority: 0.85, changeFrequency: "monthly" as const },
  ];

  const services = await prisma.service
    .findMany({
      where: { status: { in: ["ACTIVE", "PUBLISHED"] } },
      select: { slug: true, updatedAt: true },
    })
    .catch(() => []);

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route.route}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...services.map((service) => ({
      url: `${siteUrl}/services/${service.slug}`,
      lastModified: service.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
