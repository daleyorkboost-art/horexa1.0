import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Horexa Solutions",
  description: "Clean Air. Safe Kitchens.",
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
