export interface PricePassengerPrices {
  total: PriceTotals,
  passengerType: ServicesStatusesProps,
  singlePassengerTotal: PriceTotals,
  passengerCount: number,
  tariff: PriceTotals,
  feeAndTaxes: PriceTotals
}

export interface PriceRatesProps {
  amount: string,
  currencyCode: string
}

export interface PriceRates {
  totalUsd: PriceRatesProps,
  totalEur: PriceRatesProps
}

export interface PriceTotals {
  amount: string,
  currency: string,
  currencyCode: string
}

export interface Price {
  total: PriceTotals,
  totalFeeAndTaxes: PriceTotals,
  rates: PriceRates,
  passengerPrices: PricePassengerPrices[]
}

export interface ServicesStatusesProps {
  uid: string,
  caption: string
}

export interface FlightServicesStatuses {
  baggage: ServicesStatusesProps,
  exchange: ServicesStatusesProps,
  refund: ServicesStatusesProps
}

export interface FlightCarrier {
  uid: string,
  caption: string,
  airlineCode: string
}

export interface FlightRefund {
  ADULT: {
    refundableBeforeDeparture : boolean,
    refundableAfterDeparture : boolean
  }
}

export interface FlightExchange {
  ADULT: {
    exchangeableBeforeDeparture: boolean,
    exchangeAfterDeparture: PriceTotals,
    exchangeBeforeDeparture: PriceTotals,
    exchangeableAfterDeparture: boolean
  }
}

export interface FlightSeats {
  count: number,
  type: ServicesStatusesProps
}

export interface FlightLegsSegment {
  classOfServiceCode: string,
  classOfService: ServicesStatusesProps,
  departureAirport: ServicesStatusesProps,
  departureCity: ServicesStatusesProps,
  aircraft: ServicesStatusesProps,
  travelDuration: number,
  arrivalCity: ServicesStatusesProps,
  arrivalDate: string,
  flightNumber: string,
  techStopInfos: any[],
  departureDate: string,
  stops: number,
  servicesDetails: {
    freeCabinLuggage: any,
    paidCabinLuggage: any,
    tariffName?: string,
    fareBasis:{ ADULT: string },
    freeLuggage: {
      ADULT: {
        pieces?: number,
        nil: boolean,
        unit?: string
      }
    },
    paidLuggage: any
  },
  airline: FlightCarrier,
  starting: boolean,
  arrivalAirport: ServicesStatusesProps,
  operatingAirline?: FlightCarrier
}

export interface FlightLegs {
  duration: number,
  segments: FlightLegsSegment[],
}

export interface Flight {
  carrier: FlightCarrier,
  price: Price,
  servicesStatuses: FlightServicesStatuses,
  legs: FlightLegs[],
  airlineAlliance?: ServicesStatusesProps,
  exchange: FlightExchange,
  isTripartiteContractDiscountApplied: boolean,
  international: boolean,
  seats: FlightSeats[],
  refund: FlightRefund
}

export interface FlightObject {
  hasExtendedFare: boolean,
  flight: Flight,
  flightToken: string
}

export interface BestFlights {
  carrier: FlightCarrier,
  price: PriceTotals
}

export interface ServerResponse {
  flights: FlightObject[],
  bestPrices: {
    ONE_CONNECTION: {
      bestFlights: BestFlights[]
    },
    DIRECT: {
      bestFlights: BestFlights[]
    }
  }
}


export type SortTypes = 'asc' | 'desc' | 'duration';
export type SortTypesByTransfer = 'transfer' | 'without';
export type SortTypesByPrice = 'min' | 'max';
export interface AllFilers {
  minPrice: number | undefined,
  maxPrice: number | undefined,
  order: SortTypes | undefined,
  transfer: SortTypesByTransfer | undefined,
  carrier: string[] | undefined
}