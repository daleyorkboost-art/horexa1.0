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

export async function recordAndCheckRateLimit({
  key,
  scope,
  limit = 10,
  windowMs = 60_000,
  request,
}: {
  key: string;
  scope: string;
  limit?: number;
  windowMs?: number;
  request?: Request;
}) {
  const since = new Date(Date.now() - windowMs);
  const ipAddress = request?.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? request?.headers.get("x-real-ip") ?? undefined;
  const userAgent = request?.headers.get("user-agent") ?? undefined;

  const count = await prisma.rateLimitEvent.count({
    where: {
      key,
      scope,
      createdAt: { gte: since },
    },
  });

  await prisma.rateLimitEvent
    .create({
      data: {
        key,
        scope,
        ipAddress,
        userAgent,
      },
    })
    .catch(() => undefined);

  return {
    limited: count >= limit,
    retryAfter: Math.ceil(windowMs / 1000),
  };
}

export async function checkPersistentRateLimit(key: string, scope: string, limit = 10, windowMs = 60_000, request?: Request) {
  const result = await recordAndCheckRateLimit({ key, scope, limit, windowMs, request });

  if (!result.limited) {
    return null;
  }

  return NextResponse.json(
    { error: { code: "RATE_LIMITED", message: "Too many requests. Please try again shortly." } },
    {
      status: 429,
      headers: {
        "Retry-After": String(result.retryAfter),
      },
    },
  );
}
