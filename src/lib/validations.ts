import { z } from "zod";

export const passengerInfoSchema = z.object({
  firstName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .regex(/^[a-zA-Z\s]*$/, "Name can only contain letters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .regex(/^[a-zA-Z\s]*$/, "Last name can only contain letters"),
  email: z
    .string()
    .email("Please enter a valid email"),
  phone: z
    .string()
    .regex(/^[0-9\s\+\-\(\)]*$/, "Invalid phone number")
    .min(7, "Phone must have at least 7 digits"),
});

export const searchFlightsSchema = z.object({
  origin: z.string().min(3, "Enter a valid origin airport"),
  destination: z.string().min(3, "Enter a valid destination airport"),
  departureDate: z.string().refine(
    (date) => new Date(date) > new Date(),
    "Departure date must be in the future"
  ),
});

export type PassengerInfo = z.infer<typeof passengerInfoSchema>;
export type SearchFlights = z.infer<typeof searchFlightsSchema>;
