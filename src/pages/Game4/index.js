import React from "react";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  apiActions,
  gameActions,
  headerActions,
  musicActions,
} from "../../_actions";
import { headerConstants } from "../../_constants";

import Init from "../../_components/Init";
import Intro from "./components/Intro";
import Timer from "../../_components/Timer";
import Recipe from "../../_components/Recipe";

import initialState from "./initialState";

import { zeroFill, shuffle } from "../../_helpers";
import {
  listIcon,
  silverCloche,
  hourglassEmpty,
  hourglassFull,
  blobLaranja,
} from "../../img";
import DialogCharacter from "../../_components/DialogCharacter";

const Game4 = (props) => {
  const [state, setState] = React.useState({ ...initialState() });
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const userId = useSelector((state) => state.authentication.user.user.id);
  const lang = useSelector(
    (state) => state.authentication.user.user.language.id
  );

  let mission = useSelector((state) =>
    state.game.items.missions
      ? state.game.items.missions.find(
          (mission) => mission.id === props.match.params.id
        )
      : null
  );
  let missionData = mission ? mission.missionData : null;

  let currentPlaySession = useSelector((state) =>
    state.play_sessions ? state.play_sessions.items[0] : {}
  );
  const { play_sessionsActions } = apiActions;
  // const { missionsActions, play_sessionsActions, player_actionsActions, user_game_resultsActions } = apiActions
  const timesPlayed = useSelector((state) => state.game.items.resultsCount);

  React.useEffect(() => {
    if (mission) dispatch(musicActions.set(mission.backgroundAudio.url));
    return () => dispatch(musicActions.set(""));
  }, [dispatch, mission]);

  //fetch mission if doesn't already have
  React.useEffect(() => {
    if (!mission || !missionData) dispatch(gameActions.getById("missions", id));
  }, [id, mission, dispatch, missionData]);

  React.useEffect(() => {
    if (mission) {
      if (!state.checkedPlayed) {
        dispatch(
          gameActions.find("results/count", {
            user: userId,
            mission: mission.id,
          })
        );
        setState({ ...state, checkedPlayed: true });
      }
    }
    // eslint-disable-next-line
  }, [userId, mission, dispatch, state.checkedPlayed]);

  React.useEffect(() => {
    if (
      missionData &&
      state.ingredientsList.length === 0 &&
      timesPlayed !== undefined
    ) {
      missionData.seconds -= 60 * (timesPlayed > 2 ? 2 : timesPlayed);
      // safe copies

      let recipe =
        missionData.recipes[
          Math.floor(Math.random() * missionData.recipes.length)
        ];

      let resumeRecipe = {
        id: recipe.id,
        name: recipe.name,
        nameTranslate: recipe.nameTranslate.find((name) => {
          return name.language.id === lang;
        }).text,
        description: recipe.description,
        descriptionTranslate: recipe.descriptionTranslate.find(
          (description) => {
            return description.language.id === lang;
          }
        ).text,
        image: recipe.image ? recipe.image.url : "",
      };

      let ingredientsList = recipe.ingredients
        .map((ingredient) => {
          return {
            name: ingredient.asset.name,
            description: ingredient.description,
            order: ingredient.order,
            done: false,
          };
        })
        .sort((a, b) => (a.order > b.order ? 1 : -1));

      let shuffledIngredients = shuffle(
        recipe.ingredients.map((ingredient) => {
          return {
            name: ingredient.asset.name,
            shuffleName: ingredient.shuffleName.toUpperCase(),
            nameShuffled: shuffle(
              ingredient.shuffleName.toUpperCase().split("")
            ),
            image: ingredient.asset.image ? ingredient.asset.image.url : "",
            done: false,
          };
        })
      );

      let tablewares = recipe.tablewares.map((tableware) => {
        return {
          name: tableware.asset.name,
          image: tableware.asset.image ? tableware.asset.image.url : "",
          correct: tableware.correct,
        };
      });

      setState((state) => {
        return {
          ...state,
          recipe: resumeRecipe,
          ingredientsList,
          shuffledIngredients,
          tablewares,
        };
      });
    }
  }, [missionData, state.ingredientsList, timesPlayed, lang]);

  const onStartGame = () => setState({ ...state, scene: "INTRO" });

  const checkRightIngredient = () => {
    let currentIngredient = state.ingredientsList.find(
      (ingredient) => !ingredient.done
    );

    if (state.selectedIngredient.name !== currentIngredient.name) {
      setState({ ...state, wrongIngredientNotification: true });
    } else {
      setState({
        ...state,
        showIngredients: false,
        tableIngredient: state.selectedIngredient,
        selectedIngredient: null,
        shuffledName: state.selectedIngredient.nameShuffled.map((letter) => {
          return {
            letter: letter,
            selected: false,
          };
        }),
      });
    }
  };

  const checkIngredientName = () => {
    if (
      state.tableIngredient.shuffleName ===
      state.userLetterOrder.reduce((acc, letter) => acc + letter.letter, "")
    ) {
      let updateIngredientsList = state.ingredientsList.map((ingredient) => {
        if (ingredient.name === state.tableIngredient.name)
          return {
            ...ingredient,
            done: true,
          };
        return ingredient;
      });

      let updateShuffledIngredients = state.shuffledIngredients.map(
        (ingredient) => {
          if (ingredient.name === state.tableIngredient.name)
            return {
              ...ingredient,
              done: true,
            };
          return ingredient;
        }
      );

      if (
        updateIngredientsList.find((ingredient) => !ingredient.done) ===
        undefined
      ) {
        setState({
          ...state,
          doneCooking: true,
          runTimer: false,
        });
      } else {
        setState({
          ...state,
          tableIngredient: null,
          ingredientsList: updateIngredientsList,
          shuffledIngredients: updateShuffledIngredients,
          showRecipe: true,
          showIngredients: true,
          userLetterOrder: [],
          recipeContinue: true,
        });
      }
    } else {
      setState({ ...state, wrongIngredientNameNotification: true });
    }
  };

  const clearIngredientName = () => {
    setState({
      ...state,
      wrongIngredientNameNotification: false,
      userLetterOrder: [],
      shuffledName: state.tableIngredient.nameShuffled.map((letter) => {
        return {
          letter: letter,
          selected: false,
        };
      }),
    });
  };

  const addLetter = (letter, index) => () => {
    let updateShuffedName = [...state.shuffledName];

    updateShuffedName[index].selected = true;

    setState({
      ...state,
      shuffledName: updateShuffedName,
      userLetterOrder: [...state.userLetterOrder, letter],
    });
  };

  const moveToServing = () => {
    setState({
      ...state,
      scene: "SERVE",
      runTimer: true,
      shuffledTablewares: shuffle(
        state.tablewares.map((tableware) => {
          return {
            name: tableware.name,
            image: tableware.image,
            correct: tableware.correct,
            choosen: false,
          };
        })
      ),
      shuffledTablewaresNames: shuffle(
        state.tablewares.reduce((acc, tableware) => {
          return [...acc, { name: tableware.name, choosen: false }];
        }, [])
      ),
    });
  };

  const addTableware = (selectedTableware) => () => {
    setState({
      ...state,
      shuffledTablewaresNames: state.shuffledTablewaresNames.map(
        (tableware) => {
          if (tableware.name === selectedTableware.name)
            return {
              ...tableware,
              choosen: true,
            };

          return tableware;
        }
      ),
      shuffledTablewares: state.shuffledTablewares.map((tableware) => {
        if (tableware.name === state.tablewareImageSelected.name)
          return {
            ...tableware,
            choosen: true,
          };

        return tableware;
      }),
      tablewareImagePick: true,
      tablewareImageSelected: null,
      tableTablewares: [
        ...state.tableTablewares,
        {
          imageName: state.tablewareImageSelected.name,
          name: selectedTableware.name,
        },
      ],
    });
  };

  const restart = () => {
    setState({ ...initialState(false) });
    dispatch(headerActions.setState(headerConstants.STATES.HIDDEN));
  };

  const endGame = (timeUp) => () => {
    setState({
      ...state,
      scene: "END_GAME",
      timeUp: timeUp,
    });

    dispatch(
      headerActions.setAll(
        mission.name,
        mission.nameTranslate.find((name) => {
          return name.language.id === lang;
        }).name
      )
    );
    dispatch(headerActions.setState(headerConstants.STATES.OVERLAY));

    dispatch(
      gameActions.create("results", {
        user: userId,
        mission: mission.id,
        secondsTaken: timeUp
          ? missionData.seconds + 1
          : missionData.seconds - state.remainingTime,
        recipe: state.recipe.id,
        won: !timeUp,
      })
    );
  };

  return (
    <div>
      {(function renderScene() {
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
                ready={state.ingredientsList.length > 0}
              />
            );
          case "INTRO":
            return (
              <Intro
                recipe={state.recipe}
                chef={missionData.character}
                ingredientsList={state.ingredientsList}
                goToTutorial={() => setState({ ...state, scene: "TUTORIAL" })}
              />
            );
          case "TUTORIAL":
            return (
              <div>
                Tutorial
                <div>Apresentador</div>
                <div>
                  Fala
                  <Recipe
                    ingredientsList={state.ingredientsList}
                    closeText={"Estou pronto"}
                    onClose={() =>
                      setState({ ...state, scene: "COOK", runTimer: true })
                    }
                    hasImage={false}
                    showCheck={(ingredient) => true}
                  />
                </div>
              </div>
            );
          case "COOK":
            return (
              <div>
                <Timer
                  run={state.runTimer}
                  seconds={missionData.seconds}
                  onStop={(remaining) => {
                    setState({
                      ...state,
                      remainingTime: remaining,
                    });
                  }}
                  onEnd={() => endGame(true)}
                />

                {state.showIngredients ? (
                  <div>
                    {!state.recipeContinue && (
                      <img
                        onClick={() =>
                          setState({
                            ...state,
                            showRecipe: !state.showRecipe,
                          })
                        }
                        src={listIcon}
                        alt=""
                        className="list-icon"
                      />
                    )}
                    {state.showRecipe && (
                      <Recipe
                        ingredientsList={state.ingredientsList}
                        closeText={
                          state.recipeContinue ? "Continuar" : "Fechar"
                        }
                        onClose={(e) =>
                          setState({
                            ...state,
                            showRecipe: false,
                            recipeContinue: false,
                          })
                        }
                        hasImage={false}
                        showCheck={(ingredient) => ingredient.done}
                      />
                    )}
                    <div>
                      {state.shuffledIngredients.map((ingredient, index) => (
                        <img
                          src={ingredient.image}
                          alt=""
                          onClick={() =>
                            setState({
                              ...state,
                              selectedIngredient: { ...ingredient },
                            })
                          }
                          style={{
                            opacity: ingredient.done ? 0 : 1,
                            pointerEvents: ingredient.done ? "none" : "auto",
                          }}
                          className={
                            (state.selectedIngredient
                              ? ingredient.name ===
                                state.selectedIngredient.name
                                ? "selected"
                                : ""
                              : "") + " ingredient-selection-img"
                          }
                        />
                      ))}
                    </div>
                    {state.selectedIngredient && (
                      <button onClick={checkRightIngredient}>
                        Adicionar à bancada
                      </button>
                    )}
                  </div>
                ) : (
                  <div>
                    <div>
                      {state.shuffledName.map((letter, index) => (
                        <span
                          key={index}
                          onClick={addLetter(letter, index)}
                          style={{
                            opacity: letter.selected ? 0 : 1,
                            pointerEvents: letter.selected ? "none" : "auto",
                          }}
                          className="letter"
                        >
                          {letter.letter}
                        </span>
                      ))}
                    </div>
                    <div>
                      <div>
                        {state.userLetterOrder.reduce(
                          (acc, letter) => acc + letter.letter,
                          ""
                        )}
                      </div>
                      <div>
                        <div onClick={clearIngredientName}>x</div>
                        <div onClick={checkIngredientName}>ok</div>
                      </div>
                    </div>
                  </div>
                )}

                {state.wrongIngredientNotification && (
                  <div>
                    <div>Esse item não é o que você precisa agora.</div>
                    <button
                      onClick={() =>
                        setState({
                          ...state,
                          selectedIngredient: null,
                          wrongIngredientNotification: false,
                        })
                      }
                    >
                      Continuar
                    </button>
                  </div>
                )}

                {state.wrongIngredientNameNotification && (
                  <div>
                    <div>
                      {state.userLetterOrder.reduce(
                        (acc, letter) => acc + letter.letter,
                        ""
                      )}{" "}
                      não serve para sua receita.
                    </div>
                    <button onClick={() => clearIngredientName()}>
                      Continuar
                    </button>
                  </div>
                )}

                {!state.doneCooking && (
                  <div>
                    Mesa
                    <div>
                      {state.tableIngredient && (
                        <img src={state.tableIngredient.image} alt="" />
                      )}
                    </div>
                  </div>
                )}

                {state.doneCooking && (
                  <div>
                    <div id="dialog-interact">
                      <div id="dialogos">
                        <div id="dialog-box">
                          <span lang="pt-br">
                            Parabéns! Parece bom, mas você não vai me servir na
                            panela, né? Escolha <strong>três</strong> utensílios
                            adequados para servir seu prato! Nem mais, nem
                            menos.
                          </span>
                          <span lang="en">
                            Congratulations! It looks good, but you`re not going
                            to serv me in the pan, are you? Choose{" "}
                            <strong>three</strong> approppriate utensils to
                            serve your dish! No more, no less.
                          </span>
                        </div>
                        <button
                          className="btn btn-center"
                          id="btn-move-to-payment"
                          onClick={moveToServing}
                        >
                          Continuar
                        </button>
                      </div>
                    </div>
                    <div>
                      <DialogCharacter
                        character={missionData.character}
                        feeling={"default"}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          case "SERVE":
            return (
              <div>
                {!state.endConfirmation && (
                  <div>
                    {state.tableTablewares.length === 3 && (
                      <img
                        onClick={() =>
                          setState({
                            ...state,
                            endConfirmation: true,
                            runTimer: false,
                          })
                        }
                        src={silverCloche}
                        alt=""
                      />
                    )}
                    <Timer
                      run={state.runTimer}
                      seconds={900}
                      onStop={(remaining) => {
                        setState({
                          ...state,
                          remainingTime: remaining,
                        });
                      }}
                      onEnd={() => endGame(true)}
                    />
                    <div>
                      {state.shuffledTablewares.map((tableware, index) => (
                        <img
                          key={index}
                          src={tableware.image}
                          style={{
                            opacity: tableware.choosen
                              ? 0
                              : !state.tablewareImagePick
                              ? 0.4
                              : 1,
                            pointerEvents: tableware.choosen
                              ? "none"
                              : !state.tablewareImagePick
                              ? "none"
                              : "auto",
                            height: 100,
                            border: "1px solid red",
                          }}
                          onClick={() =>
                            setState({
                              ...state,
                              tablewareImagePick: false,
                              tablewareImageSelected: tableware,
                            })
                          }
                          className={
                            (tableware === state.tablewareNameSelected
                              ? "selected"
                              : "") + " ingredient-selection-img"
                          }
                          alt=""
                        />
                      ))}
                    </div>
                    <div>
                      {state.shuffledTablewaresNames.map((tableware, index) => (
                        <div
                          key={index}
                          style={{
                            opacity: tableware.choosen
                              ? 0
                              : state.tablewareImagePick
                              ? 0.4
                              : 1,
                            pointerEvents: tableware.choosen
                              ? "none"
                              : state.tablewareImagePick
                              ? "none"
                              : "auto",
                          }}
                          onClick={addTableware(tableware)}
                        >
                          {tableware.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {state.endConfirmation && (
                  <div>
                    <div id="dialog-interact">
                      <div id="dialogos">
                        <div id="dialog-box">
                          <span lang="pt-br">
                            Parabéns! Você é o mais novo finalista do
                            MestreCuca! Agora, aguarde a deliberação dos
                            jurados.{" "}
                          </span>
                          <span lang="en">
                            Congrats! You are the brand new finalist of
                            MestreCuca! Now, wait while the judges decide.{" "}
                          </span>
                        </div>{" "}
                        <button
                          className="btn btn-center"
                          id="btn-move-to-payment"
                          onClick={endGame(false)}
                        >
                          Continuar
                        </button>
                      </div>
                    </div>
                    <div>
                      <DialogCharacter
                        character={missionData.character}
                        feeling={"default"}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          case "END_GAME":
            return (
              <div>
                {state.timeUp ? (
                  <div>
                    <img src={hourglassEmpty} alt="" />
                    <span>O tempo acabou!</span>
                    <p lang="pt-br">
                      Fazer compras pode ser mais complicado do que parece.
                    </p>
                    <p lang="en">
                      Time is up! Doing the groceries might be harder than it
                      looks.
                    </p>
                  </div>
                ) : (
                  <div>
                    <img src={hourglassFull} alt="" />
                    <p lang="pt-br">Você finalizou em:</p>
                    <p lang="en">Finished in:</p>
                  </div>
                )}
                <div
                  className="feedback-painel-2-content"
                  style={{
                    backgroundImage: "url(" + blobLaranja + ")",
                  }}
                >
                  {state.timeUp ? (
                    <div> 0:00</div>
                  ) : (
                    <div>
                      {zeroFill(
                        Math.floor(
                          (missionData.seconds - state.remainingTime) / 60
                        ).toString(),
                        2
                      )}
                      :
                      {zeroFill(
                        (
                          (missionData.seconds - state.remainingTime) %
                          60
                        ).toString(),
                        2
                      )}
                    </div>
                  )}
                </div>
                <button onClick={restart}>Tentar novamente</button>
                <Link to={"/userspace"}>Sair do jogo</Link>
              </div>
            );
          default:
            return <div>Error</div>;
        }
      })()}
    </div>
  );
};

export default Game4;
