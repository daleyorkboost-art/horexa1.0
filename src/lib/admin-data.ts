import {
  BriefcaseBusiness,
  ClipboardCheck,
  Gauge,
  Home,
  MessageSquare,
  Newspaper,
  Search,
  Settings,
  ShieldCheck,
  Star,
  Users,
  Wrench,
} from "lucide-react";
import type { IconType } from "@/types/components";

export type AdminRecord = {
  id: string;
  title: string;
  category: string;
  status: string;
  owner: string;
  updated: string;
  metric: string;
};

export type AdminModule = {
  key: string;
  title: string;
  href: string;
  description: string;
  icon: IconType;
  primaryAction: string;
  filters: string[];
  columns: Array<keyof AdminRecord>;
  rows: AdminRecord[];
};

export const adminNav = [
  { label: "Dashboard", href: "/admin", icon: Home },
  { label: "Services", href: "/admin/services", icon: Wrench },
  { label: "Projects", href: "/admin/projects", icon: BriefcaseBusiness },
  { label: "AMC Plans", href: "/admin/amc", icon: ShieldCheck },
  { label: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  { label: "Blog", href: "/admin/blog", icon: Newspaper },
  { label: "Careers", href: "/admin/careers", icon: Users },
  { label: "Clients", href: "/admin/clients", icon: Gauge },
  { label: "Inspections", href: "/admin/inspections", icon: ClipboardCheck },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "SEO", href: "/admin/seo", icon: Search },
  { label: "Users", href: "/admin/users", icon: Users },
];

const defaultColumns: Array<keyof AdminRecord> = ["id", "title", "category", "status", "owner", "updated"];

export const adminModules: AdminModule[] = [
  {
    key: "services",
    title: "Service Management",
    href: "/admin/services",
    description: "Manage service scopes, compliance angles, operating benefits and page-level content.",
    icon: Wrench,
    primaryAction: "Add Service",
    filters: ["All", "Published", "Draft", "Compliance", "Maintenance"],
    columns: defaultColumns,
    rows: [],
  },
  {
    key: "projects",
    title: "Project Management",
    href: "/admin/projects",
    description: "Manage commercial case studies, before/after assets, locations and service outcomes.",
    icon: BriefcaseBusiness,
    primaryAction: "Add Project",
    filters: ["All", "Active", "Completed", "Featured", "Draft"],
    columns: defaultColumns,
    rows: [],
  },
  {
    key: "amc",
    title: "AMC Plan Management",
    href: "/admin/amc",
    description: "Update AMC programs, visit frequency, service inclusions, reporting commitments and renewal notes.",
    icon: ShieldCheck,
    primaryAction: "Add AMC Plan",
    filters: ["All", "Active", "Recommended", "Custom"],
    columns: [...defaultColumns, "metric"],
    rows: [],
  },
  {
    key: "inquiries",
    title: "Inquiry Management",
    href: "/admin/inquiries",
    description: "Track incoming inspection requests, assign leads, update status, and export prospects.",
    icon: MessageSquare,
    primaryAction: "Add Inquiry",
    filters: ["All", "New", "In Progress", "Converted", "Closed"],
    columns: defaultColumns,
    rows: [],
  },
  {
    key: "blog",
    title: "Blog Management",
    href: "/admin/blog",
    description: "Create, schedule, publish, and optimize articles for Horexa SEO content.",
    icon: Newspaper,
    primaryAction: "Create Article",
    filters: ["All", "Published", "Draft", "Scheduled", "Featured"],
    columns: [...defaultColumns, "metric"],
    rows: [],
  },
  {
    key: "careers",
    title: "Career Management",
    href: "/admin/careers",
    description: "Manage job postings, application status, resume downloads, and hiring pipeline.",
    icon: Users,
    primaryAction: "Add Job",
    filters: ["All", "Open", "Closed", "Applications"],
    columns: [...defaultColumns, "metric"],
    rows: [],
  },
  {
    key: "clients",
    title: "Client Management",
    href: "/admin/clients",
    description: "Create AMC client accounts, link contracts, manage portal access, and service records.",
    icon: Gauge,
    primaryAction: "Add Client",
    filters: ["All", "Active", "Renewal Due", "Portal Enabled"],
    columns: [...defaultColumns, "metric"],
    rows: [],
  },
  {
    key: "inspections",
    title: "Inspection Records",
    href: "/admin/inspections",
    description: "Create inspection entries, assign scores, upload photos, and notify clients.",
    icon: ClipboardCheck,
    primaryAction: "Create Inspection",
    filters: ["All", "Scheduled", "Completed", "Report Pending"],
    columns: [...defaultColumns, "metric"],
    rows: [],
  },
  {
    key: "testimonials",
    title: "Testimonials Management",
    href: "/admin/testimonials",
    description: "Moderate reviews, ratings, display order, and featured testimonials.",
    icon: Star,
    primaryAction: "Add Testimonial",
    filters: ["All", "Published", "Hidden", "Featured"],
    columns: [...defaultColumns, "metric"],
    rows: [],
  },
  {
    key: "settings",
    title: "Website Settings",
    href: "/admin/settings",
    description: "Update logo, contact details, service areas, footer content, and social links.",
    icon: Settings,
    primaryAction: "Save Settings",
    filters: ["All", "Contact", "Brand", "Footer"],
    columns: defaultColumns,
    rows: [],
  },
  {
    key: "seo",
    title: "SEO Settings",
    href: "/admin/seo",
    description: "Manage meta titles, descriptions, keywords, schema, sitemap, and robots rules.",
    icon: Search,
    primaryAction: "Add SEO Rule",
    filters: ["All", "Optimized", "Needs Review", "Indexed"],
    columns: [...defaultColumns, "metric"],
    rows: [],
  },
  {
    key: "users",
    title: "User Management",
    href: "/admin/users",
    description: "Create admin accounts, assign roles, control permissions, and review access.",
    icon: Users,
    primaryAction: "Add User",
    filters: ["All", "Admin", "Editor", "Operations", "Inactive"],
    columns: defaultColumns,
    rows: [],
  },
];

export function getAdminModule(key: string) {
  return adminModules.find((module) => module.key === key);
}
