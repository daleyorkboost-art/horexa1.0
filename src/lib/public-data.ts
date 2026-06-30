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
import { firestoreModels } from "@/firebase/firestore";
import {
  amcPlans as fallbackAmcPlans,
  blogPosts as fallbackBlogPosts,
  images,
  industries,
  jobs as fallbackJobs,
  processSteps,
  projects as fallbackProjects,
  services as fallbackServices,
  standards,
  stats,
  careerBenefits,
  testimonials as fallbackTestimonials,
  values,
} from "@/lib/site-data";
import type { IconType } from "@/types/components";

export const dynamicPublicImages = images;
export { industries, processSteps, standards, stats, careerBenefits, values };

export type PublicService = {
  id?: string;
  slug: string;
  title: string;
  category: string;
  shortTitle: string;
  summary: string;
  description: string;
  longDescription: string;
  image: string;
  icon: IconType;
  benefits: string[];
  includes: string[];
  faqs: { question: string; answer: string }[];
};

export type PublicBlogPost = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  href: string;
  publishedAt: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};

type PublicAboutValue = {
  title: string;
  description: string;
  icon: IconType;
};

type PublicTeamRole = {
  role: string;
  badge: string;
  description: string;
};

type PublicAboutStat = {
  value: number;
  suffix?: string;
  label: string;
  description: string;
};

type PublicAboutContent = {
  mission: string;
  vision: string;
  values: PublicAboutValue[];
  teamRoles: PublicTeamRole[];
  standards: PublicAboutValue[];
  stats: PublicAboutStat[];
};

export type PublicAmcPlan = {
  id: string;
  slug: string;
  name: string;
  audience: string;
  frequency: string;
  description: string;
  features: string[];
  recommended: boolean;
};

export type PublicCareer = {
  id: string;
  title: string;
  location: string;
  type: string;
  experience: string;
  status: string;
  description?: string;
};

export type PublicTestimonial = {
  id: string;
  quote: string;
  name: string;
  business: string;
  city: string;
  rating?: number;
};

export type PublicProject = {
  id?: string;
  title: string;
  location: string;
  duration: string;
  kitchenType: string;
  greaseLevel: "Light" | "Medium" | "Heavy";
  category: string;
  services: string[];
  image: string;
  featured?: boolean;
};

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

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {};
}

async function safeQuery<T>(query: Promise<T>, fallback: T) {
  try {
    return await query;
  } catch (error) {
    if (!(error instanceof Error && error.message === "Firebase Admin credentials are missing")) {
      console.warn("Public database query failed", error);
    }
    return fallback;
  }
}

export async function getPublicServices() {
  const rows = await safeQuery<unknown[]>(
    firestoreModels.service.findMany({
      where: { status: { in: ["ACTIVE", "PUBLISHED"] } },
      include: { faqs: { where: { status: { in: ["ACTIVE", "PUBLISHED"] } }, orderBy: { sortOrder: "asc" } } },
      orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
    }) as Promise<unknown[]>,
    fallbackServices as unknown[],
  );

  return rows.map((row): PublicService => {
    const service = asRecord(row);
    const title = String(service.title ?? "");
    const description = String(service.description ?? "");
    const longDescription = String(service.longDescription ?? service.summary ?? description);
    const faqs = Array.isArray(service.faqs) ? service.faqs : [];
    return {
      id: typeof service.id === "string" ? service.id : undefined,
      title,
      category: String(service.category ?? "Hygiene Services"),
      description,
      longDescription,
      summary: String(service.summary ?? description),
      slug: String(service.slug ?? slugify(title)),
      shortTitle: typeof service.shortTitle === "string" ? service.shortTitle : title.replace("Kitchen ", ""),
      image: typeof service.imageUrl === "string" ? service.imageUrl : typeof service.image === "string" ? service.image : images.services,
      icon: iconFor(typeof service.icon === "string" ? service.icon : undefined),
      benefits:
        Array.isArray(service.benefits)
          ? service.benefits.map(String)
          : [
              "Lower operational risk",
              "Improved inspection readiness",
              "Better maintenance visibility",
              "Photo-backed service evidence",
            ],
      includes:
        Array.isArray(service.includes)
          ? service.includes.map(String)
          : description
              .split(".")
              .map((item) => item.trim())
              .filter(Boolean)
              .slice(0, 4),
      faqs: faqs.map((faq) => ({
        question: String(asRecord(faq).question ?? ""),
        answer: String(asRecord(faq).answer ?? ""),
      })),
    };
  });
}

export async function getPublicService(slug: string) {
  const services = await getPublicServices();
  return services.find((service) => service.slug === slug);
}

export async function getPublicAmcPlans(): Promise<PublicAmcPlan[]> {
  const rows = await safeQuery<unknown[]>(
    firestoreModels.aMCPlan.findMany({
      where: { status: { in: ["ACTIVE", "PUBLISHED"] } },
      orderBy: [{ recommended: "desc" }, { createdAt: "asc" }],
    }) as Promise<unknown[]>,
    fallbackAmcPlans.map((plan) => ({
      ...plan,
      id: slugify(plan.name),
      slug: slugify(plan.name),
      status: "PUBLISHED",
    })),
  );

  return rows.map((row): PublicAmcPlan => {
    const plan = asRecord(row);
    const name = String(plan.name ?? "");
    return {
      slug: String(plan.slug ?? slugify(name)),
      id: typeof plan.id === "string" ? plan.id : String(plan.slug ?? slugify(name)),
      name,
      audience: String(plan.audience ?? ""),
      frequency: String(plan.frequency ?? ""),
      description: String(plan.description ?? ""),
      features: Array.isArray(plan.features) ? plan.features.map(String) : [],
      recommended: Boolean(plan.recommended),
    };
  });
}

export async function getPublicProjects(): Promise<PublicProject[]> {
  const rows = await safeQuery<unknown[]>(
    firestoreModels.project.findMany({
      where: { status: { in: ["ACTIVE", "PUBLISHED"] } },
      include: { service: true },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    }) as Promise<unknown[]>,
    fallbackProjects.map((project) => ({
      ...project,
      id: slugify(project.title),
      status: "PUBLISHED",
      featured: false,
    })),
  );

  return rows.map((row): PublicProject => {
    const project = asRecord(row);
    const service = asRecord(project.service);
    const title = String(project.title ?? "");
    const category = String(project.category ?? "Duct Cleaning");
    return {
      id: typeof project.id === "string" ? project.id : undefined,
      title,
      location: String(project.location ?? ""),
      duration: String(project.duration ?? "Scheduled"),
      kitchenType: String(project.kitchenType ?? "Commercial Kitchen"),
      greaseLevel: normalizeGreaseLevel(typeof project.greaseLevel === "string" ? project.greaseLevel : undefined),
      category,
      services: Array.isArray(project.services)
        ? project.services.map(String)
        : [service.title, category].filter(Boolean).map(String),
      image:
        typeof project.afterImageUrl === "string"
          ? project.afterImageUrl
          : typeof project.beforeImageUrl === "string"
            ? project.beforeImageUrl
            : typeof project.image === "string"
              ? project.image
              : images.projects,
      featured: Boolean(project.featured),
    };
  });
}

export async function getPublicBlogPosts() {
  const rows = await safeQuery<unknown[]>(
    firestoreModels.blogPost.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ featured: "desc" }, { publishedAt: "desc" }, { createdAt: "desc" }],
    }) as Promise<unknown[]>,
    fallbackBlogPosts.map((post) => ({
      ...post,
      id: slugify(post.title),
      slug: slugify(post.title),
      content: post.excerpt,
      status: "PUBLISHED" as const,
      featured: false,
      publishedAt: new Date(post.date),
      createdAt: new Date(post.date),
      updatedAt: new Date(post.date),
      tags: [],
      seoTitle: null,
      seoDescription: null,
      categoryId: null,
    })),
  );

  return rows.map((row): PublicBlogPost => {
    const post = asRecord(row);
    const title = String(post.title ?? "");
    const slug = String(post.slug ?? slugify(title));
    const publishedAt = post.publishedAt instanceof Date ? post.publishedAt : post.createdAt instanceof Date ? post.createdAt : null;
    return {
      ...post,
      title,
      slug,
      excerpt: String(post.excerpt ?? ""),
      content: String(post.content ?? post.excerpt ?? ""),
      category: String(post.category ?? "Kitchen Hygiene"),
      date: safeDate(publishedAt),
      readTime: typeof post.readTime === "string" ? post.readTime : "5 min read",
      image: typeof post.imageUrl === "string" ? post.imageUrl : typeof post.image === "string" ? post.image : images.blog,
      href: `/blog/${slug}`,
      publishedAt,
      createdAt: post.createdAt instanceof Date ? post.createdAt : publishedAt,
      updatedAt: post.updatedAt instanceof Date ? post.updatedAt : publishedAt,
    };
  });
}

export async function getPublicBlogPost(slug: string) {
  const posts = await getPublicBlogPosts();
  return posts.find((post) => post.slug === slug);
}

export async function getPublicTestimonials(): Promise<PublicTestimonial[]> {
  const rows = await safeQuery<unknown[]>(
    firestoreModels.testimonial.findMany({
      where: { status: { in: ["ACTIVE", "PUBLISHED"] }, featured: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    }) as Promise<unknown[]>,
    fallbackTestimonials.map((testimonial) => ({
      ...testimonial,
      id: slugify(`${testimonial.name}-${testimonial.business}`),
      rating: 5,
      status: "PUBLISHED",
      featured: true,
    })),
  );

  return rows.map((row): PublicTestimonial => {
    const testimonial = asRecord(row);
    const name = String(testimonial.name ?? "");
    const business = String(testimonial.business ?? testimonial.company ?? "");
    return {
      id: typeof testimonial.id === "string" ? testimonial.id : slugify(`${name}-${business}`),
      quote: String(testimonial.quote ?? testimonial.content ?? ""),
      name,
      business,
      city: String(testimonial.city ?? ""),
      rating: typeof testimonial.rating === "number" ? testimonial.rating : 5,
    };
  });
}

export async function getPublicCareers(): Promise<PublicCareer[]> {
  const rows = await safeQuery<unknown[]>(
    firestoreModels.career.findMany({
      where: { status: "ACTIVE" },
      orderBy: [{ createdAt: "desc" }],
    }) as Promise<unknown[]>,
    fallbackJobs
      .filter((job) => job.status === "Open")
      .map((job) => ({ ...job, id: slugify(job.title), status: "ACTIVE" })),
  );

  return rows.map((row): PublicCareer => {
    const career = asRecord(row);
    const title = String(career.title ?? "");
    return {
      id: typeof career.id === "string" ? career.id : slugify(title),
      title,
      location: String(career.location ?? ""),
      type: String(career.type ?? ""),
      experience: String(career.experience ?? ""),
      status: String(career.status ?? "ACTIVE"),
      description: typeof career.description === "string" ? career.description : undefined,
    };
  });
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
  const setting = await safeQuery(firestoreModels.websiteSetting.findUnique({ where: { key: "contact" } }), null);
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
    firestoreModels.fAQ.findMany({
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

export async function getPublicAboutContent(): Promise<PublicAboutContent> {
  const setting = await safeQuery(firestoreModels.websiteSetting.findUnique({ where: { key: "about" } }), null);
  const value = isAboutSetting(setting?.value) ? setting.value : {};

  return {
    mission: value.mission ?? "",
    vision: value.vision ?? "",
    values: (value.values ?? []).map((item) => ({ ...item, icon: iconFor(item.icon) })),
    teamRoles: value.teamRoles ?? [],
    standards: (value.standards ?? []).map((item) => ({ ...item, icon: iconFor(item.icon) })),
    stats: value.stats ?? [],
  } satisfies PublicAboutContent;
}
