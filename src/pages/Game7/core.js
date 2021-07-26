import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link, Redirect } from "react-router-dom";
import { Redirect } from "react-router-dom";
import "./index.scss";

import WindowScreen from "../../_components/WindowScreen";
import BuyTicketsLoop from "../../_components/BuyTicketsLoop";
import SendEmail from "../../_components/SendEmail";

import initialState from "./initialState";

const Core = ({ exitGame, data, onEndGame }) => {
  const [state, setState] = React.useState({ ...initialState() });

  const createTexts = () => [
    `Seu voo é para ${state.tickets.place}`,
    `Seu voo é dia ${state.tickets.day} de ${state.tickets.month}`,
    `Seu voo é parte as ${state.tickets.flight.takeOff} e com chegada as ${state.tickets.flight.land}`,
    `Seus ${state.tickets.tickets} tickets foram comprados`,
  ];

  return (
    <React.Fragment>
      {state.window === "BUY_TICKETS" && (
        <BuyTicketsLoop
          data={data}
          onDone={(data) =>
            setState((s) => ({ ...s, ...data, window: "SEND_EMAIL" }))
          }
        />
      )}

      {state.window === "SEND_EMAIL" && (
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
          <SendEmail
            texts={createTexts()}
            places={data.places}
            place={data.places[state.tickets.place].name}
            onConfirm={(sentences) =>
              onEndGame({ tickets: state.tickets, sentences })
            }
          />
        </WindowScreen>
      )}
    </React.Fragment>
  );
};

export default Core;
