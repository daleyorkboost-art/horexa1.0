import { ok, parseJson, apiError } from "@/lib/api/response";
import { assertSameOrigin } from "@/lib/security/request";
import { passwordResetConfirmSchema } from "@/lib/validators/admin";

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    passwordResetConfirmSchema.parse(await parseJson(request));
    return ok({
      reset: false,
      provider: "firebase",
      message: "Password reset confirmation is handled by Firebase Auth action links.",
    });
  } catch (error) {
    return apiError(error);
  }
}
