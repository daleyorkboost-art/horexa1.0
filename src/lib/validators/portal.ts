import { z } from "zod";

export const portalDocumentUploadSchema = z.object({
  title: z.string().min(2),
  category: z.string().min(2),
});

export const portalProfileSchema = z.object({
  companyName: z.string().min(2),
  contactName: z.string().min(2).optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(7).optional().or(z.literal("")),
  city: z.string().min(2).optional().or(z.literal("")),
  address: z.string().min(3).optional().or(z.literal("")),
});

export const portalTeamMemberSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  title: z.string().min(2).optional().or(z.literal("")),
  permissions: z.array(z.string()).optional(),
});

export const portalNotificationUpdateSchema = z.object({
  notificationIds: z.array(z.string().min(1)).optional(),
  read: z.boolean().default(true),
});
