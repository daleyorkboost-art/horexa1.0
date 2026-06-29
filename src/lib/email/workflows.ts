import { sendEmail } from "@/lib/email/mailer";

export async function sendInquiryAcknowledgement(input: {
  to: string;
  name: string;
  service?: string;
}) {
  return sendEmail({
    to: input.to,
    subject: "Horexa Solutions received your inquiry",
    html: `<p>Hello ${input.name},</p><p>Thank you for contacting Horexa Solutions. Our team will review your ${input.service ?? "inspection"} request and respond shortly.</p>`,
  });
}

export async function sendAdminLeadNotification(input: {
  leadName: string;
  businessName?: string;
  city?: string;
  service?: string;
}) {
  const to = process.env.ADMIN_NOTIFICATION_EMAIL ?? process.env.SMTP_USER;

  if (!to) {
    return { skipped: true };
  }

  return sendEmail({
    to,
    subject: "New Horexa inquiry",
    html: `<p>New inquiry from <strong>${input.leadName}</strong>.</p><p>Business: ${input.businessName ?? "N/A"}<br/>City: ${input.city ?? "N/A"}<br/>Service: ${input.service ?? "N/A"}</p>`,
  });
}

export async function sendCareerApplicationNotification(input: {
  applicantName: string;
  email: string;
  phone?: string;
  careerTitle?: string;
}) {
  const to = process.env.ADMIN_NOTIFICATION_EMAIL ?? process.env.SMTP_USER;

  if (!to) {
    return { skipped: true };
  }

  return sendEmail({
    to,
    subject: "New Horexa career application",
    html: `<p>New career application from <strong>${input.applicantName}</strong>.</p><p>Email: ${input.email}<br/>Phone: ${input.phone ?? "N/A"}<br/>Role: ${input.careerTitle ?? "Open application"}</p>`,
  });
}

export async function sendNewsletterWelcome(input: { to: string; name?: string }) {
  return sendEmail({
    to: input.to,
    subject: "Horexa newsletter subscription confirmed",
    html: `<p>Hello ${input.name ?? "there"},</p><p>You are subscribed to Horexa's kitchen hygiene and compliance updates.</p>`,
  });
}

export async function sendInspectionReportNotification(input: {
  to: string;
  companyName: string;
  reportUrl?: string;
}) {
  return sendEmail({
    to: input.to,
    subject: "Your Horexa inspection report is ready",
    html: `<p>Hello ${input.companyName},</p><p>Your inspection report is ready.${input.reportUrl ? ` <a href="${input.reportUrl}">Download report</a>` : ""}</p>`,
  });
}
