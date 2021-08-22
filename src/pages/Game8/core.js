import React from "react";

import WindowScreen from "../../_components/WindowScreen";
import BuyTicketsLoop from "../../_components/BuyTicketsLoop";

import Button from "@material-ui/core/Button";
import Map from "../../_components/Map";

import initialState from "./initialState";
import { format } from "date-fns";
import { months } from "../../_helpers";
import Email from "../../_components/Email";
import SendEmail from "../../_components/SendEmail";
import { checkBookingError } from "./helpers";

const Core = ({ exitGame, data, onEndGame }) => {
  const [state, setState] = React.useState(initialState());
  // {state.dates[0].day}/{state.dates[0].month + 1}
  const createTexts = () => [
    `Seu voo é para ${state.userAnswers.city.name}.`,
    `Você vai em ${
      months[parseInt(state.userAnswers.dates.going.month)]
    }, no dia  ${state.userAnswers.dates.going.day}.`,
    `A viagem é de ${state.userAnswers.flights.going.period}.`,
    `Você volta no dia ${state.userAnswers.dates.return.day}.`,
    `A viagem é de ${state.userAnswers.flights.going.period}.`,
    `${state.userAnswers.tickets} pessoas vão viajar.`,
  ];

  const getMessage = () => {
    return data.messages.find((message) => {
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
              state.userAnswers.reservation.hotel.correct
          );
        case "directions":
          return (
            message.type === state.emailType && message.order === state.order
          );
        default:
          return {};
      }
    });
  };

  return (
    <React.Fragment>
      {state.window === "BUY_TICKETS" && (
        <BuyTicketsLoop
          data={data}
          onDone={(buyTicketsData) =>
            setState((s) => ({
              ...s,
              userAnswers: { ...buyTicketsData, sentences: [] },
              window: "SEND_BOOKING_EMAIL",
            }))
          }
        />
      )}

      {state.window !== "BUY_TICKETS" && (
        <WindowScreen
          style={{
            position: "absolute",
            left: "10%",
            width: state.showEmail ? "30%" : "70%",
            height: state.showEmail ? "30%" : "70%",
            margin: "10% auto 0 auto",
            fontSize: "3em",
          }}
        >
          {state.window === "SEND_BOOKING_EMAIL" && (
            <React.Fragment>
              <SendEmail
                phrases={[]}
                onConfirm={() =>
                  setState((s) => ({
                    ...s,
                    window: "CLIENT_RESPONSE",
                    emailType: "flight",
                  }))
                }
                email={{
                  ...data.email,
                  message: createTexts().join(" "),
                }}
              />
            </React.Fragment>
          )}

          {state.window === "CLIENT_RESPONSE" && (
            <Email
              email={{
                ...data.email,
                message: getMessage().text,
              }}
              onReady={() =>
                setState((s) => ({
                  ...s,
                  window: "MAP",
                  showEmail: s.emailType !== "flight" ? true : false,
                }))
              }
            />
          )}

          {state.showEmail && (
            <SendEmail
              phrases={[getMessage().responseEmail]}
              onConfirm={(sentences) => {
                if (
                  state.order ===
                  data.messages.filter(
                    (message) => message.type === "directions"
                  ).length
                )
                  onEndGame({
                    ...data,
                    userAnswers: {
                      ...state.userAnswers,
                      sentences: [...state.userAnswers.sentences, ...sentences],
                    },
                  });
                else
                  setState((s) => ({
                    ...s,
                    window: "CLIENT_RESPONSE",
                    emailType: "directions",
                    order: s.order + 1,
                    userAnswers: {
                      ...s.userAnswers,
                      sentences: [...s.userAnswers.sentences, ...sentences],
                    },
                    showEmail: false,
                  }));
              }}
              email={{
                ...data.email,
                message: getMessage().responseEmail.message,
              }}
            />
          )}
        </WindowScreen>
      )}

      {state.window === "MAP" && (
        <WindowScreen
          style={{
            position: "absolute",
            left: state.showEmail ? "40%" : "10%",
            width: state.showEmail ? "50%" : "70%",
            height: state.showEmail ? "50%" : "70%",
            margin: "10% auto 0 auto",
            fontSize: "3em",
          }}
        >
          <Map
            locations={data.locations}
            onConfirm={(reservation) => () =>
              setState((s) => ({
                ...s,
                window: "CLIENT_RESPONSE",
                emailType: "hotel",
                userAnswers: {
                  ...s.userAnswers,
                  ...reservation,
                },
                showEmail: false,
              }))}
            mapImage={
              state.userAnswers.city.map ? state.userAnswers.city.map : ""
            }
            showEmail={state.showEmail}
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
