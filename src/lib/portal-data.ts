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
  name: "Grand Meridian Hotel",
  contact: "operations@grandmeridian.in",
  plan: "Premium AMC",
  location: "Delhi NCR",
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
  { label: "Total Inspections", value: "18", helper: "+4 this quarter", icon: ClipboardCheck, tone: "primary" },
  { label: "Compliance Score", value: "94%", helper: "Excellent rating", icon: Gauge, tone: "success" },
  { label: "Next Inspection", value: "08 Jul", helper: "14 days remaining", icon: CalendarClock, tone: "warning" },
  { label: "Open Tickets", value: "2", helper: "1 needs attention", icon: LifeBuoy, tone: "primary" },
];

export const complianceBreakdown = [
  { label: "Kitchen Hygiene", value: 96 },
  { label: "Exhaust Systems", value: 92 },
  { label: "Fire Safety", value: 94 },
  { label: "Documentation", value: 98 },
  { label: "Maintenance", value: 90 },
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
    type: "Bi-Monthly AMC",
    inspector: "Arvind Kumar",
    score: "94%",
    status: "Completed",
    report: "Ready",
  },
  {
    id: "HX-INSP-1029",
    date: "May 04, 2026",
    type: "Exhaust Deep Clean",
    inspector: "Neha Singh",
    score: "92%",
    status: "Completed",
    report: "Ready",
  },
  {
    id: "HX-INSP-1007",
    date: "Mar 18, 2026",
    type: "Fire Safety Check",
    inspector: "Ravi Menon",
    score: "91%",
    status: "Completed",
    report: "Ready",
  },
  {
    id: "HX-INSP-0985",
    date: "Feb 02, 2026",
    type: "Hood & Filter Audit",
    inspector: "Arvind Kumar",
    score: "89%",
    status: "Completed",
    report: "Ready",
  },
];

export const activityFeed = [
  { title: "Inspection completed", detail: "Bi-monthly AMC inspection report generated.", time: "2 hours ago", icon: ClipboardCheck },
  { title: "Compliance document updated", detail: "NFPA checklist attached to client record.", time: "Yesterday", icon: ShieldCheck },
  { title: "AMC service scheduled", detail: "Next cleaning window confirmed for July 8.", time: "2 days ago", icon: CalendarClock },
  { title: "Support ticket replied", detail: "Engineer shared access panel recommendation.", time: "4 days ago", icon: Bell },
];

export const reports = [
  { name: "June AMC Inspection Report", type: "PDF", date: "Jun 20, 2026", size: "4.8 MB", status: "Ready" },
  { name: "Before/After Photo Pack", type: "ZIP", date: "Jun 20, 2026", size: "18.2 MB", status: "Ready" },
  { name: "Fire Safety Recommendations", type: "PDF", date: "May 04, 2026", size: "2.1 MB", status: "Ready" },
  { name: "Quarterly Compliance Summary", type: "PDF", date: "Apr 01, 2026", size: "3.4 MB", status: "Ready" },
];

export const documents = [
  { name: "AMC Contract FY 2026", category: "Contract", updated: "Jan 04, 2026", owner: "Horexa Admin" },
  { name: "Fire NOC Copy", category: "Compliance", updated: "Feb 12, 2026", owner: "Client Team" },
  { name: "Insurance Certificate", category: "Safety", updated: "Mar 01, 2026", owner: "Client Team" },
  { name: "Kitchen Layout Reference", category: "Site", updated: "Jun 02, 2026", owner: "Horexa Admin" },
];

export const invoices = [
  { id: "HX-INV-7781", date: "Jun 01, 2026", amount: "₹42,000", status: "Paid", due: "Jun 10, 2026" },
  { id: "HX-INV-7520", date: "Apr 01, 2026", amount: "₹42,000", status: "Paid", due: "Apr 10, 2026" },
  { id: "HX-INV-7244", date: "Feb 01, 2026", amount: "₹42,000", status: "Paid", due: "Feb 10, 2026" },
  { id: "HX-INV-7005", date: "Jan 04, 2026", amount: "₹18,000", status: "Paid", due: "Jan 12, 2026" },
];

export const tickets = [
  { id: "TCK-2301", subject: "Request extra access panel review", priority: "Medium", status: "Open", updated: "Today" },
  { id: "TCK-2294", subject: "Need June report invoice copy", priority: "Low", status: "Waiting", updated: "Yesterday" },
  { id: "TCK-2270", subject: "Reschedule next inspection slot", priority: "High", status: "Resolved", updated: "Jun 18" },
];

export const teamMembers = [
  { name: "Priya Kapoor", role: "Operations Head", email: "priya@grandmeridian.in", access: "Admin" },
  { name: "Sanjay Mehta", role: "Executive Chef", email: "chef@grandmeridian.in", access: "Reports" },
  { name: "Rhea Thomas", role: "Finance", email: "finance@grandmeridian.in", access: "Invoices" },
  { name: "Aman Gill", role: "Maintenance Lead", email: "maintenance@grandmeridian.in", access: "Service" },
];

export const auditChecklist = [
  { item: "Latest duct cleaning report uploaded", status: "Complete" },
  { item: "Before/after photos attached", status: "Complete" },
  { item: "Fire safety recommendations reviewed", status: "Complete" },
  { item: "Next AMC visit scheduled", status: "Complete" },
  { item: "NOC renewal reminder configured", status: "Pending" },
];
