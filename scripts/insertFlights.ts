import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const baseDate = new Date('2026-01-15T00:00:00Z');

  const flights = [
    {
      flightNumber: 'SFTK101',
      departureAirport: 'LAX',
      arrivalAirport: 'MIA',
      departureTime: new Date('2026-01-15T08:00:00Z'),
      arrivalTime: new Date('2026-01-15T16:30:00Z'), // 8.5 hours flight time
      airline: 'SFTK Airlines',
      stops: 0,
      availableSeats: 180,
      price: 320.00,
    },
    {
      flightNumber: 'SFTK102',
      departureAirport: 'LAX',
      arrivalAirport: 'MIA',
      departureTime: new Date('2026-01-15T12:00:00Z'),
      arrivalTime: new Date('2026-01-15T20:30:00Z'),
      airline: 'SFTK Airlines',
      stops: 0,
      availableSeats: 150,
      price: 280.00,
    },
    {
      flightNumber: 'SFTK103',
      departureAirport: 'LAX',
      arrivalAirport: 'MIA',
      departureTime: new Date('2026-01-15T18:00:00Z'),
      arrivalTime: new Date('2026-01-16T02:30:00Z'), // Next day arrival
      airline: 'SFTK Airlines',
      stops: 0,
      availableSeats: 200,
      price: 250.00,
    },
  ];

  console.log('Inserting 3 flights for LAX -> MIA on 2026-01-15...\n');

  for (const flight of flights) {
    const created = await prisma.flight.create({
      data: flight,
    });
    console.log(`✅ Created flight ${created.flightNumber} at ${created.departureTime.toISOString()}`);
  }

  console.log('\n🎉 All flights created successfully!');
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error('Error:', e);
  process.exit(1);
});
