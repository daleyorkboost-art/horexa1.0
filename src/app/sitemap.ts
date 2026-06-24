import type { MetadataRoute } from "next";
import { services } from "@/lib/site-data";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://horexasolutions.com";

export default function sitemap(): MetadataRoute.Sitemap {
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

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...services.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
