import React from "react";

import Button from "@material-ui/core/Button";

import Airplane from "@material-ui/icons/AirplanemodeActive";
import TakeoffIcon from "@material-ui/icons/FlightTakeoff";
import LandIcon from "@material-ui/icons/FlightLand";

const Flights = ({ selected, flights, onClick }) => {
  return (
    <div>
      {flights &&
        flights.map((flight, index) => (
          <Button
            onClick={() => (onClick ? onClick(flight) : null)}
            style={{
              backgroundColor: selected === flight ? "#ff9999" : "white",
              display: "block",
            }}
            key={index}
          >
            Voo <Airplane /> {flight.number} <TakeoffIcon /> {flight.departure}{" "}
            : {flight.arrival} <LandIcon />
          </Button>
        ))}
    </div>
  );
};

export default Flights;
