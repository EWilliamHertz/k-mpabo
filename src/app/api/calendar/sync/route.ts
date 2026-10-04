import { NextResponse } from 'next/server';
import ical from 'node-ical';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// This endpoint should ideally be triggered by a cron job
// or a secure webhook to periodically sync from an external iCal URL (e.g. Airbnb)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const icalUrl = searchParams.get('url');

    if (!icalUrl) {
      return NextResponse.json({ error: 'Missing ical url parameter' }, { status: 400 });
    }

    const webEvents = await ical.async.fromURL(icalUrl);
    
    let syncedCount = 0;

    for (const rawEvent of Object.values(webEvents)) {
      const event = rawEvent as any;
      if (event && event.type === 'VEVENT') {
        const uid = event.uid?.toString();
        if (!uid || !event.start || !event.end) continue;

        // Ensure date types
        const startDate = new Date(event.start);
        const endDate = new Date(event.end);

        // Upsert booking based on external uid
        await prisma.booking.upsert({
          where: { externalReferenceId: uid },
          update: {
            startDate,
            endDate,
            status: 'blocked',
            source: 'external_ical',
          },
          create: {
            startDate,
            endDate,
            status: 'blocked',
            source: 'external_ical',
            externalReferenceId: uid,
          },
        });
        syncedCount++;
      }
    }

    return NextResponse.json({ message: 'Sync successful', syncedCount });
  } catch (error) {
    console.error('Failed to sync calendar:', error);
    return NextResponse.json({ error: 'Failed to sync calendar' }, { status: 500 });
  }
}
