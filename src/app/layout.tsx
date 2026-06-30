import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, organizationSchema, siteConfig, websiteSchema } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://horexasolutions.com"),
  applicationName: "Horexa Solutions",
  generator: "Next.js",
  title: {
    default: "Horexa Solutions | Clean Air. Safe Kitchens.",
    template: "%s | Horexa Solutions",
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Horexa Solutions",
    title: "Horexa Solutions | Clean Air. Safe Kitchens.",
    description: siteConfig.description,
    url: "/",
    images: [
      {
        url: absoluteUrl(siteConfig.socialImage),
        width: 1200,
        height: 630,
        alt: "Horexa Solutions commercial kitchen hygiene team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Horexa Solutions | Clean Air. Safe Kitchens.",
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.socialImage)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "64x64", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        {children}
      </body>
    </html>
  );
}
