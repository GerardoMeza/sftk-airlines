"use client";

import { FlightSearch } from "@/components/flights/FlightSearch";
import { FlightSearchParams } from "@/types";

interface HeroProps {
  onSearch: (params: FlightSearchParams) => Promise<void> | void;
  isLoading: boolean;
}

export function Hero({ onSearch, isLoading }: HeroProps) {
  return (
    <section className="relative min-h-[50vh] md:min-h-[60vh] overflow-hidden bg-[#f7fbff]">
      {/* Background image + overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/sftk-airlines-bg.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1f2f5c]/20 via-white/30 to-white/80" />

      {/* Big headline */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24">
        <h1 className="font-display text-[10vw] leading-[0.9] md:text-[7vw] font-extrabold tracking-tight text-[#1f2f5c] uppercase">
          <span className="block opacity-20">Fly</span>
          <span className="block opacity-20">Beyond the</span>
          <span className="block opacity-20">Destination</span>
        </h1>
      </div>

      {/* Search card anchored at bottom center */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full md:absolute md:left-1/2 md:-translate-x-1/2 md:bottom-[-2.5rem] md:pb-0 pb-6 pt-6">
          <div className=" bg-white/25 border border-white/40 shadow-[0_18px_50px_rgba(0,51,102,0.15)] rounded-2xl p-3 md:p-5">
            <FlightSearch onSearch={onSearch} isLoading={isLoading} />
          </div>
        </div>
      </div>

      {/* Decorative accent ribbon bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-3 bg-[#8B1E3F]" />
    </section>
  );
}
