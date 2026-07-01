import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: {
      email: "admin@gmail.com",
    },
    update: {},
    create: {
      name: "Administrator",
      email: "admin@gmail.com",
      password,
      role: "ADMIN",
    },
  });

  console.log("Admin user created.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });