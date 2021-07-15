import { FlightObject } from "../types";

export const getFlightsByMinPrice = (flights: FlightObject[], min: number): FlightObject[] => {
  return flights.filter(flight => +flight.flight.price.total.amount > min);
}
export const getFlightsByMaxPrice = (flights: FlightObject[], max: number): FlightObject[] => {
  return flights.filter(flight => +flight.flight.price.total.amount < max);
}