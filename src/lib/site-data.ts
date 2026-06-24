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
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  SprayCan,
  Target,
  Utensils,
  Users,
  Wrench,
} from "lucide-react";
import type { IconType } from "@/types/components";

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  icon: IconType;
  image: string;
  benefits: string[];
  includes: string[];
  faqs: { question: string; answer: string }[];
};

export const images = {
  hero: "/images/horexa-hero.jpeg",
  services: "/images/horexa-service-hero.jpeg",
  projects: "/images/horexa-projects.jpeg",
  blog: "/images/horexa-blog.jpeg",
  amc: "/images/horexa-amc.jpeg",
  contact: "/images/horexa-contact.jpeg",
};

export const services: Service[] = [
  {
    slug: "kitchen-exhaust-duct-cleaning",
    title: "Kitchen Exhaust Duct Cleaning",
    shortTitle: "Exhaust Duct Cleaning",
    description: "Deep grease removal for ducts, hoods, fans, and high-risk cooking exhaust systems.",
    longDescription:
      "A full-scope cleaning service for commercial kitchen exhaust networks, built to reduce fire risk, restore airflow, and support NFPA 96-style compliance documentation.",
    icon: Fan,
    image: images.services,
    benefits: ["Fire risk reduction", "Better airflow", "Compliance-ready photos", "Extended equipment life"],
    includes: [
      "Inspection and grease-level assessment",
      "Hood, duct, filter, and fan cleaning",
      "Access panel installation guidance",
      "Post-cleaning inspection and photo report",
    ],
    faqs: [
      {
        question: "How often should kitchen exhaust ducts be cleaned?",
        answer: "High-volume kitchens usually need quarterly or bi-monthly service, while smaller kitchens can often follow a half-yearly plan.",
      },
      {
        question: "Do you provide before and after photos?",
        answer: "Yes. Every cleaning can include timestamped before and after photos for internal audits and compliance records.",
      },
    ],
  },
  {
    slug: "hood-and-filter-cleaning",
    title: "Hood & Filter Cleaning",
    shortTitle: "Hood & Filter Cleaning",
    description: "Degreasing for canopy hoods, baffle filters, grease trays, and visible exhaust surfaces.",
    longDescription:
      "Routine hood and filter cleaning keeps kitchen airflow stable, reduces smoke retention, and protects staff from unsafe grease buildup.",
    icon: Filter,
    image: images.services,
    benefits: ["Cleaner cooking zones", "Improved capture efficiency", "Reduced odor", "Lower daily fire load"],
    includes: ["Filter removal and soak cleaning", "Canopy degreasing", "Grease tray clearing", "Final surface wipe-down"],
    faqs: [
      {
        question: "Can filters be cleaned on-site?",
        answer: "Most filter cleaning is completed on-site with professional degreasers and controlled wastewater handling.",
      },
      {
        question: "Will kitchen operations be interrupted?",
        answer: "Service slots are scheduled around off-peak hours to minimize disruption.",
      },
    ],
  },
  {
    slug: "ventilation-hygiene",
    title: "Ventilation Hygiene",
    shortTitle: "Ventilation Hygiene",
    description: "Ventilation checks and cleaning support for airflow, odor control, and healthy kitchens.",
    longDescription:
      "A focused hygiene service for duct-linked ventilation assets, designed for hotels, restaurants, hospitals, and cafeterias.",
    icon: Fan,
    image: images.hero,
    benefits: ["Balanced airflow", "Better working comfort", "Odor reduction", "Equipment protection"],
    includes: ["Airflow inspection", "Vent surface cleaning", "Fan and blower checks", "Maintenance recommendations"],
    faqs: [
      {
        question: "Is ventilation hygiene different from exhaust cleaning?",
        answer: "Yes. Exhaust cleaning targets grease-heavy kitchen extraction, while ventilation hygiene covers broader airflow and hygiene concerns.",
      },
      {
        question: "Do you inspect airflow performance?",
        answer: "Yes. Teams can review visible airflow issues and suggest corrective maintenance.",
      },
    ],
  },
  {
    slug: "water-tank-cleaning",
    title: "Water Tank Cleaning",
    shortTitle: "Water Tank Cleaning",
    description: "Scheduled water tank cleaning for hospitality properties and commercial kitchens.",
    longDescription:
      "A hygiene maintenance service for storage tanks that supports safer kitchen operations and cleaner facility water systems.",
    icon: Droplets,
    image: images.contact,
    benefits: ["Safer stored water", "Sediment removal", "Odor control", "Preventive hygiene"],
    includes: ["Tank draining support", "Sludge and sediment removal", "Surface scrubbing", "Disinfection rinse"],
    faqs: [
      {
        question: "How frequently should water tanks be cleaned?",
        answer: "Commercial kitchens commonly schedule tank cleaning every three to six months depending on usage and local conditions.",
      },
      {
        question: "Can cleaning be bundled with AMC service?",
        answer: "Yes. Water tank cleaning can be included in a broader AMC hygiene schedule.",
      },
    ],
  },
  {
    slug: "access-panel-installation",
    title: "Access Panel Installation",
    shortTitle: "Access Panels",
    description: "Access solutions that help technicians reach hidden duct sections safely and thoroughly.",
    longDescription:
      "Installation guidance and support for access points in ductwork so cleaning teams can reach grease-prone internal areas.",
    icon: Wrench,
    image: images.projects,
    benefits: ["Better duct reach", "More complete cleaning", "Inspection-ready systems", "Reduced blind spots"],
    includes: ["Duct access assessment", "Panel placement recommendations", "Installation coordination", "Inspection checklist"],
    faqs: [
      {
        question: "Why do ducts need access panels?",
        answer: "Panels let technicians inspect and clean internal duct runs that cannot be reached from the hood or fan end.",
      },
      {
        question: "Do you install panels during cleaning?",
        answer: "Where feasible, access work can be coordinated as part of a cleaning or compliance improvement visit.",
      },
    ],
  },
  {
    slug: "amc-contracts",
    title: "AMC Contracts",
    shortTitle: "AMC Contracts",
    description: "Recurring hygiene maintenance with reports, schedules, priority support, and audit records.",
    longDescription:
      "Annual maintenance contracts help operators avoid missed service windows while keeping compliance documentation ready.",
    icon: ClipboardCheck,
    image: images.amc,
    benefits: ["Priority scheduling", "Digital reports", "Renewal reminders", "Dedicated support"],
    includes: ["Service calendar", "Inspection report library", "Before and after photos", "Compliance documentation"],
    faqs: [
      {
        question: "Can we customize AMC frequency?",
        answer: "Yes. Plans can be aligned to kitchen volume, grease load, audit requirements, and operating hours.",
      },
      {
        question: "Do AMC clients get portal access?",
        answer: "Yes. AMC clients can access reports and service history through the planned client portal.",
      },
    ],
  },
  {
    slug: "fire-risk-reduction",
    title: "Fire Risk Reduction",
    shortTitle: "Fire Risk Reduction",
    description: "Inspection-led recommendations that lower grease fire risk and support safer operations.",
    longDescription:
      "A safety-focused service layer combining grease-load checks, documentation, and practical maintenance recommendations.",
    icon: Flame,
    image: images.blog,
    benefits: ["Lower ignition risk", "Cleaner ducts", "Audit readiness", "Safer kitchen teams"],
    includes: ["Grease risk inspection", "Fire safety recommendations", "Photo evidence", "Follow-up maintenance plan"],
    faqs: [
      {
        question: "Does cleaning eliminate fire risk completely?",
        answer: "No service can eliminate risk entirely, but scheduled cleaning greatly reduces grease load and improves safety readiness.",
      },
      {
        question: "Can you help before a fire audit?",
        answer: "Yes. Horexa can prioritize inspection, cleaning, and documentation before planned audits.",
      },
    ],
  },
];

export const values = [
  { title: "Purpose Driven", description: "Every inspection is tied to safer kitchens and cleaner operations.", icon: Target },
  { title: "Growth Focused", description: "Built to support single outlets and fast-growing multi-city brands.", icon: Sparkles },
  { title: "Team Oriented", description: "Field teams, coordinators, and clients work from one clear service rhythm.", icon: Users },
  { title: "Innovative", description: "Photo reporting and portal-ready records keep compliance easier to manage.", icon: Gauge },
  { title: "Integrity First", description: "Transparent recommendations, clear schedules, and no hidden shortcuts.", icon: Handshake },
];

export const processSteps = [
  { title: "Pre-Inspection", description: "Measure grease load and access points before work begins.", icon: ClipboardCheck },
  { title: "System Protection", description: "Shield cooking assets, floors, and sensitive equipment.", icon: ShieldCheck },
  { title: "Grease Removal", description: "Remove heavy deposits from hoods, filters, ducts, fans, and traps.", icon: SprayCan },
  { title: "Deep Cleaning", description: "Apply professional degreasing and detailed surface restoration.", icon: Sparkles },
  { title: "Post Inspection", description: "Review airflow, visible residues, and completion quality.", icon: CheckCircle2 },
  { title: "Report", description: "Deliver before/after photos and service recommendations.", icon: FileCheck2 },
];

export const stats = [
  { value: 90, suffix: "%", label: "Grease Fire Risk", description: "Kitchen fires are often linked to duct grease buildup." },
  { value: 2, suffix: "x", label: "Efficiency Gain", description: "Cleaner exhaust systems support stronger airflow." },
  { value: 100, suffix: "%", label: "Compliance Focus", description: "Reports are built for audit-ready maintenance records." },
  { value: 7, suffix: "+", label: "Major Cities", description: "Service coverage across India's hospitality hubs." },
];

export const industries = [
  { title: "Hotels & Resorts", icon: Hotel },
  { title: "Restaurants", icon: Utensils },
  { title: "Cloud Kitchens", icon: Building2 },
  { title: "Hospitals", icon: HeartPulse },
  { title: "Educational Institutions", icon: GraduationCap },
  { title: "Corporate Cafeterias", icon: BriefcaseBusiness },
];

export const testimonials = [
  {
    quote: "Horexa gave us clean ducts, strong reporting, and a maintenance calendar our operations team can actually follow.",
    name: "Rohit Malhotra",
    business: "The Copper Room",
    city: "Delhi NCR",
  },
  {
    quote: "Their team worked overnight and handed over before/after evidence the next morning. Very professional execution.",
    name: "Nisha Rao",
    business: "Cloud Feast Kitchens",
    city: "Bangalore",
  },
  {
    quote: "The AMC plan made fire audit preparation much easier for our hotel engineering team.",
    name: "Amit Sharma",
    business: "Grand Meridian",
    city: "Mumbai",
  },
];

export const amcPlans = [
  {
    name: "Standard AMC",
    audience: "Small restaurants & cafes",
    frequency: "Quarterly Service",
    description: "Essential compliance and safety maintenance for standard commercial kitchens.",
    features: ["Quarterly inspection", "Duct and hood cleaning", "Before/after photo report", "Email support"],
    recommended: false,
  },
  {
    name: "Premium AMC",
    audience: "Hotels & busy cloud kitchens",
    frequency: "Bi-Monthly Service",
    description: "Comprehensive coverage designed for high-volume cooking operations.",
    features: ["Bi-monthly inspection", "Priority scheduling", "Portal-ready report archive", "WhatsApp support"],
    recommended: true,
  },
  {
    name: "Enterprise Custom",
    audience: "Chains & multi-location brands",
    frequency: "Custom Schedule",
    description: "Tailored hygiene management across all your properties.",
    features: ["Multi-city service calendar", "Dedicated coordinator", "Custom compliance dashboard", "Executive summaries"],
    recommended: false,
  },
];

export const projects = [
  {
    title: "Five-Star Hotel Exhaust Restoration",
    location: "Delhi NCR",
    duration: "2 Nights",
    kitchenType: "Hotel",
    greaseLevel: "Heavy" as const,
    category: "Duct Cleaning",
    services: ["Exhaust Cleaning", "AMC"],
    image: images.projects,
  },
  {
    title: "Cloud Kitchen Deep Degreasing",
    location: "Bangalore",
    duration: "1 Night",
    kitchenType: "Cloud Kitchen",
    greaseLevel: "Medium" as const,
    category: "Ventilation",
    services: ["Deep Degreasing", "Ventilation"],
    image: images.hero,
  },
  {
    title: "Restaurant Hood & Filter Recovery",
    location: "Mumbai",
    duration: "8 Hours",
    kitchenType: "Restaurant",
    greaseLevel: "Heavy" as const,
    category: "Hood & Filter",
    services: ["Hood Cleaning", "Filters"],
    image: images.blog,
  },
  {
    title: "Hospital Kitchen AMC Rollout",
    location: "Hyderabad",
    duration: "3 Months",
    kitchenType: "Hospital",
    greaseLevel: "Light" as const,
    category: "AMC Projects",
    services: ["AMC", "Compliance"],
    image: images.amc,
  },
];

export const blogPosts = [
  {
    title: "Why Kitchen Exhaust Duct Cleaning is Critical for Safety and Compliance",
    category: "Exhaust Systems",
    date: "May 15, 2024",
    readTime: "6 min read",
    excerpt: "Grease buildup in exhaust ducts is one of the leading causes of commercial kitchen fires.",
    image: images.blog,
  },
  {
    title: "Top 5 Causes of Kitchen Fires and How to Prevent Them",
    category: "Fire Safety",
    date: "May 10, 2024",
    readTime: "5 min read",
    excerpt: "A practical checklist for reducing risk before inspection season.",
    image: images.hero,
  },
  {
    title: "NFPA 96 Standards: A Guide for Restaurant Owners",
    category: "Compliance & Standards",
    date: "May 3, 2024",
    readTime: "8 min read",
    excerpt: "What operators should know about exhaust hygiene, records, and frequency.",
    image: images.services,
  },
  {
    title: "Benefits of AMC for Kitchen Exhaust Systems",
    category: "Maintenance Tips",
    date: "April 24, 2024",
    readTime: "4 min read",
    excerpt: "How scheduled maintenance prevents costly downtime and missed compliance windows.",
    image: images.amc,
  },
  {
    title: "Before and After: Restoring a High-Volume Hotel Kitchen",
    category: "Case Studies",
    date: "April 18, 2024",
    readTime: "7 min read",
    excerpt: "A field report from a multi-night duct cleaning and documentation project.",
    image: images.projects,
  },
  {
    title: "How Often Should Kitchen Exhaust Ducts Be Cleaned?",
    category: "Kitchen Hygiene",
    date: "April 11, 2024",
    readTime: "5 min read",
    excerpt: "Cleaning frequency depends on kitchen volume, grease load, and audit requirements.",
    image: images.contact,
  },
];

export const jobs = [
  { title: "Field Service Engineer", location: "Delhi NCR", type: "Full Time", experience: "2-4 Years", status: "Open" },
  { title: "Kitchen Duct Cleaning Technician", location: "Bangalore", type: "Full Time", experience: "1-3 Years", status: "Open" },
  { title: "Sales Executive", location: "Mumbai", type: "Full Time", experience: "1-3 Years", status: "Open" },
  { title: "Project Coordinator", location: "Hyderabad", type: "Full Time", experience: "2-4 Years", status: "Open" },
  { title: "Business Development Manager", location: "Pan India", type: "Full Time", experience: "5+ Years", status: "Closed" },
];

export const careerBenefits = [
  { title: "Competitive Salary", icon: Award },
  { title: "Health & Accident Insurance", icon: HeartPulse },
  { title: "Learning & Development", icon: GraduationCap },
  { title: "Career Growth", icon: Sparkles },
  { title: "Safe Work Environment", icon: ShieldCheck },
  { title: "Recognition & Rewards", icon: Award },
];

export const contactDetails = [
  { label: "Call Us", value: "+91 98765 43210", helper: "Mon-Sat 9am - 7pm", icon: Phone },
  { label: "Email Us", value: "info@horexasolutions.com", helper: "For general inquiries", icon: Mail },
  { label: "Headquarters", value: "Delhi NCR", helper: "Serving all major Indian cities", icon: MapPin },
];

export const standards = [
  { title: "NFPA 96 Aligned", description: "Cleaning and reporting practices designed around recognized exhaust safety standards.", icon: ShieldCheck },
  { title: "Eco-Conscious Chemicals", description: "Degreasers selected for effectiveness, staff safety, and controlled handling.", icon: Leaf },
  { title: "Detailed Reporting", description: "Photo-backed inspection records for audits, renewals, and internal reviews.", icon: FileCheck2 },
];
