import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async headers() {
    const securityHeaders = [
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
      {
        key: "Content-Security-Policy",
        value:
          "default-src 'self'; base-uri 'self'; frame-ancestors 'none'; object-src 'none'; form-action 'self'; img-src 'self' data: blob: https://res.cloudinary.com; font-src 'self' data:; script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com; style-src 'self' 'unsafe-inline'; connect-src 'self' https://www.google.com https://www.gstatic.com https://res.cloudinary.com; frame-src https://www.google.com",
      },
      ...(process.env.NODE_ENV === "production"
        ? [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }]
        : []),
    ];

    return [
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
