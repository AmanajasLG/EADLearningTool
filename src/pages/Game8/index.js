import { LocationSearching } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";

import { gameActions } from "../../_actions";
import { shuffle, zeroFill } from "../../_helpers";

import GameTemplate from "../GameTemplate";
import Core from "./core";
import Feedback from "./feedback";

import { checkErros, genFeedbackMessages } from "./helpers";

const Game8 = (props) => {
  let dispatch = useDispatch();

  const load = (missionData, lang, state, setState) => {
    if (missionData && !state.email) {
      let dateArray = missionData.email.date.split("-");
      let email = {
        title: missionData.email.title,
        senderName: missionData.email.senderName,
        senderEmail: missionData.email.senderEmail,
        date: dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0],
        titleTranslate: missionData.email.titleTranslate.find((title) => {
          return title.language.id === lang;
        }).text,
      };

      let messages = missionData.email.messages.map((message) => ({
        text: message.message,
        correctChoice: message.correctChoice,
        type: message.type,
        order: message.order,
        responseEmail: message.responseEmail
          ? {
              id: message.responseEmail.id,
              size: message.responseEmail.size,
              message: message.responseEmail.message,
              words: shuffle(
                message.responseEmail.partials.map((partial) => ({
                  text: partial.text,
                  picked: false,
                }))
              ),
              rightOrder: message.responseEmail.partials
                .filter((partial) => partial.correct)
                .sort((a, b) => (a.order > b.order ? 1 : -1)),
            }
          : null,
      }));

      let cities = missionData.cities.map((city) => ({
        id: city.id,
        name: city.name,
        image: city.image ? city.image.url : "",
        map: city.map ? city.map.url : "",
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

      let locations = missionData.locations.map((location) => ({
        id: location.id,
        type: location.type,
        description: location.description,
        name: location.name,
        positionX: location.positionX
          ? location.positionX
          : Math.floor(Math.random() * 596),
        positionY: location.positionY
          ? location.positionY
          : Math.floor(Math.random() * 1179),
        correct: location.correct,
        image: location.image ? location.image.url : "",
      }));

      setState((s) => {
        return {
          ...s,
          data: {
            date: missionData.email.date,
            email,
            messages,
            cities,
            flights,
            locations,
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

export default Game8;
