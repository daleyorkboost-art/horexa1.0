import {
  Bell,
  BriefcaseBusiness,
  ClipboardCheck,
  FileArchive,
  Gauge,
  History,
  Home,
  Image,
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

export type AdminFieldType =
  | "text"
  | "email"
  | "tel"
  | "number"
  | "textarea"
  | "select"
  | "boolean"
  | "array"
  | "date"
  | "datetime"
  | "file"
  | "json";

export type AdminField = {
  name: string;
  label: string;
  type: AdminFieldType;
  required?: boolean;
  options?: string[];
  uploadFolder?: string;
  uploadOwnerType?: string;
  createOnly?: boolean;
  readOnly?: boolean;
};

export type AdminModule = {
  key: string;
  title: string;
  href: string;
  description: string;
  icon: IconType;
  endpoint: string;
  primaryAction: string;
  roles: string[];
  filters: { label: string; param?: string; value?: string }[];
  columns: { key: string; label: string }[];
  fields: AdminField[];
  searchPlaceholder?: string;
  allowCreate?: boolean;
  allowEdit?: boolean;
  allowDelete?: boolean;
  allowBulkDelete?: boolean;
  readOnly?: boolean;
};

const statusOptions = ["DRAFT", "PUBLISHED", "ACTIVE", "INACTIVE", "ARCHIVED"];
const recordStatusOptions = [...statusOptions, "PENDING", "COMPLETED", "SCHEDULED", "CANCELLED"];
const inquiryStatusOptions = ["NEW", "IN_PROGRESS", "CONVERTED", "CLOSED"];
const roles = ["SUPER_ADMIN", "ADMIN", "EDITOR", "OPERATIONS", "CLIENT"];

const statusFilters = [
  { label: "All" },
  { label: "Published", param: "status", value: "PUBLISHED" },
  { label: "Active", param: "status", value: "ACTIVE" },
  { label: "Draft", param: "status", value: "DRAFT" },
  { label: "Archived", param: "status", value: "ARCHIVED" },
];

export const adminNav = [
  { label: "Dashboard", href: "/admin", icon: Home },
  { label: "Services", href: "/admin/services", icon: Wrench },
  { label: "Projects", href: "/admin/projects", icon: BriefcaseBusiness },
  { label: "AMC Plans", href: "/admin/amc", icon: ShieldCheck },
  { label: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  { label: "Blog", href: "/admin/blog", icon: Newspaper },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { label: "Careers", href: "/admin/careers", icon: Users },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Clients", href: "/admin/clients", icon: Gauge },
  { label: "Reports", href: "/admin/reports", icon: ClipboardCheck },
  { label: "SEO", href: "/admin/seo", icon: Search },
  { label: "Media", href: "/admin/media", icon: Image },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "Audit Logs", href: "/admin/audit-logs", icon: History },
  { label: "Notifications", href: "/admin/notifications", icon: Bell },
];

export const adminModules: AdminModule[] = [
  {
    key: "services",
    title: "Services",
    href: "/admin/services",
    description: "Create and maintain public service pages, SEO copy, images, and ordering.",
    icon: Wrench,
    endpoint: "/api/admin/services",
    primaryAction: "Add Service",
    roles: ["SUPER_ADMIN", "ADMIN", "EDITOR"],
    filters: statusFilters,
    columns: [
      { key: "title", label: "Title" },
      { key: "category", label: "Category" },
      { key: "status", label: "Status" },
      { key: "sortOrder", label: "Order" },
      { key: "updatedAt", label: "Updated" },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "summary", label: "Summary", type: "textarea", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "category", label: "Category", type: "text", required: true },
      { name: "icon", label: "Icon", type: "text" },
      { name: "imageUrl", label: "Image URL", type: "file", uploadFolder: "horexa/services", uploadOwnerType: "SERVICE" },
      { name: "sortOrder", label: "Sort Order", type: "number" },
      { name: "status", label: "Status", type: "select", options: statusOptions },
      { name: "seoTitle", label: "SEO Title", type: "text" },
      { name: "seoDescription", label: "SEO Description", type: "textarea" },
    ],
  },
  {
    key: "projects",
    title: "Projects",
    href: "/admin/projects",
    description: "Manage portfolio case studies, locations, before/after media, and featured state.",
    icon: BriefcaseBusiness,
    endpoint: "/api/admin/projects",
    primaryAction: "Add Project",
    roles: ["SUPER_ADMIN", "ADMIN", "EDITOR", "OPERATIONS"],
    filters: [
      ...statusFilters,
      { label: "Featured", param: "featured", value: "true" },
    ],
    columns: [
      { key: "title", label: "Title" },
      { key: "location", label: "Location" },
      { key: "category", label: "Category" },
      { key: "status", label: "Status" },
      { key: "featured", label: "Featured" },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "location", label: "Location", type: "text", required: true },
      { name: "duration", label: "Duration", type: "text" },
      { name: "kitchenType", label: "Kitchen Type", type: "text" },
      { name: "greaseLevel", label: "Grease Level", type: "select", options: ["Light", "Medium", "Heavy"] },
      { name: "category", label: "Category", type: "text", required: true },
      { name: "beforeImageUrl", label: "Before Image", type: "file", uploadFolder: "horexa/projects", uploadOwnerType: "PROJECT" },
      { name: "afterImageUrl", label: "After Image", type: "file", uploadFolder: "horexa/projects", uploadOwnerType: "PROJECT" },
      { name: "galleryUrls", label: "Gallery URLs", type: "array" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "status", label: "Status", type: "select", options: statusOptions },
      { name: "featured", label: "Featured", type: "boolean" },
    ],
  },
  {
    key: "blog",
    title: "Blogs",
    href: "/admin/blog",
    description: "Create, publish, search, and optimize public blog posts.",
    icon: Newspaper,
    endpoint: "/api/admin/blog-posts",
    primaryAction: "Create Blog",
    roles: ["SUPER_ADMIN", "ADMIN", "EDITOR"],
    filters: [
      ...statusFilters,
      { label: "Featured", param: "featured", value: "true" },
    ],
    columns: [
      { key: "title", label: "Title" },
      { key: "category", label: "Category" },
      { key: "status", label: "Status" },
      { key: "featured", label: "Featured" },
      { key: "publishedAt", label: "Published" },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "excerpt", label: "Excerpt", type: "textarea", required: true },
      { name: "content", label: "Content", type: "textarea", required: true },
      { name: "category", label: "Category", type: "text", required: true },
      { name: "tags", label: "Tags", type: "array" },
      { name: "imageUrl", label: "Featured Image", type: "file", uploadFolder: "horexa/blog", uploadOwnerType: "BLOG" },
      { name: "readTime", label: "Read Time", type: "text" },
      { name: "status", label: "Status", type: "select", options: statusOptions },
      { name: "featured", label: "Featured", type: "boolean" },
      { name: "publishedAt", label: "Published At", type: "datetime" },
      { name: "seoTitle", label: "SEO Title", type: "text" },
      { name: "seoDescription", label: "SEO Description", type: "textarea" },
    ],
  },
  {
    key: "testimonials",
    title: "Testimonials",
    href: "/admin/testimonials",
    description: "Moderate public testimonials, ratings, featured status, and display order.",
    icon: Star,
    endpoint: "/api/admin/testimonials",
    primaryAction: "Add Testimonial",
    roles: ["SUPER_ADMIN", "ADMIN", "EDITOR"],
    filters: [
      ...statusFilters,
      { label: "Featured", param: "featured", value: "true" },
    ],
    columns: [
      { key: "name", label: "Name" },
      { key: "business", label: "Business" },
      { key: "city", label: "City" },
      { key: "rating", label: "Rating" },
      { key: "status", label: "Status" },
    ],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "business", label: "Business", type: "text", required: true },
      { name: "city", label: "City", type: "text", required: true },
      { name: "quote", label: "Quote", type: "textarea", required: true },
      { name: "rating", label: "Rating", type: "number" },
      { name: "imageUrl", label: "Image", type: "file", uploadFolder: "horexa/testimonials", uploadOwnerType: "GENERAL" },
      { name: "status", label: "Status", type: "select", options: statusOptions },
      { name: "featured", label: "Featured", type: "boolean" },
      { name: "sortOrder", label: "Sort Order", type: "number" },
    ],
  },
  {
    key: "careers",
    title: "Careers",
    href: "/admin/careers",
    description: "Manage open roles and publish public career listings.",
    icon: Users,
    endpoint: "/api/admin/careers",
    primaryAction: "Add Job",
    roles: ["SUPER_ADMIN", "ADMIN", "EDITOR"],
    filters: statusFilters,
    columns: [
      { key: "title", label: "Title" },
      { key: "location", label: "Location" },
      { key: "type", label: "Type" },
      { key: "experience", label: "Experience" },
      { key: "status", label: "Status" },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "location", label: "Location", type: "text", required: true },
      { name: "type", label: "Type", type: "text", required: true },
      { name: "experience", label: "Experience", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "status", label: "Status", type: "select", options: statusOptions },
    ],
  },
  {
    key: "users",
    title: "Users",
    href: "/admin/users",
    description: "Create users, assign roles, activate accounts, and manage access.",
    icon: Users,
    endpoint: "/api/admin/users",
    primaryAction: "Add User",
    roles: ["SUPER_ADMIN"],
    filters: [
      { label: "All" },
      ...roles.map((role) => ({ label: role, param: "role", value: role })),
    ],
    columns: [
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
      { key: "role", label: "Role" },
      { key: "isActive", label: "Active" },
    ],
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone", type: "tel" },
      { name: "password", label: "Password", type: "text", createOnly: true },
      { name: "role", label: "Role", type: "select", options: roles },
      { name: "isActive", label: "Active", type: "boolean" },
    ],
  },
  {
    key: "clients",
    title: "Clients",
    href: "/admin/clients",
    description: "Manage AMC clients, portal access, cities, contacts, and linked plans.",
    icon: Gauge,
    endpoint: "/api/admin/clients",
    primaryAction: "Add Client",
    roles: ["SUPER_ADMIN", "ADMIN", "OPERATIONS"],
    filters: [
      { label: "All" },
      { label: "Active", param: "status", value: "ACTIVE" },
      { label: "Pending", param: "status", value: "PENDING" },
      { label: "Inactive", param: "status", value: "INACTIVE" },
    ],
    columns: [
      { key: "companyName", label: "Company" },
      { key: "contactName", label: "Contact" },
      { key: "email", label: "Email" },
      { key: "city", label: "City" },
      { key: "portalEnabled", label: "Portal" },
      { key: "status", label: "Status" },
    ],
    fields: [
      { name: "companyName", label: "Company Name", type: "text", required: true },
      { name: "contactName", label: "Contact Name", type: "text" },
      { name: "phone", label: "Phone", type: "tel" },
      { name: "email", label: "Email", type: "email" },
      { name: "city", label: "City", type: "text" },
      { name: "address", label: "Address", type: "textarea" },
      { name: "portalEnabled", label: "Portal Enabled", type: "boolean" },
      { name: "status", label: "Status", type: "select", options: recordStatusOptions },
    ],
  },
  {
    key: "amc",
    title: "AMC Plans",
    href: "/admin/amc",
    description: "Manage public AMC plan cards, frequency, recommended status, and features.",
    icon: ShieldCheck,
    endpoint: "/api/admin/amc-plans",
    primaryAction: "Add AMC Plan",
    roles: ["SUPER_ADMIN", "ADMIN", "EDITOR"],
    filters: [
      ...statusFilters,
      { label: "Recommended", param: "featured", value: "true" },
    ],
    columns: [
      { key: "name", label: "Name" },
      { key: "audience", label: "Audience" },
      { key: "frequency", label: "Frequency" },
      { key: "recommended", label: "Recommended" },
      { key: "status", label: "Status" },
    ],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "audience", label: "Audience", type: "text", required: true },
      { name: "frequency", label: "Frequency", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "features", label: "Features", type: "array" },
      { name: "priceLabel", label: "Price Label", type: "text" },
      { name: "recommended", label: "Recommended", type: "boolean" },
      { name: "status", label: "Status", type: "select", options: statusOptions },
    ],
  },
  {
    key: "reports",
    title: "Reports",
    href: "/admin/reports",
    description: "Create inspection reports, upload PDFs/photos, and trigger client notifications.",
    icon: ClipboardCheck,
    endpoint: "/api/admin/inspection-reports",
    primaryAction: "Create Report",
    roles: ["SUPER_ADMIN", "ADMIN", "OPERATIONS"],
    filters: [
      { label: "All" },
      { label: "Scheduled", param: "status", value: "SCHEDULED" },
      { label: "Completed", param: "status", value: "COMPLETED" },
      { label: "Cancelled", param: "status", value: "CANCELLED" },
    ],
    columns: [
      { key: "inspectionId", label: "Inspection ID" },
      { key: "type", label: "Type" },
      { key: "inspector", label: "Inspector" },
      { key: "score", label: "Score" },
      { key: "status", label: "Status" },
    ],
    fields: [
      { name: "clientId", label: "Client ID", type: "text", required: true },
      { name: "inspectionId", label: "Inspection ID", type: "text", required: true },
      { name: "type", label: "Type", type: "text", required: true },
      { name: "inspector", label: "Inspector", type: "text", required: true },
      { name: "score", label: "Score", type: "number", required: true },
      { name: "reportUrl", label: "Report PDF", type: "file", uploadFolder: "horexa/reports", uploadOwnerType: "INSPECTION" },
      { name: "beforeImageUrls", label: "Before Image URLs", type: "array" },
      { name: "afterImageUrls", label: "After Image URLs", type: "array" },
      { name: "recommendations", label: "Recommendations", type: "textarea" },
      { name: "status", label: "Status", type: "select", options: recordStatusOptions },
      { name: "scheduledAt", label: "Scheduled At", type: "datetime" },
      { name: "completedAt", label: "Completed At", type: "datetime" },
    ],
  },
  {
    key: "seo",
    title: "SEO",
    href: "/admin/seo",
    description: "Manage route metadata, index controls, canonical URLs, and keywords.",
    icon: Search,
    endpoint: "/api/admin/seo",
    primaryAction: "Add SEO Rule",
    roles: ["SUPER_ADMIN", "ADMIN", "EDITOR"],
    filters: statusFilters,
    columns: [
      { key: "route", label: "Route" },
      { key: "title", label: "Title" },
      { key: "noIndex", label: "No Index" },
      { key: "status", label: "Status" },
    ],
    fields: [
      { name: "route", label: "Route", type: "text", required: true },
      { name: "title", label: "Meta Title", type: "text", required: true },
      { name: "description", label: "Meta Description", type: "textarea", required: true },
      { name: "keywords", label: "Keywords", type: "array" },
      { name: "canonical", label: "Canonical URL", type: "text" },
      { name: "noIndex", label: "No Index", type: "boolean" },
      { name: "status", label: "Status", type: "select", options: statusOptions },
    ],
  },
  {
    key: "media",
    title: "Media",
    href: "/admin/media",
    description: "Upload, search, and manage locally stored media assets.",
    icon: Image,
    endpoint: "/api/admin/uploads",
    primaryAction: "Register Media",
    roles: ["SUPER_ADMIN", "ADMIN", "EDITOR", "OPERATIONS"],
    filters: [{ label: "All" }],
    columns: [
      { key: "url", label: "URL" },
      { key: "folder", label: "Folder" },
      { key: "resourceType", label: "Type" },
      { key: "bytes", label: "Bytes" },
      { key: "createdAt", label: "Uploaded" },
    ],
    fields: [
      { name: "url", label: "URL", type: "file", required: true, uploadFolder: "horexa/media", uploadOwnerType: "GENERAL" },
      { name: "resourceType", label: "Resource Type", type: "text" },
      { name: "mimeType", label: "MIME Type", type: "text" },
      { name: "bytes", label: "Bytes", type: "number" },
      { name: "folder", label: "Folder", type: "text" },
      { name: "originalName", label: "Original Name", type: "text" },
      { name: "ownerType", label: "Owner Type", type: "text" },
      { name: "ownerId", label: "Owner ID", type: "text" },
    ],
    allowCreate: false,
  },
  {
    key: "settings",
    title: "Settings",
    href: "/admin/settings",
    description: "Manage structured website settings such as contact, about, footer, and brand data.",
    icon: Settings,
    endpoint: "/api/admin/settings",
    primaryAction: "Add Setting",
    roles: ["SUPER_ADMIN", "ADMIN"],
    filters: [{ label: "All" }],
    columns: [
      { key: "key", label: "Key" },
      { key: "value", label: "Value" },
      { key: "updatedAt", label: "Updated" },
    ],
    fields: [
      { name: "key", label: "Key", type: "text", required: true },
      { name: "value", label: "JSON Value", type: "json", required: true },
    ],
  },
  {
    key: "inquiries",
    title: "Inquiry Management",
    href: "/admin/inquiries",
    description: "Track public inspection, contact, and AMC inquiries from website forms.",
    icon: MessageSquare,
    endpoint: "/api/admin/inquiries",
    primaryAction: "Add Inquiry",
    roles: ["SUPER_ADMIN", "ADMIN", "OPERATIONS"],
    filters: [
      { label: "All" },
      ...inquiryStatusOptions.map((status) => ({ label: status, param: "status", value: status })),
    ],
    columns: [
      { key: "fullName", label: "Name" },
      { key: "businessName", label: "Business" },
      { key: "phone", label: "Phone" },
      { key: "city", label: "City" },
      { key: "status", label: "Status" },
    ],
    fields: [
      { name: "fullName", label: "Full Name", type: "text", required: true },
      { name: "phone", label: "Phone", type: "tel", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "businessName", label: "Business Name", type: "text" },
      { name: "city", label: "City", type: "text" },
      { name: "message", label: "Message", type: "textarea" },
      { name: "sourcePage", label: "Source Page", type: "text" },
      { name: "serviceRequired", label: "Service Required", type: "text" },
      { name: "status", label: "Status", type: "select", options: inquiryStatusOptions },
      { name: "assignedTo", label: "Assigned To", type: "text" },
    ],
  },
  {
    key: "audit-logs",
    title: "Audit Logs",
    href: "/admin/audit-logs",
    description: "Review user actions, entity changes, uploads, and security-sensitive events.",
    icon: History,
    endpoint: "/api/admin/audit-logs",
    primaryAction: "Read Logs",
    roles: ["SUPER_ADMIN"],
    filters: [{ label: "All" }],
    columns: [
      { key: "action", label: "Action" },
      { key: "entity", label: "Entity" },
      { key: "entityId", label: "Entity ID" },
      { key: "ipAddress", label: "IP" },
      { key: "createdAt", label: "Created" },
    ],
    fields: [],
    allowCreate: false,
    allowEdit: false,
    allowDelete: false,
    allowBulkDelete: false,
    readOnly: true,
  },
  {
    key: "notifications",
    title: "Notifications",
    href: "/admin/notifications",
    description: "Create and review in-panel notifications for inquiries, reports, tickets, and system events.",
    icon: Bell,
    endpoint: "/api/admin/notifications",
    primaryAction: "Add Notification",
    roles: ["SUPER_ADMIN", "ADMIN", "OPERATIONS"],
    filters: [{ label: "All" }],
    columns: [
      { key: "type", label: "Type" },
      { key: "title", label: "Title" },
      { key: "readAt", label: "Read At" },
      { key: "createdAt", label: "Created" },
    ],
    fields: [
      { name: "userId", label: "User ID", type: "text" },
      { name: "type", label: "Type", type: "select", options: ["INQUIRY", "INSPECTION", "REPORT", "TICKET", "INVOICE", "SYSTEM"] },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "body", label: "Body", type: "textarea", required: true },
      { name: "metadata", label: "Metadata JSON", type: "json" },
    ],
  },
  {
    key: "applications",
    title: "Career Applications",
    href: "/admin/applications",
    description: "Review submitted career applications, resumes, and candidate status.",
    icon: FileArchive,
    endpoint: "/api/admin/applications",
    primaryAction: "Add Application",
    roles: ["SUPER_ADMIN", "ADMIN", "OPERATIONS"],
    filters: recordStatusOptions.map((status, index) => (index === 0 ? { label: "All" } : { label: status, param: "status", value: status })),
    columns: [
      { key: "fullName", label: "Name" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
      { key: "status", label: "Status" },
      { key: "createdAt", label: "Created" },
    ],
    fields: [
      { name: "careerId", label: "Career ID", type: "text" },
      { name: "fullName", label: "Full Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone", type: "tel" },
      { name: "resumeUrl", label: "Resume", type: "file", uploadFolder: "horexa/resumes", uploadOwnerType: "CAREER" },
      { name: "message", label: "Message", type: "textarea" },
      { name: "status", label: "Status", type: "select", options: recordStatusOptions },
    ],
  },
];

export function getAdminModule(key: string) {
  return adminModules.find((module) => module.key === key);
}
