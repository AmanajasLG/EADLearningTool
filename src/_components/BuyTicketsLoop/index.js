import React from "react";
import { useDispatch, useSelector } from "react-redux";

import WindowScreen from "../WindowScreen";
import Email from "../Email";
import Cities from "../Cities";
import ScheduleTicket from "../ScheduleTicket";
import { months } from "../../_helpers";
import { format } from "date-fns";

import initialState from "./initialState";
import {agendamento, emailIcon, destino} from '../../img'

const BuyTicketsLoop = ({ data, onDone }) => {
  const [state, setState] = React.useState(initialState());

  const ticketData = () => ({
    city: state.city,
    days: Math.ceil((state.dates[1] - state.dates[0]) / (1000 * 60 * 60 * 24)),
    dates: {
      going: state.dates[0],
      return: state.dates[1],
    },
    tickets: state.tickets + 1,
    flights: state.flights,
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
              email={
                data.email.message
                  ? data.email
                  : {
                      ...data.email,
                      message: data.messages.find(
                        (message) => message.type === "init"
                      ).text,
                    }
              }
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
              date={data.date}
              type={state.type}
              typeUpdate={() =>
                setState((s) => ({
                  ...s,
                  type: s.type === "going" ? "return" : "going",
                }))
              }
              dates={state.dates}
              flightsSelected={state.flights}
              tickets={state.tickets}
              flights={data.flights}
              flightSelected={(flight) =>
                setState((s) => ({
                  ...s,
                  flights: { ...s.flights, [s.type]: flight },
                }))
              }
              counterChange={(value) =>
                setState((s) => ({ ...s, tickets: value }))
              }
              onConfirm={() =>
                setState((s) => ({ ...s, window: "NONE", confirmWindow: true }))
              }
              dateSelected={(data) =>
                setState((s) => ({
                  ...s,
                  dates: [...data.dates],
                }))
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
            <div>Destino: {state.city.name}</div>
            <div>
              Ida:
              <div>Dia: {state.dates[0].day}/{state.dates[0].month + 1}</div>
              <div>
                Horário: {state.flights.going.departure} -{" "}
                {state.flights.going.arrival}
              </div>
            </div>
            <div>
              Volta:
              <div>Dia: {state.dates[1].day}/{state.dates[1].month + 1}</div>
              <div>
                Horário: {state.flights.return.departure} -{" "}
                {state.flights.return.arrival}
              </div>
            </div>
            <button
              onClick={() =>
                setState((s) => ({
                  ...s,
                  confirmWindow: false,
                  window: "SCHEDULE",
                }))
              }
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
          height: "70%",
          position: "absolute",
          top: "5%",
          right: "2%",
          backgroundColor: "#336573",
          padding: "1% 2% 1% 2%",
          justifyContent: "space-evenly",
          borderRadius: "6%/2%",
        }}
      >
        <div style={{ backgroundColor: "#aaaaff", borderRadius: "50%" }}>
          <img
            style={{ cursor: "pointer" }}
            onClick={() => setState((s) => ({ ...s, window: "EMAIL" }))}
            src={emailIcon}
            alt=""
          />
        </div>
        <div style={{ backgroundColor: "#aaaaff", borderRadius: "50%" }}>
          <img
            style={{ cursor: "pointer" }}
            onClick={() => setState((s) => ({ ...s, window: "PLACES" }))}
            src={destino}
            alt=""
          />
        </div>
        <div style={{ backgroundColor: "#aaaaff", borderRadius: "50%" }}>
          <img
            style={{ cursor: "pointer" }}
            onClick={() => setState((s) => ({ ...s, window: "SCHEDULE" }))}
            src={agendamento}
            alt=""
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default BuyTicketsLoop;
