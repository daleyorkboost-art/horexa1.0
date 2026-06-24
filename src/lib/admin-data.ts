import {
  BarChart3,
  BriefcaseBusiness,
  ClipboardCheck,
  FileSearch,
  FileText,
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

export const adminMetrics = [
  { label: "Today's Inquiries", value: "14", helper: "+22% vs yesterday", icon: MessageSquare, tone: "primary" },
  { label: "Total Leads", value: "1,284", helper: "248 converted", icon: FileSearch, tone: "success" },
  { label: "Active Projects", value: "32", helper: "8 due this week", icon: BriefcaseBusiness, tone: "warning" },
  { label: "Website Traffic", value: "48.6K", helper: "30 day visitors", icon: BarChart3, tone: "primary" },
  { label: "Applications", value: "76", helper: "11 new this week", icon: Users, tone: "success" },
];

const now = "Jun 24, 2026";

export const adminModules: AdminModule[] = [
  {
    key: "services",
    title: "Service Management",
    href: "/admin/services",
    description: "Add, edit, publish, and organize public service pages and detail content.",
    icon: Wrench,
    primaryAction: "Add Service",
    filters: ["All", "Published", "Draft", "Compliance", "Maintenance"],
    columns: ["id", "title", "category", "status", "owner", "updated"],
    rows: [
      { id: "SRV-001", title: "Kitchen Exhaust Duct Cleaning", category: "Exhaust", status: "Published", owner: "Admin", updated: now, metric: "1,820 views" },
      { id: "SRV-002", title: "Hood & Filter Cleaning", category: "Cleaning", status: "Published", owner: "Admin", updated: "Jun 20, 2026", metric: "940 views" },
      { id: "SRV-003", title: "Water Tank Cleaning", category: "Water Hygiene", status: "Draft", owner: "Ops", updated: "Jun 18, 2026", metric: "320 views" },
    ],
  },
  {
    key: "projects",
    title: "Project Management",
    href: "/admin/projects",
    description: "Manage portfolio projects, before/after images, categories, and case study details.",
    icon: BriefcaseBusiness,
    primaryAction: "Add Project",
    filters: ["All", "Active", "Completed", "Featured", "Draft"],
    columns: ["id", "title", "category", "status", "owner", "updated"],
    rows: [
      { id: "PRJ-118", title: "Five-Star Hotel Exhaust Restoration", category: "Duct Cleaning", status: "Featured", owner: "Arvind", updated: now, metric: "42 photos" },
      { id: "PRJ-117", title: "Cloud Kitchen Deep Degreasing", category: "Ventilation", status: "Completed", owner: "Neha", updated: "Jun 19, 2026", metric: "18 photos" },
      { id: "PRJ-116", title: "Hospital Kitchen AMC Rollout", category: "AMC", status: "Active", owner: "Ravi", updated: "Jun 17, 2026", metric: "3 sites" },
    ],
  },
  {
    key: "amc",
    title: "AMC Plan Management",
    href: "/admin/amc",
    description: "Update AMC plans, recommended badges, service frequencies, and feature bullets.",
    icon: ShieldCheck,
    primaryAction: "Add AMC Plan",
    filters: ["All", "Active", "Recommended", "Custom"],
    columns: ["id", "title", "category", "status", "owner", "updated", "metric"],
    rows: [
      { id: "AMC-STD", title: "Standard AMC", category: "Quarterly", status: "Active", owner: "Admin", updated: now, metric: "34 clients" },
      { id: "AMC-PRM", title: "Premium AMC", category: "Bi-Monthly", status: "Recommended", owner: "Admin", updated: now, metric: "58 clients" },
      { id: "AMC-ENT", title: "Enterprise Custom", category: "Custom", status: "Active", owner: "Sales", updated: "Jun 14, 2026", metric: "12 clients" },
    ],
  },
  {
    key: "inquiries",
    title: "Inquiry Management",
    href: "/admin/inquiries",
    description: "Track incoming inspection requests, assign leads, update status, and export prospects.",
    icon: MessageSquare,
    primaryAction: "Add Inquiry",
    filters: ["All", "New", "In Progress", "Converted", "Closed"],
    columns: ["id", "title", "category", "status", "owner", "updated"],
    rows: [
      { id: "INQ-9041", title: "The Grand Hotel", category: "AMC Inquiry", status: "New", owner: "Unassigned", updated: "Today", metric: "Delhi NCR" },
      { id: "INQ-9038", title: "Cloud Bowl Kitchens", category: "Duct Cleaning", status: "In Progress", owner: "Meera", updated: "Today", metric: "Bangalore" },
      { id: "INQ-9025", title: "Cafe North", category: "Hood Cleaning", status: "Converted", owner: "Rohit", updated: "Yesterday", metric: "Mumbai" },
    ],
  },
  {
    key: "blog",
    title: "Blog Management",
    href: "/admin/blog",
    description: "Create, schedule, publish, and optimize articles for Horexa SEO content.",
    icon: Newspaper,
    primaryAction: "Create Article",
    filters: ["All", "Published", "Draft", "Scheduled", "Featured"],
    columns: ["id", "title", "category", "status", "owner", "updated", "metric"],
    rows: [
      { id: "BLG-221", title: "Why Duct Cleaning is Critical", category: "Exhaust Systems", status: "Published", owner: "Content", updated: now, metric: "6 min" },
      { id: "BLG-220", title: "NFPA 96 Guide", category: "Compliance", status: "Draft", owner: "Content", updated: "Jun 21, 2026", metric: "8 min" },
      { id: "BLG-219", title: "Kitchen Fire Prevention", category: "Fire Safety", status: "Scheduled", owner: "Content", updated: "Jun 18, 2026", metric: "Jul 01" },
    ],
  },
  {
    key: "careers",
    title: "Career Management",
    href: "/admin/careers",
    description: "Manage job postings, application status, resume downloads, and hiring pipeline.",
    icon: Users,
    primaryAction: "Add Job",
    filters: ["All", "Open", "Closed", "Applications"],
    columns: ["id", "title", "category", "status", "owner", "updated", "metric"],
    rows: [
      { id: "JOB-044", title: "Field Service Engineer", category: "Delhi NCR", status: "Open", owner: "HR", updated: now, metric: "18 applicants" },
      { id: "JOB-043", title: "Sales Executive", category: "Mumbai", status: "Open", owner: "HR", updated: "Jun 20, 2026", metric: "22 applicants" },
      { id: "JOB-039", title: "Project Coordinator", category: "Hyderabad", status: "Closed", owner: "HR", updated: "Jun 10, 2026", metric: "Hired" },
    ],
  },
  {
    key: "clients",
    title: "Client Management",
    href: "/admin/clients",
    description: "Create AMC client accounts, link contracts, manage portal access, and service records.",
    icon: Gauge,
    primaryAction: "Add Client",
    filters: ["All", "Active", "Renewal Due", "Portal Enabled"],
    columns: ["id", "title", "category", "status", "owner", "updated", "metric"],
    rows: [
      { id: "CL-3301", title: "Grand Meridian Hotel", category: "Premium AMC", status: "Active", owner: "Ops", updated: now, metric: "Portal enabled" },
      { id: "CL-3298", title: "Cloud Feast Kitchens", category: "Enterprise", status: "Active", owner: "Ops", updated: "Jun 21, 2026", metric: "6 sites" },
      { id: "CL-3284", title: "The Copper Room", category: "Standard AMC", status: "Renewal Due", owner: "Sales", updated: "Jun 11, 2026", metric: "10 days" },
    ],
  },
  {
    key: "inspections",
    title: "Inspection Records",
    href: "/admin/inspections",
    description: "Create inspection entries, assign scores, upload photos, and notify clients.",
    icon: ClipboardCheck,
    primaryAction: "Create Inspection",
    filters: ["All", "Scheduled", "Completed", "Report Pending"],
    columns: ["id", "title", "category", "status", "owner", "updated", "metric"],
    rows: [
      { id: "INS-1048", title: "Grand Meridian Bi-Monthly AMC", category: "Exhaust", status: "Completed", owner: "Arvind", updated: now, metric: "94%" },
      { id: "INS-1047", title: "Cloud Feast Site 03", category: "Ventilation", status: "Report Pending", owner: "Neha", updated: "Today", metric: "91%" },
      { id: "INS-1042", title: "Cafe North Cleaning", category: "Hood Filter", status: "Scheduled", owner: "Ravi", updated: "Jun 28, 2026", metric: "11:30 PM" },
    ],
  },
  {
    key: "testimonials",
    title: "Testimonials Management",
    href: "/admin/testimonials",
    description: "Moderate reviews, ratings, display order, and featured testimonials.",
    icon: Star,
    primaryAction: "Add Testimonial",
    filters: ["All", "Published", "Hidden", "Featured"],
    columns: ["id", "title", "category", "status", "owner", "updated", "metric"],
    rows: [
      { id: "TST-88", title: "Rohit Malhotra", category: "Restaurant", status: "Published", owner: "Admin", updated: now, metric: "5 stars" },
      { id: "TST-87", title: "Nisha Rao", category: "Cloud Kitchen", status: "Featured", owner: "Admin", updated: "Jun 18, 2026", metric: "5 stars" },
      { id: "TST-84", title: "Amit Sharma", category: "Hotel", status: "Hidden", owner: "Admin", updated: "Jun 05, 2026", metric: "4 stars" },
    ],
  },
  {
    key: "settings",
    title: "Website Settings",
    href: "/admin/settings",
    description: "Update logo, contact details, service areas, footer content, and social links.",
    icon: Settings,
    primaryAction: "Save Settings",
    filters: ["All", "Contact", "Brand", "Footer"],
    columns: ["id", "title", "category", "status", "owner", "updated"],
    rows: [
      { id: "SET-001", title: "Primary Contact Number", category: "Contact", status: "Active", owner: "Admin", updated: now, metric: "+91 98765 43210" },
      { id: "SET-002", title: "Footer Service Areas", category: "Footer", status: "Active", owner: "Admin", updated: "Jun 20, 2026", metric: "7 areas" },
      { id: "SET-003", title: "Brand Logo", category: "Brand", status: "Active", owner: "Admin", updated: "Jun 10, 2026", metric: "SVG" },
    ],
  },
  {
    key: "seo",
    title: "SEO Settings",
    href: "/admin/seo",
    description: "Manage meta titles, descriptions, keywords, schema, sitemap, and robots rules.",
    icon: Search,
    primaryAction: "Add SEO Rule",
    filters: ["All", "Optimized", "Needs Review", "Indexed"],
    columns: ["id", "title", "category", "status", "owner", "updated", "metric"],
    rows: [
      { id: "SEO-101", title: "Home Page", category: "LocalBusiness", status: "Optimized", owner: "SEO", updated: now, metric: "92 score" },
      { id: "SEO-102", title: "Duct Cleaning Delhi", category: "Service", status: "Indexed", owner: "SEO", updated: "Jun 19, 2026", metric: "Top 8" },
      { id: "SEO-103", title: "AMC Plans", category: "Service", status: "Needs Review", owner: "SEO", updated: "Jun 15, 2026", metric: "68 score" },
    ],
  },
  {
    key: "users",
    title: "User Management",
    href: "/admin/users",
    description: "Create admin accounts, assign roles, control permissions, and review access.",
    icon: Users,
    primaryAction: "Add User",
    filters: ["All", "Admin", "Editor", "Operations", "Inactive"],
    columns: ["id", "title", "category", "status", "owner", "updated"],
    rows: [
      { id: "USR-01", title: "Admin User", category: "Super Admin", status: "Active", owner: "System", updated: now, metric: "Full access" },
      { id: "USR-02", title: "Meera Singh", category: "Sales", status: "Active", owner: "Admin", updated: "Jun 20, 2026", metric: "Lead access" },
      { id: "USR-03", title: "Content Desk", category: "Editor", status: "Inactive", owner: "Admin", updated: "Jun 01, 2026", metric: "Blog access" },
    ],
  },
];

export const recentAdminActivity = [
  { title: "New inquiry assigned", detail: "Cloud Bowl Kitchens assigned to Meera.", time: "12 min ago", icon: MessageSquare },
  { title: "Inspection report published", detail: "Grand Meridian June AMC report sent to client portal.", time: "1 hour ago", icon: FileText },
  { title: "Project featured", detail: "Five-Star Hotel Restoration moved to homepage portfolio.", time: "3 hours ago", icon: BriefcaseBusiness },
  { title: "SEO rule updated", detail: "Duct cleaning Delhi metadata optimized.", time: "Yesterday", icon: Search },
];

export function getAdminModule(key: string) {
  return adminModules.find((module) => module.key === key);
}
