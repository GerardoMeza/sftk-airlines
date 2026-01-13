import "dotenv/config";
import { searchFlights } from "../src/services/flightService";

async function testSearch() {
  console.log("Testing flight search for LAX → MIA on 2026-01-15...\n");

  try {
    const results = await searchFlights({
      origin: "LAX",
      destination: "MIA",
      departureDate: "2026-01-15",
    });

    console.log(`✅ Found ${results.length} flights:\n`);

    results.forEach((flight) => {
      const deptTime = new Date(flight.departureTime).toLocaleTimeString(
        "en-US",
        {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }
      );
      const arrTime = new Date(flight.arrivalTime).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      console.log(
        `  ${flight.flightNumber} - ${flight.airline}`
      );
      console.log(
        `  Route: ${flight.departureAirport} → ${flight.arrivalAirport}`
      );
      console.log(`  Time: ${deptTime} - ${arrTime}`);
      console.log(`  Price: $${flight.price} | Seats: ${flight.availableSeats}`);
      console.log();
    });
  } catch (error) {
    console.error("❌ Error testing search:", error);
    throw error;
  }
}

testSearch()
  .then(() => {
    console.log("✅ Search test completed!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Search test failed:", error);
    process.exit(1);
  });
