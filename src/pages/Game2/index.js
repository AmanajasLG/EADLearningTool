import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  gameActions,
  headerActions,
  musicActions,
  playSessionControlActions,
} from "../../_actions";
import { headerConstants } from "../../_constants";

import Init from "../../_components/Init";
import RoomSelect from "../../_components/RoomSelect";
import Sala from "../../_components/Sala";
import Character from "../../_components/Character";
import Lamp from "../../_components/Lamp";
import Conversa from "../../_components/Conversa";
import DialogCharacter from "../../_components/DialogCharacter";
import FullscreenOverlay from "../../_components/FullscreenOverlay";
import {
  Iniciar,
  PularTutorial,
  Voltar,
  ButtonConfigs,
} from "../../_components/Button";

import { Redirect } from "react-router";
import initialState from "./initialState";
// import Button from "@material-ui/core/Button";
import Button from "../../_components/Button";
import TutorialBlob from "../../_components/TutorialBlob";

import {
  iconVitoriaPers,
  iconVitoriaPrim,
  iconDerrota,
  iconDicas,
  blobAzul,
  blobLaranja,
  blobVerde,
  dedao,
  palma,
  bloco,
  blocoButton,
} from "../../img";

import "./index.scss";
import "./tela-acusacao.scss";
import "./tela-fim-jogo.scss";
import "./tela-tutorial.scss";

const Game2 = (props) => {
  const [state, setState] = React.useState(initialState());

  const id = props.match.params.id;
  const dispatch = useDispatch();
  let error = useSelector((state) => state.missions.error);
  let mission = useSelector((state) =>
    state.game.items.missions
      ? state.game.items.missions.find(
          (mission) => mission.id === props.match.params.id
        )
      : null
  );
  const missionData = mission ? mission.missionData : null;
  const loading = useSelector((state) => state.missions.loading);
  const userId = useSelector((state) => state.authentication.user.user.id);
  const lang = useSelector(
    (state) => state.authentication.user.user.language.id
  );

  // const { missionsActions, play_sessionsActions, player_actionsActions, user_game_resultsActions } = apiActions
  const hasPlayed = useSelector((state) =>
    state.game.items.resultsCount ? state.game.items.resultsCount > 0 : false
  );
  const dialogInitialState = {
    dialogHistory: [],
    dialogStep: 0,
    correct: 0,
    characterFeeling: "init",
    preSpeech: null,
    convOptions: [],
  };
  React.useEffect(() => {
    if (mission && mission.trackPlayerInput && !state.playSessionCreated) {
      dispatch(playSessionControlActions.createNew(true));
      setState((s) => ({ ...s, playSessionCreated: true }));
    }
  // eslint-disable-next-line
  }, [dispatch, playSessionControlActions, state]);

  React.useEffect(() => {
    if (mission)
      dispatch(
        musicActions.set(
          mission.backgroundAudio ? mission.backgroundAudio.url : ""
        )
      );
    return () => dispatch(musicActions.set(""));
  }, [dispatch, mission]);

  //fetch mission if doesn't already have
  React.useEffect(() => {
    if (!mission || !missionData) dispatch(gameActions.getById("missions", id));
  }, [id, mission, dispatch, missionData]);

  // check if user already played the game
  React.useEffect(() => {
    let updatedState = {};
    if (mission && !state.checkedPlayed) {
      dispatch(
        gameActions.find("results/count", {
          user: userId,
          mission: mission.id,
        })
      );
      updatedState.checkedPlayed = true;
    }

    if (hasPlayed) setState((s) => ({ ...s, ...updatedState, hasPlayed }));

    // eslint-disable-next-line
  }, [userId, mission, dispatch, hasPlayed]);

  /*//Testing tool
	if(error){
		error = null
		mission = stub
	}
	*/

  //Randomizar personagens para aparecer nas salas
  //	Enquanto houver personagens na lista de personagens disponíveis
  //		Escolhe um local ao acaso
  //		Escolhe um personagem dentre a lista de personagens disponíveis ao acaso
  //		Adiciona personagem ao local
  //		Retira personagem da lista de personagens disponíveis

  React.useEffect(() => {
    if (missionData && state.locations.length === 0) {
      // safe copies
      let availableCharacters = missionData.missionCharacters.slice(0);
      let locations = missionData.locations.map((location) => {
        delete location.characters;
        return { location: location, missionCharacters: [] };
      });

      let tutorialRoom = missionData.tutorial;

      //distribute on locations
      while (availableCharacters.length > 0) {
        // sorteia sala aleatoriamente com pesos que diminuem dependendo de quantos personagens já se tem
        let totalWeight = 0;
        let crowdestRoomPop = 0;
        let emptiestRoomPop = 999;
        const minPerRoom = 1;
        const maxPerRoom = 5;
        locations.forEach((location) => {
          crowdestRoomPop = Math.max(
            location.missionCharacters.length,
            crowdestRoomPop
          );
          emptiestRoomPop = Math.min(
            location.missionCharacters.length,
            emptiestRoomPop
          );
        });

        const maxWeight = (() => {
          if (emptiestRoomPop < minPerRoom) return minPerRoom;
          else if (emptiestRoomPop < maxPerRoom) return maxPerRoom;
          else return crowdestRoomPop + 1;
        })();

        totalWeight = 0;
        const weights = locations.map((location) => {
          let weight = maxWeight - location.missionCharacters.length;
          totalWeight += weight;
          return weight;
        });

        let rand = Math.floor(Math.random() * totalWeight);
        let i = 0;
        while (rand >= 0) rand -= weights[i++];
        const locationIndex = i - 1;

        //each character has some good and bad questions that can be asked
        let availableAnswers = [...availableCharacters[0].answers];
        let correct = availableAnswers.filter(
          (answer) => answer.question.correct
        );
        let ncorrect = availableAnswers.filter(
          (answer) => !answer.question.correct
        );

        let selectedQuestions = [];
        // ? E se correct/ncorrect não tiveram a quantidade necessária de perguntas?
        while (selectedQuestions.length < 6) {
          let source = selectedQuestions.length % 2 === 0 ? correct : ncorrect;
          let index = Math.floor(Math.random(0, source.length));
          selectedQuestions.push(source[index]);
          source.splice(index, 1);
        }

        // Aleatorizando para que nem sempre venham as perguntas na ordem certo->errado
        if (Math.floor(Math.random(0, 1) < 0.5)) {
          let temp = selectedQuestions[0];
          selectedQuestions[0] = selectedQuestions[1];
          selectedQuestions[1] = temp;
        }
        if (Math.floor(Math.random(0, 1) > 0.5)) {
          let temp = selectedQuestions[2];
          selectedQuestions[2] = selectedQuestions[3];
          selectedQuestions[3] = temp;
        }

        locations[locationIndex].missionCharacters = [
          ...locations[locationIndex].missionCharacters,
          {
            ...availableCharacters[0],
            selectedQuestions,
            zDepth: Math.random(),
          },
        ];

        availableCharacters.splice(0, 1);
      }

      // Aleatorizando ordem dos personagens em cada sala
      for (let i = 0; i < locations.length; i++) {
        let amountChars = locations[i].missionCharacters.length;
        if (amountChars <= 1) continue;
        for (let j = 0; j < amountChars - 1; j++) {
          let exchangeWith = Math.floor(Math.random() * (amountChars - j)) + j;
          if (j === exchangeWith) continue; // Não precisa trocar se for consigo mesmo
          //swap
          let aux = locations[i].missionCharacters[j];
          locations[i].missionCharacters[j] =
            locations[i].missionCharacters[exchangeWith];
          locations[i].missionCharacters[exchangeWith] = aux;
        }
      }
      const tipsCount =
        missionData.missionCharacters.filter((missionCharacter) => {
          return missionCharacter.tip;
        }).length + 1;
      setState((s) => {
        return { ...s, locations, tutorialRoom, tipsCount };
      });
    }
  }, [missionData, state.locations]);

  React.useEffect(() => {
    if (state.countNow && state.scene === "ROOM") {
      setState((s) => ({ ...s, countNow: false }));

      setTimeout(
        () =>
          setState((s) => ({ ...s, seconds: s.seconds + 1, countNow: true })),
        1000
      );
    }
  }, [state]);

  const onStartGame = (e) => setState((s) => ({ ...s, scene: "TUTORIAL" }));

  const tutorialControl = () => {
    if (state.tutorialBlobCount < state.tutotialMessages.length - 1) {
      setState((s) => ({
        ...s,
        tutorialBlobCount: s.tutorialBlobCount + 1,
        tutorialShowButton:
          s.tutorialBlobCount + 1 === 1 ||
          s.tutorialBlobCount + 1 === 2 ||
          s.tutorialBlobCount + 1 === 3 ||
          s.tutorialBlobCount + 1 === 7,
      }));
    } else {
      setState((s) => ({
        ...s,
        showConvo: false,
        currentChar: null,
        tutorialShowButton: false,
        showTutorialBlob: false,
        tutorialBlobCount: s.tutorialBlobCount + 1,
        ...dialogInitialState,
      }));
    }
  };

  const endTutorial = () => {
    let updateState = {
      showConvo: false,
      currentChar: null,
      scene: "ROOM",
      showTutorialBlob: true,
      tutorialShowButton: false,
      ...dialogInitialState,
    };
    setState((s) => ({ ...s, ...updateState }));
  };

  const setTutorialCharacter = (tutorialCharacter) => () => {
    setState((s) => ({
      ...s,
      tutorialStep: state.tutorialStep + 1,
      showConvo: true,
      currentChar: tutorialCharacter.character,
      convOptions: tutorialCharacter.answers.map((answer) => {
        return {
          ...answer,
          answer: answer.answer.split(";"),
        };
      }),
    }));
  };

  //shows only selected questions
  const setCurrentCharacter = (character) => () => {
    if (state.showTutorialBlob && state.tutorialBlobCount === 0) {
      tutorialControl();
    } else if (state.showTutorialBlob) {
      return;
    }

    setState((s) => ({
      ...s,
      showConvo: true,
      currentChar: character,
      dialogStep: 0,
      convOptions: state.locations[state.currentRoom].missionCharacters
        .find((c) => c.character.id === character.character.id)
        .selectedQuestions.slice(0, state.questionsByStep),
    }));
  };

  const closeDialog = (dialogHistory) => {
    setState((s) => ({
      ...s,
      ...dialogInitialState,
      showConvo: false,
      shouldCloseConvo: false,
      currentChar: null,
    }));
  };

  const afterWriter = () => {
    if (state.scene === "TUTORIAL") {
      setTimeout(() => {
        setState({
          ...state,
          tutorialShowButton: true,
        });
      }, 1500);
    } else {
      let updateState = {};
      if (state.dialogStep < state.totalDialogSteps) {
        updateState.convOptions = state.locations[
          state.currentRoom
        ].missionCharacters
          .find((mc) => mc.character.id === state.currentChar.character.id)
          .selectedQuestions.slice(
            state.questionsByStep * state.dialogStep,
            state.questionsByStep * (state.dialogStep + 1)
          );
      } else if (state.dialogStep === state.totalDialogSteps) {
        if (state.correct < state.correctMinimum) {
          updateState.preSpeech = state.currentChar.wrongEndAnswer;
          updateState.convOptions = [
            { refresh: true, question: { question: "Sim" } },
            {
              close: true,
              question: { question: "Não" },
              answer: state.currentChar.endDialog,
            },
          ];
        } else {
          updateState.convOptions = [
            {
              tip: state.currentChar.tip,
              question: {
                question: "Estou procurando alguém. Você pode me ajudar?",
              },
              answer: state.currentChar.rightEndAnswer,
              correct: true,
            },
          ];
        }
      } else {
        const tchaus = [
          "Ah tá, tchau!",
          "Ok. Valeu!",
          "Tchau!",
          "Até mais!",
          "Entendi... Muito obrigado!",
          "Até logo!",
          "Até a próxima!",
        ];
        const rIdx = Math.floor(Math.random() * tchaus.length);
        updateState.convOptions = [
          {
            close: true,
            question: { question: tchaus[rIdx], correct: true },
            answer: state.currentChar.endDialog,
          },
        ];
      }
      if (state.closeAfterWritter) {
        updateState.closeAfterWritter = false;
        updateState.convOptions = [];
        updateState.shouldCloseConvo = true;
      }
      setState((s) => ({ ...s, ...updateState }));
    }
  };

  const onRefreshDialog = () => {
    setState((s) => ({
      ...s,
      ...dialogInitialState,
      refreshDialog: null,
      convOptions: state.locations[state.currentRoom].missionCharacters
        .find((c) => c.character.id === state.currentChar.character.id)
        .selectedQuestions.slice(0, state.questionsByStep),
    }));
  };

  const onMenuButtonClick = (answer) => {
    let updateState = {};

    if (answer.tip && state.tips.indexOf(answer.tip) === -1)
      updateState = { ...updateState, tips: [...state.tips, answer.tip] };

    if (answer.refresh)
      updateState = { ...updateState, refreshDialog: onRefreshDialog };
    else if (answer.close) {
      updateState = { ...updateState, closeAfterWritter: true };
    } else {
      if (state.scene === "TUTORIAL") {
        updateState = {
          ...updateState,
          characterFeeling: "wrongQuestion",
          convOptions: [],
        };
      } else {
        updateState = {
          ...updateState,
          spokenCharacters: state.spokenCharacters,
          validQuestions: state.validQuestions,
          characterFeeling: null,
          wrongDialogs: state.wrongDialogs,
        };
        if (
          updateState.spokenCharacters.indexOf(
            state.currentChar.character.id
          ) === -1
        )
          updateState.spokenCharacters.push(state.currentChar.character.id);

        //change character face
        if (answer.correct) {
          if (updateState.validQuestions.hasOwnProperty(answer.question)) {
            updateState.validQuestions[answer.question]++;
          } else {
            updateState.validQuestions[answer.question] = 0;
          }
          updateState.characterFeeling = "rightQuestion";
        } else {
          updateState.wrongDialogs.push({
            userAnswer: answer.question,
            correctAnswer: state.convOptions.find(
              (option) => option.question.question !== answer.question
            ).question.question,
          });
          updateState.characterFeeling = "wrongQuestion";
        }
      }

      updateState = {
        ...updateState,
        dialogStep: state.dialogStep + 1,
        correct: state.correct + (answer.correct ? 1 : 0),
      };
    }

    setState((s) => ({ ...s, ...updateState }));
  };

  const checkEnd = () => {
    setState((s) => ({
      ...s,
      acusation: false,
      scene: "ENDGAME",
      gameEndState: state.currentChar.character.name === state.targetName,
      characterFeeling:
        state.currentChar.character.name === state.targetName
          ? "rightAccusation"
          : "wrongAccusation",
      currentChar: null,
    }));

    //aqui
    dispatch(
      gameActions.create("results", {
        user: userId,
        mission: mission.id,
        tips: JSON.stringify(state.tips.map((tip) => ({ text: tip }))),
        won: state.currentChar.character.name === state.targetName,
        seconds: state.seconds,
        characters: [...state.spokenCharacters],
        wrongDialogs: state.wrongDialogs.length
          ? JSON.stringify(state.wrongDialogs)
          : null,
      })
    );

    dispatch(playSessionControlActions.ended(true));

    dispatch(
      headerActions.setAll(
        mission.name,
        mission.nameTranslate.find((name) => {
          return name.language.id === lang;
        }).name
      )
    );
    dispatch(headerActions.setState(headerConstants.STATES.OVERLAY));
  };

  const tutorialScreen = (id) => {
    return (
      <div id="room-itself" className="tutorial">
        <Sala roomData={state.tutorialRoom.location} key={-1}>
          <Character
            character={state.tutorialRoom.character}
            onClick={setTutorialCharacter(state.tutorialRoom)}
          />
          <div className="abs-fix">
            <div id="tutorial-popup-1">
              <span lang="pt-br">
                Selecione alguém para conversar e te ajudar a encontrar o seu
                guia.
              </span>
              <span lang="en">
                Select someone to talk and help you find your guide.
              </span>
              {/* {hasPlayed ? (
                <div>
                  <PularTutorial
                    label="Skip tutorial"
                    onClick={() => setState((s) => (s.scene = "ROOM"))}
                  />
                </div>
              ) : // <button
              //   className="btn btn-center"
              //   id="btn-tutorial"
              //   onClick={() => {
              //     setState((s) => ({ ...s, scene: "ROOM" });
              //   }}
              // >
              //   Skip tutorial
              // </button>
              null} */}
            </div>
          </div>
        </Sala>
        {state.showConvo && (
          <div>
            <Conversa
              onExited={() => {
                setState({
                  ...state,
                  showConvo: false,
                  tutorialStep: state.tutorialStep - 1,
                });
              }}
              convOptions={state.convOptions.reduce((acc, convOption) => {
                let option = {
                  ...convOption,
                  answers: convOption.answer,
                  question: convOption.question.question,
                };
                delete option.answer;
                return [...acc, option];
              }, [])}
              currentChar={state.currentChar}
              charFeeling={state.characterFeeling}
              afterWriter={afterWriter}
              onConvoChoiceMade={onMenuButtonClick}
            />
            {state.tutorialShowButton && (
              <Iniciar
                label="Continuar"
                onClick={endTutorial}
                style={{
                  position: "absolute",
                  bottom: "2em",
                  fontSize: "3em",
                  right: "10em",
                }}
              ></Iniciar>
            )}
          </div>
        )}
      </div>
    );
  };

  const restart = () => {
    setState({ ...initialState(true, true) });
    dispatch(headerActions.setState(headerConstants.STATES.HIDDEN));
  };

  return (
    <div id="game2-wrapper">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        mission && (
          <div id="game2-content">
            {/*<div id="input-tracker">TrackInput: <input type="checkbox" onChange={(e) => { setState((s) => ({ ...s, tracking: e.target.checked }) }} /></div>*/}
            {(function renderScene() {
              // eslint-disable-next-line default-case
              switch (state.scene) {
                case "INIT":
                  return (
                    <Init
                      icon={mission.initIcon ? mission.initIcon.url : ""}
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
                      onBack={() => setState((s) => ({ ...s, back: true }))}
                      ready={state.tutorialRoom ? true : false}
                    />
                  );
                case "TUTORIAL":
                  return tutorialScreen(state.tutorialStep);
                case "ROOM":
                  return (
                    <div id="room-itself">
                      <RoomSelect
                        buttonList={state.locations.map(
                          (location, index) => index
                        )}
                        onChange={(num) => {
                          if (!state.showTutorialBlob)
                            setState((s) => ({ ...s, currentRoom: num }));
                        }}
                        style={{
                          zIndex: state.tutorialBlobCount === 7 ? 10000 : 0,
                        }}
                      />
                      {/* //? Pq sala recebe a location inteira? Se ela só precisa saber a imagem de fundo,
										//? pq passar tudo ao invés de só passar a string? Que aí poderia ser local ou na rede... */}

                      <Sala
                        roomData={state.locations[state.currentRoom].location}
                        key={state.currentRoom}
                      >
                        {state.locations[
                          state.currentRoom
                        ].missionCharacters.map((missionCharacter, index) => (
                          <Character
                            key={index}
                            zDepth={missionCharacter.zDepth}
                            character={missionCharacter.character}
                            onClick={setCurrentCharacter(missionCharacter)}
                            // showNameOnHover={true} descomentar linha se quiser que os nomes dos personagens apareça sob hover do mouse
                          />
                        ))}
                      </Sala>

                      {state.showConvo && (
                        <Conversa
                          shouldExit={state.shouldCloseConvo}
                          prevDialogHistory={[]}
                          onClearDialogHistory={state.refreshDialog}
                          charPreSpeech={state.preSpeech}
                          convOptions={state.convOptions.reduce(
                            (acc, convOption) => {
                              let option = {
                                ...convOption,
                                ...convOption.question,
                                answers: convOption.answer,
                              };
                              delete option.answer;
                              return [...acc, option];
                            },
                            []
                          )}
                          currentChar={state.currentChar.character}
                          charFeeling={state.characterFeeling}
                          afterWriter={afterWriter}
                          onExited={closeDialog}
                          onConvoChoiceMade={onMenuButtonClick}
                          tutorialControl={
                            state.showTutorialBlob ? tutorialControl : null
                          }
                        ></Conversa>
                      )}

                      {state.showConvo && (
                        <Lamp
                          onClick={() => {
                            if (!state.showTutorialBlob)
                              setState((s) => ({ ...s, acusation: true }));
                          }}
                          message="É você!"
                          style={{
                            zIndex: state.tutorialBlobCount === 3 ? 10000 : 0,
                          }}
                        />
                      )}

                      {state.showTips ? (
                        <FullscreenOverlay
                          onClickClose={() => {
                            if (state.showTutorialBlob) tutorialControl();
                            setState((s) => ({ ...s, showTips: false }));
                          }}
                          bgRGBA={{ r: 249, g: 175, b: 161, a: 0.69 }}
                        >
                          <div id="big-note-wrapper">
                            <div id="big-note-imgs">
                              <img
                                src={palma}
                                style={{ marginLeft: "-11.25%" }}
                                alt="hand"
                              />
                              <img
                                src={bloco}
                                alt="note"
                                style={{ marginLeft: "11.25%" }}
                              />
                              <img
                                src={dedao}
                                style={{ marginLeft: "-11.25%" }}
                                alt="thumb"
                              />
                            </div>
                            <div id="big-note-writings-wrapper">
                              <div id="big-note-writings-content">
                                <span id="note-dicas">Dicas:</span>
                                {state.tips.map((tip, index) => (
                                  <span key={index} className="dica">
                                    {tip}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </FullscreenOverlay>
                      ) : (
                        <img
                          id="tips-notepad"
                          style={{
                            width: "12em",
                            position: "absolute",
                            zIndex:
                              state.tutorialBlobCount === 5
                                ? 100000
                                : state.showConvo
                                ? -1
                                : 0,
                            cursor: "pointer",
                            top: "5em",
                            left: "5em",
                          }}
                          src={blocoButton}
                          alt="tips"
                          onClick={() => {
                            if (state.showTutorialBlob) tutorialControl();
                            setState((s) => ({ ...s, showTips: true }));
                          }}
                        />
                      )}

                      {state.showTutorialBlob && (
                        <TutorialBlob
                          text={
                            state.tutotialMessages[state.tutorialBlobCount].text
                          }
                          translation={
                            state.tutotialMessages[state.tutorialBlobCount]
                              .textTranslate
                          }
                          position={
                            state.tutotialMessages[state.tutorialBlobCount]
                              .position
                          }
                          endTutorial={
                            state.tutorialBlobCount ===
                            state.tutotialMessages.length - 1
                          }
                          onContinue={
                            state.tutorialShowButton ? tutorialControl : null
                          }
                          style={
                            state.tutorialShowButton ||
                            state.tutorialBlobCount === 5
                              ? {
                                  width: "100%",
                                  height: "100%",
                                  position: "absolute",
                                  top: 0,
                                  backgroundColor:
                                    state.tutorialBlobCount === 7 ||
                                    state.tutorialBlobCount === 5 ||
                                    state.tutorialBlobCount === 3
                                      ? "rgba(255,255,255,0.66)"
                                      : "transparent",
                                }
                              : { zIndex: 10000 }
                          }
                        />
                      )}

                      {hasPlayed && state.showTutorialBlob && (
                        <PularTutorial
                          label="Skip tutorial"
                          onClick={() =>
                            setState((s) => ({
                              ...s,
                              showConvo: false,
                              currentChar: null,
                              tutorialShowButton: false,
                              showTutorialBlob: false,
                              tutorialBlobCount: 8,
                              ...dialogInitialState,
                            }))
                          }
                          style={{
                            position: "absolute",
                            bottom: "2em",
                            left: "2em",
                            fontSize: "2.3em",
                            zIndex: 10001,
                          }}
                        />
                      )}
                    </div>
                  );
                case "ENDGAME":
                  return (
                    <div id="endGame-screen">
                      {state.gameEndState ? (
                        <div id="end-panels">
                          <div id="painel-icon">
                            <img
                              src={
                                state.tries === 0
                                  ? iconVitoriaPrim
                                  : iconVitoriaPers
                              }
                              alt=""
                            />
                          </div>
                          <div id="endgame-messages">
                            {state.tries === 0 ? (
                              <div className="painel" id="painel-1">
                                <div className="painel-1-wrapper">
                                  <div className="painel-1-content">
                                    <span lang="pt-br">
                                      Muito bem! Você encontrou a pessoa na
                                      primeira tentativa. Vai arrasar na sua
                                      nova carreira!
                                    </span>
                                    <span lang="en">
                                      Well done! You have found the right person
                                      on your first try. You're going to rock on
                                      your new career!
                                    </span>
                                  </div>
                                </div>
                                <a href="#painel-2" className="next-btn">
                                  {"❯"}
                                </a>
                              </div>
                            ) : (
                              <div className="painel" id="painel-1">
                                <div className="painel-1-wrapper">
                                  <div className="painel-1-content">
                                    <span lang="pt-br">
                                      Você encontrou a pessoa certa! Parabéns!
                                    </span>
                                    <span lang="en">
                                      You have found the right person! Congrats!
                                    </span>
                                  </div>
                                </div>
                                <a href="#painel-2" className="next-btn">
                                  {"❯"}
                                </a>
                              </div>
                            )}
                            <div className="painel" id="painel-2">
                              <div className="painel-2-wrapper">
                                <div
                                  className="painel-2-content"
                                  style={{
                                    backgroundImage:
                                      "url(" +
                                      (state.tips.length === state.tipsCount
                                        ? blobAzul
                                        : blobVerde) +
                                      ")",
                                  }}
                                >
                                  <div>
                                    <span>{state.tips.length ?? 0}</span>/
                                    <span>{state.tipsCount}</span>
                                  </div>
                                  <div>clues</div>
                                </div>
                              </div>
                              <div className="painel-2-wrapper">
                                <div className="painel-2-content">
                                  <div>
                                    <p>
                                      After talking to{" "}
                                      {state.spokenCharacters.length} people,
                                      you found {state.tips.length} of the{" "}
                                      {state.tipsCount} existing clues.
                                    </p>
                                    <p>
                                      Regarding the questions you asked,{" "}
                                      {Object.keys(state.validQuestions).length}{" "}
                                      of them were useful.
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <a href="#painel-1" className="prev-btn">
                                {"❮"}
                              </a>
                            </div>
                          </div>
                          <div id="endGame-action-btns">
                            <Voltar
                              label={"Tentar novamente"}
                              colorScheme={ButtonConfigs.COLOR_SCHEMES.COR_6}
                              onClick={restart}
                              style={{ marginRight: "2em" }}
                            />
                            <Iniciar
                              label={"Sair do jogo"}
                              colorScheme={ButtonConfigs.COLOR_SCHEMES.COR_3}
                              onClick={() => setState({ ...state, back: true })}
                            />
                          </div>
                        </div>
                      ) : (
                        <div id="endGame-wrong-wrapper">
                          <div>
                            <div className="painel" id="painel-1">
                              <div id="painel-icon-derrota">
                                <img src={iconDerrota} alt="" />
                              </div>
                              <span lang="pt-br">
                                Você ainda não encontrou a pessoa certa. Como
                                você vai entender o que deve ser feito em seu
                                novo trabalho? Você ainda precisa descobrir
                                algumas dicas.
                              </span>
                              <span lang="en">
                                You still haven't found the right person. How
                                will you understand what has to be done in your
                                new job? There are clues yet to be found.
                              </span>
                            </div>
                            <div className="painel" id="painel-3">
                              <div className="painel-2-wrapper-defeat">
                                <div
                                  className="painel-2-content-defeat"
                                  style={{
                                    backgroundImage: "url(" + blobLaranja + ")",
                                  }}
                                >
                                  <div>
                                    <span>{state.tips.length ?? 0}</span>/
                                    <span>{state.tipsCount}</span>
                                  </div>
                                  <div>clues</div>
                                </div>
                              </div>
                              <div className="painel-2-wrapper-defeat">
                                <div className="painel-2-content-defeat">
                                  <div>
                                    <p>
                                      After talking to{" "}
                                      {state.spokenCharacters.length} people,
                                      you found {state.tips.length} of the{" "}
                                      {state.tipsCount} existing clues.
                                    </p>
                                    <p>
                                      Regarding the questions you asked,{" "}
                                      {Object.keys(state.validQuestions).length}{" "}
                                      of them were useful. Try asking more
                                      relevant questions!
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div id="endGame-action-btns">
                            <Voltar
                              label={"Tentar novamente"}
                              colorScheme={ButtonConfigs.COLOR_SCHEMES.COR_6}
                              onClick={restart}
                            />
                            <Iniciar
                              label={"Sair do jogo"}
                              colorScheme={ButtonConfigs.COLOR_SCHEMES.COR_3}
                              onClick={() => setState({ ...state, back: true })}
                              style={{width: "11em"}}
                            />
                          </div>
                        </div>
                      )}
                      {state.gameEndState && (
                        <DialogCharacter
                          character={
                            missionData.missionCharacters.find((mc) => {
                              return mc.character.name === state.targetName;
                            }).character
                          }
                          feeling={"win"}
                          style={{
                            width: "85em",
                          }}
                        />
                      )}
                    </div>
                  );
              }
            })()}
            {state.acusation && (
              <FullscreenOverlay
                showCloseBtn={false}
                shouldExit={state.closeAcusation}
                onReadyToExit={() => {
                  setState({
                    ...state,
                    closeAcusation: false,
                    acusation: false,
                  });
                }}
              >
                <div id="dialog-accusation-wrapper">
                  <div id="dialog-accusation">
                    <div id="accusation-infos">
                      <div>
                        <span lang="pt-br">Tem certeza?</span>
                        <span lang="en">
                          Are you sure it's them?
                          <br />
                          Check your tips.
                        </span>
                      </div>
                      <div id="tips-received">
                        <div id="accusation-icon">
                          <img src={iconDicas} alt="" />
                        </div>
                        {state.tips.length > 0 ? (
                          state.tips.map((tip, index) => (
                            <div key={index}>{tip}</div>
                          ))
                        ) : (
                          <div>Nenhuma dica recebida.</div>
                        )}
                      </div>
                    </div>
                    <div id="accusation-btns">
                      <Voltar
                        label="Não"
                        onClick={() =>
                          setState((s) => ({ ...s, closeAcusation: true }))
                        }
                        colorScheme={ButtonConfigs.COLOR_SCHEMES.COR_3}
                      />
                      <Iniciar
                        label="Sim"
                        onClick={checkEnd}
                        colorScheme={ButtonConfigs.COLOR_SCHEMES.COR_2}
                      />
                    </div>
                  </div>
                </div>
              </FullscreenOverlay>
            )}
          </div>
        )
      )}
      {state.back && <Redirect to="/userspace" />}
    </div>
  );
};

export default Game2;
