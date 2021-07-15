import { FlightObject } from "../types";

export const getAllCarriers = (flights: FlightObject[]): string[] => {
  const allValues = flights.map(flight => flight.flight.carrier.caption);
  return [...new Set(allValues)]; 
}