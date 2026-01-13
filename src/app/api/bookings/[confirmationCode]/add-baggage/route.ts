import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ confirmationCode: string }> }
) {
  try {
    const { confirmationCode } = await params;
    const body = await request.json();
    const { baggageCount, baggagePrice } = body;

    // Validate input
    if (typeof baggageCount !== "number" || baggageCount < 0) {
      return NextResponse.json(
        { error: "Invalid baggage count" },
        { status: 400 }
      );
    }

    if (typeof baggagePrice !== "number" || baggagePrice < 0) {
      return NextResponse.json(
        { error: "Invalid baggage price" },
        { status: 400 }
      );
    }

    // Find existing booking
    const existingBooking = await prisma.booking.findUnique({
      where: {
        confirmationCode: confirmationCode,
      },
    });

    if (!existingBooking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    // Calculate new totals (adding to existing baggage)
    const newBaggageCount = existingBooking.baggageCount + baggageCount;
    const newBaggagePrice = existingBooking.baggagePrice + baggagePrice;
    const newTotalPrice = existingBooking.totalPrice + baggagePrice;

    // Update booking
    const updatedBooking = await prisma.booking.update({
      where: {
        confirmationCode: confirmationCode,
      },
      data: {
        baggageCount: newBaggageCount,
        baggagePrice: newBaggagePrice,
        totalPrice: newTotalPrice,
      },
      include: {
        flight: true,
      },
    });

    // Format response
    const response = {
      id: updatedBooking.id,
      confirmationCode: updatedBooking.confirmationCode,
      passengerName: updatedBooking.passengerName,
      passengerEmail: updatedBooking.passengerEmail,
      passengerPhone: updatedBooking.passengerPhone,
      totalPrice: updatedBooking.totalPrice,
      baggageCount: updatedBooking.baggageCount,
      baggagePrice: updatedBooking.baggagePrice,
      status: updatedBooking.status,
      flightNumber: updatedBooking.flight.flightNumber,
      departureAirport: updatedBooking.flight.departureAirport,
      arrivalAirport: updatedBooking.flight.arrivalAirport,
      departureTime: updatedBooking.flight.departureTime.toISOString(),
      arrivalTime: updatedBooking.flight.arrivalTime.toISOString(),
      airline: updatedBooking.flight.airline,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error adding baggage:", error);
    return NextResponse.json(
      { error: "Failed to add baggage" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
