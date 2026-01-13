import { Flight, FlightSearchParams } from "@/types";

// Mock data for demonstration
const mockFlights: Flight[] = [
  {
    id: "flight-1",
    flightNumber: "SFTK001",
    departureAirport: "MEX",
    arrivalAirport: "MIA",
    departureTime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    arrivalTime: new Date(Date.now() + 86400000 + 14400000).toISOString(), // Tomorrow + 4 hours
    airline: "SFTK Airlines",
    stops: 0,
    availableSeats: 150,
    price: 320,
  },
  {
    id: "flight-2",
    flightNumber: "SFTK015",
    departureAirport: "MEX",
    arrivalAirport: "MIA",
    departureTime: new Date(Date.now() + 86400000 + 7200000).toISOString(),
    arrivalTime: new Date(Date.now() + 86400000 + 21600000).toISOString(),
    airline: "SFTK Airlines",
    stops: 0,
    availableSeats: 89,
    price: 380,
  },
  {
    id: "flight-3",
    flightNumber: "SFTK028",
    departureAirport: "MEX",
    arrivalAirport: "MIA",
    departureTime: new Date(Date.now() + 86400000 + 14400000).toISOString(),
    arrivalTime: new Date(Date.now() + 86400000 + 25200000).toISOString(),
    airline: "SFTK Airlines",
    stops: 1,
    availableSeats: 120,
    price: 280,
  },
  {
    id: "flight-4",
    flightNumber: "SFTK042",
    departureAirport: "MEX",
    arrivalAirport: "MIA",
    departureTime: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
    arrivalTime: new Date(Date.now() + 172800000 + 14400000).toISOString(),
    airline: "SFTK Airlines",
    stops: 0,
    availableSeats: 160,
    price: 350,
  },
];

export async function searchFlights(
  params: FlightSearchParams
): Promise<Flight[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Filter mock flights based on search parameters
  return mockFlights.filter((flight) => {
    const departureDate = new Date(params.departureDate);
    const flightDate = new Date(flight.departureTime);

    const isSameDay =
      departureDate.getDate() === flightDate.getDate() &&
      departureDate.getMonth() === flightDate.getMonth() &&
      departureDate.getFullYear() === flightDate.getFullYear();

    return (
      flight.departureAirport.toUpperCase() ===
        params.origin.toUpperCase() &&
      flight.arrivalAirport.toUpperCase() ===
        params.destination.toUpperCase() &&
      isSameDay &&
      flight.availableSeats > 0
    );
  });
}

export async function getFlightById(flightId: string): Promise<Flight | null> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockFlights.find((flight) => flight.id === flightId) || null;
}

export async function bookFlight(flightId: string, passengerCount: number) {
  await new Promise((resolve) => setTimeout(resolve, 600));

  const flight = mockFlights.find((f) => f.id === flightId);
  if (!flight || flight.availableSeats < passengerCount) {
    throw new Error("No seats available");
  }

  flight.availableSeats -= passengerCount;
  return { success: true, confirmationCode: generateConfirmationCode() };
}

function generateConfirmationCode(): string {
  return `SFTK${Date.now().toString(36).toUpperCase()}${Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase()}`;
}
