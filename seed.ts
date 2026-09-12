import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Password ko hash karein (secure tarike se)
  const hashedPassword = await bcrypt.hash("password", 10);

  const user = await prisma.user.upsert({
    where: { email: "test@test.com" },
    update: {},
    create: {
      email: "test@test.com",
      name: "Test User",
      password: hashedPassword, // <--- YEH LINE SABSE ZARURI HAI
    },
  });

  console.log("✅ User created successfully:", user.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });