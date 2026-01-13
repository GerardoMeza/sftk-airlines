"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Booking, Flight } from "@/types";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Clock } from "lucide-react";
import {
  formatTime,
  formatPrice,
  calculateFlightDuration,
  formatDate,
} from "@/utils/format";
import { useAuth } from "@/context/AuthContext";

export default function MyBookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<(Booking & { flight: Flight })[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    type ApiBooking = {
      id: string;
      confirmationCode: string;
      flightId: string;
      passengerName: string;
      passengerEmail: string;
      passengerPhone: string;
      totalPrice: number;
      baggageCount: number;
      baggagePrice: number;
      flightNumber: string;
      departureAirport: string;
      arrivalAirport: string;
      departureTime: string; // ISO
      arrivalTime: string; // ISO
      airline: string;
      createdAt: string; // ISO
    };
    const fetchBookings = async () => {
      if (!user) return;
      setIsLoading(true);
      try {
        const res = await fetch("/api/bookings/my-bookings", {
          headers: { "User-Id": user.id },
        });
        if (res.ok) {
          const data = await res.json();
          // data is an array with flattened flight fields; map to expected shape
          const normalized: (Booking & { flight: Flight })[] = (data as ApiBooking[]).map(
            (b: ApiBooking) => ({
              id: b.id,
              confirmationCode: b.confirmationCode,
              userId: "", // not used in UI here
              flightId: b.flightId,
              passengerName: b.passengerName,
              passengerEmail: b.passengerEmail,
              passengerPhone: b.passengerPhone,
              status: "confirmed",
              totalPrice: b.totalPrice,
              createdAt: b.createdAt,
              flight: {
                id: b.flightId,
                flightNumber: b.flightNumber,
                departureAirport: b.departureAirport,
                arrivalAirport: b.arrivalAirport,
                departureTime: b.departureTime,
                arrivalTime: b.arrivalTime,
                airline: b.airline,
                stops: 0,
                availableSeats: 0,
                price: b.totalPrice,
              },
            })
          );
          setBookings(normalized);
        }
      } catch (e) {
        console.error("Failed to load bookings", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#1f2f5c] hover:brightness-125 font-semibold mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1f2f5c]">My Bookings</h1>
          </div>

          {/* Bookings List */}
          {!user ? (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-4">Please sign in to view your bookings</p>
              <Link
                href="/"
                className="inline-block bg-[#1f2f5c] hover:brightness-125 text-white font-semibold py-2 px-6 rounded-md transition"
              >
                Go to Home
              </Link>
            </div>
          ) : isLoading ? (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-pulse" />
              <p className="text-gray-600 text-lg mb-4">Loading your bookings…</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-4">You have no bookings yet</p>
              <Link
                href="/"
                className="inline-block bg-[#1f2f5c] hover:brightness-125 text-white font-semibold py-2 px-6 rounded-md transition"
              >
                Search Flights
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking) => {
                const duration = calculateFlightDuration(
                  booking.flight.departureTime,
                  booking.flight.arrivalTime
                );

                return (
                  <div
                    key={booking.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#11172b] to-[#1f2f5c] text-white p-4 md:p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-blue-100">Confirmation Code</p>
                          <p className="text-2xl font-bold font-mono">{booking.confirmationCode}</p>
                        </div>
                        <div className="text-right flex items-center gap-2">
                          <CheckCircle className="w-6 h-6 text-green-300" />
                          <span className="text-lg font-semibold capitalize">{booking.status}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 md:p-6">
                      {/* Flight Details */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-center flex-1">
                            <p className="text-sm text-gray-500 mb-1">Departure</p>
                            <p className="text-2xl font-bold text-gray-800">{booking.flight.departureAirport}</p>
                            <p className="text-lg font-semibold text-gray-700">{formatTime(booking.flight.departureTime)}</p>
                            <p className="text-xs text-gray-500">{formatDate(booking.flight.departureTime)}</p>
                          </div>

                          <div className="flex-1 mx-4 flex flex-col items-center">
                            <p className="text-xs text-gray-500 mb-2">
                              {booking.flight.stops === 0 ? "Direct Flight" : `${booking.flight.stops} stop${booking.flight.stops === 1 ? "" : "s"}`}
                            </p>
                            <div className="w-full h-px bg-gray-300 mb-2"></div>
                            <p className="text-xs text-gray-600">{duration}</p>
                          </div>

                          <div className="text-center flex-1">
                            <p className="text-sm text-gray-500 mb-1">Arrival</p>
                            <p className="text-2xl font-bold text-gray-800">{booking.flight.arrivalAirport}</p>
                            <p className="text-lg font-semibold text-gray-700">{formatTime(booking.flight.arrivalTime)}</p>
                            <p className="text-xs text-gray-500">{formatDate(booking.flight.arrivalTime)}</p>
                          </div>
                        </div>
                      </div>

                      {/* Passenger and Flight Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                        <div>
                          <p className="text-sm text-gray-500">Passenger</p>
                          <p className="font-semibold text-gray-800">{booking.passengerName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Flight</p>
                          <p className="font-semibold text-gray-800">{booking.flight.flightNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-semibold text-gray-800">{booking.passengerEmail}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-semibold text-gray-800">{booking.passengerPhone}</p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                        <span className="text-gray-700 font-semibold">Total Cost:</span>
                        <span className="text-2xl font-bold text-[#8B1E3F]">{formatPrice(booking.totalPrice)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
