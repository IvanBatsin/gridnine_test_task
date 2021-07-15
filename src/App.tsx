import React from 'react';

import { FlightsList } from './components/flightsList/FlightsList';
import { FilterMenu } from './components/filterMenu/FilterMenu';

import { FlightsContextProvider } from './context';

export const App: React.FC = () => {
  const [showFilters, setShowFilters] = React.useState<boolean>(false);

  const handleShowFilters = () => {
    setShowFilters(prevState => !prevState);
  }
  return (
    <FlightsContextProvider>
      <div className="App">
        <button onClick={handleShowFilters} className="btn btn-filters">Фильтры</button>
        <FilterMenu closeFilters={handleShowFilters} show={showFilters}/>
        <FlightsList/>
      </div>
    </FlightsContextProvider>
  );
}