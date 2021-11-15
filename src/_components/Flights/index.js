import React from "react";

import { Round } from "../Button";

import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { aviao } from '../../img'
const Flights = ({ selected, flights, onClick }) => {
  return (
    <React.Fragment>
      {flights &&
        flights.map((flight, index) => (
          <Round
            onClick={() => (onClick ? onClick(flight) : null)}
            style={{
              backgroundColor: selected === flight ? "#ff9999" : "white",
              display: "block", width: '100%', position: 'relative', textAlign: 'left'
            }}
            key={index}
          >
             <img src={aviao} style={{position: 'absolute', left: '-2%', top:'10%', width: '7%'}} alt=""/>
             <div style={{display: 'flex', justifyContent: 'space-between', padding: '0 2% 0 2%'}}>
               <div>Voo {flight.number} </div>
               <div>
                 <span style={{fontWeight: '200'}}>saída</span> {flight.departure}{" "}<KeyboardArrowRightIcon /> <span style={{fontWeight: '200'}}>chegada</span> {flight.arrival}
               </div>
             </div>
        </Round>
        ))}
    </React.Fragment>
  );
};

export default Flights;
