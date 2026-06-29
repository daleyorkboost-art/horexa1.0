import { PrismaClient, UserRole } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hash } from "bcryptjs";

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5432/horexa",
  }),
});

const email = process.env.SEED_ADMIN_EMAIL?.toLowerCase().trim();
const password = process.env.SEED_ADMIN_PASSWORD;
const name = process.env.SEED_ADMIN_NAME?.trim() || "Horexa Super Admin";

if (!email || !password) {
  console.error("Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD before running this script.");
  process.exit(1);
}

if (password.length < 12) {
  console.error("SEED_ADMIN_PASSWORD must be at least 12 characters.");
  process.exit(1);
}

try {
  const passwordHash = await hash(password, 12);
  const user = await prisma.user.upsert({
    where: { email },
    update: {
      name,
      passwordHash,
      role: UserRole.SUPER_ADMIN,
      isActive: true,
    },
    create: {
      email,
      name,
      passwordHash,
      role: UserRole.SUPER_ADMIN,
      isActive: true,
      adminProfile: {
        create: {
          title: "Super Admin",
          department: "Operations",
          permissions: ["*"],
        },
      },
    },
  });

  console.log(`Seeded super admin: ${user.email}`);
} finally {
  await prisma.$disconnect();
}
