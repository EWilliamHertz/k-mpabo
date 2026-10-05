import { NextResponse } from 'next/server';
import ical from 'node-ical';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

// This endpoint should ideally be triggered by a cron job
// or a secure webhook to periodically sync from an external iCal URL (e.g. Airbnb)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const override = searchParams.get('url');

    // Each Airbnb listing has its own iCal feed (stora = first floor, lilla = second floor)
    const feeds: { key: string; url?: string; accommodation: string | null }[] = override
      ? [{ key: 'custom', url: override, accommodation: null }]
      : [
          { key: 'stora', url: process.env.AIRBNB_ICAL_URL_STORA, accommodation: 'stora' },
          { key: 'lilla', url: process.env.AIRBNB_ICAL_URL_LILLA, accommodation: 'lilla' },
          { key: 'legacy', url: process.env.AIRBNB_ICAL_URL, accommodation: null },
        ];
    const activeFeeds = feeds.filter((f) => f.url);

    if (activeFeeds.length === 0) {
      return NextResponse.json({ error: 'Missing ical url parameter or AIRBNB_ICAL_URL_STORA/AIRBNB_ICAL_URL_LILLA environment variables' }, { status: 400 });
    }

    let syncedCount = 0;

    for (const feed of activeFeeds) {
      const webEvents = await ical.async.fromURL(feed.url!);

      for (const rawEvent of Object.values(webEvents)) {
        const event = rawEvent as any;
        if (event && event.type === 'VEVENT') {
          const rawUid = event.uid?.toString();
          if (!rawUid || !event.start || !event.end) continue;
          // Prefix with feed key so UIDs from different listings can't collide
          const uid = `${feed.key}:${rawUid}`;

          const startDate = new Date(event.start);
          const endDate = new Date(event.end);

          await prisma.booking.upsert({
            where: { externalReferenceId: uid },
            update: { startDate, endDate, status: 'blocked', source: 'airbnb', accommodation: feed.accommodation },
            create: { startDate, endDate, status: 'blocked', source: 'airbnb', accommodation: feed.accommodation, externalReferenceId: uid },
          });
          syncedCount++;
        }
      }
    }

    return NextResponse.json({ message: 'Sync successful', syncedCount });
  } catch (error) {
    console.error('Failed to sync calendar:', error);
    return NextResponse.json({ error: 'Failed to sync calendar' }, { status: 500 });
  }
}
