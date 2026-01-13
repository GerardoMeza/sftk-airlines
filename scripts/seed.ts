import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import crypto from 'crypto';

const prisma = new PrismaClient();

// Hash password using SHA-256
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function main() {
  try {
    console.log('🌱 Seeding database...');

    // Clear existing data
    await prisma.booking.deleteMany({});
    await prisma.flight.deleteMany({});
    await prisma.user.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create users
    const users = [
      {
        email: 'john.doe@example.com',
        password: hashPassword('password123'),
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1234567890',
      },
      {
        email: 'jane.smith@example.com',
        password: hashPassword('password456'),
        firstName: 'Jane',
        lastName: 'Smith',
        phone: '+1234567891',
      },
      {
        email: 'carlos.rodriguez@example.com',
        password: hashPassword('password789'),
        firstName: 'Carlos',
        lastName: 'Rodriguez',
        phone: '+1234567892',
      },
      {
        email: 'maria.garcia@example.com',
        password: hashPassword('test123'),
        firstName: 'Maria',
        lastName: 'Garcia',
        phone: '+1234567893',
      },
      {
        email: 'michael.johnson@example.com',
        password: hashPassword('test456'),
        firstName: 'Michael',
        lastName: 'Johnson',
        phone: '+1234567894',
      },
    ];

    const createdUsers = await Promise.all(
      users.map(user => prisma.user.create({ data: user }))
    );

    console.log(`✅ Created ${createdUsers.length} users`);

    // Create flights with varied routes and times
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const flights = [
      // Domestic flights
      {
        flightNumber: 'SFT101',
        departureAirport: 'New York (JFK)',
        arrivalAirport: 'Los Angeles (LAX)',
        departureTime: new Date(tomorrow.getTime() + 8 * 60 * 60 * 1000), // 8 AM tomorrow
        arrivalTime: new Date(tomorrow.getTime() + 14 * 60 * 60 * 1000), // 2 PM tomorrow
        airline: 'SFTK Airlines',
        price: 350,
        availableSeats: 150,
      },
      {
        flightNumber: 'SFT102',
        departureAirport: 'Los Angeles (LAX)',
        arrivalAirport: 'New York (JFK)',
        departureTime: new Date(tomorrow.getTime() + 10 * 60 * 60 * 1000),
        arrivalTime: new Date(tomorrow.getTime() + 18.5 * 60 * 60 * 1000),
        airline: 'SFTK Airlines',
        price: 360,
        availableSeats: 145,
      },
      {
        flightNumber: 'SFT202',
        departureAirport: 'Los Angeles (LAX)',
        arrivalAirport: 'Miami (MIA)',
        departureTime: new Date(tomorrow.getTime() + 14 * 60 * 60 * 1000),
        arrivalTime: new Date(tomorrow.getTime() + 21 * 60 * 60 * 1000),
        airline: 'SFTK Airlines',
        price: 280,
        availableSeats: 180,
      },
      {
        flightNumber: 'SFT303',
        departureAirport: 'Chicago (ORD)',
        arrivalAirport: 'New York (JFK)',
        departureTime: new Date(tomorrow.getTime() + 10.5 * 60 * 60 * 1000),
        arrivalTime: new Date(tomorrow.getTime() + 13.75 * 60 * 60 * 1000),
        airline: 'SFTK Airlines',
        price: 220,
        availableSeats: 160,
      },
      {
        flightNumber: 'SFT404',
        departureAirport: 'Miami (MIA)',
        arrivalAirport: 'Chicago (ORD)',
        departureTime: new Date(tomorrow.getTime() + 7 * 60 * 60 * 1000),
        arrivalTime: new Date(tomorrow.getTime() + 10.5 * 60 * 60 * 1000),
        airline: 'SFTK Airlines',
        price: 240,
        availableSeats: 170,
      },
      {
        flightNumber: 'SFT505',
        departureAirport: 'San Francisco (SFO)',
        arrivalAirport: 'Seattle (SEA)',
        departureTime: new Date(tomorrow.getTime() + 9 * 60 * 60 * 1000),
        arrivalTime: new Date(tomorrow.getTime() + 11.5 * 60 * 60 * 1000),
        airline: 'SFTK Airlines',
        price: 180,
        availableSeats: 120,
      },
      {
        flightNumber: 'SFT606',
        departureAirport: 'Dallas (DFW)',
        arrivalAirport: 'Denver (DEN)',
        departureTime: new Date(tomorrow.getTime() + 12 * 60 * 60 * 1000),
        arrivalTime: new Date(tomorrow.getTime() + 14.5 * 60 * 60 * 1000),
        airline: 'SFTK Airlines',
        price: 200,
        availableSeats: 140,
      },
      {
        flightNumber: 'SFT707',
        departureAirport: 'Boston (BOS)',
        arrivalAirport: 'San Francisco (SFO)',
        departureTime: new Date(tomorrow.getTime() + 6 * 60 * 60 * 1000),
        arrivalTime: new Date(tomorrow.getTime() + 13 * 60 * 60 * 1000),
        airline: 'SFTK Airlines',
        price: 420,
        availableSeats: 155,
      },
      {
        flightNumber: 'SFT808',
        departureAirport: 'Atlanta (ATL)',
        arrivalAirport: 'Las Vegas (LAS)',
        departureTime: new Date(tomorrow.getTime() + 15 * 60 * 60 * 1000),
        arrivalTime: new Date(tomorrow.getTime() + 19.5 * 60 * 60 * 1000),
        airline: 'SFTK Airlines',
        price: 310,
        availableSeats: 165,
      },
      {
        flightNumber: 'SFT909',
        departureAirport: 'Phoenix (PHX)',
        arrivalAirport: 'Portland (PDX)',
        departureTime: new Date(tomorrow.getTime() + 11 * 60 * 60 * 1000),
        arrivalTime: new Date(tomorrow.getTime() + 14 * 60 * 60 * 1000),
        airline: 'SFTK Airlines',
        price: 250,
        availableSeats: 130,
      },
    ];

    const createdFlights = await Promise.all(
      flights.map(flight => prisma.flight.create({ data: flight }))
    );

    console.log(`✅ Created ${createdFlights.length} flights`);

    // Create bookings - distribute among users
    const bookings = [
      // User 1 (John) - frequent traveler with 3 bookings
      {
        userId: createdUsers[0].id,
        flightId: createdFlights[0].id,
        confirmationCode: 'SFTK1001',
        passengerName: 'John Doe',
        passengerEmail: createdUsers[0].email,
        passengerPhone: createdUsers[0].phone,
        totalPrice: createdFlights[0].price,
        baggageCount: 0,
        baggagePrice: 0,
      },
      {
        userId: createdUsers[0].id,
        flightId: createdFlights[2].id,
        confirmationCode: 'SFTK1002',
        passengerName: 'John Doe',
        passengerEmail: createdUsers[0].email,
        passengerPhone: createdUsers[0].phone,
        totalPrice: createdFlights[2].price + 30,
        baggageCount: 1,
        baggagePrice: 30,
      },
      {
        userId: createdUsers[0].id,
        flightId: createdFlights[7].id,
        confirmationCode: 'SFTK1003',
        passengerName: 'John Doe',
        passengerEmail: createdUsers[0].email,
        passengerPhone: createdUsers[0].phone,
        totalPrice: createdFlights[7].price + 60,
        baggageCount: 2,
        baggagePrice: 60,
      },
      // User 2 (Jane) - 2 bookings
      {
        userId: createdUsers[1].id,
        flightId: createdFlights[3].id,
        confirmationCode: 'SFTK2001',
        passengerName: 'Jane Smith',
        passengerEmail: createdUsers[1].email,
        passengerPhone: createdUsers[1].phone,
        totalPrice: createdFlights[3].price,
        baggageCount: 0,
        baggagePrice: 0,
      },
      {
        userId: createdUsers[1].id,
        flightId: createdFlights[5].id,
        confirmationCode: 'SFTK2002',
        passengerName: 'Jane Smith',
        passengerEmail: createdUsers[1].email,
        passengerPhone: createdUsers[1].phone,
        totalPrice: createdFlights[5].price + 30,
        baggageCount: 1,
        baggagePrice: 30,
      },
      // User 3 (Carlos) - 2 bookings
      {
        userId: createdUsers[2].id,
        flightId: createdFlights[1].id,
        confirmationCode: 'SFTK3001',
        passengerName: 'Carlos Rodriguez',
        passengerEmail: createdUsers[2].email,
        passengerPhone: createdUsers[2].phone,
        totalPrice: createdFlights[1].price + 60,
        baggageCount: 2,
        baggagePrice: 60,
      },
      {
        userId: createdUsers[2].id,
        flightId: createdFlights[8].id,
        confirmationCode: 'SFTK3002',
        passengerName: 'Carlos Rodriguez',
        passengerEmail: createdUsers[2].email,
        passengerPhone: createdUsers[2].phone,
        totalPrice: createdFlights[8].price,
        baggageCount: 0,
        baggagePrice: 0,
      },
      // User 4 (Maria) - 1 booking
      {
        userId: createdUsers[3].id,
        flightId: createdFlights[4].id,
        confirmationCode: 'SFTK4001',
        passengerName: 'Maria Garcia',
        passengerEmail: createdUsers[3].email,
        passengerPhone: createdUsers[3].phone,
        totalPrice: createdFlights[4].price + 30,
        baggageCount: 1,
        baggagePrice: 30,
      },
      // User 5 (Michael) - 2 bookings
      {
        userId: createdUsers[4].id,
        flightId: createdFlights[6].id,
        confirmationCode: 'SFTK5001',
        passengerName: 'Michael Johnson',
        passengerEmail: createdUsers[4].email,
        passengerPhone: createdUsers[4].phone,
        totalPrice: createdFlights[6].price,
        baggageCount: 0,
        baggagePrice: 0,
      },
      {
        userId: createdUsers[4].id,
        flightId: createdFlights[9].id,
        confirmationCode: 'SFTK5002',
        passengerName: 'Michael Johnson',
        passengerEmail: createdUsers[4].email,
        passengerPhone: createdUsers[4].phone,
        totalPrice: createdFlights[9].price + 60,
        baggageCount: 2,
        baggagePrice: 60,
      },
    ];

    const createdBookings = await Promise.all(
      bookings.map(booking => prisma.booking.create({ data: booking }))
    );

    console.log(`✅ Created ${createdBookings.length} bookings`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Test Credentials:');
    console.log('   👤 john.doe@example.com / password123 (3 bookings)');
    console.log('   👤 jane.smith@example.com / password456 (2 bookings)');
    console.log('   👤 carlos.rodriguez@example.com / password789 (2 bookings)');
    console.log('   👤 maria.garcia@example.com / test123 (1 booking)');
    console.log('   👤 michael.johnson@example.com / test456 (2 bookings)');
    console.log('\n✈️  Flight Routes:');
    console.log('   JFK ↔ LAX, LAX → MIA, ORD → JFK, MIA → ORD');
    console.log('   SFO → SEA, DFW → DEN, BOS → SFO, ATL → LAS, PHX → PDX');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
