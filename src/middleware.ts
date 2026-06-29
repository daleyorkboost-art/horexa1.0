import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const securityHeaders = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

const authSecret =
  process.env.NEXTAUTH_SECRET ??
  (process.env.NODE_ENV === "production" ? undefined : "horexa-local-development-secret-change-in-production");

export default withAuth(
  function middleware() {
    const response = NextResponse.next();

    for (const [key, value] of Object.entries(securityHeaders)) {
      response.headers.set(key, value);
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
