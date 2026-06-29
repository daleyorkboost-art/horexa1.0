import { ZodError } from "zod";
import { NextResponse } from "next/server";

export class ApiError extends Error {
  status: number;
  code: string;

  constructor(message: string, status = 500, code = "INTERNAL_SERVER_ERROR") {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

function requestId() {
  return crypto.randomUUID();
}

export function ok<T>(data: T, init?: ResponseInit) {
  const id = requestId();
  return NextResponse.json(
    { data, meta: { requestId: id } },
    {
      ...init,
      headers: {
        "Cache-Control": "no-store",
        "X-Request-Id": id,
        ...init?.headers,
      },
    },
  );
}

export function created<T>(data: T) {
  return ok(data, { status: 201 });
}

export function cached<T>(data: T, seconds = 60) {
  return ok(data, {
    headers: {
      "Cache-Control": `public, s-maxage=${seconds}, stale-while-revalidate=${seconds * 5}`,
    },
  });
}

export function apiError(error: unknown, status = 500) {
  const id = requestId();

  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_FAILED",
          message: "Validation failed",
          issues: error.issues,
        },
        meta: { requestId: id },
      },
      { status: 422, headers: { "X-Request-Id": id } },
    );
  }

  if (error instanceof ApiError) {
    return NextResponse.json(
      { error: { code: error.code, message: error.message }, meta: { requestId: id } },
      { status: error.status, headers: { "X-Request-Id": id } },
    );
  }

  const message =
    process.env.NODE_ENV === "production" ? "Unexpected server error" : error instanceof Error ? error.message : "Unexpected server error";

  console.error(
    JSON.stringify({
      level: "error",
      requestId: id,
      message,
      stack: error instanceof Error ? error.stack : undefined,
    }),
  );

  return NextResponse.json(
    { error: { code: "INTERNAL_SERVER_ERROR", message }, meta: { requestId: id } },
    { status, headers: { "X-Request-Id": id } },
  );
}

export async function parseJson(request: Request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}
