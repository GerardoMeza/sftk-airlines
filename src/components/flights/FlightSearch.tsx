
"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchFlightsSchema } from "@/lib/validations";
import { FlightSearchParams } from "@/types";
import { Search, Calendar } from "lucide-react";
import { AirportAutocomplete } from "./AirportAutocomplete";

interface FlightSearchProps {
  onSearch: (params: FlightSearchParams) => void;
  isLoading?: boolean;
}

export function FlightSearch({ onSearch, isLoading = false }: FlightSearchProps) {
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(searchFlightsSchema),
    defaultValues: {
      origin: "MEX",
      destination: "MIA",
      departureDate: getTomorrowDate(),
    },
  });

  const onSubmit = (data: { origin: string; destination: string; departureDate: string }) => {
    onSearch({
      origin: data.origin.toUpperCase(),
      destination: data.destination.toUpperCase(),
      departureDate: data.departureDate,
      passengers: 1,
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/60 rounded-xl shadow-[0_10px_30px_rgba(17,23,43,0.12)] p-5 md:p-7">
      <h2 className="text-xl md:text-2xl font-bold text-[#1f2f5c] mb-4 uppercase tracking-wide">
        Search Flights
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-0">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2 md:items-end">
          <Controller
            name="origin"
            control={control}
            render={({ field }) => (
              <AirportAutocomplete
                {...field}
                label="Origin"
                placeholder="Enter airport code or city"
                error={errors.origin?.message}
              />
            )}
          />

          <Controller
            name="destination"
            control={control}
            render={({ field }) => (
              <AirportAutocomplete
                {...field}
                label="Destination"
                placeholder="Enter airport code or city"
                error={errors.destination?.message}
              />
            )}
          />

          <div>
            <label className="block text-xs font-semibold text-[#11172b]/80 mb-2 tracking-wide uppercase">
              <Calendar className="inline w-3.5 h-3.5 mr-2" />
              Departure
            </label>
            <Controller
              name="departureDate"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300/80 rounded-md bg-white/80 focus:ring-2 focus:ring-[#11172b] focus:border-transparent text-sm"
                />
              )}
            />
            {errors.departureDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.departureDate.message}
              </p>
            )}
          </div>

          <div className="md:col-span-1 flex md:justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full md:w-auto px-5 md:px-6 h-[52px] bg-[#8B1E3F] hover:bg-[#731836] text-white font-semibold rounded-md transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              <span className="text-sm md:text-base font-semibold">
                {isLoading ? "Searching..." : "Search"}
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}