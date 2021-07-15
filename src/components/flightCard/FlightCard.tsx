import React from "react";
import './flightCard.scss';

import { getHourseAndMinutes, getHours, getFullDate } from "../../utils/formatDates";
import { FlightLegsSegment } from "../../types";

interface FlightCardProps {
  totalDuration: number,
  price: string,
  isHeader?: boolean ,
  segment: FlightLegsSegment,
  transfer: boolean,
  divider?: boolean 
}

export const FlightCard: React.FC<FlightCardProps> = ({totalDuration, price, isHeader, segment, transfer, divider}) => {
  let cls = divider ?  'flight_item divider' : 'flight_item';
  return (
    <div className={cls}>
      {isHeader &&
        <div className="flight_item_header">
          <span className="logo">{segment.airline.caption}</span>
          <div className="flight_price">
            <span className="price">{price} ₽</span>
            <span className="info">Стоимость для одного взрослого человека</span>
          </div>
        </div>
      }
      <div className="from_to">
        <div className="from">{segment.departureCity?.caption || 'Unknown'}, {segment.departureAirport.caption} <span className="blue">({segment.departureAirport.uid})</span></div>
        <span className="blue divider">&rarr;</span>
        <div className="to">{segment.arrivalAirport.caption}, {segment.arrivalCity.caption} <span className="blue">({segment.arrivalAirport.uid})</span></div>
      </div>
      <div className="travel_time">
        <div className="departure_time">
          <b>{getHours(segment.departureDate)}</b>
          <span className="departure_date blue">{getFullDate(segment.departureDate)}</span>
        </div>
        <div className="total_time">&#9200; {getHourseAndMinutes(totalDuration)}</div>
        <div className="arrival_time">
          <span className="arrival_date blue">{getFullDate(segment.arrivalDate)}</span>
          <b>{getHours(segment.arrivalDate)}</b>
        </div>
      </div>
      <div className="stops">
        {transfer && <span>1 пересадка</span>}
      </div>
      <div className="carrier">Рейс выполняет: {segment.airline.caption}</div>
    </div>
  )
}