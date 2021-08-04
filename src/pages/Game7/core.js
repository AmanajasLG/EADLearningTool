import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link, Redirect } from "react-router-dom";
import { Redirect } from "react-router-dom";
import "./index.scss";

import WindowScreen from "../../_components/WindowScreen";
import BuyTicketsLoop from "../../_components/BuyTicketsLoop";
import SendEmail from "../../_components/SendEmail";

import initialState from "./initialState";
import { WorkSharp } from "@material-ui/icons";
import { format } from "date-fns";
import { months, shuffle } from "../../_helpers";

const Core = ({ exitGame, data, onEndGame }) => {
  const [state, setState] = React.useState({ ...initialState() });

  const createTexts = () => {
    return [...data.phrases].map((phrase) => {
      phrase.extraFields.forEach((extraField, index) => {
        let periods = ["manhã", "tarde", "noite", "madrugada"];

        switch (extraField.type) {
          case "city":
            if (!phrase.words.includes(state.city.name))
              phrase.words.push(state.city.name);

            phrase.rightOrder.map((word) => {
              if (!word.preset && word.type === extraField.type) {
                word.preset = true;
                word.text = state.city.name;
              }

              return word;
            });

            while (phrase.words.length < phrase.maxWordsCount) {
              let word =
                data.cities[Math.floor(Math.random() * data.cities.length)]
                  .name;

              if (!phrase.words.includes(word)) phrase.words.push(word);
            }

            break;
          case "month":
            if (
              !phrase.words.includes(
                months[parseInt(format(state.dates.return, "M")) - 1]
              )
            )
              phrase.words.push(
                months[parseInt(format(state.dates.return, "M")) - 1]
              );

            phrase.rightOrder.map((word) => {
              if (!word.preset && word.type === extraField.type) {
                word.preset = true;
                word.text =
                  months[parseInt(format(state.dates.return, "M")) - 1];
              }

              return word;
            });

            while (phrase.words.length < phrase.maxWordsCount - 2) {
              let word = months[Math.floor(Math.random() * months.length)];

              if (!phrase.words.includes(word)) phrase.words.push(word);
            }
            break;
          case "day":
            phrase.words.push(format(state.dates.going, "dd"));
            phrase.words.push(format(state.dates.return, "dd"));

            phrase.rightOrder.map((word) => {
              if (!word.preset && word.type === extraField.type) {
                word.preset = true;
                if (index === 1) word.text = format(state.dates.going, "dd");
                else word.text = format(state.dates.return, "dd");
              }

              return word;
            });

            break;
          case "period":
            phrase.words.push(state.flights.going.period);
            if (!phrase.words.includes(state.flights.return.period))
              phrase.words.push(state.flights.return.period);

            phrase.rightOrder.map((word) => {
              if (!word.preset && word.type === extraField.type) {
                word.preset = true;
                if (index === 2) word.text = state.flights.going.period;
                else word.text = state.flights.return.period;
              }

              return word;
            });

            while (phrase.words.length < phrase.maxWordsCount) {
              let word = periods[Math.floor(Math.random() * periods.length)];

              if (!phrase.words.includes(word)) phrase.words.push(word);
            }
            break;
          case "peopleCount":
            if (!phrase.words.includes(state.tickets))
              phrase.words.push(state.tickets);

            phrase.rightOrder.map((word) => {
              if (!word.preset && word.type === extraField.type) {
                word.preset = true;
                word.text = state.tickets;
              }

              return word;
            });

            break;
          default:
        }
      });

      phrase.words = shuffle(
        phrase.words.map((word) => ({ text: word, picked: false }))
      );

      return phrase;
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
            margin: "5% auto 0 auto",
            fontSize: "3em",
          }}
        >
          <SendEmail
            phrases={createTexts()}
            onConfirm={(sentences) =>
              onEndGame({ tickets: state.tickets, sentences })
            }
          />
        </WindowScreen>
      )}
    </div>
  );
};

export default Core;
