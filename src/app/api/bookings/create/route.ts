import { NextRequest, NextResponse } from "next/server";
import { generateConfirmationCode } from "@/utils/format";

export async function POST(request: NextRequest) {
  try {
    const { passengerInfo, flight } = await request.json();

    if (!passengerInfo || !flight) {
      return NextResponse.json(
        { error: "Incomplete information" },
        { status: 400 }
      );
    }

    // Generate confirmation code
    const confirmationCode = generateConfirmationCode();

    // Create booking object
    const booking = {
      id: Date.now().toString(),
      confirmationCode,
      userId: "demo-user",
      flightId: flight.id,
      passengerName: `${passengerInfo.firstName} ${passengerInfo.lastName}`,
      passengerEmail: passengerInfo.email,
      passengerPhone: passengerInfo.phone,
      status: "confirmed",
      totalPrice: flight.price,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Store booking in sessionStorage (for demo purposes)
    // In production, this would be saved to database
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Error creating booking" },
      { status: 500 }
    );
  }
}
