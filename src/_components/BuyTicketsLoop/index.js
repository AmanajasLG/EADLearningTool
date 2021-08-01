import React from "react";
import { useDispatch, useSelector } from "react-redux";

import WindowScreen from "../WindowScreen";
import Email from "../Email";
import Cities from "../Cities";
import ScheduleTicket from "../ScheduleTicket";
import { months } from "../../_helpers";

import initialState from "./initialState";

const BuyTicketsLoop = ({ data, onDone }) => {
  const [state, setState] = React.useState(initialState());

  const ticketData = () => ({
    day: state.day,
    month: state.month,
    city: state.city,
    tickets: state.tickets + 1,
    flight: { ...data.flights[state.flight] },
  });

  return (
    <React.Fragment>
      {state.window !== "NONE" && (
        <WindowScreen
          style={{
            position: "absolute",
            left: "10%",
            width: "70%",
            height: "80%",
            margin: "5% auto 0 auto",
            fontSize: "3em",
          }}
        >
          {state.window === "EMAIL" && (
            <Email
              email={data.email}
              onReady={() => setState((s) => ({ ...s, window: "PLACES" }))}
            />
          )}
          {state.window === "PLACES" && (
            <Cities
              value={state.city}
              cities={data.cities}
              onPlaceClick={(index) =>
                setState((s) => ({
                  ...s,
                  city: index,
                }))
              }
              onConfirm={() => setState((s) => ({ ...s, window: "SCHEDULE" }))}
            />
          )}
          {state.window === "SCHEDULE" && (
            <ScheduleTicket
              day={state.day}
              month={state.month}
              flight={state.flight[state.flightType]}
              tickets={state.tickets}
              flights={data.flights[state.flightType]}
              dateSelected={(value) => setState((s) => ({ ...s, day: value }))}
              monthChange={(value) => setState((s) => ({ ...s, month: value }))}
              flightSelected={(value) =>
                setState((s) => ({
                  ...s,
                  flightType: "return",
                  flight: { ...state.flight, [state.flightType]: value },
                }))
              }
              counterChange={(value) =>
                setState((s) => ({ ...s, tickets: value }))
              }
              onConfirm={() =>
                setState((s) => ({ ...s, window: "NONE", confirmWindow: true }))
              }
            />
          )}
        </WindowScreen>
      )}

      {state.confirmWindow && (
        <div style={{ position: "absolute", left: "50%", marginTop: "20%" }}>
          <div
            style={{
              fontSize: "3em",
              position: "relative",
              left: "-50%",
              backgroundColor: "#eeeeff",
            }}
          >
            Terminou? Revise a seleção:
            <div>
              {state.tickets + 1} passage{state.tickets === 0 ? "m" : "ns"}.
            </div>
            <div>Destino: {data.cities[state.city].name}</div>
            <div>Ida:
              <div>Dia: {state.day} de {months[state.month]}</div>
              <div>
                Horário: {data.flights.going[state.flight.going].takeOff} -{" "}
                {data.flights.going[state.flight.going].land}
              </div>
            </div>

            <div>Volta:
              <div>Dia: {state.day} de {months[state.month]}</div>
              <div>
                Horário: {data.flights.return[state.flight.return].takeOff} -{" "}
                {data.flights.return[state.flight.return].land}
              </div>
            </div>
            <button
              onClick={() => setState((s) => ({ ...s, confirmWindow: false }))}
            >
              Voltar
            </button>
            <button onClick={() => onDone(ticketData())}>Avançar</button>
          </div>
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "13%",
          height: '70%',
          position: "absolute",
          top: "5%",
          right: '2%',
          backgroundColor: '#336573',
          padding: '1% 2% 1% 2%',
          justifyContent: 'space-evenly',
          borderRadius: '6%/2%'
        }}
      >
        <div style={{ backgroundColor: "#aaaaff", borderRadius: "50%" }}>
          <img
            style={{ cursor: "pointer" }}
            onClick={() => setState((s) => ({ ...s, window: "EMAIL" }))}
            src="https://res.cloudinary.com/learning-tool/image/upload/v1622937768/Leite_De_Vaca_c1fb94405c.svg"
            alt=""
          />
        </div>
        <div style={{ backgroundColor: "#aaaaff", borderRadius: "50%" }}>
          <img
            style={{ cursor: "pointer" }}
            onClick={() => setState((s) => ({ ...s, window: "PLACES" }))}
            src="https://res.cloudinary.com/learning-tool/image/upload/v1622937768/Leite_De_Vaca_c1fb94405c.svg"
            alt=""
          />
        </div>
        <div style={{ backgroundColor: "#aaaaff", borderRadius: "50%" }}>
          <img
            style={{ cursor: "pointer" }}
            onClick={() => setState((s) => ({ ...s, window: "SCHEDULE" }))}
            src="https://res.cloudinary.com/learning-tool/image/upload/v1622937768/Leite_De_Vaca_c1fb94405c.svg"
            alt=""
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default BuyTicketsLoop;
