import nodemailer from "nodemailer";

function cleanHeaderValue(value: string) {
  return value.replace(/[\r\n]/g, " ").trim();
}

export function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host: cleanHeaderValue(host),
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
    from: cleanHeaderValue(process.env.SMTP_FROM ?? "Horexa Solutions <noreply@horexasolutions.com>"),
    to: cleanHeaderValue(to),
    subject: cleanHeaderValue(subject),
    html,
    text,
    disableFileAccess: true,
    disableUrlAccess: true,
  });
}
