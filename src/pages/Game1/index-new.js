import React from "react";
import { useDispatch } from "react-redux";

import GameTemplate from "../GameTemplate";
import Core from "./core";
import Feedback from "./feedback";


const Game7 = (props) => {
  let dispatch = useDispatch();

  const load = (missionData, lang, state, setState) => {
    if (missionData && !state.locations) {
      let data = {};

      //distribute characters in locations
      if (state.locations.length === 0) {
        // data.locations = [...mission.locations]
        data.locations = missionData.locations;
      }

      //list of all available jobs
      if (state.jobs.length === 0) {
        data.jobs = [
          ...new Set(
            missionData.locations
              .map((location) => {
                return location.missionCharacters.reduce(
                  (acc, missionCharacter) => {
                    if (!acc.includes(missionCharacter.character.job))
                      acc.push(missionCharacter.character.job);
                    return acc;
                  },
                  []
                );
              })
              .flat()
              .sort()
          ),
        ];
      }

      //list of all available countries
      if (state.countries.length === 0) {
        data.countries = [
          ...new Set(
            missionData.locations
              .map((location) => {
                return location.missionCharacters.reduce(
                  (acc, missionCharacter) => {
                    if (!acc.includes(missionCharacter.character.country))
                      acc.push(missionCharacter.character.country);
                    return acc;
                  },
                  []
                );
              })
              .flat()
              .sort()
          ),
        ];
      }

      if (state.names.length === 0) {
        data.names = [
          ...new Set(
            missionData.locations
              .map((location) => {
                return location.missionCharacters.reduce(
                  (acc, missionCharacter) => {
                    if (!acc.includes(missionCharacter.character.name))
                      acc.push(missionCharacter.character.name);
                    return acc;
                  },
                  []
                );
              })
              .flat()
              .sort()
          ),
        ];
      }

      //resume characters as contacts
      if (state.contactsTemplate.length === 0) {
        //create full contact template
        data.contactsTemplate = missionData.locations
          .map((location) => {
            return location.missionCharacters.map((missionCharacter) => {
              return {
                id: missionCharacter.character.id,
                name: missionCharacter.character.name,
                country: missionCharacter.character.country,
                job: missionCharacter.character.job,
                //looks for mission configuration
                showJob: missionCharacter.showJob,
                showCountry: missionCharacter.showCountry,
                showName: missionCharacter.showName,
                hasEmptyField: !(
                  missionCharacter.showJob &&
                  missionCharacter.showCountry &&
                  missionCharacter.showName
                ),
              };
            });
          })
          .flat();

        data.totalFields = 0;
        //create contact state shown to/ manipulated by to player
        data.contactsAtSession = data.contactsTemplate.map((contact) => {
          data.totalFields +=
            (!contact.showJob ? 1 : 0) +
            (!contact.showCountry ? 1 : 0) +
            (!contact.showName ? 1 : 0);

          return {
            ...contact,
            name: contact.showName ? contact.name : "",
            job: contact.showJob ? contact.job : "",
            country: contact.showCountry ? contact.country : "",
          };
        });
      }

      if (Object.keys(data).length > 0)
        setState((state) => {
          return { ...state, ...data };
        });
    }
  };

  const loadFeedback = (data, missionId, userId) => {
    // let result = 0;
    // let mainError = data.metrics.map((metric) => {
    //   return {
    //     metric: metric.name,
    //     metricTranslate: metric.nameTranslate.find(
    //       (translate) => translate.language.id === lang
    //     ),
    //     count: 0,
    //   };
    // });
    // data.contactsAtSession.forEach((contact) => {
    //   let gabarito = data.contactsTemplate.find((t) => t.id === contact.id);
    //   if (gabarito.hasEmptyField) {
    //     result +=
    //       (contact.job === gabarito.job && !gabarito.showJob ? 1 : 0) +
    //       (contact.country === gabarito.country && !gabarito.showCountry
    //         ? 1
    //         : 0) +
    //       (contact.name === gabarito.name && !gabarito.showName ? 1 : 0);
    //     mainError.forEach((metric) => {
    //       if (metric.name === "Profissão") {
    //         metric.count +=
    //           contact.job !== gabarito.job && !gabarito.showJob ? 1 : 0;
    //       } else if (metric.name === "País") {
    //         metric.count +=
    //           contact.country !== gabarito.country && !gabarito.showCountry
    //             ? 1
    //             : 0;
    //       } else if (metric.name === "Nome") {
    //         metric.count +=
    //           contact.name !== gabarito.name && !gabarito.showName ? 1 : 0;
    //       }
    //     });
    //   }
    // });
    // const score = (result / data.totalFields).toFixed(2) * 100;
    // dispatch(
    //   gameActions.create("results", {
    //     user: userId,
    //     mission: missionId,
    //     score: score,
    //     won: score > 80,
    //   })
    // );
    // return {
    //   won: score > 80,
    //   messages: data.feedbacks.find(
    //     (feedback) => feedback.minScore <= score && score <= feedback.maxScore
    //   ),
    //   mainError: mainError.reduce((max, obj) =>
    //     max.count > obj.count ? max : obj
    //   ),
    // };
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
