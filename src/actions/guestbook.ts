"use server";

import { revalidatePath } from "next/cache";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function addGuestbookEntry(formData: FormData) {
  const name = formData.get("name") as string;
  const message = formData.get("message") as string;

  if (!name || !message) {
    throw new Error("Name and message are required.");
  }

  await prisma.guestbookEntry.create({
    data: {
      name,
      message,
    }
  });

  revalidatePath("/");
  revalidatePath("/gastbok");
}

export async function getGuestbookEntries() {
  const entries = await prisma.guestbookEntry.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10
  });
  
  return entries.map(row => ({
    id: row.id,
    name: row.name,
    message: row.message,
    created_at: row.createdAt
  }));
}

