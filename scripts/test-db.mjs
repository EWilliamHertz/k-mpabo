import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

async function initDb() {
  try {
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
    console.log("Booking requests table ensured successfully");
    process.exit(0);
  } catch (err) {
    console.error("DB connection error: ", err.message);
    process.exit(1);
  }
}

initDb();
