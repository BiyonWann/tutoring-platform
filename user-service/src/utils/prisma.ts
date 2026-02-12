import { PrismaClient } from '@prisma/client';

// Prisma reads DATABASE_URL from .env automatically via schema.prisma
const prisma = new PrismaClient();

export default prisma;