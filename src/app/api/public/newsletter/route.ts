import { apiError, created, parseJson } from "@/lib/api/response";
import { checkRateLimit, rateLimitKey } from "@/lib/api/rate-limit";
import { isLikelyBot } from "@/lib/api/spam-protection";
import { sendNewsletterWelcome } from "@/lib/email/workflows";
import { prisma } from "@/lib/db";
import { assertSameOrigin } from "@/lib/security/request";
import { newsletterSchema } from "@/lib/validators/admin";

export async function POST(request: Request) {
  const limited = checkRateLimit(rateLimitKey(request, "public-newsletter"), 5, 10 * 60_000, request);
  if (limited) return limited;

  try {
    assertSameOrigin(request);
    const body = await parseJson(request);
    if (isLikelyBot(body.website)) {
      return created({ accepted: true });
    }

    const data = newsletterSchema.parse(body);
    const subscription = await prisma.newsletterSubscription.upsert({
      where: { email: data.email.toLowerCase() },
      update: {
        name: data.name,
        sourcePage: data.sourcePage,
        status: "ACTIVE",
      },
      create: {
        ...data,
        email: data.email.toLowerCase(),
      },
    });

    await sendNewsletterWelcome({ to: subscription.email, name: subscription.name ?? undefined });

    return created(subscription);
  } catch (error) {
    return apiError(error);
  }
}
