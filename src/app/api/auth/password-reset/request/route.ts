import { apiError, ok, parseJson } from "@/lib/api/response";
import { checkPersistentRateLimit, checkRateLimit, rateLimitKey } from "@/lib/api/rate-limit";
import { firestoreModels } from "@/firebase/firestore";
import { adminAuth } from "@/firebase/admin";
import { sendEmail } from "@/lib/email/mailer";
import { assertCaptcha, assertSameOrigin } from "@/lib/security/request";
import { passwordResetRequestSchema } from "@/lib/validators/admin";

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const limited = checkRateLimit(rateLimitKey(request, "password-reset-request"), 5, 10 * 60_000, request);
    if (limited) return limited;

    const body = await parseJson(request);
    const { email, captchaToken } = passwordResetRequestSchema.parse(body);
    await assertCaptcha(request, captchaToken);
    const identifierLimit = await checkPersistentRateLimit(`password-reset:${email}`, "password-reset-request", 3, 30 * 60_000, request);
    if (identifierLimit) return identifierLimit;
    const normalized = email;
    const user = await firestoreModels.user.findUnique({ where: { email: normalized } });

    if (user) {
      const resetUrl = await adminAuth().generatePasswordResetLink(normalized, {
        url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/portal/login`,
        handleCodeInApp: false,
      });
      await sendEmail({
        to: normalized,
        subject: "Reset your Horexa password",
        html: `<p>Use this secure Firebase link to reset your password: <a href="${resetUrl}">${resetUrl}</a></p>`,
      });
    }

    return ok({ sent: true });
  } catch (error) {
    return apiError(error);
  }
}
