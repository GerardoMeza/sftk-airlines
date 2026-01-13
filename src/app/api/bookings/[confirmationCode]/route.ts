import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL,
} as any);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ confirmationCode: string }> }
) {
  try {
    const { confirmationCode } = await params;

    const booking = await prisma.booking.findUnique({
      where: {
        confirmationCode: confirmationCode,
      },
      include: {
        flight: true,
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    // Format response
    const response = {
      id: booking.id,
      confirmationCode: booking.confirmationCode,
      passengerName: booking.passengerName,
      passengerEmail: booking.passengerEmail,
      passengerPhone: booking.passengerPhone,
      totalPrice: booking.totalPrice,
      baggageCount: booking.baggageCount,
      baggagePrice: booking.baggagePrice,
      status: booking.status,
      flightNumber: booking.flight.flightNumber,
      departureAirport: booking.flight.departureAirport,
      arrivalAirport: booking.flight.arrivalAirport,
      departureTime: booking.flight.departureTime.toISOString(),
      arrivalTime: booking.flight.arrivalTime.toISOString(),
      airline: booking.flight.airline,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching booking:", error);
    return NextResponse.json(
      { error: "Failed to fetch booking" },
      { status: 500 }
    );
  } finally {
    // Keep connection for subsequent requests; Accelerate manages pooling
    await prisma.$disconnect();
  }
}
