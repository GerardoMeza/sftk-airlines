import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function addMoreFlights() {
  console.log("Adding more flights with various dates...\n");

  const flights = [
    // Flights for January 14, 2026
    {
      flightNumber: "SFTK201",
      airline: "SFTK Airlines",
      departureAirport: "New York (JFK)",
      arrivalAirport: "Los Angeles (LAX)",
      departureTime: new Date("2026-01-14T08:00:00Z"),
      arrivalTime: new Date("2026-01-14T11:30:00Z"),
      price: 340,
      availableSeats: 150,
      stops: 0,
    },
    {
      flightNumber: "SFTK202",
      airline: "SFTK Airlines",
      departureAirport: "Los Angeles (LAX)",
      arrivalAirport: "Miami (MIA)",
      departureTime: new Date("2026-01-14T14:00:00Z"),
      arrivalTime: new Date("2026-01-14T22:00:00Z"),
      price: 290,
      availableSeats: 180,
      stops: 0,
    },
    {
      flightNumber: "SFTK203",
      airline: "SFTK Airlines",
      departureAirport: "Chicago (ORD)",
      arrivalAirport: "San Francisco (SFO)",
      departureTime: new Date("2026-01-14T10:00:00Z"),
      arrivalTime: new Date("2026-01-14T13:00:00Z"),
      price: 380,
      availableSeats: 140,
      stops: 0,
    },
    // Flights for January 15, 2026
    {
      flightNumber: "SFTK301",
      airline: "SFTK Airlines",
      departureAirport: "Miami (MIA)",
      arrivalAirport: "New York (JFK)",
      departureTime: new Date("2026-01-15T09:00:00Z"),
      arrivalTime: new Date("2026-01-15T12:00:00Z"),
      price: 260,
      availableSeats: 170,
      stops: 0,
    },
    {
      flightNumber: "SFTK302",
      airline: "SFTK Airlines",
      departureAirport: "San Francisco (SFO)",
      arrivalAirport: "Chicago (ORD)",
      departureTime: new Date("2026-01-15T11:00:00Z"),
      arrivalTime: new Date("2026-01-15T17:00:00Z"),
      price: 390,
      availableSeats: 135,
      stops: 0,
    },
    {
      flightNumber: "SFTK303",
      airline: "SFTK Airlines",
      departureAirport: "Atlanta (ATL)",
      arrivalAirport: "Los Angeles (LAX)",
      departureTime: new Date("2026-01-15T13:00:00Z"),
      arrivalTime: new Date("2026-01-15T15:30:00Z"),
      price: 320,
      availableSeats: 160,
      stops: 0,
    },
    // Flights for January 16, 2026
    {
      flightNumber: "SFTK401",
      airline: "SFTK Airlines",
      departureAirport: "Los Angeles (LAX)",
      arrivalAirport: "Seattle (SEA)",
      departureTime: new Date("2026-01-16T07:00:00Z"),
      arrivalTime: new Date("2026-01-16T09:30:00Z"),
      price: 210,
      availableSeats: 145,
      stops: 0,
    },
    {
      flightNumber: "SFTK402",
      airline: "SFTK Airlines",
      departureAirport: "New York (JFK)",
      arrivalAirport: "Miami (MIA)",
      departureTime: new Date("2026-01-16T15:00:00Z"),
      arrivalTime: new Date("2026-01-16T18:00:00Z"),
      price: 250,
      availableSeats: 175,
      stops: 0,
    },
    {
      flightNumber: "SFTK403",
      airline: "SFTK Airlines",
      departureAirport: "Denver (DEN)",
      arrivalAirport: "Dallas (DFW)",
      departureTime: new Date("2026-01-16T12:00:00Z"),
      arrivalTime: new Date("2026-01-16T14:30:00Z"),
      price: 190,
      availableSeats: 130,
      stops: 0,
    },
    // Flights for January 17, 2026
    {
      flightNumber: "SFTK501",
      airline: "SFTK Airlines",
      departureAirport: "Boston (BOS)",
      arrivalAirport: "Miami (MIA)",
      departureTime: new Date("2026-01-17T10:00:00Z"),
      arrivalTime: new Date("2026-01-17T13:30:00Z"),
      price: 270,
      availableSeats: 155,
      stops: 0,
    },
    {
      flightNumber: "SFTK502",
      airline: "SFTK Airlines",
      departureAirport: "Las Vegas (LAS)",
      arrivalAirport: "Phoenix (PHX)",
      departureTime: new Date("2026-01-17T16:00:00Z"),
      arrivalTime: new Date("2026-01-17T17:15:00Z"),
      price: 150,
      availableSeats: 120,
      stops: 0,
    },
    {
      flightNumber: "SFTK503",
      airline: "SFTK Airlines",
      departureAirport: "Chicago (ORD)",
      arrivalAirport: "Los Angeles (LAX)",
      departureTime: new Date("2026-01-17T08:00:00Z"),
      arrivalTime: new Date("2026-01-17T10:30:00Z"),
      price: 350,
      availableSeats: 165,
      stops: 0,
    },
    // Flights for January 18, 2026
    {
      flightNumber: "SFTK601",
      airline: "SFTK Airlines",
      departureAirport: "Miami (MIA)",
      arrivalAirport: "Los Angeles (LAX)",
      departureTime: new Date("2026-01-18T06:00:00Z"),
      arrivalTime: new Date("2026-01-18T09:00:00Z"),
      price: 300,
      availableSeats: 180,
      stops: 0,
    },
    {
      flightNumber: "SFTK602",
      airline: "SFTK Airlines",
      departureAirport: "Seattle (SEA)",
      arrivalAirport: "New York (JFK)",
      departureTime: new Date("2026-01-18T11:00:00Z"),
      arrivalTime: new Date("2026-01-18T19:00:00Z"),
      price: 420,
      availableSeats: 140,
      stops: 0,
    },
    {
      flightNumber: "SFTK603",
      airline: "SFTK Airlines",
      departureAirport: "Dallas (DFW)",
      arrivalAirport: "Chicago (ORD)",
      departureTime: new Date("2026-01-18T14:00:00Z"),
      arrivalTime: new Date("2026-01-18T16:30:00Z"),
      price: 220,
      availableSeats: 150,
      stops: 0,
    },
  ];

  try {
    for (const flight of flights) {
      await prisma.flight.create({
        data: flight,
      });
      console.log(
        `✅ Added ${flight.flightNumber}: ${flight.departureAirport} → ${flight.arrivalAirport} (${flight.departureTime.toISOString().split("T")[0]})`
      );
    }

    console.log(`\n✅ Successfully added ${flights.length} flights!`);
    console.log("\nFlights by date:");
    console.log("- Jan 14: 3 flights (SFTK201-203)");
    console.log("- Jan 15: 3 flights (SFTK301-303)");
    console.log("- Jan 16: 3 flights (SFTK401-403)");
    console.log("- Jan 17: 3 flights (SFTK501-503)");
    console.log("- Jan 18: 3 flights (SFTK601-603)");
  } catch (error) {
    console.error("❌ Error adding flights:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

addMoreFlights()
  .then(() => {
    console.log("\n🎉 All flights added successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Failed to add flights:", error);
    process.exit(1);
  });
