import { FlightObject, SortTypes, SortTypesByTransfer } from "../types";

export const sortByType = (type: SortTypes, flights: FlightObject[]): FlightObject[] => {
  if (type === 'asc') {
    return flights.sort((a, b) => +b.flight.price.total.amount - +a.flight.price.total.amount);
  }

  if (type === 'desc') {
    return flights.sort((a, b) => +a.flight.price.total.amount - +b.flight.price.total.amount);
  }

  return flights.sort((a, b) => +a.flight.legs[0].duration - +b.flight.legs[0].duration);
}

export const sortByTranfer = (type: SortTypesByTransfer, flights: FlightObject[]): FlightObject[] => {
  if (type === 'transfer') {
    return flights.filter(flight => flight.flight.legs[0].segments.length > 1);
  }

  return flights.filter(flight => flight.flight.legs[0].segments.length === 1);
}