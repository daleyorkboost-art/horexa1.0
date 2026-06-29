import { hash } from "bcryptjs";
import { apiError, ok, parseJson } from "@/lib/api/response";
import { checkRateLimit, rateLimitKey } from "@/lib/api/rate-limit";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email/mailer";
import { otpRequestSchema } from "@/lib/validators/admin";

export async function POST(request: Request) {
  const limited = checkRateLimit(rateLimitKey(request, "otp-request"), 5, 10 * 60_000, request);
  if (limited) return limited;

  try {
    const body = await parseJson(request);
    const { identifier } = otpRequestSchema.parse(body);
    const normalized = identifier.toLowerCase().trim();
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const tokenHash = await hash(otp, 12);
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: normalized }, { phone: normalized }],
      },
    });

    await prisma.oTPToken.create({
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
