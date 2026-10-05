import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
prisma.siteImage.count().then(c => { console.log("Count:", c); prisma.$disconnect(); });
