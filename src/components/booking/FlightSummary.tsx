"use client";

import { Flight } from "@/types";
import {
  formatTime,
  formatPrice,
  calculateFlightDuration,
  formatDate,
} from "@/utils/format";
import { Plane, Clock, AlertCircle } from "lucide-react";

interface FlightSummaryProps {
  flight: Flight;
  showAction?: boolean;
}

export function FlightSummary({
  flight,
  showAction = false,
}: FlightSummaryProps) {
  const duration = calculateFlightDuration(
    flight.departureTime,
    flight.arrivalTime
  );

  return (
    <div className="bg-[#f2f3f5] rounded-lg border border-[#f2f3f5] p-6 mb-6">
      <h3 className="text-lg font-bold text-[#1f2f5c] mb-4 flex items-center gap-2">
        <Plane className="w-5 h-5 text-[#1f2f5c]" />
        Flight Summary
      </h3>

      <div className="bg-white rounded-lg p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Departure */}
          <div>
            <p className="text-xs text-gray-500 font-semibold mb-1">DEPARTURE</p>
            <p className="text-2xl font-bold text-gray-800">
              {flight.departureAirport}
            </p>
            <p className="text-sm text-gray-600">
              {formatDate(flight.departureTime)}
            </p>
            <p className="text-lg font-semibold text-gray-800">
              {formatTime(flight.departureTime)}
            </p>
          </div>

          {/* Duration */}
          <div className="flex flex-col justify-between items-center">
            <p className="text-xs text-gray-500 font-semibold mb-4">DURATION</p>
            <div className="flex items-center gap-3 w-full">
              <div className="flex-grow h-px bg-gray-300"></div>
              {flight.stops === 0 ? (
                <Plane className="w-5 h-5 text-gray-600 flex-shrink-0" />
              ) : (
                <span className="text-xs font-semibold text-gray-600 px-2 py-1 bg-yellow-100 rounded whitespace-nowrap">
                  {flight.stops} {flight.stops === 1 ? "stop" : "stops"}
                </span>
              )}
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>
            <p className="text-sm text-gray-600 mt-4 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {duration}
            </p>
          </div>

          {/* Arrival */}
          <div>
            <p className="text-xs text-gray-500 font-semibold mb-1">ARRIVAL</p>
            <p className="text-2xl font-bold text-gray-800">
              {flight.arrivalAirport}
            </p>
            <p className="text-sm text-gray-600">
              {formatDate(flight.arrivalTime)}
            </p>
            <p className="text-lg font-semibold text-gray-800">
              {formatTime(flight.arrivalTime)}
            </p>
          </div>
        </div>

        {/* Flight Details */}
        <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-4 text-sm">
          <div>
            <p className="text-gray-600">Flight: <span className="font-semibold">{flight.flightNumber}</span></p>
          </div>
          <div>
            <p className="text-gray-600">Available seats: <span className="font-semibold">{flight.availableSeats}</span></p>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="bg-white rounded-lg p-4 border-2 border-[#8B1E3F]">
        <div className="flex items-center justify-between">
          <span className="text-gray-700 font-semibold">Price per passenger:</span>
          <span className="text-3xl font-bold text-[#8B1E3F]">
            {formatPrice(flight.price)}
          </span>
        </div>
      </div>

      {showAction && flight.availableSeats < 5 && (
        <div className="mt-4 flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
          <p className="text-sm text-yellow-700">
            Only {flight.availableSeats} seat{flight.availableSeats === 1 ? "" : "s"} left
          </p>
        </div>
      )}
    </div>
  );
}
