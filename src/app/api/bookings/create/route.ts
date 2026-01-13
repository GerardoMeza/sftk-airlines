import { NextRequest, NextResponse } from "next/server";
import { generateConfirmationCode } from "@/utils/format";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { passengerInfo, flight } = await request.json();
    const userId = request.headers.get("User-Id");

    if (!passengerInfo || !flight) {
      return NextResponse.json(
        { error: "Incomplete information" },
        { status: 400 }
      );
    }

    // Ensure we have a user to associate the booking
    let bookingUserId = userId || null;
    if (!bookingUserId) {
      // Fallback to a shared guest user so bookings can persist and be retrievable by confirmation code
      const guestEmail = "guest@sftk.local";
      const guest = await prisma.user.upsert({
        where: { email: guestEmail },
        update: {},
        create: {
          email: guestEmail,
          password: "guest", // not used for auth; placeholder
          firstName: "Guest",
          lastName: "User",
          phone: "N/A",
        },
      });
      bookingUserId = guest.id;
    }

    // Generate confirmation code
    const confirmationCode = generateConfirmationCode();

    // Validate flight and availability; then persist booking and decrement seats atomically
    const result = await prisma.$transaction(async (tx) => {
      const dbFlight = await tx.flight.findUnique({ where: { id: flight.id } });
      if (!dbFlight) {
        throw new Error("FLIGHT_NOT_FOUND");
      }
      if (dbFlight.availableSeats < 1) {
        throw new Error("NO_SEATS_AVAILABLE");
      }

      await tx.flight.update({
        where: { id: dbFlight.id },
        data: { availableSeats: { decrement: 1 } },
      });

      const created = await tx.booking.create({
        data: {
          confirmationCode,
          userId: bookingUserId!,
          flightId: dbFlight.id,
          passengerName: `${passengerInfo.firstName} ${passengerInfo.lastName}`,
          passengerEmail: passengerInfo.email,
          passengerPhone: passengerInfo.phone,
          status: "confirmed",
          totalPrice: dbFlight.price,
        },
      });

      return { created, dbFlight };
    });

    const responseBody = {
      id: result.created.id,
      confirmationCode: result.created.confirmationCode,
      userId: result.created.userId,
      flightId: result.created.flightId,
      passengerName: result.created.passengerName,
      passengerEmail: result.created.passengerEmail,
      passengerPhone: result.created.passengerPhone,
      status: result.created.status,
      totalPrice: result.created.totalPrice,
      createdAt: result.created.createdAt.toISOString(),
      updatedAt: result.created.updatedAt.toISOString(),
    };

    return NextResponse.json(responseBody, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "FLIGHT_NOT_FOUND") {
        return NextResponse.json({ error: "Flight not found" }, { status: 404 });
      }
      if (error.message === "NO_SEATS_AVAILABLE") {
        return NextResponse.json({ error: "No seats available" }, { status: 400 });
      }
    }
    console.error("Error creating booking:", error);
    return NextResponse.json({ error: "Error creating booking" }, { status: 500 });
  }
  finally {
    await prisma.$disconnect();
  }
}
