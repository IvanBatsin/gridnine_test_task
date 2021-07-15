import React from "react";
import './flightsList.scss';

import { UseFlightsContext } from '../../context';

import { FlightItem } from '../flightItem/FlightItem';

export const FlightsList: React.FC = () => {
  const { showCount, increaseShowCount, showFlights } = UseFlightsContext();
  return (
    <div className="flights_list">
      {showFlights!.length > 0 ?
        <>
          <ul>
            {showFlights?.map((flight, index) => {
              if (index + 1 <= showCount!.count) {
                return <li key={index}><FlightItem flight={flight}/></li>
              }
              return null;
            })}
          </ul>
          {showCount?.showBtn && <button onClick={increaseShowCount} className="btn show-more">Показать еще</button>}
        </>
        :
        <h3>Ничего не найдено</h3>
      }
    </div>
  )
}