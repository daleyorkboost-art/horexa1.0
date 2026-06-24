import { compare } from "bcryptjs";
import { apiError, ok, parseJson } from "@/lib/api/response";
import { checkRateLimit, rateLimitKey } from "@/lib/api/rate-limit";
import { prisma } from "@/lib/db";
import { otpVerifySchema } from "@/lib/validators/admin";

export async function POST(request: Request) {
  const limited = checkRateLimit(rateLimitKey(request, "otp-verify"), 10, 10 * 60_000);
  if (limited) return limited;

  try {
    const body = await parseJson(request);
    const { identifier, otp } = otpVerifySchema.parse(body);
    const normalized = identifier.toLowerCase().trim();
    const token = await prisma.oTPToken.findFirst({
      where: {
        identifier: normalized,
        consumedAt: null,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: "desc" },
      include: { user: true },
    });

    if (!token || !(await compare(otp, token.tokenHash))) {
      return Response.json({ error: "Invalid or expired OTP" }, { status: 401 });
    }

    await prisma.oTPToken.update({
      where: { id: token.id },
      data: { consumedAt: new Date() },
    });

    return ok({
      verified: true,
      user: token.user
        ? {
            id: token.user.id,
            email: token.user.email,
            role: token.user.role,
          }
        : null,
    });
  } catch (error) {
    return apiError(error);
  }
}
