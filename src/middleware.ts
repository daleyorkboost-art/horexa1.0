import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const securityHeaders = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
};

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob: https://res.cloudinary.com",
  "font-src 'self' data:",
  "script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com",
  "style-src 'self' 'unsafe-inline'",
  "connect-src 'self' https://www.google.com https://www.gstatic.com https://res.cloudinary.com",
  "frame-src https://www.google.com",
].join("; ");

const authSecret =
  process.env.NEXTAUTH_SECRET ??
  (process.env.NODE_ENV === "production" ? undefined : "horexa-local-development-secret-change-in-production");

export default withAuth(
  function middleware() {
    const response = NextResponse.next();

    for (const [key, value] of Object.entries(securityHeaders)) {
      response.headers.set(key, value);
    }
    response.headers.set("Content-Security-Policy", contentSecurityPolicy);
    if (process.env.NODE_ENV === "production") {
      response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
    }

    return response;
  },
  {
    secret: authSecret,
    pages: {
      signIn: "/portal/login",
    },
    callbacks: {
      authorized({ req, token }) {
        const pathname = req.nextUrl.pathname;
        const role = token?.role;

        if (pathname.startsWith("/admin")) {
          return ["SUPER_ADMIN", "ADMIN", "EDITOR", "OPERATIONS"].includes(String(role));
        }

        if (pathname.startsWith("/portal") && pathname !== "/portal/login") {
          return Boolean(role);
        }

        return true;
      },
    },
  },
);

export const config = {
  matcher: ["/admin/:path*", "/portal/:path*"],
};
