import { apiError, created, parseJson } from "@/lib/api/response";
import { sendAdminLeadNotification, sendInquiryAcknowledgement } from "@/lib/email/workflows";
import { prisma } from "@/lib/db";
import { inquirySchema } from "@/lib/validators/admin";

export async function POST(request: Request) {
  try {
    const body = await parseJson(request);
    const data = inquirySchema.parse(body);
    const inquiry = await prisma.inquiry.create({ data });

    await Promise.allSettled([
      sendInquiryAcknowledgement({ to: data.email, name: data.fullName }),
      sendAdminLeadNotification({
        leadName: data.fullName,
        businessName: data.businessName,
        city: data.city,
      }),
    ]);

    return created(inquiry);
  } catch (error) {
    return apiError(error);
  }
}
