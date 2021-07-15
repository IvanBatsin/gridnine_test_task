import React from 'react';
import './flightItem.scss';

import { FlightObject } from '../../types';
import { FlightCard } from '../flightCard/FlightCard';

interface FlightItemProps {
  flight: FlightObject
}

export const FlightItem: React.FC<FlightItemProps> = ({flight}) => {
  return (
    <>
    {flight.flight.legs.map((leg, index) => {
      return (
        <div key={index}>
          <FlightCard 
            divider={leg.segments.length > 1}
            transfer={leg.segments.length > 1}
            price={flight.flight.price.total.amount}
            totalDuration={leg.segments[0].travelDuration}
            isHeader
            segment={leg.segments[0]}
          />
          {leg.segments.length > 1 && 
            <FlightCard 
              transfer={leg.segments.length > 1}
              price={flight.flight.price.total.amount}
              totalDuration={leg.segments[1].travelDuration}
              segment={leg.segments[1]}
            />
          }
          <button className="btn choose">Выбрать</button>
        </div>
        )
    })}
   </>
  )
}