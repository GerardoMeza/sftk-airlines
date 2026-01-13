"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { FlightSummary } from "@/components/booking/FlightSummary";
import { PassengerForm } from "@/components/booking/PassengerForm";
import { BookingConfirmation } from "@/components/booking/BookingConfirmation";
import { Flight, PassengerInfo, Booking } from "@/types";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BookingPage() {
  const [flight, setFlight] = useState<Flight | null>(null);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [step, setStep] = useState<"flight" | "passenger" | "confirmation">(
    "flight"
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Get selected flight from sessionStorage
    const selectedFlight = sessionStorage.getItem("selectedFlight");
    if (selectedFlight) {
      setFlight(JSON.parse(selectedFlight));
      setStep("passenger");
    }
  }, []);

  const handleSubmitPassengerInfo = async (passengerInfo: PassengerInfo) => {
    if (!flight) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/bookings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          flight,
          passengerInfo,
        }),
      });

      if (response.ok) {
        const bookingData = await response.json();
        setBooking(bookingData);
        setStep("confirmation");
        // Store booking in sessionStorage
        sessionStorage.setItem("lastBooking", JSON.stringify(bookingData));
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Error creating booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!flight) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <p className="text-gray-600 mb-4">
                No flight selected
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-[#1f2f5c] hover:brightness-125 text-white font-semibold py-2 px-6 rounded-md transition"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Search
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 md:py-12">
        <div className="max-w-2xl mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#1f2f5c] hover:brightness-125 font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Search
            </Link>
          </div>

          {/* Steps Indicator */}
          <div className="flex items-center justify-between mb-8">
            <div
              className={`flex items-center ${
                step === "passenger" || step === "confirmation"
                  ? "text-[#1f2f5c]"
                  : "text-gray-400"
              }`}
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                  step === "passenger" || step === "confirmation"
                    ? "bg-[#1f2f5c] text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                1
              </div>
              <p className="ml-3 hidden sm:block">Flight</p>
            </div>
            <div className="flex-grow h-1 mx-4 bg-gray-300"></div>
            <div
              className={`flex items-center ${
                step === "passenger" || step === "confirmation"
                  ? "text-[#1f2f5c]"
                  : "text-gray-400"
              }`}
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                  step === "passenger" || step === "confirmation"
                    ? "bg-[#1f2f5c] text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                2
              </div>
              <p className="ml-3 hidden sm:block">Passenger</p>
            </div>
            <div className="flex-grow h-1 mx-4 bg-gray-300"></div>
            <div
              className={`flex items-center ${
                step === "confirmation" ? "text-[#1f2f5c]" : "text-gray-400"
              }`}
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                  step === "confirmation"
                    ? "bg-[#1f2f5c] text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                3
              </div>
              <p className="ml-3 hidden sm:block">Confirmation</p>
            </div>
          </div>

          {/* Content */}
          {(step === "passenger" || step === "flight") && (
            <div className="space-y-6">
              <FlightSummary flight={flight} showAction={true} />
              <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                <h2 className="text-2xl font-bold text-[#1f2f5c] mb-6">
                  Passenger Information
                </h2>
                <PassengerForm
                  onSubmit={handleSubmitPassengerInfo}
                  isLoading={isLoading}
                />
              </div>
            </div>
          )}

          {step === "confirmation" && booking && (
            <BookingConfirmation booking={booking} flight={flight} />
          )}
        </div>
      </main>
    </>
  );
}
