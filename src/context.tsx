import React from 'react';
import { Loader } from './components/loader/Loader';
import { AllFilers, FlightObject, ServerResponse } from './types';

import { getAllCarriers } from './utils/getAllCarriers';
import { getFlightsByCarrier } from './utils/getFlightsByCarrier';
import { getFlightsByMaxPrice, getFlightsByMinPrice } from './utils/getFlightByPrice';
import { sortByType, sortByTranfer } from './utils/sortFlights';

interface ContextProps {
  isLoading: boolean,
  allFlights: FlightObject[],
  showFlights: FlightObject[],
  allCarriers: string[],
  showCount: {count: number, showBtn: boolean},
  increaseShowCount: () => void,
  sortingFlights: (sortObj: AllFilers) => void
}

const FlightsContext = React.createContext<Partial<ContextProps>>({});

export const FlightsContextProvider: React.FC = ({children}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [allFlights, setAllFlights] = React.useState<FlightObject[]>([]);
  const [showFlights, setShowFlights] = React.useState<FlightObject[]>([]);
  const [allCarriers, setAllCarriers] = React.useState<string[]>([]);
  const [showCount, setShowCount] = React.useState<{count: number, showBtn: boolean}>({
    count: 2,
    showBtn: false
  });

  const increaseShowCount = (): void => {
    setShowCount(prevState => {
      const count = prevState.count + 2
      const showBtn = showFlights.length > prevState.count + 2
      return {
        count, showBtn
      }
    });
  }

  const sortingFlights = (sortObj: AllFilers): void => {
    let result: FlightObject[] = [...allFlights];

    if (sortObj.carrier) {
      result = getFlightsByCarrier(sortObj.carrier, allFlights)
    }

    if (sortObj.order) {
      result = sortByType(sortObj.order, result);
    }

    if (sortObj.transfer) {
      result = sortByTranfer(sortObj.transfer, result);
    }

    if (sortObj.maxPrice) {
      result =  getFlightsByMaxPrice(result, sortObj.maxPrice)
    }

    if (sortObj.minPrice) {
      result = getFlightsByMinPrice(result, sortObj.minPrice)
    }

    setShowFlights(prevState => result);
    setShowCount(prevState => {
      const count = 2
      const showBtn = result.length > prevState.count + 2
      return {
        count, showBtn
      }
    });
  }
  
  React.useEffect(() => {
    (async function(){
      try {
        const req = await fetch(process.env.REACT_APP_BASE_URL!);
        const res = await req.json() as ServerResponse;
        setAllFlights(res.flights);
        setAllCarriers(getAllCarriers(res.flights));
        setShowFlights(res.flights);
        setShowCount(prevState => {
          const count = 2
          const showBtn = res.flights.length > 2
          return {
            count, showBtn
          }
        });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const value:ContextProps = {
    allFlights, 
    isLoading, 
    showFlights, 
    allCarriers, 
    showCount,
    increaseShowCount,
    sortingFlights
  };

  return (
    <FlightsContext.Provider value={value}>
      {isLoading ? <Loader/> : children}
    </FlightsContext.Provider>
  )
}

export const UseFlightsContext = () => React.useContext(FlightsContext);