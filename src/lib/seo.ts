export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://horexasolutions.com";

export const siteConfig = {
  name: "Horexa Solutions",
  tagline: "Clean Air. Safe Kitchens.",
  description:
    "Commercial kitchen hygiene, exhaust duct cleaning, AMC plans, and compliance reporting for hotels, restaurants, cloud kitchens, hospitals and cafeterias.",
  phone: "+91 98765 43210",
  email: "info@horexasolutions.com",
  logo: "/images/main-hero-bg.webp",
  socialImage: "/images/main-hero-bg.webp",
  serviceAreas: ["Delhi NCR", "Mumbai", "Bangalore", "Hyderabad", "Pune", "Chennai"],
} as const;

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#organization`,
    name: siteConfig.name,
    url: siteUrl,
    image: absoluteUrl(siteConfig.socialImage),
    telephone: siteConfig.phone,
    email: siteConfig.email,
    areaServed: siteConfig.serviceAreas,
    slogan: siteConfig.tagline,
    description: siteConfig.description,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteConfig.name,
    url: siteUrl,
    publisher: { "@id": `${siteUrl}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/blog?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}
