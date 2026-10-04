"use server";

import postgres from 'postgres';

export async function submitBooking(formData: FormData) {
  // Ensure the database connection handles the pg pooler query params automatically
  const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const dates = formData.get("dates") as string;
  const guests = Number(formData.get("guests")) || 0;
  const message = formData.get("message") as string;

  if (!name || !email) {
    throw new Error("Name and email are required.");
  }

  // Create table if it doesn't exist to ensure smooth operation with NeonDB
  await sql`
    CREATE TABLE IF NOT EXISTS booking_requests (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      dates VARCHAR(255),
      guests INTEGER,
      message TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await sql`
    INSERT INTO booking_requests (name, email, dates, guests, message)
    VALUES (${name}, ${email}, ${dates}, ${guests}, ${message})
  `;

  return { success: true };
}
