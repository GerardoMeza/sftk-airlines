// Flight types
export interface Flight {
  id: string;
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: string;
  arrivalTime: string;
  airline: string;
  stops: number;
  availableSeats: number;
  price: number;
  duration?: string;
}

export interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
}

// Booking types
export interface PassengerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Booking {
  id: string;
  confirmationCode: string;
  userId: string;
  flightId: string;
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  status: string;
  totalPrice: number;
  createdAt: string;
}

export interface BookingRequest {
  flight: Flight;
  passengerInfo: PassengerInfo;
}
