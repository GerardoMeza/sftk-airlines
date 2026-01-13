
"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { MapPin } from "lucide-react";

interface AirportAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: string;
  label: string;
}

const AIRPORTS = [
  { code: "MEX", city: "Mexico City", country: "Mexico" },
  { code: "MIA", city: "Miami", country: "USA" },
  { code: "LAX", city: "Los Angeles", country: "USA" },
  { code: "JFK", city: "New York", country: "USA" },
  { code: "ORD", city: "Chicago", country: "USA" },
  { code: "DFW", city: "Dallas", country: "USA" },
  { code: "ATL", city: "Atlanta", country: "USA" },
  { code: "CUN", city: "Cancun", country: "Mexico" },
  { code: "TIJ", city: "Tijuana", country: "Mexico" },
  { code: "LAS", city: "Las Vegas", country: "USA" },
  { code: "SFO", city: "San Francisco", country: "USA" },
  { code: "SEA", city: "Seattle", country: "USA" },
  { code: "DEN", city: "Denver", country: "USA" },
  { code: "BOS", city: "Boston", country: "USA" },
  { code: "PHX", city: "Phoenix", country: "USA" },
];

export function AirportAutocomplete({
  value,
  onChange,
  onBlur,
  placeholder = "Enter airport code",
  error,
  label,
}: AirportAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate filtered airports using useMemo to avoid setState in effect
  const filteredAirports = useMemo(() => {
    if (value.length === 0) {
      return AIRPORTS;
    }
    return AIRPORTS.filter(
      (airport) =>
        airport.code.toUpperCase().includes(value.toUpperCase()) ||
        airport.city.toUpperCase().includes(value.toUpperCase())
    );
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (code: string) => {
    onChange(code);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value.toUpperCase());
    setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  return (
    <div ref={containerRef} className="relative min-h-[92px]">
      <label className="block text-xs font-bold text-[#11172b]/80 mb-2 tracking-wide uppercase">
        <MapPin className="inline w-3.5 h-3.5 mr-2" />
        {label}
      </label>

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={3}
        className={`w-full px-4 py-3 border rounded-lg bg-white/60 focus:ring-2 focus:ring-[#11172b] focus:border-transparent outline-none transition text-sm ${
          error ? "border-red-500" : "border-gray-300/70"
        }`}
      />

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-xl z-[9999] max-h-64 overflow-y-auto">
          {filteredAirports.length > 0 ? (
            <ul>
              {filteredAirports.map((airport) => (
                <li key={airport.code}>
                  <button
                    type="button"
                    onClick={() => handleSelect(airport.code)}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none transition"
                  >
                    <div>
                      <span className="font-semibold text-gray-800">
                        {airport.code}
                      </span>
                      <span className="text-gray-500 ml-2 text-sm">
                        {airport.city}, {airport.country}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-3 text-gray-500 text-sm text-center">
              No airports found
            </div>
          )}
        </div>
      )}

      <div className="min-h-[20px]">
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    </div>
  );
}
