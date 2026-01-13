"use client";

import { Booking, Flight } from "@/types";
import {
  formatTime,
  formatPrice,
  calculateFlightDuration,
  formatDate,
} from "@/utils/format";
import { CheckCircle, Plane, Mail, Phone, Download, Home, AlertCircle } from "lucide-react";
import Link from "next/link";

interface BookingConfirmationProps {
  booking: Booking;
  flight: Flight;
}

export function BookingConfirmation({
  booking,
  flight,
}: BookingConfirmationProps) {
  const duration = calculateFlightDuration(
    flight.departureTime,
    flight.arrivalTime
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Success Header */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-300 p-8 text-center mb-8">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-[#1f2f5c] mb-2">
          Booking Confirmed!
        </h1>
        <p className="text-gray-600 text-lg">
          Your flight has been successfully booked
        </p>
      </div>

      {/* Confirmation Code */}
      <div className="bg-white rounded-lg border-2 border-[#8B1E3F] p-6 mb-6">
        <p className="text-sm text-gray-600 mb-1">Confirmation Code</p>
        <p className="text-3xl font-bold text-[#8B1E3F] font-mono">
          {booking.confirmationCode}
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Save this code. You will need it for check-in
        </p>
      </div>

      {/* Passenger Info */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Passenger Information
        </h2>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-lg font-semibold text-gray-800">
              {booking.passengerName}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-800">{booking.passengerEmail}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-gray-800">{booking.passengerPhone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flight Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-bold text-[#1f2f5c] mb-4 flex items-center gap-2">
          <Plane className="w-5 h-5" />
          Flight Details
        </h2>

        <div className="space-y-4">
          {/* Route */}
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <p className="text-sm text-gray-500 mb-1">Departure</p>
              <p className="text-2xl font-bold text-gray-800">
                {flight.departureAirport}
              </p>
              <p className="text-lg font-semibold text-gray-700">
                {formatTime(flight.departureTime)}
              </p>
              <p className="text-xs text-gray-500">
                {formatDate(flight.departureTime)}
              </p>
            </div>

            <div className="flex-1 mx-4 flex flex-col items-center">
              <p className="text-xs text-gray-500 mb-2">
                {flight.stops === 0 ? "Direct Flight" : `${flight.stops} stop${flight.stops === 1 ? "" : "s"}`}
              </p>
              <div className="w-full h-px bg-gray-300 mb-2"></div>
              <p className="text-xs text-gray-600">{duration}</p>
            </div>

            <div className="text-center flex-1">
              <p className="text-sm text-gray-500 mb-1">Arrival</p>
              <p className="text-2xl font-bold text-gray-800">
                {flight.arrivalAirport}
              </p>
              <p className="text-lg font-semibold text-gray-700">
                {formatTime(flight.arrivalTime)}
              </p>
              <p className="text-xs text-gray-500">
                {formatDate(flight.arrivalTime)}
              </p>
            </div>
          </div>

          {/* Flight Info */}
          <div className="pt-4 border-t border-gray-200 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Flight</p>
              <p className="font-semibold text-gray-800">{flight.flightNumber}</p>
            </div>
            <div>
              <p className="text-gray-500">Airline</p>
              <p className="font-semibold text-gray-800">{flight.airline}</p>
            </div>
            <div>
              <p className="text-gray-500">Status</p>
              <p className="font-semibold text-green-600 capitalize">
                {booking.status}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Price Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-700">
            Total Cost:
          </span>
          <span className="text-3xl font-bold text-[#8B1E3F]">
            {formatPrice(booking.totalPrice)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button
          onClick={handlePrint}
          className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-md transition flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          Download Ticket
        </button>
        <Link
          href="/"
          className="flex-1 bg-[#1f2f5c] hover:brightness-125 text-white font-semibold py-3 rounded-md transition flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>

      {/* Important Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700">
        <p className="font-semibold mb-2 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          Important Reminders:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Arrive at the airport 2 hours before your flight</li>
          <li>Bring your confirmation code and ID</li>
          <li>A confirmation has been sent to your email</li>
          <li>You can view your booking at any time</li>
        </ul>
      </div>
    </div>
  );
}
