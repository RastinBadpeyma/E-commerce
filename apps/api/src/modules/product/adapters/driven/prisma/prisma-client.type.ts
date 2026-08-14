import { PrismaClient } from "generated/prisma/client";

export type PrismaClientLike =
  PrismaClient | Parameters<
    PrismaClient['$transaction']
  >[0];