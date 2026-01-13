import { Flight } from "@/types";
import { parseISO } from "date-fns";

export function calculateFlightDuration(
  departureTime: string,
  arrivalTime: string
): string {
  const departure = new Date(departureTime);
  const arrival = new Date(arrivalTime);

  const durationMs = arrival.getTime() - departure.getTime();
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDate(dateString: string): string {
  const date = parseISO(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatPrice(price: number): string {
  return `$${price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function enrichFlightWithDuration(flight: Flight): Flight {
  return {
    ...flight,
    duration: calculateFlightDuration(flight.departureTime, flight.arrivalTime),
  };
}

export function generateConfirmationCode(): string {
  return `SFTK${Date.now().toString(36).toUpperCase()}${Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase()}`;
}
