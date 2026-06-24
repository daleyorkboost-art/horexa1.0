import { compare, hash } from "bcryptjs";
import { apiError, ok, parseJson } from "@/lib/api/response";
import { checkRateLimit, rateLimitKey } from "@/lib/api/rate-limit";
import { prisma } from "@/lib/db";
import { passwordResetConfirmSchema } from "@/lib/validators/admin";

export async function POST(request: Request) {
  const limited = checkRateLimit(rateLimitKey(request, "password-reset-confirm"), 10, 10 * 60_000);
  if (limited) return limited;

  try {
    const body = await parseJson(request);
    const { token, password } = passwordResetConfirmSchema.parse(body);
    const candidates = await prisma.passwordResetToken.findMany({
      where: {
        consumedAt: null,
        expiresAt: { gt: new Date() },
      },
      include: { user: true },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    const match = await asyncFind(candidates, (candidate) => compare(token, candidate.tokenHash));

    if (!match) {
      return Response.json({ error: "Invalid or expired reset token" }, { status: 401 });
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: match.userId },
        data: { passwordHash: await hash(password, 12) },
      }),
      prisma.passwordResetToken.update({
        where: { id: match.id },
        data: { consumedAt: new Date() },
      }),
    ]);

    return ok({ reset: true });
  } catch (error) {
    return apiError(error);
  }
}

async function asyncFind<T>(items: T[], predicate: (item: T) => Promise<boolean>) {
  for (const item of items) {
    if (await predicate(item)) {
      return item;
    }
  }
  return null;
}
