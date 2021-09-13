import React from "react";

import WindowScreen from "../WindowScreen";
import Email from "../Email";
import Cities from "../Cities";
import ScheduleTicket from "../ScheduleTicket";

import initialState from "./initialState";
import { agendamento, emailIcon, destino } from "../../img";
import { Voltar, Iniciar } from "../Button";
import Blob from "../Blob";

const BuyTicketsLoop = ({ data, onDone }) => {
  const [state, setState] = React.useState(initialState());

  const ticketData = () => ({
    city: state.city,
    days: state.dates[1].day - state.dates[0].day,
    dates: {
      going: { ...state.dates[0], month: state.dates[0].month + 1 },
      return: { ...state.dates[1], month: state.dates[1].month + 1 },
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

      {state.confirmWindow && (
        <React.Fragment>
          <Blob
            style={{
              position: "absolute",
              backgroundColor: "rgba(255,255,255,0.5)",
            }}
            fill="#f9afa1"
          />
          <div
            style={{
              position: "absolute",
              margin: "15% auto",
              fontSize: "3em",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                padding: "0 22% 0 22%",
              }}
            >
              <div
                style={{
                  fontSize: "1.2em",
                  width: "40%",
                  textAlign: "center",
                  paddingTop: "5%",
                }}
              >
                <p>
                  <strong>
                    Tem certeza que terminou?
                    <br />
                    Revise suas escolhas:
                  </strong>
                </p>
                <hr
                  style={{
                    width: "50%",
                    margin: "5% auto",
                    backgroundColor: "white",
                  }}
                />
                <p>
                  Are you sure you're done?
                  <br />
                  Review your choices:
                </p>
              </div>
              <div
                style={{
                  backgroundColor: "#fbbba3",
                  borderRadius: "13%/10%",
                  padding: "5% 3% 5% 3%",
                }}
              >
                <div>
                  <strong>Cidade:</strong> {state.city.name}
                </div>
                <div>
                  <strong>Pessoas:</strong> {state.tickets + 1}
                </div>
                <div>
                  <strong>Partida dia:</strong> {state.dates[0].day}/
                  {state.dates[0].month + 1}
                </div>
                <div>
                  <strong>Horário:</strong> {state.flights.going.departure} -{" "}
                  {state.flights.going.arrival}
                </div>
                <div>
                  <strong>Volta dia:</strong> {state.dates[1].day}/
                  {state.dates[1].month + 1}
                </div>
                <div>
                  <strong>Horário:</strong> {state.flights.return.departure} -{" "}
                  {state.flights.return.arrival}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5%",
              }}
            >
              <Voltar
                onClick={() =>
                  setState((s) => ({
                    ...s,
                    confirmWindow: false,
                    window: "SCHEDULE",
                  }))
                }
              ></Voltar>
              <Iniciar
                label={"Continuar"}
                onClick={() => onDone(ticketData())}
              ></Iniciar>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default BuyTicketsLoop;
