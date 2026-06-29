import { randomBytes } from "crypto";
import { hash } from "bcryptjs";
import { apiError, ok, parseJson } from "@/lib/api/response";
import { checkRateLimit, rateLimitKey } from "@/lib/api/rate-limit";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email/mailer";
import { passwordResetRequestSchema } from "@/lib/validators/admin";

export async function POST(request: Request) {
  const limited = checkRateLimit(rateLimitKey(request, "password-reset-request"), 5, 10 * 60_000, request);
  if (limited) return limited;

  try {
    const body = await parseJson(request);
    const { email } = passwordResetRequestSchema.parse(body);
    const normalized = email.toLowerCase().trim();
    const user = await prisma.user.findUnique({ where: { email: normalized } });

    if (user) {
      const token = randomBytes(32).toString("hex");
      const tokenHash = await hash(token, 12);
      await prisma.passwordResetToken.create({
        data: {
          userId: user.id,
          tokenHash,
          expiresAt: new Date(Date.now() + 30 * 60_000),
        },
      });

      const resetUrl = `${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/portal/login?resetToken=${token}`;
      await sendEmail({
        to: normalized,
        subject: "Reset your Horexa password",
        html: `<p>Use this secure link to reset your password: <a href="${resetUrl}">${resetUrl}</a></p><p>This link expires in 30 minutes.</p>`,
      });
    }

    return ok({ sent: true });
  } catch (error) {
    return apiError(error);
  }
}
