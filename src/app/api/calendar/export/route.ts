import { NextResponse } from 'next/server';
import ical from 'ical-generator';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const calendar = ical({
      name: 'Kåmpabo Availability',
      timezone: 'Europe/Stockholm',
    });

    const bookings = await prisma.booking.findMany({
      where: {
        status: { in: ['confirmed', 'blocked'] },
      },
    });

    bookings.forEach((booking: any) => {
      calendar.createEvent({
        start: booking.startDate,
        end: booking.endDate,
        summary: booking.source === 'kampabo.se' ? 'Kåmpabo Booking' : 'Blocked',
        description: `Source: ${booking.source}`,
        url: 'https://kampabo.se',
      });
    });

    return new NextResponse(calendar.toString(), {
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': 'attachment; filename="kampabo-calendar.ics"',
      },
    });
  } catch (error) {
    console.error('Failed to export calendar:', error);
    return NextResponse.json({ error: 'Failed to export calendar' }, { status: 500 });
  }
}
