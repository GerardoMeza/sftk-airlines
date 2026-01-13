import { PrismaClient } from '../src/generated/prisma/index.js';
import crypto from 'crypto';

const prisma = new PrismaClient();

// Hash password using SHA-256
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function main() {
  try {
    console.log('🌱 Seeding database...');

    // Clear existing data
    await prisma.booking.deleteMany({});
    await prisma.flight.deleteMany({});
    await prisma.user.deleteMany({});

    // Create users
    const user1 = await prisma.user.create({
      data: {
        email: 'john.doe@example.com',
        password: hashPassword('password123'),
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1234567890',
      },
    });

    const user2 = await prisma.user.create({
      data: {
        email: 'jane.smith@example.com',
        password: hashPassword('password456'),
        firstName: 'Jane',
        lastName: 'Smith',
        phone: '+1234567891',
      },
    });

    console.log('✅ Created users:', user1.email, user2.email);

    // Create flights
    const flight1 = await prisma.flight.create({
      data: {
        flightNumber: 'SFT101',
        departure: 'New York (JFK)',
        arrival: 'Los Angeles (LAX)',
        departureTime: new Date('2025-02-15T08:00:00Z'),
        arrivalTime: new Date('2025-02-15T11:30:00Z'),
        aircraft: 'Boeing 777',
        airline: 'SFTK Airlines',
        price: 350,
        availableSeats: 150,
      },
    });

    const flight2 = await prisma.flight.create({
      data: {
        flightNumber: 'SFT202',
        departure: 'Los Angeles (LAX)',
        arrival: 'Miami (MIA)',
        departureTime: new Date('2025-02-20T14:00:00Z'),
        arrivalTime: new Date('2025-02-20T20:15:00Z'),
        aircraft: 'Airbus A380',
        airline: 'SFTK Airlines',
        price: 280,
        availableSeats: 280,
      },
    });

    const flight3 = await prisma.flight.create({
      data: {
        flightNumber: 'SFT303',
        departure: 'Chicago (ORD)',
        arrival: 'New York (JFK)',
        departureTime: new Date('2025-02-25T10:30:00Z'),
        arrivalTime: new Date('2025-02-25T13:45:00Z'),
        aircraft: 'Boeing 737',
        airline: 'SFTK Airlines',
        price: 220,
        availableSeats: 180,
      },
    });

    console.log('✅ Created flights:', flight1.flightNumber, flight2.flightNumber, flight3.flightNumber);

    // Create bookings
    const booking1 = await prisma.booking.create({
      data: {
        userId: user1.id,
        flightId: flight1.id,
        confirmationCode: 'CONF001',
        passengerName: 'John Doe',
        passengerEmail: user1.email,
        seatNumber: '12A',
        bookingDate: new Date('2025-01-10T10:00:00Z'),
      },
    });

    const booking2 = await prisma.booking.create({
      data: {
        userId: user1.id,
        flightId: flight2.id,
        confirmationCode: 'CONF002',
        passengerName: 'John Doe',
        passengerEmail: user1.email,
        seatNumber: '8F',
        bookingDate: new Date('2025-01-11T15:30:00Z'),
      },
    });

    const booking3 = await prisma.booking.create({
      data: {
        userId: user2.id,
        flightId: flight3.id,
        confirmationCode: 'CONF003',
        passengerName: 'Jane Smith',
        passengerEmail: user2.email,
        seatNumber: '5C',
        bookingDate: new Date('2025-01-12T09:15:00Z'),
      },
    });

    console.log('✅ Created bookings:', booking1.confirmationCode, booking2.confirmationCode, booking3.confirmationCode);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Test Credentials:');
    console.log('   User 1: john.doe@example.com / password123');
    console.log('   User 2: jane.smith@example.com / password456');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
