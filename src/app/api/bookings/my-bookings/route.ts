import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("User-Id");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Get user bookings with flight info
    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: { flight: true },
      orderBy: { createdAt: "desc" },
    });

    // Format bookings for response
    const formattedBookings = bookings.map((booking: any) => ({
      id: booking.id,
      confirmationCode: booking.confirmationCode,
      flightId: booking.flightId,
      passengerName: booking.passengerName,
      passengerEmail: booking.passengerEmail,
      passengerPhone: booking.passengerPhone,
      totalPrice: booking.totalPrice,
      baggageCount: booking.baggageCount,
      baggagePrice: booking.baggagePrice,
      flightNumber: booking.flight.flightNumber,
      departureAirport: booking.flight.departureAirport,
      arrivalAirport: booking.flight.arrivalAirport,
      departureTime: booking.flight.departureTime.toISOString(),
      arrivalTime: booking.flight.arrivalTime.toISOString(),
      airline: booking.flight.airline,
      createdAt: booking.createdAt.toISOString(),
    }));

    return NextResponse.json(formattedBookings, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Error fetching bookings" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
