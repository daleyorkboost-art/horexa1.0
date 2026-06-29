import { apiError, created, parseJson } from "@/lib/api/response";
import { checkRateLimit, rateLimitKey } from "@/lib/api/rate-limit";
import { isLikelyBot, requestIp, verifyCaptchaToken } from "@/lib/api/spam-protection";
import { sendCareerApplicationNotification } from "@/lib/email/workflows";
import { sendEmail } from "@/lib/email/mailer";
import { prisma } from "@/lib/db";
import { applicationSchema } from "@/lib/validators/admin";
import { assertSameOrigin } from "@/lib/security/request";
import { uploadToCloudinary, validateUploadFileSecurity } from "@/lib/storage/cloudinary";

export async function POST(request: Request) {
  const limited = checkRateLimit(rateLimitKey(request, "public-application"), 3, 10 * 60_000, request);
  if (limited) return limited;

  try {
    assertSameOrigin(request);
    const contentType = request.headers.get("content-type") ?? "";
    const body = contentType.includes("multipart/form-data")
      ? await parseApplicationForm(request)
      : await parseJson(request);

    if (isLikelyBot(body.website)) {
      return created({ accepted: true });
    }

    if (!(await verifyCaptchaToken(body.captchaToken, requestIp(request)))) {
      return Response.json({ error: "Captcha verification failed" }, { status: 403 });
    }

    const data = applicationSchema.parse(body);
    const career = data.careerId ? await prisma.career.findUnique({ where: { id: data.careerId } }) : null;
    const application = await prisma.application.create({ data });

    await Promise.allSettled([
      sendEmail({
        to: data.email,
        subject: "Horexa received your application",
        html: `<p>Hello ${data.fullName},</p><p>Thank you for applying to Horexa Solutions. Our hiring team will review your application.</p>`,
      }),
      sendCareerApplicationNotification({
        applicantName: data.fullName,
        email: data.email,
        phone: data.phone,
        careerTitle: career?.title,
      }),
    ]);

    return created(application);
  } catch (error) {
    return apiError(error);
  }
}

async function parseApplicationForm(request: Request) {
  const formData = await request.formData();
  const file = formData.get("resume");
  let resumeUrl = String(formData.get("resumeUrl") ?? "");

  if (file instanceof File && file.size > 0) {
    const validationError = await validateUploadFileSecurity(
      file,
      new Set([
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]),
    );

    if (validationError) {
      throw new Error(validationError);
    }

    const result = await uploadToCloudinary(file, "horexa/resumes");
    resumeUrl = result.secure_url;
  }

  return {
    careerId: String(formData.get("careerId") ?? "") || undefined,
    fullName: String(formData.get("fullName") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? "") || undefined,
    resumeUrl: resumeUrl || undefined,
    message: String(formData.get("message") ?? "") || undefined,
    website: String(formData.get("website") ?? ""),
    captchaToken: String(formData.get("captchaToken") ?? ""),
  };
}
