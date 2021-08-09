import { ErrorSharp, LaptopWindowsRounded } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { apiActions, gameActions } from "../../_actions";
import { shuffle, zeroFill } from "../../_helpers";
import GameTemplate from "../GameTemplate";
import Core from "./core";
import Feedback from "./feedback";

import { checkErros, genFeedbackMessages } from "./helpers";

const Game7 = (props) => {
  let dispatch = useDispatch();

  const load = (missionData, lang, state, setState) => {
    if (missionData && !state.email) {
      let dateArray = missionData.mail.date.split("-");
      let email = {
        ...missionData.mail,
        date: dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0],
        titleTranslate: missionData.mail.titleTranslate.find((title) => {
          return title.language.id === lang;
        }).text,
      };

      let cities = missionData.cities.map((city) => ({
        id: city.id,
        name: city.name,
        image: city.image ? city.image.url : "",
        correct: city.correct,
      }));

      let flights = missionData.flights.reduce(
        (acc, flight) => {
          acc[flight.type] = [
            ...acc[flight.type],
            {
              id: flight.id,
              number: zeroFill(`${Math.floor(Math.random() * 10000)}`, 4),
              period: flight.period,
              departure: flight.departure.replace(":00.000", ""),
              arrival: flight.arrival.replace(":00.000", ""),
              correct: flight.correct,
            },
          ];
          return acc;
        },
        { going: [], return: [] }
      );

      let phrases = missionData.phrases
        .sort((a, b) => (a.order > b.order ? 1 : -1))
        .reduce(
          (acc, phrase) => [
            ...acc,
            {
              id: phrase.id,
              maxWordsCount: phrase.maxWordsCount,
              size: phrase.size,
              words: shuffle(
                phrase.words
                  .filter((word) => word.preset)
                  .map((word) => word.text)
              ),
              rightOrder: phrase.words
                .filter((word) => word.correct)
                .sort((a, b) => (a.order > b.order ? 1 : -1)),
              extraFields: phrase.words
                .filter((word) => !word.preset)
                .sort((a, b) => (a.order > b.order ? 1 : -1)),
            },
          ],
          []
        );

      setState((s) => {
        return {
          ...s,
          data: {
            date: missionData.mail.date,
            email,
            cities,
            flights,
            phrases,
            days: missionData.days,
            month: missionData.month,
            peopleCount: missionData.peopleCount,
          },
        };
      });
    }
  };

  const loadFeedback = (data, missionId, userId) => {
    let errors = checkErros(data);

    dispatch(
      gameActions.create("results", {
        user: userId,
        mission: missionId,
        won: errors.length === 0,
        userErrors: errors.length ? JSON.stringify(errors) : null,
      })
    );

    return {
      won: errors.length === 0,
      messages: genFeedbackMessages(
        errors,
        data.userAnswers.city.name,
        data.email.senderName
      ),
    };
  };

  return (
    <GameTemplate
      Core={Core}
      Feedback={Feedback}
      missionId={props.match.params.id}
      loadData={load}
      loadFeedback={loadFeedback}
    />
  );
};

export default Game7;
