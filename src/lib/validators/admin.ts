import { z } from "zod";

export const idSchema = z.object({
  id: z.string().min(1),
});

export const serviceSchema = z.object({
  slug: z.string().min(2),
  title: z.string().min(2),
  summary: z.string().min(5),
  description: z.string().min(10),
  category: z.string().min(2),
  icon: z.string().optional(),
  imageUrl: z.string().url().optional(),
  sortOrder: z.number().int().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ACTIVE", "INACTIVE", "ARCHIVED"]).optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export const projectSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  location: z.string().min(2),
  duration: z.string().optional(),
  kitchenType: z.string().optional(),
  greaseLevel: z.string().optional(),
  category: z.string().min(2),
  serviceId: z.string().optional(),
  beforeImageUrl: z.string().url().optional(),
  afterImageUrl: z.string().url().optional(),
  galleryUrls: z.array(z.string().url()).optional(),
  description: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ACTIVE", "INACTIVE", "ARCHIVED"]).optional(),
  featured: z.boolean().optional(),
});

export const amcPlanSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  audience: z.string().min(2),
  frequency: z.string().min(2),
  description: z.string().min(10),
  features: z.array(z.string()).optional(),
  priceLabel: z.string().optional(),
  recommended: z.boolean().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ACTIVE", "INACTIVE", "ARCHIVED"]).optional(),
});

export const inquirySchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(7),
  email: z.string().email(),
  businessName: z.string().optional(),
  city: z.string().optional(),
  message: z.string().optional(),
  sourcePage: z.string().optional(),
  serviceRequired: z.string().optional(),
  serviceId: z.string().optional(),
  amcPlanId: z.string().optional(),
});

export const blogPostSchema = z.object({
  slug: z.string().min(2),
  title: z.string().min(2),
  excerpt: z.string().min(5),
  content: z.string().min(10),
  category: z.string().min(2),
  tags: z.array(z.string()).optional(),
  imageUrl: z.string().url().optional(),
  readTime: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ACTIVE", "INACTIVE", "ARCHIVED", "SCHEDULED"]).optional(),
  featured: z.boolean().optional(),
  publishedAt: z.string().datetime().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export const careerSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  location: z.string().min(2),
  type: z.string().min(2),
  experience: z.string().min(1),
  description: z.string().min(10),
  status: z.enum(["DRAFT", "PUBLISHED", "ACTIVE", "INACTIVE", "ARCHIVED"]).optional(),
});

export const applicationSchema = z.object({
  careerId: z.string().optional(),
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  resumeUrl: z.string().url().optional(),
  message: z.string().optional(),
});

export const testimonialSchema = z.object({
  name: z.string().min(2),
  business: z.string().min(2),
  city: z.string().min(2),
  quote: z.string().min(10),
  rating: z.number().int().min(1).max(5).optional(),
  imageUrl: z.string().url().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ACTIVE", "INACTIVE", "ARCHIVED"]).optional(),
  featured: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
});

export const clientSchema = z.object({
  companyName: z.string().min(2),
  contactName: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
  amcPlanId: z.string().optional(),
  portalEnabled: z.boolean().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "ARCHIVED", "PENDING"]).optional(),
});

export const inspectionReportSchema = z.object({
  clientId: z.string().min(1),
  inspectionId: z.string().min(2),
  type: z.string().min(2),
  inspector: z.string().min(2),
  score: z.number().int().min(0).max(100),
  reportUrl: z.string().url().optional(),
  beforeImageUrls: z.array(z.string().url()).optional(),
  afterImageUrls: z.array(z.string().url()).optional(),
  recommendations: z.string().optional(),
  status: z.enum(["SCHEDULED", "COMPLETED", "CANCELLED", "PENDING"]).optional(),
  scheduledAt: z.string().datetime().optional(),
  completedAt: z.string().datetime().optional(),
});

export const complianceRecordSchema = z.object({
  clientId: z.string().min(1),
  reportId: z.string().optional(),
  category: z.string().min(2),
  score: z.number().int().min(0).max(100),
  status: z.enum(["ACTIVE", "INACTIVE", "PENDING", "COMPLETED"]).optional(),
  notes: z.string().optional(),
});

export const documentSchema = z.object({
  clientId: z.string().optional(),
  title: z.string().min(2),
  category: z.string().min(2),
  fileUrl: z.string().url(),
  fileType: z.string().min(2),
  fileSize: z.number().int().optional(),
  uploadedBy: z.string().optional(),
});

export const supportTicketSchema = z.object({
  clientId: z.string().optional(),
  subject: z.string().min(2),
  message: z.string().min(5),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
});

export const notificationSchema = z.object({
  userId: z.string().optional(),
  type: z.enum(["INQUIRY", "INSPECTION", "REPORT", "TICKET", "INVOICE", "SYSTEM"]),
  title: z.string().min(2),
  body: z.string().min(2),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const categorySchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  type: z.enum(["SERVICE", "PROJECT", "BLOG", "CAREER", "DOCUMENT", "FAQ"]),
  description: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ACTIVE", "INACTIVE", "ARCHIVED"]).optional(),
});

export const invoiceSchema = z.object({
  clientId: z.string().optional(),
  invoiceNo: z.string().min(2),
  amount: z.number().positive(),
  currency: z.string().default("INR").optional(),
  status: z.enum(["DRAFT", "SENT", "PAID", "OVERDUE", "CANCELLED"]).optional(),
  dueDate: z.string().datetime().optional(),
  paidAt: z.string().datetime().optional(),
  pdfUrl: z.string().url().optional(),
  notes: z.string().optional(),
});

export const userCreateSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(8).optional(),
  role: z.enum(["SUPER_ADMIN", "ADMIN", "EDITOR", "OPERATIONS", "CLIENT"]).default("CLIENT"),
  isActive: z.boolean().optional(),
});

export const userUpdateSchema = userCreateSchema.partial();

export const websiteSettingSchema = z.object({
  key: z.string().min(2),
  value: z.record(z.string(), z.unknown()),
});

export const seoMetadataSchema = z.object({
  route: z.string().min(1),
  title: z.string().min(5),
  description: z.string().min(10),
  keywords: z.array(z.string()).optional(),
  canonical: z.string().url().optional(),
  noIndex: z.boolean().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "ARCHIVED"]).optional(),
});

export const uploadAssetSchema = z.object({
  url: z.string().url(),
  publicId: z.string().optional(),
  resourceType: z.string().min(2),
  format: z.string().optional(),
  mimeType: z.string().min(2),
  bytes: z.number().int().nonnegative(),
  folder: z.string().min(1),
  originalName: z.string().optional(),
  ownerType: z
    .enum(["SERVICE", "PROJECT", "BLOG", "CAREER", "CLIENT", "INSPECTION", "DOCUMENT", "USER", "GENERAL"])
    .optional(),
  ownerId: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const faqSchema = z.object({
  question: z.string().min(5),
  answer: z.string().min(10),
  category: z.string().optional(),
  categoryId: z.string().optional(),
  serviceId: z.string().optional(),
  sortOrder: z.number().int().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ACTIVE", "INACTIVE", "ARCHIVED"]).optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).optional(),
  sourcePage: z.string().optional(),
});

export const otpRequestSchema = z.object({
  identifier: z.string().min(5),
});

export const otpVerifySchema = z.object({
  identifier: z.string().min(5),
  otp: z.string().length(6),
});

export const passwordResetRequestSchema = z.object({
  email: z.string().email(),
});

export const passwordResetConfirmSchema = z.object({
  token: z.string().min(20),
  password: z.string().min(8),
});
