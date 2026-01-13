import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function fixAirportFormat() {
  console.log("Fixing airport format for LAX->MIA flights...\n");

  try {
    const result = await prisma.flight.updateMany({
      where: {
        flightNumber: {
          in: ["SFTK101", "SFTK102", "SFTK103"],
        },
      },
      data: {
        departureAirport: "Los Angeles (LAX)",
        arrivalAirport: "Miami (MIA)",
      },
    });

    console.log(`✅ Updated ${result.count} flights`);

    // Verify the update
    const flights = await prisma.flight.findMany({
      where: {
        flightNumber: {
          in: ["SFTK101", "SFTK102", "SFTK103"],
        },
      },
      orderBy: {
        departureTime: "asc",
      },
    });

    console.log("\n📋 Updated flights:");
    flights.forEach((flight) => {
      console.log(
        `  ${flight.flightNumber}: ${flight.departureAirport} → ${flight.arrivalAirport}`
      );
    });
  } catch (error) {
    console.error("❌ Error fixing airport format:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

fixAirportFormat()
  .then(() => {
    console.log("\n✅ Airport format fixed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Failed to fix airport format:", error);
    process.exit(1);
  });
