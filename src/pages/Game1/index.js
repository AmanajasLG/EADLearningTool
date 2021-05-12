import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import {
  apiActions,
  gameActions,
  headerActions,
  musicActions,
} from "../../_actions";

import Init from "../Game2/components/Init";
import Result from "../Game2/components/Result";
import RoomSelect from "../Game2/components/RoomSelect";
import Sala from "../Game2/components/Sala";
import Character from "../Game2/components/Character";
import initialState from "./initialState.js";
import initialDialog from "./initialDialog.js";
import stub from "./stub.js";
import Phone from "./components/Phone";
import Conversa from "../Game2/components/Conversa";
import FullscreenOverlay from "../Game2/components/FullscreenOverlay";
import { headerConstants } from "../../_constants";
import bigPhone from "../../img/Game1/Celular Base.svg";
import dedao from "../../img/Game1/Mão dedão.svg";
import palma from "../../img/Game1/Mão palma.svg";
import blobLowScore from "../../img/Score Baixo_blob.svg";
import blobLaranja from "../../img/bg-forma-laranja.svg";

import "./index.scss";
import "./feedback-screen.scss";
import { Button } from "@material-ui/core";

const Game1 = (props) => {
  const [state, setState] = React.useState(initialState());

  const { play_sessionsActions } = apiActions;
  const id = props.match.params.id;
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.missions.loading);
  let error = useSelector((state) => state.missions.error);
  let mission = useSelector((state) =>
    state.game.items.missions
      ? state.game.items.missions.find(
          (mission) => mission.id === props.match.params.id
        )
      : null
  );
  const missionData = mission ? mission.missionData : null;
  const userId = useSelector((state) => state.authentication.user.user.id);
  const currentPlaySession = useSelector((state) =>
    state.play_sessions ? state.play_sessions.items[0] : {}
  );
  const lang = useSelector(
    (state) => state.authentication.user.user.language.id
  );

  // React.useEffect(()=>{
  // 	if(mission && Object.keys(actions).length !== 0 && !missionData){
  // 		dispatch(actions['missionData'].find({mission: mission.id}))
  // 	}
  // })

  React.useEffect(() => {
    if (mission) dispatch(musicActions.set(mission.backgroundAudio.url));
    return () => dispatch(musicActions.set(""));
  }, [dispatch, mission]);

  //Track playerActions
  React.useEffect(() => {
    if (!state.tracking || !currentPlaySession) return;

    const getClickedObject = (e) => {
      dispatch(
        play_sessionsActions.update(
          { id: currentPlaySession.id },
          {
            ...currentPlaySession,
            playerActions: [
              ...currentPlaySession.playerActions,
              {
                tag: e.target.nodeName,
                alt: e.target.alt,
                className: e.target.className,
                innerHTML: e.target.innerHTML.includes("<div")
                  ? null
                  : e.target.innerHTML,
                clickTime: new Date(),
              },
            ],
          }
        )
      );
    };
    document.addEventListener("mousedown", getClickedObject);

    setState((s) => {
      return { ...s, currentPlaySession, getClickedObject };
    });
    return () => {
      document.removeEventListener("mousedown", getClickedObject);
    };
  }, [dispatch, currentPlaySession, play_sessionsActions, state.tracking]);

  React.useEffect(() => {
    if (id && !missionData)
      dispatch(gameActions.getById("missions", props.match.params.id));
    if (missionData) {
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
  }, [
    dispatch,
    id,
    mission,
    props.match.params.id,
    state.locations.length,
    state.contactsTemplate.length,
    state.countries.length,
    state.jobs.length,
    state.names.length,
    missionData,
  ]);

  if (error) {
    error = null;
    mission = stub;
  }

  const onStartGame = (e) => {
    if (state.tracking) {
      dispatch(
        play_sessionsActions.create({
          //usersPergame_1_missionsUser: userId,
          //mission: mission.id
        })
      );
    }
    setState({ ...state, scene: "ROOM" });
  };

  const setCurrentChar = (character) => () => {
    // if (convOptions.length === 0) console.log("Couldn't find any questions to ask currentChar")

    if (!state.dialogs.hasOwnProperty(character.character.name)) {
      let convOptions = character.answers.reduce((acc, convOption) => {
        let option = {
          ...convOption,
          ...convOption.question,
          answers: convOption.answer,
          active: true,
        };
        delete option.answer;
        return [...acc, option];
      }, []);

      setState({
        ...state,
        currentChar: character.character,
        convOptions: convOptions,
        dialogs: {
          ...state.dialogs,
          [character.character.name]: [],
        },
      });
    } else {
      let convOptions = [];
      if (
        state.questionsAsked <
        state.locations[state.currentLocationIndex].maxQuestions
      ) {
        convOptions = character.answers.reduce((acc, convOption) => {
          let option = {
            ...convOption,
            ...convOption.question,
            answers: convOption.answer,
            active: state.dialogs[character.character.name].find(
              (dialog) => dialog.text === convOption.question.question
            )
              ? false
              : true,
          };
          delete option.answer;
          return [...acc, option];
        }, []);
      } else {
        convOptions = character.answers.reduce((acc, convOption) => {
          let option = {
            ...convOption,
            ...convOption.question,
            answers: convOption.answer,
            active: false,
          };
          delete option.answer;
          return [...acc, option];
        }, []);
      }

      setState({
        ...state,
        currentChar: character.character,
        convOptions: convOptions,
      });
    }
  };

  const afterWriter = () => {
    let updatedState = {};
    if (
      state.questionsAsked ===
        state.locations[state.currentLocationIndex].maxQuestions &&
      state.preSpeech.length === 0
    ) {
      updatedState.preSpeech = [
        "Espero que isso tenha sido tudo. Tenho que ir agora...",
      ];
      updatedState.convOptions = [
        { question: "Ah tá. Tchau!", answers: "Tchau!", close: true },
      ];
    } else if (
      state.questionsAsked >
      state.locations[state.currentLocationIndex].maxQuestions
    ) {
      updatedState.convOptions = state.convOptions.map((convOption) => {
        return { ...convOption, active: false };
      }, []);
    }
    if (state.close) {
      updatedState.shouldCloseConvo = true;
      updatedState.close = false;
    }

    setState({ ...state, ...updatedState });
  };

  const onMenuButtonClick = (answer) => {
    //
    //	Aplicar lógica adicional de click nos botões do menu
    //
    let updatedState = {};

    if (state.dialogs[state.currentChar.name].length) {
      updatedState.questionsAsked = state.questionsAsked + 1;

      if (
        updatedState.questionsAsked <
        state.locations[state.currentLocationIndex].maxQuestions
      ) {
        updatedState.convOptions = state.convOptions.map((convOption) => {
          if (convOption.question === answer.question)
            return { ...convOption, active: false };

          return convOption;
        }, []);
      } else {
        updatedState.preSpeech = [];
        updatedState.convOptions = [];
      }
    }

    if (answer.close) updatedState.close = true;

    setState({
      ...state,
      ...updatedState,
      dialogs: {
        ...state.dialogs,
        [state.currentChar.name]: [
          ...state.dialogs[state.currentChar.name],
          {
            speaker: "player",
            text: answer.question,
          },
          {
            text: answer.answers[0],
          },
        ],
      },
    });
  };

  const modifyContact = (contact) => {
    let index = state.contactsAtSession.indexOf(
      state.contactsAtSession.find((c) => c.id === contact.id)
    );
    // console.log('changing:', contact)
    setState({
      ...state,
      contactsAtSession: [
        ...state.contactsAtSession.slice(0, index),
        contact,
        ...state.contactsAtSession.slice(index + 1),
      ],
    });
  };

  const closeDialog = () => {
    setState({ ...state, currentChar: null, shouldCloseConvo: false });
  };

  const restart = () => {
    setState({ ...initialState(), hasPlayed: true });
    dispatch(headerActions.setState(headerConstants.STATES.HIDDEN));
  };

  const onPhoneFinish = () => {
    let wrongContacts = 0;
    state.locations[state.currentLocationIndex].missionCharacters.forEach(
      (missionContact, index) => {
        let answer = state.contactsAtSession.find(
          (contactAtSession) =>
            contactAtSession.id === missionContact.character.id
        );
        let gabarito = state.contactsTemplate.find(
          (contactTemplate) =>
            contactTemplate.id === missionContact.character.id
        );
        if (
          answer.job !== gabarito.job ||
          answer.country !== gabarito.country ||
          answer.name !== gabarito.name
        )
          wrongContacts++;
      }
    );
    setState({ ...state, changeRoomPopUp: true, wrongContacts: wrongContacts });
  };

  const onGoNextRoom = () => {
    if (state.currentLocationIndex + 1 < state.locations.length)
      setState({
        ...state,
        shouldCloseDialog: true,
        currentLocationIndex: state.currentLocationIndex + 1,
        shouldMinimize: true,
        questionsAsked: 0,
        dialogs: {},
      });
    else {
      // CALCULATE RESULT WITH WRONG ITEM AND FIND THE MATRIC THE USER MISSED THE MOST
      let result = 0;
      let mainError = missionData.metrics.map((metric) => {
        return {
          metric: metric.name,
          metricTranslate: metric.nameTranslate.find(
            (translate) => translate.language.id === lang
          ),
          count: 0,
        };
      });
      state.contactsAtSession.forEach((contact) => {
        let gabarito = state.contactsTemplate.find((t) => t.id === contact.id);

        if (gabarito.hasEmptyField) {
          result +=
            (contact.job === gabarito.job && !gabarito.showJob ? 1 : 0) +
            (contact.country === gabarito.country && !gabarito.showCountry
              ? 1
              : 0) +
            (contact.name === gabarito.name && !gabarito.showName ? 1 : 0);

          mainError.forEach((metric) => {
            if (metric.name === "Profissão") {
              metric.count +=
                contact.job !== gabarito.job && !gabarito.showJob ? 1 : 0;
            } else if (metric.name === "País") {
              metric.count +=
                contact.country !== gabarito.country && !gabarito.showCountry
                  ? 1
                  : 0;
            } else if (metric.name === "Nome") {
              metric.count +=
                contact.name !== gabarito.name && !gabarito.showName ? 1 : 0;
            }
          });
        }
      });

      const score = (result / state.totalFields).toFixed(2) * 100;

      setState({
        ...state,
        scene: "ENDGAME",
        result,
        score,
        mainError: mainError.reduce((max, obj) =>
          max.count > obj.count ? max : obj
        ),
        feedback: missionData.feedbacks.find(
          (feedback) => feedback.minScore <= score && score <= feedback.maxScore
        ),
      });

      dispatch(
        gameActions.create("results", {
          user: userId,
          mission: mission.id,
          score: score,
          won: score > 80,
        })
      );

      dispatch(
        headerActions.setAll(
          mission.name,
          mission.nameTranslate.find((name) => {
            return name.language.id === lang;
          }).name
        )
      );

      dispatch(headerActions.setState(headerConstants.STATES.OVERLAY));
    }
  };

  return (
    <div id="game1-wrapper">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        mission && (
          <div id="game1-content">
            {/* <div id="input-tracker">
              TrackInput:{" "}
              <input
                type="checkbox"
                onChange={(e) => {
                  setState({ ...state, tracking: e.target.checked });
                }}
              />
            </div> */}
            {(function renderScene() {
              switch (state.scene) {
                case "INIT":
                  return (
                    <Init
                      icon={mission.initIcon.url}
                      name={mission.name}
                      description={mission.description}
                      nameTranslate={
                        mission.nameTranslate.find((name) => {
                          return name.language.id === lang;
                        }).name
                      }
                      descriptionTranslate={
                        mission.descriptionTranslate.find((description) => {
                          return description.language.id === lang;
                        }).description
                      }
                      onStart={onStartGame}
                      onBack={() => setState({ ...state, back: true })}
                      ready={state.locations.length > 0 ? true : false}
                    />
                  );
                case "ROOM":
                  return (
                    <div id="room-itself">
                      <RoomSelect
                        value={state.currentLocationIndex}
                        buttonList={state.locations.map(
                          (location) => location.location.name
                        )}
                        showInBtnFormat={false}
                      />
                      <Sala
                        roomData={
                          state.locations[state.currentLocationIndex].location
                        }
                        key={state.currentLocationIndex}
                      >
                        {state.locations[
                          state.currentLocationIndex
                        ].missionCharacters.map((character, index) => (
                          <Character
                            key={index}
                            zDepth={character.zDepth}
                            character={character.character}
                            onClick={setCurrentChar(character)}
                          />
                        ))}
                      </Sala>
                      <Phone
                        contacts={state.contactsAtSession.filter((contact) =>
                          state.locations[
                            state.currentLocationIndex
                          ].missionCharacters.find(
                            (character) => character.character.id === contact.id
                          )
                        )}
                        modifyContact={modifyContact}
                        contactsTemplate={state.contactsTemplate}
                        names={state.names}
                        jobs={state.jobs}
                        countries={state.countries}
                        onFinish={onPhoneFinish}
                        onMinimize={() =>
                          setState({ ...state, shouldMinimize: false })
                        }
                        shouldMinimize={state.shouldMinimize}
                      />
                      {state.currentChar && (
                        <Conversa
                          shouldExit={state.shouldCloseConvo}
                          prevDialogHistory={
                            state.dialogs[state.currentChar.name]
                          }
                          onClearDialogHistory={state.refreshDialog}
                          charPreSpeech={state.preSpeech}
                          convOptions={
                            state.dialogs[state.currentChar.name].length
                              ? state.convOptions
                              : initialDialog
                          }
                          currentChar={state.currentChar}
                          charFeeling={state.characterFeeling}
                          afterWriter={afterWriter}
                          onExited={closeDialog}
                          onConvoChoiceMade={onMenuButtonClick}
                        ></Conversa>
                      )}
                      {state.changeRoomPopUp && (
                        <FullscreenOverlay
                          showCloseBtn={false}
                          shouldExit={state.shouldCloseDialog}
                          onReadyToExit={() => {
                            setState({
                              ...state,
                              shouldCloseDialog: false,
                              changeRoomPopUp: false,
                            });
                          }}
                        >
                          <div className="popup-wrapper">
                            <div className="popup-content">
                              <span>Are you sure?</span>
                              <div>
                                {state.wrongContacts > 0 ? (
                                  <div className="next-room-text">
                                    <span lang="pt-br">
                                      {`${state.wrongContacts}` +
                                        missionData.nextRoomTextWrong}
                                    </span>
                                    <span lang="en">
                                      {`${state.wrongContacts}` +
                                        missionData.nextRoomTextWrongTranslate.find(
                                          (translation) => {
                                            return (
                                              translation.language.id === lang
                                            );
                                          }
                                        ).text}
                                    </span>
                                  </div>
                                ) : (
                                  <div className="next-room-text">
                                    <span lang="pt-br">
                                      {missionData.nextRoomTextRight}
                                    </span>
                                    <span lang="en">
                                      {
                                        missionData.nextRoomTextRightTranslate.find(
                                          (translation) => {
                                            return (
                                              translation.language.id === lang
                                            );
                                          }
                                        ).text
                                      }
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div id="popup-btns">
                                <button
                                  id="no-go"
                                  onClick={() =>
                                    setState({
                                      ...state,
                                      shouldCloseDialog: true,
                                    })
                                  }
                                >
                                  {state.wrongContacts > 0
                                    ? "Keep trying"
                                    : "Not yet"}
                                </button>
                                <button id="go" onClick={onGoNextRoom}>
                                  {state.wrongContacts > 0
                                    ? "Continue anyway"
                                    : "Let's go"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </FullscreenOverlay>
                      )}
                      <div
                        id="question-counter"
                        className={
                          state.questionsAsked >=
                          state.locations[state.currentLocationIndex]
                            .maxQuestions
                            ? "max"
                            : ""
                        }
                      >
                        <div id="question-counter-info">
                          <div>Você já fez</div>
                          <div className="numbers">
                            <span>
                              {Math.min(
                                state.questionsAsked,
                                state.locations[state.currentLocationIndex]
                                  .maxQuestions
                              )}
                            </span>
                            /
                            {
                              state.locations[state.currentLocationIndex]
                                .maxQuestions
                            }
                          </div>
                          <div>perguntas</div>
                        </div>
                      </div>
                    </div>
                  );
                case "ENDGAME":
                  return (
                    <div id="feedback-endGame-screen">
                      {state.score > 30 ? (
                        <div id="feedback-end-panels">
                          <div id="feedback-painel-icon">
                            <img src={state.feedback.topAsset.url} alt="" />
                          </div>
                          <div id="feedback-endgame-messages">
                            <div
                              className="feedback-painel"
                              id="feedback-painel-1-win"
                            >
                              <div className="feedback-painel-1-wrapper">
                                <div className="feedback-painel-1-content">
                                  <span lang="pt-br">
                                    {" "}
                                    {state.feedback.text.replace(
                                      "xxxx",
                                      state.score
                                    )}
                                  </span>
                                  <span lang="en">
                                    {state.feedback.textTranslate
                                      .find((text) => text.language.id === lang)
                                      .text.replace("xxxx", state.score)}
                                  </span>
                                </div>
                              </div>
                              {state.score < 100 && (
                                <a
                                  href="#feedback-painel-2"
                                  className="next-btn"
                                >
                                  {"❯"}
                                </a>
                              )}
                            </div>
                            {state.score < 100 && (
                              <div
                                className="feedback-painel"
                                id="feedback-painel-2"
                              >
                                <div className="feedback-painel-2-wrapper">
                                  <div
                                    className="feedback-painel-2-content"
                                    style={{
                                      backgroundImage:
                                        "url(" + blobLaranja + ")",
                                    }}
                                  >
                                    <div>
                                      <span>{state.result}</span>/
                                      <span>{state.totalFields}</span>
                                    </div>
                                    <div>correct items</div>
                                  </div>
                                </div>
                                <div className="feedback-painel-2-wrapper">
                                  <div className="feedback-painel-2-content">
                                    <div>
                                      <p>
                                        You've had a hard time remembering your
                                        friend's{" "}
                                        {state.mainError.metricTranslate.text.toLowerCase()}
                                        . I hope they don't mind.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <a
                                  href="#feedback-painel-1-win"
                                  className="prev-btn"
                                >
                                  {"❮"}
                                </a>
                              </div>
                            )}
                          </div>
                          <div id="feedback-endGame-action-btns">
                            <Button onClick={restart}>Tentar novamente</Button>
                            <Button
                              onClick={() => setState({ ...state, back: true })}
                            >
                              Sair do jogo
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div id="feedback-endGame-wrong-wrapper">
                          <div>
                            <div
                              className="feedback-painel feedback-panel-1-defeat"
                              id="feedback-painel-1"
                            >
                              <div id="feedback-painel-icon-derrota">
                                <img src={state.feedback.topAsset.url} alt="" />
                              </div>
                              <span lang="pt-br">
                                {state.feedback.text.replace(
                                  "xxxx",
                                  state.score
                                )}
                              </span>
                              <span lang="en">
                                {state.feedback.textTranslate
                                  .find((text) => text.language.id === lang)
                                  .text.replace("xxxx", state.score)}
                              </span>
                            </div>
                            <div
                              className="feedback-painel"
                              id="feedback-painel-3"
                              style={{
                                backgroundImage: "url(" + blobLowScore + ")",
                              }}
                            >
                              <div className="feedback-painel-2-wrapper">
                                <div
                                  className="feedback-painel-2-content"
                                  style={{
                                    backgroundImage: "url(" + blobLaranja + ")",
                                  }}
                                >
                                  <div>
                                    <span>{state.result}</span>/
                                    <span>{state.totalFields}</span>
                                  </div>
                                  <div>correct</div>
                                  <div>items</div>
                                </div>
                              </div>
                              <div className="feedback-painel-2-wrapper">
                                <div className="feedback-painel-2-content">
                                  <div>
                                    <p lang="pt-br">
                                      Lembrar o(a){" "}
                                      {state.mainError.metric.toLowerCase()} dos
                                      seus amigos foi o mais difícil pra você.
                                      Espero que eles não se importem.
                                    </p>
                                    <p lang="en">
                                      You've had a hard time remembering your
                                      friend's{" "}
                                      {state.mainError.metricTranslate.text.toLowerCase()}
                                      . I hope they don't mind.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div id="feedback-endGame-action-btns">
                            <Button onClick={restart}>Tentar novamente</Button>
                            <Button
                              onClick={() => setState({ ...state, back: true })}
                            >
                              Sair do jogo
                            </Button>
                          </div>
                        </div>
                      )}
                      {state.feedback.mobileBackground && (
                        <div id="feedback-phone-div">
                          <div id="feedback-phone">
                            <img src={palma} alt="" />
                            <img src={bigPhone} alt="" />
                            <img
                              src={state.feedback.mobileBackground.url}
                              alt=""
                            />
                            <img src={dedao} alt="" />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                default:
                  return <div>Error</div>;
              }
            })()}
            {state.endGame && <Result gameEndState={state.gameEndState} />}
            {state.tries > 0 && (
              <div>
                {state.tries} tentativa{state.tries > 1 ? "s" : ""}!
              </div>
            )}
            {state.back && <Redirect to="/userspace" />}
          </div>
        )
      )}
    </div>
  );
};

export default Game1;
