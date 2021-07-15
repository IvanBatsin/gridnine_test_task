import { FlightObject } from "../types";

export const getFlightsByCarrier = (carriers: string[], flights: FlightObject[]): FlightObject[] => {
  return flights.filter(flight => {
    if (carriers.includes(flight.flight.carrier.caption)) {
      return flight;
    }
  });
}