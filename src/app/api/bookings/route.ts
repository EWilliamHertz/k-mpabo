import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // ?accommodation=stora|lilla returns that unit's bookings (plus ones blocking both)
    const accommodation = new URL(request.url).searchParams.get('accommodation');
    const bookings = await prisma.booking.findMany({
      where: {
        status: { in: ['confirmed', 'blocked'] },
        ...(accommodation ? { OR: [{ accommodation }, { accommodation: null }] } : {}),
      },
      select: {
        id: true,
        startDate: true,
        endDate: true,
        status: true,
      }
    });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}
