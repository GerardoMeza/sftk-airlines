"use client";

import { useState } from "react";
import { X, Calendar, MapPin, Plane, User, Mail, Phone, Luggage, ArrowLeft } from "lucide-react";
import { formatTime, formatDate, calculateFlightDuration } from "@/utils/format";
import { AddBaggageModal } from "./AddBaggageModal";

interface BookingDetailsProps {
  booking: {
    id: string;
    confirmationCode: string;
    passengerName: string;
    passengerEmail: string;
    passengerPhone: string;
    totalPrice: number;
    baggageCount: number;
    baggagePrice: number;
    flightNumber?: string;
    departureAirport?: string;
    arrivalAirport?: string;
    departureTime?: string;
    arrivalTime?: string;
    airline?: string;
  };
  onClose: () => void;
  onBack: () => void;
  onUpdate: () => void;
}

export function BookingDetails({ booking, onClose, onBack, onUpdate }: BookingDetailsProps) {
  const [showBaggageModal, setShowBaggageModal] = useState(false);

  const flightPrice = booking.totalPrice - booking.baggagePrice;
  const duration = booking.departureTime && booking.arrivalTime 
    ? calculateFlightDuration(booking.departureTime, booking.arrivalTime) 
    : null;

  return (
    <>
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl overflow-y-auto animate-fadeIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#11172b] to-[#1f2f5c] text-white p-6 sticky top-0 z-10">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={onBack}
              className="text-white hover:bg-black hover:bg-opacity-20 rounded-full p-2 transition"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold">Booking Details</h2>
            <button
              onClick={onClose}
              className="text-white hover:bg-black hover:bg-opacity-20 rounded-full p-2 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="text-center">
            <p className="text-sm opacity-90 mb-1">Confirmation Code</p>
            <p className="text-2xl font-mono font-bold tracking-wider">
              {booking.confirmationCode}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Flight Information */}
          <div className="border-2 border-[#1f2f5c] rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Plane className="w-5 h-5 text-[#1f2f5c]" />
              <h3 className="font-bold text-lg text-[#1f2f5c]">Flight Information</h3>
            </div>

            {booking.flightNumber && (
              <div className="mb-3">
                <p className="text-xs text-gray-500 font-semibold mb-1">Flight Number</p>
                <p className="text-lg font-bold text-[#1f2f5c]">{booking.flightNumber}</p>
              </div>
            )}

            {booking.departureAirport && booking.arrivalAirport && (
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Departure</p>
                    <p className="text-base font-bold text-gray-800">
                      {booking.departureAirport}
                    </p>
                    {booking.departureTime && (
                      <p className="text-lg font-bold text-[#1f2f5c]">
                        {formatTime(booking.departureTime)}
                      </p>
                    )}
                  </div>

                  <div className="flex-1 mx-4 flex flex-col items-center">
                    <div className="w-full h-px bg-gray-300 relative">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                        <Plane className="w-4 h-4 text-gray-400 rotate-90" />
                      </div>
                    </div>
                    {duration && (
                      <p className="text-xs text-gray-500 mt-1">{duration}</p>
                    )}
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">Arrival</p>
                    <p className="text-base font-bold text-gray-800">
                      {booking.arrivalAirport}
                    </p>
                    {booking.arrivalTime && (
                      <p className="text-lg font-bold text-[#1f2f5c]">
                        {formatTime(booking.arrivalTime)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {booking.departureTime && (
              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">
                    {formatDate(booking.departureTime)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Passenger Information */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-[#1f2f5c]" />
              <h3 className="font-bold text-lg text-[#1f2f5c]">Passenger Details</h3>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 font-semibold mb-1">Name</p>
                <p className="text-base font-semibold text-gray-800">
                  {booking.passengerName}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <p className="text-sm text-gray-600">{booking.passengerEmail}</p>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <p className="text-sm text-gray-600">{booking.passengerPhone}</p>
              </div>
            </div>
          </div>

          {/* Baggage Information */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Luggage className="w-5 h-5 text-[#1f2f5c]" />
                <h3 className="font-bold text-lg text-[#1f2f5c]">Baggage</h3>
              </div>
              {booking.baggageCount === 0 && (
                <button
                  onClick={() => setShowBaggageModal(true)}
                  className="px-4 py-2 bg-[#8B1E3F] text-white text-sm font-semibold rounded-md hover:bg-[#731836] transition"
                >
                  Add Baggage
                </button>
              )}
            </div>

            {booking.baggageCount > 0 ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-700">
                    {booking.baggageCount} Checked {booking.baggageCount === 1 ? "Bag" : "Bags"}
                  </span>
                  <span className="font-semibold text-gray-800">
                    ${booking.baggagePrice.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => setShowBaggageModal(true)}
                  className="w-full px-4 py-2 border-2 border-[#1f2f5c] text-[#1f2f5c] text-sm font-semibold rounded-md hover:bg-[#f2f3f5] transition"
                >
                  Add More Baggage
                </button>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500 text-sm mb-3">No baggage added yet</p>
                <p className="text-xs text-gray-400">
                  Add checked bags to your trip for $30 per bag
                </p>
              </div>
            )}
          </div>

          {/* Price Breakdown */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-bold text-lg text-[#1f2f5c] mb-4">Price Summary</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>Flight Fare</span>
                <span className="font-semibold">${flightPrice.toFixed(2)}</span>
              </div>
              
              {booking.baggagePrice > 0 && (
                <div className="flex justify-between text-gray-700">
                  <span>Baggage Fee</span>
                  <span className="font-semibold">${booking.baggagePrice.toFixed(2)}</span>
                </div>
              )}
              
              <div className="border-t-2 border-gray-300 pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">Total</span>
                  <span className="text-2xl font-bold text-[#1f2f5c]">
                    ${booking.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 border-2 border-green-600 text-green-800 rounded-full font-semibold">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
              Confirmed
            </div>
          </div>
        </div>
      </div>

      {/* Add Baggage Modal */}
      <AddBaggageModal
        isOpen={showBaggageModal}
        onClose={() => setShowBaggageModal(false)}
        confirmationCode={booking.confirmationCode}
        currentBaggageCount={booking.baggageCount}
        onBaggageAdded={onUpdate}
      />
    </>
  );
}
