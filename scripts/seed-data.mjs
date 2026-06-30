import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

function credentials() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  }

  return {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  };
}

if (!getApps().length) {
  initializeApp({ credential: cert(credentials()) });
}

const db = getFirestore();

const services = [
  {
    slug: "kitchen-exhaust-duct-cleaning",
    title: "Kitchen Exhaust Duct Cleaning",
    category: "Exhaust Systems",
    summary: "Remove grease deposits from hoods, ducts, risers and exhaust fans.",
    description: "Certified cleaning for commercial kitchen exhaust systems with photo-backed reporting.",
    icon: "Fan",
    status: "PUBLISHED",
    sortOrder: 1,
  },
  {
    slug: "hood-and-filter-cleaning",
    title: "Hood & Filter Cleaning",
    category: "Kitchen Hygiene",
    summary: "Routine cleaning for canopy hoods, baffle filters and grease trays.",
    description: "Scheduled cleaning to lower daily grease load and improve capture efficiency.",
    icon: "Filter",
    status: "PUBLISHED",
    sortOrder: 2,
  },
  {
    slug: "amc-contracts",
    title: "AMC Contracts",
    category: "AMC",
    summary: "Annual maintenance programs with planned visits and compliance records.",
    description: "Managed service calendars for audit-ready commercial kitchens.",
    icon: "ClipboardCheck",
    status: "PUBLISHED",
    sortOrder: 3,
  },
];

const amcPlans = [
  {
    slug: "quarterly-amc",
    name: "Quarterly AMC",
    audience: "Restaurants, cafes and cafeterias",
    frequency: "Every 3 months",
    description: "A structured quarterly maintenance plan for dependable hygiene records.",
    features: ["Quarterly inspection", "Photo report", "Audit reminders"],
    recommended: false,
    status: "PUBLISHED",
  },
  {
    slug: "half-yearly-amc",
    name: "Half-Yearly AMC",
    audience: "Hotels and cloud kitchens",
    frequency: "Every 6 months",
    description: "Planned service support for high-volume commercial kitchens.",
    features: ["Biannual inspection", "Priority scheduling", "Digital records"],
    recommended: true,
    status: "PUBLISHED",
  },
];

const settings = [
  {
    key: "contact",
    value: {
      phone: "+91 98765 43210",
      email: "info@horexasolutions.com",
      hours: "Mon-Sat 9:00 AM - 7:00 PM",
      headquarters: "Delhi NCR",
      serviceAreas: ["Delhi NCR", "Mumbai", "Bangalore", "Hyderabad", "Pune", "Chennai", "All Major Cities"],
    },
  },
];

async function upsertBySlug(collection, item) {
  await db.collection(collection).doc(item.slug).set(
    {
      ...item,
      updatedAt: FieldValue.serverTimestamp(),
      createdAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  );
}

for (const service of services) await upsertBySlug("services", service);
for (const plan of amcPlans) await upsertBySlug("amcPlans", plan);
for (const setting of settings) {
  await db.collection("settings").doc(setting.key).set(
    { ...setting, updatedAt: FieldValue.serverTimestamp(), createdAt: FieldValue.serverTimestamp() },
    { merge: true },
  );
}

console.log("Seeded Firestore public content");
