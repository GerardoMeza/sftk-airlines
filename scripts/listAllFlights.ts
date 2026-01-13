import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('=== All Flights in Database ===\n');
  
  const flights = await prisma.flight.findMany({
    orderBy: { createdAt: 'desc' },
  });

  if (flights.length === 0) {
    console.log('No flights found in database.');
  } else {
    flights.forEach((flight) => {
      console.log(`Flight: ${flight.flightNumber}`);
      console.log(`  From: ${flight.departureAirport} → To: ${flight.arrivalAirport}`);
      console.log(`  Departure: ${flight.departureTime.toISOString()}`);
      console.log(`  Available Seats: ${flight.availableSeats}`);
      console.log(`  Price: $${flight.price}`);
      console.log('---');
    });
  }

  console.log(`\nTotal flights: ${flights.length}`);

  // Get unique airports
  const departures = new Set(flights.map(f => f.departureAirport));
  const arrivals = new Set(flights.map(f => f.arrivalAirport));
  
  console.log(`\nUnique departure airports: ${Array.from(departures).join(', ')}`);
  console.log(`Unique arrival airports: ${Array.from(arrivals).join(', ')}`);

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error('Error:', e);
  process.exit(1);
});
