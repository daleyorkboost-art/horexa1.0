import { apiError, created, parseJson } from "@/lib/api/response";
import { checkRateLimit, rateLimitKey } from "@/lib/api/rate-limit";
import { isLikelyBot, requestIp, verifyCaptchaToken } from "@/lib/api/spam-protection";
import { sendAdminLeadNotification, sendInquiryAcknowledgement } from "@/lib/email/workflows";
import { prisma } from "@/lib/db";
import { assertSameOrigin } from "@/lib/security/request";
import { inquirySchema } from "@/lib/validators/admin";

export async function POST(request: Request) {
  const limited = checkRateLimit(rateLimitKey(request, "public-inquiry"), 5, 10 * 60_000, request);
  if (limited) return limited;

  try {
    assertSameOrigin(request);
    const body = await parseJson(request);
    if (isLikelyBot(body.website)) {
      return created({ accepted: true });
    }

    if (!(await verifyCaptchaToken(body.captchaToken, requestIp(request)))) {
      return Response.json({ error: "Captcha verification failed" }, { status: 403 });
    }

    const parsed = inquirySchema.parse(body);
    const data = {
      ...parsed,
      serviceRequired: parsed.serviceRequired ?? (typeof body.service === "string" ? body.service.trim() : undefined),
    };
    const inquiry = await prisma.inquiry.create({ data });

    await Promise.allSettled([
      sendInquiryAcknowledgement({ to: data.email, name: data.fullName }),
      sendAdminLeadNotification({
        leadName: data.fullName,
        businessName: data.businessName,
        city: data.city,
        service: data.serviceRequired,
      }),
    ]);

    return created(inquiry);
  } catch (error) {
    return apiError(error);
  }
}
