import { PrismaClient } from "@prisma/client";

// Instantiate Prisma Client
const PrismaDB = new PrismaClient();

// Export Prisma Client
export default PrismaDB;
