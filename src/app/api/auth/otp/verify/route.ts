import { compare } from "bcryptjs";
import { apiError, ok, parseJson } from "@/lib/api/response";
import { checkPersistentRateLimit, checkRateLimit, rateLimitKey } from "@/lib/api/rate-limit";
import { firestoreModels } from "@/firebase/firestore";
import { assertSameOrigin } from "@/lib/security/request";
import { otpVerifySchema } from "@/lib/validators/admin";

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const limited = checkRateLimit(rateLimitKey(request, "otp-verify"), 10, 10 * 60_000);
    if (limited) return limited;

    const body = await parseJson(request);
    const { identifier, otp } = otpVerifySchema.parse(body);
    const identifierLimit = await checkPersistentRateLimit(`otp-verify:${identifier}`, "otp-verify", 8, 10 * 60_000, request);
    if (identifierLimit) return identifierLimit;
    const normalized = identifier;
    const token = await firestoreModels.oTPToken.findFirst({
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

    await firestoreModels.oTPToken.update({
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
