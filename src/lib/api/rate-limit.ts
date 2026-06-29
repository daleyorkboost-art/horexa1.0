import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

export function checkRateLimit(key: string, limit = 10, windowMs = 60_000, request?: Request) {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  if (bucket.count >= limit) {
    void prisma.rateLimitEvent
      .create({
        data: {
          key,
          scope: key.split(":")[0] ?? "unknown",
          ipAddress: request?.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? request?.headers.get("x-real-ip") ?? undefined,
          userAgent: request?.headers.get("user-agent") ?? undefined,
        },
      })
      .catch(() => undefined);

    return NextResponse.json(
      { error: { code: "RATE_LIMITED", message: "Too many requests. Please try again shortly." } },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((bucket.resetAt - now) / 1000)),
        },
      },
    );
  }

  bucket.count += 1;
  return null;
}

export function rateLimitKey(request: Request, scope: string) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwardedFor || request.headers.get("x-real-ip") || "unknown";
  return `${scope}:${ip}`;
}
