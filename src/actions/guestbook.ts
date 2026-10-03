"use server";

import { revalidatePath } from "next/cache";
import postgres from 'postgres';

// Ensure the database connection handles the pg pooler query params automatically
const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

export async function addGuestbookEntry(formData: FormData) {
  const name = formData.get("name") as string;
  const message = formData.get("message") as string;

  if (!name || !message) {
    throw new Error("Name and message are required.");
  }

  await sql`
    INSERT INTO guestbook_entries (name, message)
    VALUES (${name}, ${message})
  `;

  revalidatePath("/");
  revalidatePath("/gastbok");
}

export async function getGuestbookEntries() {
  const entries = await sql`
    SELECT * FROM guestbook_entries
    ORDER BY created_at DESC
    LIMIT 10
  `;
  
  return entries;
}
