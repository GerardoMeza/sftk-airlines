import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const ADMIN_SEED_TOKEN = process.env.ADMIN_SEED_TOKEN;

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (!auth || auth !== `Bearer ${ADMIN_SEED_TOKEN}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const flights = await req.json();
    if (!Array.isArray(flights)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }

    let created = 0;
    for (const flight of flights) {
      // Only create if flightNumber does not exist
      const exists = await prisma.flight.findUnique({ where: { flightNumber: flight.flightNumber } });
      if (!exists) {
        await prisma.flight.create({ data: flight });
        created++;
      }
    }

    return NextResponse.json({ ok: true, created });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
