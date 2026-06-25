import { apiError, created, parseJson } from "@/lib/api/response";
import { checkRateLimit, rateLimitKey } from "@/lib/api/rate-limit";
import { isLikelyBot, requestIp, verifyCaptchaToken } from "@/lib/api/spam-protection";
import { sendAdminLeadNotification, sendInquiryAcknowledgement } from "@/lib/email/workflows";
import { prisma } from "@/lib/db";
import { inquirySchema } from "@/lib/validators/admin";

export async function POST(request: Request) {
  const limited = checkRateLimit(rateLimitKey(request, "public-inquiry"), 5, 10 * 60_000);
  if (limited) return limited;

  try {
    const body = await parseJson(request);
    if (isLikelyBot(body.website)) {
      return created({ accepted: true });
    }

    if (!(await verifyCaptchaToken(body.captchaToken, requestIp(request)))) {
      return Response.json({ error: "Captcha verification failed" }, { status: 403 });
    }

    const parsed = inquirySchema.parse(body);
    const service = typeof body.service === "string" ? body.service.trim() : "";
    const data = service
      ? {
          ...parsed,
          message: [`Service required: ${service}`, parsed.message].filter(Boolean).join("\n\n"),
        }
      : parsed;
    const inquiry = await prisma.inquiry.create({ data });

    await Promise.allSettled([
      sendInquiryAcknowledgement({ to: data.email, name: data.fullName }),
      sendAdminLeadNotification({
        leadName: data.fullName,
        businessName: data.businessName,
        city: data.city,
      }),
    ]);

    return created(inquiry);
  } catch (error) {
    return apiError(error);
  }
}
