import { NextResponse, type NextRequest } from "next/server";
import { roleCookieName, sessionCookieName } from "@/firebase/session";

const securityHeaders = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
};

const scriptSrc =
  process.env.NODE_ENV === "development"
    ? "'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com"
    : "'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `script-src ${scriptSrc}`,
  "style-src 'self' 'unsafe-inline'",
  "connect-src 'self' https://www.google.com https://www.gstatic.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com",
  "frame-src https://www.google.com",
].join("; ");

function withSecurityHeaders(response: NextResponse) {
  for (const [key, value] of Object.entries(securityHeaders)) {
    response.headers.set(key, value);
  }
  response.headers.set("Content-Security-Policy", contentSecurityPolicy);
  if (process.env.NODE_ENV === "production") {
    response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  }
  return response;
}

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const sessionCookie = request.cookies.get(sessionCookieName)?.value;
  const role = request.cookies.get(roleCookieName)?.value;

  if (pathname.startsWith("/admin")) {
    if (!sessionCookie || !["SUPER_ADMIN", "ADMIN", "EDITOR", "OPERATIONS"].includes(String(role))) {
      const url = request.nextUrl.clone();
      url.pathname = "/portal/login";
      url.searchParams.set("next", pathname);
      return withSecurityHeaders(NextResponse.redirect(url));
    }
  }

  if (pathname.startsWith("/portal") && pathname !== "/portal/login") {
    if (!sessionCookie) {
      const url = request.nextUrl.clone();
      url.pathname = "/portal/login";
      url.searchParams.set("next", pathname);
      return withSecurityHeaders(NextResponse.redirect(url));
    }
  }

  return withSecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: ["/admin/:path*", "/portal/:path*"],
};
