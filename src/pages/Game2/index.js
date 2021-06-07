import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  apiActions,
  gameActions,
  headerActions,
  musicActions,
} from "../../_actions";
import { headerConstants } from "../../_constants";

import Init from "../../_components/Init";
import RoomSelect from "../../_components/RoomSelect";
import Sala from "../../_components/Sala";
import Character from "../../_components/Character";
import AcusationLamp from "../../_components/AcusationLamp";
import Conversa from "../../_components/Conversa";
import DialogCharacter from "../../_components/DialogCharacter";
import FullscreenOverlay from "../../_components/FullscreenOverlay";
import { Iniciar, PularTutorial } from "../../_components/Button";

import { Redirect } from "react-router";
import initialState from "./initialState";
import Button from "@material-ui/core/Button";

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
  let currentPlaySession = useSelector((state) =>
    state.play_sessions ? state.play_sessions.items[0] : {}
  );
  const { play_sessionsActions } = apiActions;
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
    if (mission) dispatch(musicActions.set(mission.backgroundAudio.url));
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

    if (hasPlayed) setState({ ...state, ...updatedState, hasPlayed });

    // eslint-disable-next-line
  }, [userId, mission, dispatch, hasPlayed]);

  //track player actions
  React.useEffect(() => {
    if ((mission && !mission.trackPlayerInput) || !currentPlaySession) return;

    const getClickedObject = (e) => {
      dispatch(
        play_sessionsActions.update(
          { id: currentPlaySession.id,
            data: {
              actions:
              [...currentPlaySession.data.actions,
                {
                  tag: e.target.nodeName,
                  src: e.target.src,
                  alt: e.target.alt,
                  className: e.target.className,
                  class: e.target.class,
                  id: e.target.id,
                  innerHTML: e.target.innerHTML.includes("<div")
                    ? null
                    : e.target.innerHTML,
                  clickTime: new Date(),
                }
              ]
            }
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
  }, [dispatch, play_sessionsActions, state.tracking, currentPlaySession, mission]);
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
      setState((state) => {
        return { ...state, locations, tutorialRoom, tipsCount };
      });
    }
  }, [missionData, state.locations]);

  const onStartGame = (e) => {
    if (mission.trackPlayerInput) {
      dispatch(
        play_sessionsActions.create({
          user: userId,
          mission: mission.id,
          data:{actions:[]}
        })
      );
    }
    //check if should start or skip tutorial
    setState({ ...state, scene: "TUTORIAL" });
  };

  const endTutorial = () => {
    let updateState = {
      showConvo: false,
      currentChar: null,
      scene: "ROOM",
      ...dialogInitialState,
    };
    setState({ ...state, ...updateState });
  };

  const setTutorialCharacter = (tutorialCharacter) => () => {
    setState({
      ...state,
      tutorialStep: state.tutorialStep + 1,
      showConvo: true,
      currentChar: tutorialCharacter.character,
      convOptions: tutorialCharacter.answers.map((answer) => {
        return {
          ...answer,
          answer: answer.answer.split(";"),
        };
      }),
    });
  };

  //shows only selected questions
  const setCurrentCharacter = (character) => () => {
    setState({
      ...state,
      showConvo: true,
      currentChar: character,
      dialogStep: 0,
      convOptions: state.locations[state.currentRoom].missionCharacters
        .find((c) => c.character.id === character.character.id)
        .selectedQuestions.slice(0, state.questionsByStep),
    });
  };

  const closeDialog = (dialogHistory) => {
    setState({
      ...state,
      ...dialogInitialState,
      showConvo: false,
      shouldCloseConvo: false,
      currentChar: null,
    });
  };

  const afterWriter = () => {
    if (state.scene === "TUTORIAL") {
      setTimeout(() => {
        setState({
          ...state,
          tutorialStep: state.tutorialStep + 1,
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
        delete state.closeAfterWritter;
        updateState.convOptions = [];
        updateState.shouldCloseConvo = true;
      }
      setState({ ...state, ...updateState });
    }
  };

  const onRefreshDialog = () => {
    setState({
      ...state,
      ...dialogInitialState,
      refreshDialog: null,
      convOptions: state.locations[state.currentRoom].missionCharacters
        .find((c) => c.character.id === state.currentChar.character.id)
        .selectedQuestions.slice(0, state.questionsByStep),
    });
  };

  const onMenuButtonClick = (answer) => {
    let updateState = {};

    if (answer.tip && state.tips.indexOf(answer.tip) === -1)
      updateState = { ...updateState, tips: [...state.tips, answer.tip] };

    if (answer.refresh)
      updateState = { ...updateState, refreshDialog: onRefreshDialog };
    else if (answer.close)
      updateState = { ...updateState, closeAfterWritter: true };
    else {
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
        };
        if (
          updateState.spokenCharacters.indexOf(
            state.currentChar.character.name
          ) === -1
        )
          updateState.spokenCharacters.push(state.currentChar.character.name);

        //change character face
        if (answer.correct) {
          if (updateState.validQuestions.hasOwnProperty(answer.question)) {
            updateState.validQuestions[answer.question]++;
          } else {
            updateState.validQuestions[answer.question] = 0;
          }
          updateState.characterFeeling = "rightQuestion";
        } else {
          updateState.characterFeeling = "wrongQuestion";
        }
      }

      updateState = {
        ...updateState,
        dialogStep: state.dialogStep + 1,
        correct: state.correct + (answer.correct ? 1 : 0),
      };
    }

    setState({ ...state, ...updateState });
  };

  const checkEnd = () => {
    setState({
      ...state,
      acusation: false,
      scene: "ENDGAME",
      gameEndState: state.currentChar.character.name === state.targetName,
      characterFeeling:
        state.currentChar.character.name === state.targetName
          ? "rightAccusation"
          : "wrongAccusation",
      currentChar: null,
    });

    //aqui
    dispatch(
      gameActions.create("results", {
        user: userId,
        mission: mission.id,
        score: state.score,
        tipsCount: state.tips.length,
        spokenCharactersCount: state.spokenCharacters.length,
        won: state.gameEndState,
        validQuestionsCount: Object.keys(state.validQuestions).length,
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
              {hasPlayed ? (
                <div>
                  <PularTutorial label="Skip tutorial" onClick={() => setState( s => s.scene="ROOM" )} />
                </div>
                // <button
                //   className="btn btn-center"
                //   id="btn-tutorial"
                //   onClick={() => {
                //     setState({ ...state, scene: "ROOM" });
                //   }}
                // >
                //   Skip tutorial
                // </button>
              ) : null}
            </div>
          </div>
        </Sala>
        {state.showConvo && (
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
        )}
        {id === 2 && (
          <div id="tutorial-popup-2-wrapper">
            <div id="tutorial-popup-2-content">
              <span lang="pt-br">
                <strong>Lembre-se:</strong> As pessoas estão ocupadas em seus
                ambientes de trabalho, então tenha certeza de não gastar o tempo
                delas com perguntas fora de contexto!
              </span>
              <span lang="en">
                <strong>Remember:</strong> People are busy in their workplaces,
                so be sure not to waste their times with question that are out
                of yout context!
              </span>
              <Iniciar label="Continuar" onClick={endTutorial}/>
              {/* <button
                className="btn btn-center"
                id="btn-end-tutorial"
                onClick={endTutorial}
              >
                Continuar
              </button> */}
            </div>
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
            {/*<div id="input-tracker">TrackInput: <input type="checkbox" onChange={(e) => { setState({ ...state, tracking: e.target.checked }) }} /></div>*/}
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
                      onBack={() => setState({ ...state, back: true })}
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
                          setState({ ...state, currentRoom: num });
                        }}
                      />
                      {/* //? Pq sala recebe a location inteira? Se ela só precisa saber a imagem de fundo,
										//? pq passar tudo ao invés de só passar a string? Que aí poderia ser local ou na rede... */}
                      {state.showTips ? (
                        <FullscreenOverlay
                          style={{ zIndex: 100 }}
                          onClickClose={() =>
                            setState({ ...state, showTips: false })
                          }
                        >
                          <div>
                            <div id="big-phone-wrapper">
                              <div id="big-phone-imgs">
                                <img src={palma} alt="hand" />
                                <img
                                  style={{ marginLeft: "22.5%" }}
                                  src={bloco}
                                  alt="note"
                                />
                                <img src={dedao} alt="thumb" />
                              </div>
                              <div id="big-phone-screen-wrapper">
                                <div
                                  id="big-phone-screen-content"
                                  className="section-title"
                                >
                                  <span lang="pt-br">Dicas:</span>
                                  <div>
                                    {state.tips.map((tip, index) => (
                                      <div
                                        key={index}
                                        style={{
                                          position: "absolute",
                                          padding: "10%",
                                          width: "100%",
                                        }}
                                      >
                                        <div>{tip}</div>
                                        <hr />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </FullscreenOverlay>
                      ) : (
                        <Button
                          style={{ position: "absolute" }}
                          onClick={() => setState({ ...state, showTips: true })}
                        >
                          <img
                            style={{ width: 90 }}
                            src={blocoButton}
                            alt="tips"
                          />
                        </Button>
                      )}
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
                        >
                          <AcusationLamp
                            onClick={() =>
                              setState({ ...state, acusation: true })
                            }
                          />
                        </Conversa>
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
                            <Button onClick={restart}>Tentar novamente</Button>
                            <Button
                              onClick={() => setState({ ...state, back: true })}
                            >
                              Sair do jogo
                            </Button>
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
                              <div className="painel-2-wrapper">
                                <div
                                  className="painel-2-content"
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
                                      of them were useful. Try asking more
                                      relevant questions!
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div id="endGame-action-btns">
                            <Button onClick={restart}>Tentar novamente</Button>
                            <Button
                              onClick={() => setState({ ...state, back: true })}
                            >
                              Sair do jogo
                            </Button>
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
                      <Button
                        onClick={() =>
                          setState({ ...state, closeAcusation: true })
                        }
                      >
                        Não
                      </Button>
                      <Button onClick={checkEnd}>Sim</Button>
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
