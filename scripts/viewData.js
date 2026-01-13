const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('\n=== BOOKINGS ===');
  const bookings = await prisma.booking.findMany({
    include: {
      passenger: true,
    },
  });
  console.log(JSON.stringify(bookings, null, 2));

  console.log('\n=== PASSENGERS ===');
  const passengers = await prisma.passenger.findMany();
  console.log(JSON.stringify(passengers, null, 2));

  console.log('\n=== Total Bookings:', bookings.length);
  console.log('=== Total Passengers:', passengers.length);
  
  await prisma.$disconnect();
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  });