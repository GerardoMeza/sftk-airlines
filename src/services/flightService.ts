import { Flight, FlightSearchParams } from "@/types";
import { prisma } from "@/lib/prisma";

export async function searchFlights(
  params: FlightSearchParams
): Promise<Flight[]> {
  try {
    // Parse the departure date
    const departureDate = new Date(params.departureDate);
    
    // Set start and end times for the day (UTC)
    const startOfDay = new Date(departureDate);
    startOfDay.setUTCHours(0, 0, 0, 0);
    
    const endOfDay = new Date(departureDate);
    endOfDay.setUTCHours(23, 59, 59, 999);

    // Query the database
    // Airport codes are stored as "City (CODE)" format, so we need to search for the code within the string
    const originCode = params.origin.toUpperCase();
    const destinationCode = params.destination.toUpperCase();
    
    const flights = await prisma.flight.findMany({
      where: {
        departureAirport: {
          contains: `(${originCode})`,
          mode: 'insensitive',
        },
        arrivalAirport: {
          contains: `(${destinationCode})`,
          mode: 'insensitive',
        },
        departureTime: {
          gte: startOfDay,
          lte: endOfDay,
        },
        availableSeats: {
          gt: 0,
        },
      },
      orderBy: {
        departureTime: 'asc',
      },
    });

    // Transform Prisma Flight to Flight type (convert dates to ISO strings)
    return flights.map((flight) => ({
      id: flight.id,
      flightNumber: flight.flightNumber,
      departureAirport: flight.departureAirport,
      arrivalAirport: flight.arrivalAirport,
      departureTime: flight.departureTime.toISOString(),
      arrivalTime: flight.arrivalTime.toISOString(),
      airline: flight.airline,
      stops: flight.stops,
      availableSeats: flight.availableSeats,
      price: flight.price,
    }));
  } catch (error) {
    console.error('Error searching flights from database:', error);
    // Fallback to empty array if database query fails
    return [];
  }
}

export async function getFlightById(flightId: string): Promise<Flight | null> {
  try {
    const flight = await prisma.flight.findUnique({
      where: { id: flightId },
    });

    if (!flight) {
      return null;
    }

    return {
      id: flight.id,
      flightNumber: flight.flightNumber,
      departureAirport: flight.departureAirport,
      arrivalAirport: flight.arrivalAirport,
      departureTime: flight.departureTime.toISOString(),
      arrivalTime: flight.arrivalTime.toISOString(),
      airline: flight.airline,
      stops: flight.stops,
      availableSeats: flight.availableSeats,
      price: flight.price,
    };
  } catch (error) {
    console.error('Error fetching flight by ID:', error);
    return null;
  }
}

export async function bookFlight(flightId: string, passengerCount: number) {
  try {
    const flight = await prisma.flight.findUnique({
      where: { id: flightId },
    });

    if (!flight || flight.availableSeats < passengerCount) {
      throw new Error("No seats available");
    }

    // Update available seats
    await prisma.flight.update({
      where: { id: flightId },
      data: {
        availableSeats: {
          decrement: passengerCount,
        },
      },
    });

    return { success: true, confirmationCode: generateConfirmationCode() };
  } catch (error) {
    console.error('Error booking flight:', error);
    throw error;
  }
}

function generateConfirmationCode(): string {
  return `SFTK${Date.now().toString(36).toUpperCase()}${Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase()}`;
}
