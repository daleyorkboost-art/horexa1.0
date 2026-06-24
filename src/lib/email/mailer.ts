import nodemailer from "nodemailer";

export function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) {
  const transporter = createTransporter();

  if (!transporter) {
    console.warn("SMTP is not configured. Skipping email:", subject);
    return { skipped: true };
  }

  return transporter.sendMail({
    from: process.env.SMTP_FROM ?? "Horexa Solutions <noreply@horexasolutions.com>",
    to,
    subject,
    html,
    text,
  });
}
