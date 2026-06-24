import { apiError, created, parseJson } from "@/lib/api/response";
import { sendEmail } from "@/lib/email/mailer";
import { prisma } from "@/lib/db";
import { applicationSchema } from "@/lib/validators/admin";

export async function POST(request: Request) {
  try {
    const body = await parseJson(request);
    const data = applicationSchema.parse(body);
    const application = await prisma.application.create({ data });

    await sendEmail({
      to: data.email,
      subject: "Horexa received your application",
      html: `<p>Hello ${data.fullName},</p><p>Thank you for applying to Horexa Solutions. Our hiring team will review your application.</p>`,
    });

    return created(application);
  } catch (error) {
    return apiError(error);
  }
}
