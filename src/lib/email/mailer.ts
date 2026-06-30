import nodemailer from "nodemailer";
import { firestoreModels } from "@/firebase/firestore";

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
  metadata,
}: {
  to: string;
  subject: string;
  html: string;
  text?: string;
  metadata?: Record<string, unknown>;
}) {
  const transporter = createTransporter();
  const cleanTo = cleanHeaderValue(to);
  const cleanSubject = cleanHeaderValue(subject);
  const log = await firestoreModels.emailLog
    .create({
      data: {
        to: cleanTo,
        subject: cleanSubject,
        status: "QUEUED",
        metadata,
      },
    })
    .catch(() => null);

  if (!transporter) {
    console.warn("SMTP is not configured. Skipping email:", cleanSubject);
    if (log) {
      await firestoreModels.emailLog.update({
        where: { id: log.id },
        data: { status: "SKIPPED" },
      });
    }
    return { skipped: true };
  }

  try {
    const result = await transporter.sendMail({
      from: cleanHeaderValue(process.env.SMTP_FROM ?? "Horexa Solutions <noreply@horexasolutions.com>"),
      to: cleanTo,
      subject: cleanSubject,
      html,
      text,
      disableFileAccess: true,
      disableUrlAccess: true,
    });

    if (log) {
      await firestoreModels.emailLog.update({
        where: { id: log.id },
        data: {
          status: "SENT",
          provider: "smtp",
          messageId: result.messageId,
          sentAt: new Date(),
        },
      });
    }

    return result;
  } catch (error) {
    if (log) {
      await firestoreModels.emailLog.update({
        where: { id: log.id },
        data: {
          status: "FAILED",
          provider: "smtp",
          error: error instanceof Error ? error.message : "Unknown email error",
        },
      });
    }

    throw error;
  }
}
