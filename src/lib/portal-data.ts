import {
  Bell,
  CalendarClock,
  ClipboardCheck,
  CreditCard,
  FileArchive,
  FileText,
  Gauge,
  Home,
  LifeBuoy,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";

export const portalClient = {
  name: "Taj Business Hotel - Bangalore",
  contact: "engineering.tbh@clientmail.in",
  plan: "Risk Control AMC",
  location: "Bangalore CBD",
};

export const portalNav = [
  { label: "Dashboard", href: "/portal/dashboard", icon: Home },
  { label: "Inspections", href: "/portal/inspections", icon: ClipboardCheck },
  { label: "Reports", href: "/portal/reports", icon: FileText },
  { label: "Compliance", href: "/portal/compliance", icon: ShieldCheck },
  { label: "Documents", href: "/portal/documents", icon: FileArchive },
  { label: "AMC & Services", href: "/portal/amc", icon: CalendarClock },
  { label: "Team Access", href: "/portal/team", icon: Users },
  { label: "Invoices", href: "/portal/invoices", icon: CreditCard },
  { label: "Tickets", href: "/portal/tickets", icon: LifeBuoy },
  { label: "Settings", href: "/portal/settings", icon: Settings },
];

export const kpis = [
  { label: "AMC Visits Completed", value: "18", helper: "4 visits in FY 2026", icon: ClipboardCheck, tone: "primary" },
  { label: "Compliance Score", value: "94%", helper: "June inspection rating", icon: Gauge, tone: "success" },
  { label: "Next Service Window", value: "08 Jul", helper: "11:00 PM confirmed", icon: CalendarClock, tone: "warning" },
  { label: "Open Service Tickets", value: "2", helper: "1 access panel review", icon: LifeBuoy, tone: "primary" },
];

export const complianceBreakdown = [
  { label: "Hood & Filter Hygiene", value: 96 },
  { label: "Duct & Fan Condition", value: 92 },
  { label: "Fire Load Control", value: 94 },
  { label: "Report Documentation", value: 98 },
  { label: "AMC Schedule Health", value: 90 },
];

export const trendData = [
  { month: "Jan", inspections: 2, score: 88 },
  { month: "Feb", inspections: 3, score: 90 },
  { month: "Mar", inspections: 2, score: 91 },
  { month: "Apr", inspections: 4, score: 93 },
  { month: "May", inspections: 3, score: 94 },
  { month: "Jun", inspections: 4, score: 94 },
];

export const inspections = [
  {
    id: "HX-INSP-1048",
    date: "Jun 20, 2026",
    type: "Bi-Monthly Exhaust AMC",
    inspector: "Arvind Kumar",
    score: "94%",
    status: "Completed",
    report: "Ready",
  },
  {
    id: "HX-INSP-1029",
    date: "May 04, 2026",
    type: "Duct & Fan Deep Clean",
    inspector: "Neha Singh",
    score: "92%",
    status: "Completed",
    report: "Ready",
  },
  {
    id: "HX-INSP-1007",
    date: "Mar 18, 2026",
    type: "Grease Fire-Risk Check",
    inspector: "Ravi Menon",
    score: "91%",
    status: "Completed",
    report: "Ready",
  },
  {
    id: "HX-INSP-0985",
    date: "Feb 02, 2026",
    type: "Hood, Filter & Plenum Audit",
    inspector: "Arvind Kumar",
    score: "89%",
    status: "Completed",
    report: "Ready",
  },
];

export const activityFeed = [
  { title: "Inspection completed", detail: "June bi-monthly exhaust AMC report generated with 42 site photos.", time: "2 hours ago", icon: ClipboardCheck },
  { title: "Compliance record updated", detail: "NFPA 96 checklist and supervisor handover note attached.", time: "Yesterday", icon: ShieldCheck },
  { title: "AMC visit scheduled", detail: "Next night cleaning window confirmed for July 8 at 11:00 PM.", time: "2 days ago", icon: CalendarClock },
  { title: "Support ticket replied", detail: "Engineer shared access panel recommendation for banquet duct branch.", time: "4 days ago", icon: Bell },
];

export const reports = [
  { name: "June Exhaust AMC Inspection Report", type: "PDF", date: "Jun 20, 2026", size: "4.8 MB", status: "Ready" },
  { name: "Kitchen Exhaust Before/After Photo Pack", type: "ZIP", date: "Jun 20, 2026", size: "18.2 MB", status: "Ready" },
  { name: "Grease Fire-Risk Recommendations", type: "PDF", date: "May 04, 2026", size: "2.1 MB", status: "Ready" },
  { name: "Q1 AMC Compliance Summary", type: "PDF", date: "Apr 01, 2026", size: "3.4 MB", status: "Ready" },
];

export const documents = [
  { name: "Risk Control AMC Contract FY 2026", category: "Contract", updated: "Jan 04, 2026", owner: "Horexa Admin" },
  { name: "Fire NOC Reference Copy", category: "Compliance", updated: "Feb 12, 2026", owner: "Client Team" },
  { name: "Kitchen Exhaust Asset Register", category: "Safety", updated: "Mar 01, 2026", owner: "Horexa Admin" },
  { name: "Main Kitchen Layout Reference", category: "Site", updated: "Jun 02, 2026", owner: "Client Team" },
];

export const invoices = [
  { id: "HX-INV-7781", date: "Jun 01, 2026", amount: "INR 42,000", status: "Paid", due: "Jun 10, 2026" },
  { id: "HX-INV-7520", date: "Apr 01, 2026", amount: "INR 42,000", status: "Paid", due: "Apr 10, 2026" },
  { id: "HX-INV-7244", date: "Feb 01, 2026", amount: "INR 42,000", status: "Paid", due: "Feb 10, 2026" },
  { id: "HX-INV-7005", date: "Jan 04, 2026", amount: "INR 18,000", status: "Paid", due: "Jan 12, 2026" },
];

export const tickets = [
  { id: "TCK-2301", subject: "Review access panel requirement for banquet duct branch", priority: "Medium", status: "Open", updated: "Today" },
  { id: "TCK-2294", subject: "Share stamped copy of June AMC invoice", priority: "Low", status: "Waiting", updated: "Yesterday" },
  { id: "TCK-2270", subject: "Reschedule next kitchen shutdown window", priority: "High", status: "Resolved", updated: "Jun 18" },
];

export const teamMembers = [
  { name: "Priya Kapoor", role: "Director of Engineering", email: "priya@tajbusinessblr.in", access: "Admin" },
  { name: "Sanjay Mehta", role: "Executive Chef", email: "chef@tajbusinessblr.in", access: "Reports" },
  { name: "Rhea Thomas", role: "Finance Controller", email: "finance@tajbusinessblr.in", access: "Invoices" },
  { name: "Aman Gill", role: "Maintenance Lead", email: "maintenance@tajbusinessblr.in", access: "Service" },
];

export const auditChecklist = [
  { item: "Latest exhaust cleaning report uploaded", status: "Complete" },
  { item: "Before/after photos attached to June visit", status: "Complete" },
  { item: "Grease fire-risk recommendations reviewed", status: "Complete" },
  { item: "Next AMC night visit scheduled", status: "Complete" },
  { item: "Banquet duct access panel decision pending", status: "Pending" },
];
