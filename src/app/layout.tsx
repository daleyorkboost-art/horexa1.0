import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://horexasolutions.com"),
  title: {
    default: "Horexa Solutions | Clean Air. Safe Kitchens.",
    template: "%s | Horexa Solutions",
  },
  description: "Clean Air. Safe Kitchens.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Horexa Solutions",
    title: "Horexa Solutions | Clean Air. Safe Kitchens.",
    description: "Commercial kitchen hygiene, exhaust duct cleaning, AMC plans, and compliance reporting across India.",
    images: ["/images/horexa-hero.jpeg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Horexa Solutions | Clean Air. Safe Kitchens.",
    description: "Commercial kitchen hygiene, exhaust duct cleaning, AMC plans, and compliance reporting across India.",
    images: ["/images/horexa-hero.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">{children}</body>
    </html>
  );
}
