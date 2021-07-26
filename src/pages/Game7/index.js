import { LaptopWindowsRounded } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { apiActions, gameActions } from "../../_actions";
import { shuffle } from "../../_helpers";

import GameTemplate from "../GameTemplate";
import Core from "./core";
import Feedback from "./feedback";

const Game7 = (props) => {
  const load = (missionData, lang, state, setState) => {
    if (missionData && !state.email) {
      let email = {
        ...missionData.mail,
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
                  .map((word) => ({
                    id: word.id,
                    text: word.text,
                  }))
              ),
              rightOrder: phrase.words
                .filter((word) => word.correct)
                .sort((a, b) => (a.order > b.order ? 1 : -1)),
              extraFields: phrase.words.filter((word) => !word.preset),
            },
          ],
          []
        );

      setState((s) => {
        return {
          ...s,
          data: {
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

  return (
    <GameTemplate
      Core={Core}
      Feedback={Feedback}
      missionId={props.match.params.id}
      loadData={load}
    />
  );
};

export default Game7;
