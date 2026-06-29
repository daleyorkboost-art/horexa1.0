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
  hero: "/images/horexa-hero.webp",
  services: "/images/horexa-service-hero.webp",
  projects: "/images/horexa-projects.webp",
  blog: "/images/horexa-blog.webp",
  amc: "/images/horexa-amc.webp",
  contact: "/images/horexa-contact.webp",
};

export const services: Service[] = [
  {
    slug: "kitchen-exhaust-duct-cleaning",
    title: "Kitchen Exhaust Duct Cleaning",
    shortTitle: "Exhaust Duct Cleaning",
    description: "Remove grease deposits from hoods, ducts, risers and exhaust fans to reduce fire load and restore airflow.",
    longDescription:
      "Certified deep cleaning for commercial kitchen exhaust systems, designed to reduce grease-fire risk, improve extraction performance and maintain NFPA 96-aligned service records.",
    icon: Fan,
    image: images.services,
    benefits: ["Lower grease-fire risk", "Improved smoke extraction", "NFPA 96-aligned records", "Less strain on exhaust fans"],
    includes: [
      "Grease-depth inspection and risk grading",
      "Hood, duct, riser, filter and fan degreasing",
      "Access panel review for unreachable duct sections",
      "Timestamped before/after photo report",
    ],
    faqs: [
      {
        question: "How often should kitchen exhaust ducts be cleaned?",
        answer: "High-volume hotel, restaurant and cloud kitchen lines usually need monthly, quarterly or bi-monthly cleaning. Moderate-volume sites may follow a six-month schedule after inspection.",
      },
      {
        question: "Do you provide before and after photos?",
        answer: "Yes. AMC and project clients receive timestamped photos, service notes and corrective recommendations for audit files.",
      },
    ],
  },
  {
    slug: "hood-and-filter-cleaning",
    title: "Hood & Filter Cleaning",
    shortTitle: "Hood & Filter Cleaning",
    description: "Routine cleaning for canopy hoods, baffle filters, grease trays and visible extraction surfaces.",
    longDescription:
      "A scheduled service that keeps capture areas clean between major duct cleans, reduces daily fire load and helps kitchen teams maintain safer working conditions.",
    icon: Filter,
    image: images.services,
    benefits: ["Cleaner cooking lines", "Better capture efficiency", "Reduced smoke and odour hold", "Lower daily grease load"],
    includes: ["Filter removal and soak cleaning", "Canopy and plenum degreasing", "Grease tray clearing", "Final surface wipe-down and handover"],
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
    description: "Airflow checks and hygiene cleaning for ventilation assets serving kitchens and food preparation zones.",
    longDescription:
      "Inspection-led ventilation hygiene for hotels, hospitals, cafeterias and cloud kitchens where airflow, odour control and staff comfort affect daily operations.",
    icon: Fan,
    image: images.hero,
    benefits: ["Balanced extraction", "Improved staff comfort", "Odour migration control", "Early equipment issue detection"],
    includes: ["Visible airflow inspection", "Grille and vent surface cleaning", "Fan and blower condition checks", "Maintenance recommendations by priority"],
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
    description: "Scheduled cleaning and disinfection for overhead and underground water tanks in food-service facilities.",
    longDescription:
      "Water tank cleaning for hospitality and institutional kitchens where stored water quality affects cooking, dishwashing, staff areas and guest safety expectations.",
    icon: Droplets,
    image: images.contact,
    benefits: ["Cleaner stored water", "Sediment and sludge removal", "Odour and biofilm control", "Documented hygiene cycle"],
    includes: ["Tank isolation and draining support", "Sludge and sediment removal", "Internal wall scrubbing", "Food-safe disinfection rinse"],
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
    description: "Inspection and installation support for duct access points required for complete internal cleaning.",
    longDescription:
      "Access panel planning for ductwork with blind sections, helping engineering teams meet cleaning standards and avoid hidden grease accumulation.",
    icon: Wrench,
    image: images.projects,
    benefits: ["Better internal duct reach", "More complete grease removal", "Inspection-ready ductwork", "Reduced hidden-risk zones"],
    includes: ["Duct access assessment", "Panel placement recommendations", "Installation coordination", "Inspection checklist for future visits"],
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
    description: "Annual maintenance programs with planned visits, compliance records, priority support and service history.",
    longDescription:
      "AMC contracts help operators avoid missed cleaning cycles, maintain audit-ready documents and keep fire-risk reduction work on a predictable calendar.",
    icon: ClipboardCheck,
    image: images.amc,
    benefits: ["Priority scheduling", "Digital report archive", "Renewal and audit reminders", "Dedicated service coordination"],
    includes: ["Annual service calendar", "Inspection report library", "Before/after photo records", "Compliance documentation and visit summaries"],
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
    description: "Grease-load inspection, cleaning recommendations and documentation for high-risk cooking environments.",
    longDescription:
      "A safety-focused assessment and maintenance layer for kitchens with tandoors, fryers, grills, woks and long operating hours.",
    icon: Flame,
    image: images.blog,
    benefits: ["Lower ignition risk", "Prioritised corrective actions", "Audit-ready evidence", "Safer kitchen teams"],
    includes: ["Grease-risk inspection", "Fire safety recommendations", "Photo evidence", "Follow-up maintenance plan"],
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
  { title: "Safety First", description: "Every visit starts with access, isolation, PPE and fire-risk checks before cleaning begins.", icon: Target },
  { title: "Audit Discipline", description: "Reports, photos and service logs are written for engineering teams, insurers and inspectors.", icon: Sparkles },
  { title: "Field Ownership", description: "Supervisors close each site with a handover, findings summary and next-service recommendation.", icon: Users },
  { title: "Measured Maintenance", description: "Grease load, airflow issues and overdue assets are tracked so service frequency stays realistic.", icon: Gauge },
  { title: "Transparent Advice", description: "Clients get clear recommendations without unnecessary upselling or vague compliance claims.", icon: Handshake },
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
  { value: 96, suffix: "%", label: "Report Completion", description: "AMC visits include photo-backed service documentation." },
  { value: 24, suffix: "h", label: "Critical Response", description: "Priority inspection windows for active AMC clients." },
  { value: 7, suffix: "+", label: "Service Markets", description: "Coverage across major Indian hospitality hubs." },
  { value: 180, suffix: "+", label: "Maintained Assets", description: "Hoods, ducts, tanks and ventilation assets tracked in service calendars." },
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
    business: "Taj Business Hotel",
    city: "Bangalore",
  },
];

export const amcPlans = [
  {
    name: "Compliance Care",
    audience: "Restaurants, cafes and cafeterias",
    frequency: "Quarterly Service",
    description: "A structured quarterly maintenance plan for kitchens that need dependable hygiene records and predictable service dates.",
    features: ["Quarterly grease-load inspection", "Hood, filter and duct cleaning", "Before/after photo report", "Audit reminder emails"],
    recommended: false,
  },
  {
    name: "Risk Control AMC",
    audience: "Hotels, hospitals and cloud kitchens",
    frequency: "Bi-Monthly Service",
    description: "Higher-frequency maintenance for kitchens with fryers, grills, tandoors, long operating hours and internal audit pressure.",
    features: ["Bi-monthly exhaust inspection", "Priority night scheduling", "Portal-ready report archive", "WhatsApp service desk"],
    recommended: true,
  },
  {
    name: "Enterprise Assurance",
    audience: "Chains & multi-location brands",
    frequency: "Custom Schedule",
    description: "A multi-site program with central reporting, local execution teams and consolidated compliance visibility.",
    features: ["Multi-city service calendar", "Dedicated account coordinator", "Custom compliance dashboard", "Monthly executive summaries"],
    recommended: false,
  },
];

export const projects = [
  {
    title: "Kitchen Exhaust Deep Cleaning - Taj Business Hotel",
    location: "Bangalore CBD",
    duration: "2 Nights",
    kitchenType: "Hotel",
    greaseLevel: "Heavy" as const,
    category: "Duct Cleaning",
    services: ["Exhaust Cleaning", "AMC Onboarding"],
    image: images.projects,
  },
  {
    title: "Cloud Kitchen Ventilation Hygiene - Whitefield",
    location: "Whitefield, Bangalore",
    duration: "1 Night",
    kitchenType: "Cloud Kitchen",
    greaseLevel: "Medium" as const,
    category: "Ventilation",
    services: ["Ventilation Hygiene", "Filter Cleaning"],
    image: images.hero,
  },
  {
    title: "Restaurant Hood & Filter Recovery - Lower Parel",
    location: "Mumbai",
    duration: "8 Hours",
    kitchenType: "Restaurant",
    greaseLevel: "Heavy" as const,
    category: "Hood & Filter",
    services: ["Hood Cleaning", "Filters"],
    image: images.blog,
  },
  {
    title: "Hospital Kitchen Compliance Audit - Delhi NCR",
    location: "Gurugram",
    duration: "3 Months",
    kitchenType: "Hospital",
    greaseLevel: "Light" as const,
    category: "AMC Projects",
    services: ["AMC", "Compliance Audit"],
    image: images.amc,
  },
];

export const blogPosts = [
  {
    title: "How Often Should Kitchen Exhaust Ducts Be Cleaned?",
    category: "Exhaust Systems",
    date: "June 18, 2026",
    readTime: "6 min read",
    excerpt: "A practical frequency guide for hotels, restaurants, cloud kitchens and cafeterias based on grease load and operating hours.",
    image: images.blog,
  },
  {
    title: "NFPA 96 Compliance Checklist for Restaurants",
    category: "Compliance & Standards",
    date: "June 12, 2026",
    readTime: "8 min read",
    excerpt: "What owners and facility teams should keep ready before exhaust inspections, fire audits and insurance reviews.",
    image: images.hero,
  },
  {
    title: "Top Causes of Commercial Kitchen Fires",
    category: "Fire Safety",
    date: "June 04, 2026",
    readTime: "5 min read",
    excerpt: "Grease buildup, poor access, damaged fans and missed service cycles are common preventable risks.",
    image: images.services,
  },
  {
    title: "Why AMC Contracts Reduce Operational Risks",
    category: "Maintenance Tips",
    date: "May 29, 2026",
    readTime: "4 min read",
    excerpt: "How planned maintenance helps avoid rushed audit preparation, unexpected shutdowns and undocumented service gaps.",
    image: images.amc,
  },
  {
    title: "Ventilation Hygiene Best Practices for Cloud Kitchens",
    category: "Kitchen Hygiene",
    date: "May 21, 2026",
    readTime: "7 min read",
    excerpt: "Practical maintenance checks for high-density cooking lines where odour and airflow issues escalate quickly.",
    image: images.projects,
  },
  {
    title: "What Should Be Included in a Kitchen Exhaust Cleaning Report?",
    category: "Case Studies",
    date: "May 14, 2026",
    readTime: "5 min read",
    excerpt: "The records operations teams should expect after a professional exhaust cleaning visit.",
    image: images.contact,
  },
];

export const jobs = [
  { title: "Field Service Supervisor", location: "Delhi NCR", type: "Full Time", experience: "3-5 Years", status: "Open" },
  { title: "Kitchen Exhaust Cleaning Technician", location: "Bangalore", type: "Full Time", experience: "1-3 Years", status: "Open" },
  { title: "AMC Sales Executive", location: "Mumbai", type: "Full Time", experience: "2-4 Years", status: "Open" },
  { title: "Operations Coordinator", location: "Hyderabad", type: "Full Time", experience: "2-4 Years", status: "Open" },
  { title: "Regional Key Account Manager", location: "Pan India", type: "Full Time", experience: "5+ Years", status: "Closed" },
];

export const careerBenefits = [
  { title: "Field Safety Training", icon: Award },
  { title: "Health & Accident Cover", icon: HeartPulse },
  { title: "Technical Certification Support", icon: GraduationCap },
  { title: "Clear Growth Tracks", icon: Sparkles },
  { title: "PPE & Site Safety Systems", icon: ShieldCheck },
  { title: "Performance Recognition", icon: Award },
];

export const contactDetails = [
  { label: "Call Us", value: "+91 98765 43210", helper: "Mon-Sat 9am - 7pm", icon: Phone },
  { label: "Email Us", value: "info@horexasolutions.com", helper: "For general inquiries", icon: Mail },
  { label: "Headquarters", value: "Delhi NCR", helper: "Serving all major Indian cities", icon: MapPin },
];

export const standards = [
  { title: "NFPA 96 Aligned", description: "Cleaning scopes and service records structured around recognized commercial exhaust safety standards.", icon: ShieldCheck },
  { title: "Controlled Chemical Handling", description: "Professional degreasers selected for grease removal, staff safety and responsible wastewater control.", icon: Leaf },
  { title: "Audit-Ready Reporting", description: "Photo-backed inspection records for fire audits, insurance reviews and internal engineering checks.", icon: FileCheck2 },
];
