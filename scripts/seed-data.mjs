import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5432/horexa",
  }),
});

const services = [
  {
    slug: "kitchen-exhaust-duct-cleaning",
    title: "Kitchen Exhaust Duct Cleaning",
    summary: "Deep degreasing for ducts, hoods, filters, fans, and exhaust pathways.",
    description:
      "End-to-end kitchen exhaust duct cleaning for hotels, restaurants, cloud kitchens, hospitals, and institutional kitchens. The service covers inspection, grease removal, hood and filter cleaning, fan cleaning, and post-cleaning documentation.",
    category: "Exhaust Systems",
    imageUrl: "/images/service-exhaust-hero.webp",
    sortOrder: 1,
    status: "PUBLISHED",
    seoTitle: "Kitchen Exhaust Duct Cleaning India | Horexa Solutions",
    seoDescription: "Professional commercial kitchen exhaust duct cleaning for fire-risk reduction and compliance.",
  },
  {
    slug: "hood-and-filter-cleaning",
    title: "Hood & Filter Cleaning",
    summary: "Routine cleaning for grease-laden commercial kitchen hoods and filters.",
    description:
      "Scheduled hood and filter cleaning keeps kitchen ventilation efficient, reduces odour, and lowers grease-fire risk between deep duct cleaning cycles.",
    category: "Kitchen Hygiene",
    imageUrl: "/images/kitchen-bg.webp",
    sortOrder: 2,
    status: "PUBLISHED",
  },
  {
    slug: "ventilation-hygiene",
    title: "Ventilation Hygiene",
    summary: "Airflow and hygiene maintenance for high-volume hospitality kitchens.",
    description:
      "Inspection-led ventilation hygiene services for duct pathways, extraction points, fans, and airflow-critical surfaces.",
    category: "Ventilation",
    imageUrl: "/images/hero-workers.webp",
    sortOrder: 3,
    status: "PUBLISHED",
  },
  {
    slug: "water-tank-cleaning",
    title: "Water Tank Cleaning",
    summary: "Safe water storage cleaning for commercial kitchens and facilities.",
    description:
      "Mechanical and chemical water tank cleaning support for hospitality and institutional facilities that need hygienic water storage.",
    category: "Facility Hygiene",
    imageUrl: "/images/access-panel.webp",
    sortOrder: 4,
    status: "PUBLISHED",
  },
  {
    slug: "access-panel-installation",
    title: "Access Panel Installation",
    summary: "Inspection access upgrades for duct systems with limited serviceability.",
    description:
      "Access panel planning and installation so exhaust ducts can be inspected, cleaned, and documented properly during future services.",
    category: "Compliance",
    imageUrl: "/images/access-panel.webp",
    sortOrder: 5,
    status: "PUBLISHED",
  },
  {
    slug: "fire-risk-reduction-support",
    title: "Fire Risk Reduction Support",
    summary: "Kitchen fire-risk support aligned with hygiene and compliance practices.",
    description:
      "Risk-focused inspection, cleaning recommendations, documentation, and maintenance planning for commercial kitchens with heavy grease load.",
    category: "Fire Safety",
    imageUrl: "/images/blog-featured.webp",
    sortOrder: 6,
    status: "PUBLISHED",
  },
];

const amcPlans = [
  {
    slug: "quarterly-amc",
    name: "Quarterly AMC",
    audience: "High-volume restaurants, hotels, and cloud kitchens",
    frequency: "Every 3 months",
    description: "Quarterly hygiene and compliance support for kitchens with heavy daily operations.",
    features: ["Quarterly scheduled inspections", "Priority service calendar", "Before/after documentation", "Compliance reminders"],
    priceLabel: "Custom quote",
    recommended: true,
  },
  {
    slug: "half-yearly-amc",
    name: "Half-Yearly AMC",
    audience: "Restaurants, cafes, and mid-volume kitchens",
    frequency: "Every 6 months",
    description: "Balanced maintenance coverage for kitchens that need predictable compliance documentation.",
    features: ["Two scheduled services per year", "Inspection report library", "Phone support", "Renewal reminders"],
    priceLabel: "Custom quote",
    recommended: false,
  },
  {
    slug: "annual-amc",
    name: "Annual AMC",
    audience: "Small kitchens and periodic maintenance requirements",
    frequency: "Once per year",
    description: "Annual inspection and cleaning support for lower-volume facilities.",
    features: ["One annual deep service", "Compliance report", "Recommended action plan", "Renewal support"],
    priceLabel: "Custom quote",
    recommended: false,
  },
];

const projects = [
  {
    slug: "luxury-hotel-exhaust-restoration-delhi",
    title: "Luxury Hotel Exhaust Restoration",
    location: "Delhi NCR",
    duration: "2 nights",
    kitchenType: "Five-star hotel",
    greaseLevel: "Heavy",
    category: "Duct Cleaning",
    beforeImageUrl: "/images/blog-featured.webp",
    afterImageUrl: "/images/duct-before-after.webp",
    galleryUrls: ["/images/main-hero-bg.webp", "/images/service-exhaust-hero.webp"],
    description: "Night-shift exhaust duct cleaning and post-service documentation for a high-volume hotel kitchen.",
    status: "PUBLISHED",
    featured: true,
  },
  {
    slug: "cloud-kitchen-ventilation-cleanup-bangalore",
    title: "Cloud Kitchen Ventilation Cleanup",
    location: "Bangalore",
    duration: "1 day",
    kitchenType: "Cloud kitchen",
    greaseLevel: "Medium",
    category: "Ventilation",
    beforeImageUrl: "/images/main-hero-bg-alt.webp",
    afterImageUrl: "/images/hero-workers.webp",
    galleryUrls: ["/images/kitchen-bg.webp"],
    description: "Ventilation hygiene service for a multi-brand cloud kitchen preparing for internal safety audit.",
    status: "PUBLISHED",
    featured: true,
  },
];

const blogPosts = [
  {
    slug: "why-kitchen-exhaust-cleaning-is-critical",
    title: "Why Kitchen Exhaust Duct Cleaning Is Critical for Safety and Compliance",
    excerpt: "Grease accumulation in exhaust systems is one of the most overlooked fire risks in commercial kitchens.",
    content:
      "Commercial kitchens operate under heat, pressure, and grease-heavy conditions. Regular duct cleaning reduces fire risk, improves airflow, and supports audit-ready documentation for operators.",
    category: "Exhaust Systems",
    tags: ["kitchen hygiene", "fire safety", "compliance"],
    imageUrl: "/images/blog-featured.webp",
    readTime: "5 min",
    status: "PUBLISHED",
    featured: true,
    publishedAt: new Date("2024-05-15"),
    seoTitle: "Kitchen Exhaust Cleaning Safety Guide | Horexa",
    seoDescription: "Learn why commercial kitchen exhaust duct cleaning matters for safety, airflow, and compliance.",
  },
  {
    slug: "how-amc-plans-help-restaurant-compliance",
    title: "How AMC Plans Help Restaurants Stay Audit Ready",
    excerpt: "A structured maintenance contract turns kitchen hygiene from an emergency expense into a planned operation.",
    content:
      "AMC plans help restaurants schedule cleaning, maintain documentation, reduce operational surprises, and respond quickly to audit requirements.",
    category: "Maintenance Tips",
    tags: ["AMC", "restaurant operations", "compliance"],
    imageUrl: "/images/blog-art-1.webp",
    readTime: "4 min",
    status: "PUBLISHED",
    featured: false,
    publishedAt: new Date("2024-05-22"),
  },
];

const careers = [
  {
    slug: "field-service-engineer-delhi-ncr",
    title: "Field Service Engineer",
    location: "Delhi NCR",
    type: "Full Time",
    experience: "2-4 Years",
    description: "Lead commercial kitchen hygiene service execution, site coordination, and inspection documentation.",
    status: "ACTIVE",
  },
  {
    slug: "kitchen-duct-cleaning-technician-bangalore",
    title: "Kitchen Duct Cleaning Technician",
    location: "Bangalore",
    type: "Full Time",
    experience: "1-3 Years",
    description: "Perform duct, hood, filter, and ventilation cleaning under safety-first operating procedures.",
    status: "ACTIVE",
  },
  {
    slug: "sales-executive-mumbai",
    title: "Sales Executive",
    location: "Mumbai",
    type: "Full Time",
    experience: "1-3 Years",
    description: "Build relationships with hotel, restaurant, and cloud kitchen operators for inspection and AMC inquiries.",
    status: "ACTIVE",
  },
];

const seoRoutes = [
  ["/", "Kitchen Exhaust Duct Cleaning India | Horexa Solutions", "Commercial kitchen hygiene, exhaust duct cleaning, and AMC services for hospitality spaces."],
  ["/services", "Commercial Kitchen Hygiene Services | Horexa", "Explore duct cleaning, hood cleaning, ventilation hygiene, water tank cleaning, and AMC services."],
  ["/amc-plans", "Kitchen AMC Plans for Restaurants and Hotels | Horexa", "Annual maintenance contract plans for commercial kitchen compliance and safety."],
  ["/contact", "Request Kitchen Hygiene Inspection | Horexa", "Contact Horexa Solutions for inspection requests across major Indian cities."],
];

try {
  for (const service of services) {
    await prisma.service.upsert({ where: { slug: service.slug }, update: service, create: service });
  }

  for (const plan of amcPlans) {
    await prisma.aMCPlan.upsert({ where: { slug: plan.slug }, update: plan, create: plan });
  }

  for (const project of projects) {
    await prisma.project.upsert({ where: { slug: project.slug }, update: project, create: project });
  }

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({ where: { slug: post.slug }, update: post, create: post });
  }

  for (const career of careers) {
    await prisma.career.upsert({ where: { slug: career.slug }, update: career, create: career });
  }

  await prisma.testimonial.upsert({
    where: { id: "seed-testimonial-taj-business" },
    update: {},
    create: {
      id: "seed-testimonial-taj-business",
      name: "Operations Manager",
      business: "Taj Business Hotel",
      city: "Bangalore",
      quote: "Horexa helped us bring our kitchen exhaust documentation and cleaning calendar into a disciplined routine.",
      rating: 5,
      status: "PUBLISHED",
      featured: true,
      sortOrder: 1,
    },
  });

  for (const [route, title, description] of seoRoutes) {
    await prisma.seoMetadata.upsert({
      where: { route },
      update: { title, description, status: "ACTIVE" },
      create: { route, title, description, status: "ACTIVE" },
    });
  }

  await prisma.websiteSetting.upsert({
    where: { key: "contact" },
    update: {
      value: {
        phone: "+91 98765 43210",
        email: "info@horexasolutions.com",
        hours: "Mon-Sat 9:00 AM - 7:00 PM",
        serviceAreas: ["Delhi NCR", "Mumbai", "Bangalore", "Hyderabad", "Pune", "Chennai", "All Major Cities"],
      },
    },
    create: {
      key: "contact",
      value: {
        phone: "+91 98765 43210",
        email: "info@horexasolutions.com",
        hours: "Mon-Sat 9:00 AM - 7:00 PM",
        serviceAreas: ["Delhi NCR", "Mumbai", "Bangalore", "Hyderabad", "Pune", "Chennai", "All Major Cities"],
      },
    },
  });

  const quarterly = await prisma.aMCPlan.findUnique({ where: { slug: "quarterly-amc" } });
  const clientUser = await prisma.user.upsert({
    where: { email: "client@example.com" },
    update: { name: "Demo Client", role: "CLIENT", isActive: true },
    create: { email: "client@example.com", name: "Demo Client", role: "CLIENT", isActive: true },
  });

  const client = await prisma.client.upsert({
    where: { userId: clientUser.id },
    update: {
      companyName: "Taj Business Hotel",
      contactName: "Facility Manager",
      phone: "+91 98765 43210",
      email: "client@example.com",
      city: "Bangalore",
      portalEnabled: true,
      amcPlanId: quarterly?.id,
      status: "ACTIVE",
    },
    create: {
      userId: clientUser.id,
      companyName: "Taj Business Hotel",
      contactName: "Facility Manager",
      phone: "+91 98765 43210",
      email: "client@example.com",
      city: "Bangalore",
      portalEnabled: true,
      amcPlanId: quarterly?.id,
      status: "ACTIVE",
    },
  });

  await prisma.inspectionReport.upsert({
    where: { inspectionId: "HX-INS-2024-001" },
    update: {},
    create: {
      clientId: client.id,
      inspectionId: "HX-INS-2024-001",
      type: "Quarterly AMC Inspection",
      inspector: "Horexa Operations Team",
      score: 94,
      status: "COMPLETED",
      completedAt: new Date("2024-05-20"),
      reportUrl: "/sample-reports/hx-ins-2024-001.pdf",
      recommendations: "Maintain quarterly cleaning frequency and add an access panel near the rear duct bend.",
    },
  });

  console.log("Seeded Horexa backend baseline data.");
} finally {
  await prisma.$disconnect();
}
