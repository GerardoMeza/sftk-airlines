"use client";

import { Flight } from "@/types";
import { formatTime, formatPrice, calculateFlightDuration, formatDate } from "@/utils/format";
import { Plane, Users } from "lucide-react";
import { useRouter } from "next/navigation";

interface FlightListProps {
  flights: Flight[];
  onSelectFlight?: (flight: Flight) => void;
}

export function FlightList({ flights, onSelectFlight }: FlightListProps) {
  const router = useRouter();

  const handleSelectFlight = (flight: Flight) => {
    if (onSelectFlight) {
      onSelectFlight(flight);
    } else {
      // Store flight data in sessionStorage for booking
      sessionStorage.setItem("selectedFlight", JSON.stringify(flight));
      router.push("/booking");
    }
  };

  if (flights.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <Plane className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">
          No flights available for your search
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-[#1f2f5c] mb-6">
        Available Flights
      </h2>

      {flights.map((flight) => {
        const duration = calculateFlightDuration(
          flight.departureTime,
          flight.arrivalTime
        );

        return (
          <div
            key={flight.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200"
          >
            <div className="p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                {/* Flight Info */}
                <div>
                  <p className="text-sm text-gray-500 font-semibold mb-1">
                    {flight.flightNumber}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatDate(flight.departureTime)}
                  </p>
                </div>

                {/* Route */}
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between md:justify-start md:gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-800">
                        {flight.departureAirport}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatTime(flight.departureTime)}
                      </p>
                    </div>

                    <div className="flex-1 mx-2 md:mx-4 flex items-center justify-center">
                      <div className="flex-grow h-px bg-gray-300"></div>
                      <div className="mx-2 flex items-center gap-1">
                        {flight.stops === 0 ? (
                          <Plane className="w-4 h-4 text-gray-600" />
                        ) : (
                          <span className="text-xs font-semibold text-gray-600 px-2 py-1 bg-gray-100 rounded">
                            {flight.stops} {flight.stops === 1 ? "stop" : "stops"}
                          </span>
                        )}
                      </div>
                      <div className="flex-grow h-px bg-gray-300"></div>
                    </div>

                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-800">
                        {flight.arrivalAirport}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatTime(flight.arrivalTime)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 text-center">
                    <p className="text-xs text-gray-500">Duration: {duration}</p>
                  </div>
                </div>

                {/* Seats and Price */}
                <div className="text-center md:text-right">
                    <p className="flex items-center justify-center md:justify-end gap-1 text-sm text-gray-600 mb-2">
                    <Users className="w-4 h-4" />
                    {flight.availableSeats} available
                  </p>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between md:flex-col md:items-end gap-2">
                  <div className="text-right">
                    <p className="text-xs text-gray-500">From</p>
                    <p className="text-2xl font-bold text-[#8B1E3F]">
                      {formatPrice(flight.price)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleSelectFlight(flight)}
                    className="bg-[#1f2f5c] hover:brightness-125 text-white font-semibold py-2 px-6 rounded-md transition md:w-full"
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
