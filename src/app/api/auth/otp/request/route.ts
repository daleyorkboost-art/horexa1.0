import { hash } from "bcryptjs";
import { apiError, ok, parseJson } from "@/lib/api/response";
import { checkPersistentRateLimit, checkRateLimit, rateLimitKey } from "@/lib/api/rate-limit";
import { firestoreModels } from "@/firebase/firestore";
import { sendEmail } from "@/lib/email/mailer";
import { assertCaptcha, assertSameOrigin } from "@/lib/security/request";
import { otpRequestSchema } from "@/lib/validators/admin";

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const limited = checkRateLimit(rateLimitKey(request, "otp-request"), 5, 10 * 60_000, request);
    if (limited) return limited;

    const body = await parseJson(request);
    const { identifier, captchaToken } = otpRequestSchema.parse(body);
    await assertCaptcha(request, captchaToken);
    const identifierLimit = await checkPersistentRateLimit(`otp-request:${identifier}`, "otp-request", 3, 10 * 60_000, request);
    if (identifierLimit) return identifierLimit;

    const normalized = identifier;
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const tokenHash = await hash(otp, 12);
    const user = await firestoreModels.user.findFirst({
      where: {
        OR: [{ email: normalized }, { phone: normalized }],
      },
    });

    await firestoreModels.oTPToken.create({
      data: {
        userId: user?.id,
        identifier: normalized,
        tokenHash,
        expiresAt: new Date(Date.now() + 5 * 60_000),
      },
    });

    if (normalized.includes("@")) {
      await sendEmail({
        to: normalized,
        subject: "Your Horexa OTP",
        html: `<p>Your Horexa login OTP is <strong>${otp}</strong>. It expires in 5 minutes.</p>`,
      });
    }

    return ok({ sent: true, delivery: normalized.includes("@") ? "email" : "sms-pending" });
  } catch (error) {
    return apiError(error);
  }
}
