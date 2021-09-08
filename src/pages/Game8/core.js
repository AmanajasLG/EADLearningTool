import React from "react";

import WindowScreen from "../../_components/WindowScreen";
import BuyTicketsLoop from "../../_components/BuyTicketsLoop";

import Button from "@material-ui/core/Button";
import Map from "../../_components/Map";

import initialState from "./initialState";
import { format } from "date-fns";
import { months } from "../../_helpers";
import { agendamento, emailIcon, destino, aviao } from "../../img";
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
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "#0a505f",
      }}
    >
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

      {state.window === "SEND_BOOKING_EMAIL" && (
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
        </WindowScreen>
      )}

      {state.window === "CLIENT_RESPONSE" && (
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
        </WindowScreen>
      )}

      {state.showEmail && (
        <WindowScreen
          style={{
            position: "absolute",
            left: "58%",
            width: state.showEmail ? "30%" : "70%",
            height: "90%",
            margin: "2% auto 0 auto",
            fontSize: "2.5em",
          }}
        >
          <SendEmail
            phrases={[getMessage().responseEmail]}
            onConfirm={(sentences) => {
              if (
                state.order ===
                data.messages.filter((message) => message.type === "directions")
                  .length
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
        </WindowScreen>
      )}

      {state.window === "MAP" && (
        <WindowScreen
          style={{
            position: "absolute",
            left: "1%",
            width: state.showEmail ? "55%" : "80%",
            height: state.showEmail ? "55%" : "80%",
            margin: "5% auto 0 auto",
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

      {state.window !== "BUY_TICKETS" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "10%",
            height: "70%",
            position: "absolute",
            top: "10%",
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
            <img style={{ cursor: "pointer" }} src={aviao} alt="" />
          </div>
          <div style={{ backgroundColor: "#aaaaff", borderRadius: "50%" }}>
            <img style={{ cursor: "pointer" }} src={agendamento} alt="" />
          </div>
          <div style={{ backgroundColor: "#aaaaff", borderRadius: "50%" }}>
            <img
              style={{ cursor: "pointer" }}
              onClick={() => setState((s) => ({ ...s, window: "MAP" }))}
              src={destino}
              alt=""
            />
          </div>
        </div>
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
    </div>
  );
};

export default Core;
