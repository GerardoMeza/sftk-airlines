"use client";

import { useState } from "react";
import { X, Luggage, Check } from "lucide-react";

interface AddBaggageModalProps {
  isOpen: boolean;
  onClose: () => void;
  confirmationCode: string;
  currentBaggageCount: number;
  onBaggageAdded: () => void;
}

const BAGGAGE_PRICE_PER_BAG = 30;

export function AddBaggageModal({
  isOpen,
  onClose,
  confirmationCode,
  currentBaggageCount,
  onBaggageAdded,
}: AddBaggageModalProps) {
  const [selectedBags, setSelectedBags] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (!isOpen) return null;

  const totalPrice = selectedBags * BAGGAGE_PRICE_PER_BAG;

  const handleAddBaggage = async () => {
    if (selectedBags === 0) {
      setError("Please select at least 1 bag");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/bookings/${confirmationCode}/add-baggage`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            baggageCount: selectedBags,
            baggagePrice: totalPrice,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add baggage");
      }

      setShowConfirmation(true);
      setTimeout(() => {
        onBaggageAdded();
        onClose();
        setShowConfirmation(false);
        setSelectedBags(0);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add baggage");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading && !showConfirmation) {
      setSelectedBags(0);
      setError("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {showConfirmation ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-[#1f2f5c] mb-2">
              Baggage Added Successfully!
            </h3>
            <p className="text-gray-600">
              {selectedBags} {selectedBags === 1 ? "bag" : "bags"} added to your
              booking
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="bg-gradient-to-r from-[#11172b] to-[#1f2f5c] text-white p-6 flex items-center justify-between rounded-t-lg">
              <div className="flex items-center gap-3">
                <Luggage className="w-6 h-6" />
                <h2 className="text-xl font-bold">Add Baggage</h2>
              </div>
              <button
                onClick={handleClose}
                disabled={isLoading}
                className="text-white hover:bg-black hover:bg-opacity-20 rounded-full p-2 transition disabled:opacity-50"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="mb-6">
                <p className="text-gray-600 mb-1">Booking Confirmation</p>
                <p className="font-mono font-bold text-[#1f2f5c]">
                  {confirmationCode}
                </p>
              </div>

              {currentBaggageCount > 0 && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">Current baggage:</span>{" "}
                    {currentBaggageCount}{" "}
                    {currentBaggageCount === 1 ? "bag" : "bags"}
                  </p>
                </div>
              )}

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Select additional baggage:
                </p>
                <div className="space-y-3">
                  {[1, 2].map((count) => (
                    <button
                      key={count}
                      onClick={() => setSelectedBags(count)}
                      disabled={isLoading}
                      className={`w-full p-4 border-2 rounded-lg transition flex items-center justify-between ${
                        selectedBags === count
                          ? "border-[#1f2f5c] bg-blue-50"
                          : "border-gray-200 hover:border-[#1f2f5c] hover:bg-gray-50"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <div className="flex items-center gap-3">
                        <Luggage
                          className={`w-5 h-5 ${
                            selectedBags === count
                              ? "text-[#1f2f5c]"
                              : "text-gray-400"
                          }`}
                        />
                        <span className="font-semibold text-gray-800">
                          {count} {count === 1 ? "Checked Bag" : "Checked Bags"}
                        </span>
                      </div>
                      <span className="font-bold text-[#1f2f5c]">
                        ${count * BAGGAGE_PRICE_PER_BAG}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {selectedBags > 0 && (
                <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Baggage Fee:</span>
                    <span className="font-semibold text-gray-800">
                      ${totalPrice}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-300">
                    <span className="font-bold text-gray-800">New Total:</span>
                    <span className="font-bold text-lg text-[#1f2f5c]">
                      ${totalPrice}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleClose}
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-md font-semibold hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddBaggage}
                  disabled={isLoading || selectedBags === 0}
                  className="flex-1 px-4 py-3 bg-[#8B1E3F] text-white rounded-md font-semibold hover:bg-[#731836] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Adding..." : "Confirm & Add"}
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                * Baggage allowance: 50 lbs (23 kg) per bag
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
