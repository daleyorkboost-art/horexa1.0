import {
  CalendarClock,
  ClipboardCheck,
  CreditCard,
  FileArchive,
  FileText,
  Home,
  LifeBuoy,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";

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
