"use client";

import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/Header";
import { FlightSearch } from "@/components/flights/FlightSearch";
import { FlightList } from "@/components/flights/FlightList";
import { Flight, FlightSearchParams } from "@/types";
import { Hero } from "@/components/home/Hero";

export default function Home() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasSearched && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hasSearched]);

  const handleSearch = async (params: FlightSearchParams) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/flights/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });

      if (response.ok) {
        const data = await response.json();
        setFlights(data);
        setHasSearched(true);
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      } else {
        console.error("Error searching flights");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* New Hero */}
        <Hero onSearch={handleSearch} isLoading={isLoading} />

        {/* Results Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-12">

          {/* Results Section */}
          {hasSearched && (
            <div ref={resultsRef} className="animate-fadeIn">
              <FlightList flights={flights} />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
