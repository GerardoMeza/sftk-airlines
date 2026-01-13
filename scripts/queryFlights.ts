import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const origin = 'LAX';
  const destination = 'MIA';
  const dateStr = '2026-01-15';

  const start = new Date(dateStr + 'T00:00:00Z');
  const end = new Date(dateStr + 'T23:59:59Z');

  console.log(`Querying flights ${origin} -> ${destination} between ${start.toISOString()} and ${end.toISOString()}`);

  const flights = await prisma.flight.findMany({
    where: {
      departureAirport: origin,
      arrivalAirport: destination,
      departureTime: {
        gte: start,
        lte: end,
      },
    },
    orderBy: { departureTime: 'asc' },
  });

  if (flights.length === 0) {
    console.log('No flights found for that route/date.');
  } else {
    console.log(`${flights.length} flight(s) found:`);
    console.log(JSON.stringify(flights, null, 2));
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error('Error running query:', e);
  process.exit(1);
});
