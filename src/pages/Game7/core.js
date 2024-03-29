import React from "react";
import "./index.scss";

import WindowScreen from "../../_components/WindowScreen";
import BuyTicketsLoop from "../../_components/BuyTicketsLoop";
import SendEmail from "../../_components/SendEmail";

import initialState from "./initialState";
import { months, shuffle } from "../../_helpers";

const Core = ({ exitGame, data, onEndGame }) => {
  const [state, setState] = React.useState({ ...initialState() });

  const createTexts = (userData) => {
    data.phrases.map((phrase) => {
      phrase.extraFields.forEach((extraField, index) => {
        let periods = ["manhã", "tarde", "noite", "madrugada"];

        switch (extraField.type) {
          case "city":
            if (!phrase.words.includes(userData.city.name))
              phrase.words.push(userData.city.name);

            phrase.rightOrder.map((word) => {
              if (!word.preset && word.type === extraField.type) {
                word.preset = true;
                word.text = userData.city.name;
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
            if (!phrase.words.includes(months[userData.dates.return.month]))
              phrase.words.push(months[userData.dates.return.month]);

            phrase.rightOrder.map((word) => {
              if (!word.preset && word.type === extraField.type) {
                word.preset = true;
                word.text = months[userData.dates.return.month];
              }

              return word;
            });

            while (phrase.words.length < phrase.maxWordsCount - 2) {
              let word = months[Math.floor(Math.random() * months.length)];

              if (!phrase.words.includes(word)) phrase.words.push(word);
            }
            break;
          case "day":
            phrase.words.push(userData.dates.going.day);
            phrase.words.push(userData.dates.return.day);

            phrase.rightOrder.map((word) => {
              if (!word.preset && word.type === extraField.type) {
                word.preset = true;
                if (index === 1) word.text = userData.dates.going.day;
                else word.text = userData.dates.return.day;
              }

              return word;
            });

            break;
          case "period":
            phrase.words.push(userData.flights.going.period);
            if (!phrase.words.includes(userData.flights.return.period))
              phrase.words.push(userData.flights.return.period);

            phrase.rightOrder.map((word) => {
              if (!word.preset && word.type === extraField.type) {
                word.preset = true;
                if (index === 2) word.text = userData.flights.going.period;
                else word.text = userData.flights.return.period;
              }

              return word;
            });

            while (phrase.words.length < phrase.maxWordsCount) {
              let word = periods[Math.floor(Math.random() * periods.length)];

              if (!phrase.words.includes(word)) phrase.words.push(word);
            }
            break;
          case "peopleCount":
            if (!phrase.words.includes(userData.tickets))
              phrase.words.push(userData.tickets);

            phrase.rightOrder.map((word) => {
              if (!word.preset && word.type === extraField.type) {
                word.preset = true;
                word.text = userData.tickets;
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
          onDone={(buyTicketsData) => {
            createTexts(buyTicketsData);
            setState((s) => ({
              ...s,
              ...buyTicketsData,
              window: "SEND_EMAIL",
            }));
          }}
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
            email={{ ...data.email, message: "" }}
            phrases={data.phrases}
            onConfirm={(sentences) =>
              onEndGame({ ...data, userAnswers: { ...state, sentences } })
            }
          />
        </WindowScreen>
      )}
    </div>
  );
};

export default Core;
