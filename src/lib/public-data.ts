import {
  Award,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Droplets,
  Fan,
  FileCheck2,
  Filter,
  Flame,
  Gauge,
  GraduationCap,
  Handshake,
  HeartPulse,
  Hotel,
  Leaf,
  ShieldCheck,
  Sparkles,
  SprayCan,
  Target,
  Utensils,
  Users,
  Wrench,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { images, industries, processSteps, standards, stats, careerBenefits, values } from "@/lib/site-data";
import type { IconType } from "@/types/components";

export const dynamicPublicImages = images;
export { industries, processSteps, standards, stats, careerBenefits, values };

const serviceIcons: Record<string, IconType> = {
  Fan,
  Filter,
  Droplets,
  Wrench,
  ClipboardCheck,
  Flame,
  ShieldCheck,
  SprayCan,
  FileCheck2,
  Sparkles,
  Target,
  Users,
  Gauge,
  Handshake,
  Leaf,
  Hotel,
  Utensils,
  Building2,
  HeartPulse,
  GraduationCap,
  BriefcaseBusiness,
  Award,
  CheckCircle2,
};

export function iconFor(name?: string | null) {
  return serviceIcons[name ?? ""] ?? Fan;
}

function safeDate(input?: Date | null) {
  return input
    ? new Intl.DateTimeFormat("en-IN", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(input)
    : "";
}

function normalizeGreaseLevel(value?: string | null): "Light" | "Medium" | "Heavy" {
  return value === "Light" || value === "Medium" || value === "Heavy" ? value : "Medium";
}

async function safeQuery<T>(query: Promise<T>, fallback: T) {
  try {
    return await query;
  } catch (error) {
    console.warn("Public database query failed", error);
    return fallback;
  }
}

export async function getPublicServices() {
  const rows = await safeQuery(
    prisma.service.findMany({
      where: { status: { in: ["ACTIVE", "PUBLISHED"] } },
      include: { faqs: { where: { status: { in: ["ACTIVE", "PUBLISHED"] } }, orderBy: { sortOrder: "asc" } } },
      orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
    }),
    [],
  );

  return rows.map((service) => ({
    ...service,
    shortTitle: service.title.replace("Kitchen ", ""),
    image: service.imageUrl ?? images.services,
    icon: iconFor(service.icon),
    benefits: [
      "Lower operational risk",
      "Improved inspection readiness",
      "Better maintenance visibility",
      "Photo-backed service evidence",
    ],
    includes: service.description
      .split(".")
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 4),
    faqs: service.faqs.map((faq) => ({ question: faq.question, answer: faq.answer })),
  }));
}

export async function getPublicService(slug: string) {
  const services = await getPublicServices();
  return services.find((service) => service.slug === slug);
}

export async function getPublicAmcPlans() {
  return safeQuery(
    prisma.aMCPlan.findMany({
      where: { status: { in: ["ACTIVE", "PUBLISHED"] } },
      orderBy: [{ recommended: "desc" }, { createdAt: "asc" }],
    }),
    [],
  );
}

export async function getPublicProjects() {
  const rows = await safeQuery(
    prisma.project.findMany({
      where: { status: { in: ["ACTIVE", "PUBLISHED"] } },
      include: { service: true },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    }),
    [],
  );

  return rows.map((project) => ({
    ...project,
    duration: project.duration ?? "Scheduled",
    kitchenType: project.kitchenType ?? "Commercial Kitchen",
    greaseLevel: normalizeGreaseLevel(project.greaseLevel),
    services: [project.service?.title, project.category].filter(Boolean) as string[],
    image: project.afterImageUrl ?? project.beforeImageUrl ?? images.projects,
  }));
}

export async function getPublicBlogPosts() {
  const rows = await safeQuery(
    prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ featured: "desc" }, { publishedAt: "desc" }, { createdAt: "desc" }],
    }),
    [],
  );

  return rows.map((post) => ({
    ...post,
    date: safeDate(post.publishedAt ?? post.createdAt),
    readTime: post.readTime ?? "5 min read",
    image: post.imageUrl ?? images.blog,
    href: `/blog/${post.slug}`,
  }));
}

export async function getPublicTestimonials() {
  return safeQuery(
    prisma.testimonial.findMany({
      where: { status: { in: ["ACTIVE", "PUBLISHED"] }, featured: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    }),
    [],
  );
}

export async function getPublicCareers() {
  return safeQuery(
    prisma.career.findMany({
      where: { status: "ACTIVE" },
      orderBy: [{ createdAt: "desc" }],
    }),
    [],
  );
}

type ContactSetting = {
  phone?: string;
  email?: string;
  hours?: string;
  headquarters?: string;
  serviceAreas?: string[];
};

function isContactSetting(value: unknown): value is ContactSetting {
  return typeof value === "object" && value !== null;
}

export async function getPublicContactSettings() {
  const setting = await safeQuery(prisma.websiteSetting.findUnique({ where: { key: "contact" } }), null);
  const value = isContactSetting(setting?.value) ? setting.value : {};

  return {
    phone: value.phone ?? "",
    email: value.email ?? "",
    hours: value.hours ?? "",
    headquarters: value.headquarters ?? "",
    serviceAreas: value.serviceAreas ?? [],
  };
}

export async function getPublicFaqs(category?: string) {
  return safeQuery(
    prisma.fAQ.findMany({
      where: {
        status: { in: ["ACTIVE", "PUBLISHED"] },
        ...(category ? { category } : {}),
      },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    }),
    [],
  );
}

type AboutSetting = {
  mission?: string;
  vision?: string;
  values?: { title: string; description: string; icon?: string }[];
  teamRoles?: { role: string; badge: string; description: string }[];
  standards?: { title: string; description: string; icon?: string }[];
  stats?: { value: number; suffix?: string; label: string; description: string }[];
};

function isAboutSetting(value: unknown): value is AboutSetting {
  return typeof value === "object" && value !== null;
}

export async function getPublicAboutContent() {
  const setting = await safeQuery(prisma.websiteSetting.findUnique({ where: { key: "about" } }), null);
  const value = isAboutSetting(setting?.value) ? setting.value : {};

  return {
    mission: value.mission ?? "",
    vision: value.vision ?? "",
    values: (value.values ?? []).map((item) => ({ ...item, icon: iconFor(item.icon) })),
    teamRoles: value.teamRoles ?? [],
    standards: (value.standards ?? []).map((item) => ({ ...item, icon: iconFor(item.icon) })),
    stats: value.stats ?? [],
  };
}
