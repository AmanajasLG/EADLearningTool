import React from "react";

import WindowScreen from "../../_components/WindowScreen";
import BuyTicketsLoop from "../../_components/BuyTicketsLoop";

import Button from "@material-ui/core/Button";
import Map from "../../_components/Map";

import initialState from "./initialState";
import { format } from "date-fns";
import { months } from "../../_helpers";
import Email from "../../_components/Email";
import { checkBookingError } from "./helpers";

const Core = ({ exitGame, data, onEndGame }) => {
  const [state, setState] = React.useState(initialState());

  const createTexts = () => [
    `Seu voo é para ${state.userAnswers.city.name}.`,
    `Você vai em ${
      months[parseInt(format(state.userAnswers.dates.going, "M")) - 1]
    }, no dia  ${format(state.userAnswers.dates.going, "dd")}.`,
    `A viagem é de ${state.userAnswers.flights.going.period}`,
    `Você volta no dia ${format(state.userAnswers.dates.return, "dd")}`,
    `A viagem é de ${state.userAnswers.flights.going.period}`,
    `${state.userAnswers.tickets} pessoas vão viajar`,
  ];

  return (
    <React.Fragment>
      {state.window === "BUY_TICKETS" && (
        <BuyTicketsLoop
          data={data}
          onDone={(buyTicketsData) =>
            setState((s) => ({
              ...s,
              userAnswers: buyTicketsData,
              window: "SEND_BOOKING_EMAIL",
            }))
          }
        />
      )}

      {state.window !== "NONE" && (
        <WindowScreen
          style={{
            position: "absolute",
            left: "10%",
            width: "70%",
            height: "70%",
            margin: "10% auto 0 auto",
            fontSize: "3em",
          }}
        >
          {state.window === "SEND_BOOKING_EMAIL" && (
            <React.Fragment>
              {createTexts().map((text, index) => (
                <div key={index}>{text}</div>
              ))}
              <Button
                onClick={() =>
                  setState((s) => ({
                    ...s,
                    window: "CLIENT_RESPONSE",
                    emailType: "flight",
                  }))
                }
              >
                Fechar
              </Button>
            </React.Fragment>
          )}

          {state.window === "CLIENT_RESPONSE" && (
            <Email
              email={{
                ...data.email,
                message: data.messages.find((message) => {
                  switch (state.emailType) {
                    case "flight":
                      return (
                        message.type === state.emailType &&
                        message.correctChoice ===
                          checkBookingError({
                            ...data,
                            userAnswers: { ...state.userAnswers },
                          })
                      );
                    case "hotel":
                      return (
                        message.type === state.emailType &&
                        message.correctChoice ===
                          state.userAnswers.hotel.correct
                      );
                    case "directions":
                      return (
                        message.type === state.emailType &&
                        message.order === state.order
                      );
                    default:
                      return {};
                  }
                }),
              }}
              onReady={() =>
                setState((s) => ({
                  ...s,
                  window: "SEND_EMAIL",
                  showMap: true,
                }))
              }
            />
          )}
        </WindowScreen>
      )}

      {state.showMap && (
        <WindowScreen
          style={{
            position: "absolute",
            left: "10%",
            width: "70%",
            height: "70%",
            margin: "10% auto 0 auto",
            fontSize: "3em",
          }}
        >
          <Map
            data={data.locations}
            onIconClick={data.locations.map((building) => (index) =>
              console.log(`building:${index}`, building)
            )}
          />
        </WindowScreen>
      )}

      {process.env.NODE_ENV === "development" && (
        <div>
          <button
            onClick={() =>
              setState((s) => ({
                ...s,
                window: "SEND_EMAIL",
                tickets: {
                  day: 1,
                  month: 1,
                  place: 1,
                  tickets: 1,
                  flight: { takeOff: "09:00", land: "12:00" },
                },
              }))
            }
          >
            Pula loop ticket
          </button>
        </div>
      )}
    </React.Fragment>
  );
};

export default Core;
