import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Create Prisma client with proper configuration
function createPrismaClient() {
  const databaseUrl = process.env.DATABASE_URL;
  
  // If using Accelerate, pass accelerateUrl
  if (databaseUrl && databaseUrl.includes("accelerate.prisma-data.net")) {
    return new PrismaClient({ accelerateUrl: databaseUrl });
  }
  
  // Otherwise use default config
  return new PrismaClient();
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
