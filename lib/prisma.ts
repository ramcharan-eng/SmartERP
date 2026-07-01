import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

console.log("company =", prisma.company);
console.log(Object.keys(prisma));

export { prisma };