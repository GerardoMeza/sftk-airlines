import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // For Prisma Accelerate URLs (prisma+postgres://)
    // the accelerateUrl will be configured automatically from DATABASE_URL
    ...(process.env.DATABASE_URL?.includes("accelerate.prisma-data.net")
      ? { accelerateUrl: process.env.DATABASE_URL }
      : {}),
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
