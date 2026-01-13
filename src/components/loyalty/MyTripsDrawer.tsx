"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { X, Calendar, MapPin, Plane } from "lucide-react";
import { formatTime, formatDate, calculateFlightDuration } from "@/utils/format";
import { BookingDetails } from "@/components/booking/BookingDetails";

interface Booking {
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
}

interface MyTripsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MyTripsDrawer({ isOpen, onClose }: MyTripsDrawerProps) {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (isOpen && user) {
      fetchBookings();
    }
  }, [isOpen, user]);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/bookings/my-bookings", {
        headers: {
          "User-Id": user?.id || "",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = async (confirmationCode: string) => {
    try {
      const response = await fetch(`/api/bookings/${confirmationCode}`);
      if (response.ok) {
        const booking = await response.json();
        setSelectedBooking(booking);
      }
    } catch (error) {
      console.error("Error fetching booking details:", error);
    }
  };

  const handleBackToList = () => {
    setSelectedBooking(null);
  };

  const handleBookingUpdate = () => {
    fetchBookings();
    handleViewDetails(selectedBooking!.confirmationCode);
  };

  if (!isOpen) return null;
  // Show booking details if a booking is selected
  if (selectedBooking) {
    return (
      <div className="fixed inset-0 z-50">
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={onClose}
        />
        <BookingDetails
          booking={selectedBooking}
          onClose={onClose}
          onBack={handleBackToList}
          onUpdate={handleBookingUpdate}
        />
      </div>
    );
  }

  // Show trip list

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl overflow-y-auto animate-fadeIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#11172b] to-[#1f2f5c] text-white p-6 flex items-center justify-between sticky top-0">
          <h2 className="text-2xl font-bold">My Trips</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-black hover:bg-opacity-20 rounded-full p-2 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin">
                <Plane className="w-8 h-8 text-[#1f2f5c]" />
              </div>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No trips yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                >
                  {/* Confirmation Code */}
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 font-semibold">
                      Confirmation
                    </p>
                    <p className="text-sm font-mono font-bold text-[#1f2f5c]">
                      {booking.confirmationCode}
                    </p>
                  </div>

                  {/* Route */}
                  {booking.departureAirport && booking.arrivalAirport && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <p className="text-sm font-bold text-gray-800">
                            {booking.departureAirport}
                          </p>
                          {booking.departureTime && (
                            <p className="text-xs text-gray-500">
                              {formatTime(booking.departureTime)}
                            </p>
                          )}
                        </div>

                        <div className="flex-1 mx-2">
                          <div className="h-px bg-gray-300"></div>
                        </div>

                        <div className="text-center">
                          <p className="text-sm font-bold text-gray-800">
                            {booking.arrivalAirport}
                          </p>
                          {booking.arrivalTime && (
                            <p className="text-xs text-gray-500">
                              {formatTime(booking.arrivalTime)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Flight Number & Date */}
                  <div className="mb-3 pt-3 border-t border-gray-100">
                    {booking.flightNumber && (
                      <p className="text-xs text-gray-600 mb-1">
                        <span className="font-semibold">Flight:</span>{" "}
                        {booking.flightNumber}
                      </p>
                    )}
                    {booking.departureTime && (
                      <p className="text-xs text-gray-600 mb-1">
                        <span className="font-semibold">Date:</span>{" "}
                        {formatDate(booking.departureTime)}
                      </p>
                    )}
                    <p className="text-xs text-gray-600">
                      <span className="font-semibold">Passenger:</span>{" "}
                      {booking.passengerName}
                    </p>
                  </div>

                  {/* Action Button */}
                  <button 
                    onClick={() => handleViewDetails(booking.confirmationCode)}
                    className="w-full mt-3 text-sm bg-[#1f2f5c] hover:brightness-125 text-white font-semibold py-2 rounded transition"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
