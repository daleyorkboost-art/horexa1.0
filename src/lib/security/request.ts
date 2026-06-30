import { ApiError } from "@/lib/api/response";
import { requestIp, verifyCaptchaToken } from "@/lib/api/spam-protection";

const unsafeMethods = new Set(["POST", "PUT", "PATCH", "DELETE"]);

export function normalizeIdentifier(value: unknown) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .trim();
}

export function sanitizeText(value: unknown) {
  return String(value ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function assertSameOrigin(request: Request) {
  if (!unsafeMethods.has(request.method.toUpperCase())) {
    return;
  }

  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  const allowed = new Set(
    [process.env.NEXT_PUBLIC_SITE_URL, host ? `https://${host}` : null, host ? `http://${host}` : null]
      .filter(Boolean)
      .map((value) => new URL(String(value)).origin),
  );

  if (!origin) {
    if (process.env.NODE_ENV === "production") {
      throw new ApiError("Missing origin header", 403, "CSRF_ORIGIN_REQUIRED");
    }
    return;
  }

  if (!allowed.has(new URL(origin).origin)) {
    throw new ApiError("Invalid request origin", 403, "CSRF_ORIGIN_INVALID");
  }
}

export async function assertCaptcha(request: Request, token: unknown) {
  const hasSecret = Boolean(process.env.RECAPTCHA_SECRET_KEY);

  if (process.env.NODE_ENV === "production" && !hasSecret) {
    throw new ApiError("CAPTCHA is not configured", 500, "CAPTCHA_NOT_CONFIGURED");
  }

  if (!(await verifyCaptchaToken(token, requestIp(request)))) {
    throw new ApiError("Captcha verification failed", 403, "CAPTCHA_FAILED");
  }
}
