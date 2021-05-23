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
  right,
  error,
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
      let remainingTime =
        missionData.seconds - 60 * (timesPlayed > 2 ? 2 : timesPlayed);
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
          remainingTime,
        };
      });
    }
  }, [missionData, state.ingredientsList, timesPlayed, lang]);

  const onStartGame = () => setState({ ...state, scene: "INTRO" });

  const checkRightIngredient = () => {
    let currentIngredient = state.ingredientsList.find(
      (ingredient) => !ingredient.done
    );

    console.log(state.wrongIngredientSelected);

    if (state.selectedIngredient.name !== currentIngredient.name) {
      setState({
        ...state,
        wrongIngredientNotification: true,
        wrongIngredientSelected: [
          ...state.wrongIngredientSelected,
          {
            rightIngredient: currentIngredient.name,
            userSelected: state.selectedIngredient.name,
          },
        ],
      });
    } else {
      let updatedState = {
        showIngredients: false,
        tableIngredient: state.selectedIngredient,
        selectedIngredient: null,
        shuffledName: state.selectedIngredient.nameShuffled.map((letter) => {
          return {
            letter: letter,
            selected: false,
          };
        }),
      };

      console.log(
        state.ingredientsList.findIndex(
          (ingredient) => ingredient.name === currentIngredient.name
        )
      );

      if (
        state.ingredientsList.findIndex(
          (ingredient) => ingredient.name === currentIngredient.name
        ) === 0
      ) {
        updatedState.tutorialIngredientNameSelectionNotification = true;
        updatedState.runTimer = false;
      }

      setState({
        ...state,
        ...updatedState,
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
          showIngredients: true,
          userLetterOrder: [],
          // showRecipe: true,
          // recipeContinue: true,
        });
      }
    } else {
      setState({
        ...state,
        wrongIngredientNameNotification: true,
        wrongIngredientNameOrder: [
          ...state.wrongIngredientNameOrder,
          {
            writeOrderName: state.tableIngredient.shuffleName,
            userOrderInput: state.userLetterOrder.reduce(
              (acc, letter) => acc + letter.letter,
              ""
            ),
          },
        ],
      });
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
      tutorialTablewareSelectionNotification: true,
    });
  };

  const addTableware = (selectedTableware) => () => {
    if (selectedTableware.name !== state.tablewareImageSelected.name) {
      setState({
        ...state,
        wrongCombiantionNotification: true,
        wrongTablewarePairSelected: [
          ...state.wrongTablewarePairSelected,
          {
            imageSelected: state.tablewareImageSelected.name,
            nameSelected: selectedTableware.name,
          },
        ],
      });
    } else {
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
        tableTablewares: [
          ...state.tableTablewares,
          state.tablewareImageSelected,
        ],
        tablewareImageSelected: null,
      });
    }
  };

  const checkTableware = () => {
    console.log(
      state.tableTablewares
        .filter((tableware) => !tableware.correct)
        .map((tableware) => tableware.name)
    );
    setState({
      ...state,
      wrongTablewareSelected: state.tableTablewares
        .filter((tableware) => !tableware.correct)
        .map((tableware) => {
          return { name: tableware.name };
        }),
      endConfirmation: true,
      runTimer: false,
    });
  };

  // const clearTableTableware = () => {
  //   setState({
  //     ...state,
  //     wrongTablewareNotification: false,
  //     shuffledTablewaresNames: state.shuffledTablewaresNames.map(
  //       (tableware) => {
  //         return {
  //           ...tableware,
  //           choosen: false,
  //         };
  //       }
  //     ),
  //     shuffledTablewares: state.shuffledTablewares.map((tableware) => {
  //       return {
  //         ...tableware,
  //         choosen: false,
  //       };
  //     }),
  //   });
  // };

  const restart = () => {
    setState({ ...initialState(false) });
    dispatch(headerActions.setState(headerConstants.STATES.HIDDEN));
  };

  const endGame = (timeUp) => {
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
        wrongIngredientSelected: state.wrongIngredientSelected.length
          ? JSON.stringify(state.wrongIngredientSelected)
          : null,
        wrongIngredientNameOrder: state.wrongIngredientNameOrder.length
          ? JSON.stringify(state.wrongIngredientNameOrder)
          : null,
        wrongTablewarePairSelected: state.wrongTablewarePairSelected.length
          ? JSON.stringify(state.wrongTablewarePairSelected)
          : null,
        wrongTablewareSelected: state.wrongTablewareSelected.length
          ? JSON.stringify(state.wrongTablewareSelected)
          : null,
      })
    );
  };

  return (
    <div id="game2-wrapper">
      <button
        onClick={() => {
          setState({ ...state, runTimer: false });
        }}
      >
        PAUSE TIMER
      </button>
      {mission ? (
        //verificar se é possível generalizar esses gameX-wrapper
        <div id="game2-content">
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
                    goToKitchen={() =>
                      setState({
                        ...state,
                        scene: "COOK",
                        tutorialIngredientSelectionNotification: true,
                      })
                    }
                    seconds={state.remainingTime}
                  />
                );
              case "COOK":
                return (
                  <div>
                    <Timer
                      run={state.runTimer}
                      seconds={state.remainingTime}
                      onStop={(remaining) => {
                        setState({
                          ...state,
                          remainingTime: remaining,
                        });
                      }}
                      onEnd={() => endGame(true)}
                    />

                    {state.tutorialIngredientSelectionNotification && (
                      <div className="overlay-tutorial-notification">
                        <div className="overlay-tutorial-notification-content blob-right">
                          <img
                            src={blobLaranja}
                            alt=""
                            className="tutorial-notification-blob"
                          />
                          <div className="tutorial-notification-message">
                            <span lang="pt-br">
                              Clique no ingrediente que você deseja colocar na
                              bancada e confirme.
                            </span>
                            <span lang="en">
                              Click on the ingredient you want to put on the
                              conter and confirm.
                            </span>
                            <button
                              className="btn"
                              onClick={() =>
                                setState({
                                  ...state,
                                  runTimer: true,
                                  tutorialIngredientSelectionNotification: false,
                                })
                              }
                            >
                              Continuar
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {state.tutorialIngredientNameSelectionNotification && (
                      <div className="overlay-tutorial-notification">
                        <div className="overlay-tutorial-notification-content blob-right">
                          <img
                            src={blobLaranja}
                            alt=""
                            className="tutorial-notification-blob"
                          />
                          <div className="tutorial-notification-message">
                            <span lang="pt-br">
                              Selecione as letras na ordem correta para escrever
                              o nome do ingrediente.
                            </span>
                            <span lang="en">
                              Select the letters in the correct order to write
                              the name of the ingredient.
                            </span>
                            <button
                              className="btn"
                              onClick={() =>
                                setState({
                                  ...state,
                                  runTimer: true,
                                  tutorialIngredientNameSelectionNotification: false,
                                })
                              }
                            >
                              Continuar
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {!state.doneCooking &&
                      (state.showIngredients ? (
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
                          <div className="suffled-ingredients">
                            {state.shuffledIngredients.map(
                              (ingredient, index) => (
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
                                    pointerEvents: ingredient.done
                                      ? "none"
                                      : "auto",
                                    width:
                                      (window.innerWidth * 0.9) /
                                      state.shuffledIngredients.length,
                                  }}
                                  className={
                                    (state.selectedIngredient
                                      ? ingredient.name ===
                                        state.selectedIngredient.name
                                        ? "selected"
                                        : ""
                                      : "") +
                                    (index % 2
                                      ? " ingredient-selection-img-even"
                                      : " ingredient-selection-img-odd") +
                                    " ingredient-selection-img"
                                  }
                                />
                              )
                            )}
                          </div>
                          {state.selectedIngredient && (
                            <button
                              className="btn btn-add-to-conter"
                              onClick={checkRightIngredient}
                            >
                              Adicionar à bancada
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="name-order-div absolute-center">
                          <div className="shuffled-letters">
                            {state.shuffledName.map((letter, index) => (
                              <span
                                key={index}
                                onClick={addLetter(letter, index)}
                                style={{
                                  opacity: letter.selected ? 0 : 1,
                                  pointerEvents: letter.selected
                                    ? "none"
                                    : "auto",
                                }}
                                className="letter"
                              >
                                {letter.letter}
                              </span>
                            ))}
                          </div>
                          <div className="ordered-letters-div">
                            <div className="ordered-letters">
                              {state.userLetterOrder.reduce(
                                (acc, letter) => acc + letter.letter,
                                ""
                              )}
                            </div>
                            <div className="ordered-letters-buttons">
                              <img
                                onClick={clearIngredientName}
                                src={error}
                                alt="clear-ingredient-name"
                              />
                              <img
                                onClick={checkIngredientName}
                                src={right}
                                alt="check-ingredient-name"
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                    {state.wrongIngredientNotification && (
                      <div className="overlay-error-notification">
                        <div className="overlay-error-notification-content">
                          <img
                            src={blobLaranja}
                            alt=""
                            className="error-notification-blob absolute-center"
                          />
                          <div className="error-notification-message absolute-center">
                            <span>
                              Esse item não é o que você precisa agora.
                            </span>
                            <button
                              className="btn"
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
                        </div>
                      </div>
                    )}

                    {state.wrongIngredientNameNotification && (
                      <div className="overlay-error-notification">
                        <div className="overlay-error-notification-content">
                          <img
                            src={blobLaranja}
                            alt=""
                            className="error-notification-blob absolute-center"
                          />
                          <div className="error-notification-message absolute-center">
                            <span>
                              {state.userLetterOrder.reduce(
                                (acc, letter) => acc + letter.letter,
                                ""
                              )}{" "}
                              não serve para sua receita.
                            </span>
                            <button
                              className="btn"
                              onClick={() => clearIngredientName()}
                            >
                              Continuar
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {!state.doneCooking && (
                      <div className="conter">
                        {state.tableIngredient && (
                          <img
                            src={state.tableIngredient.image}
                            alt=""
                            className="conter-ingredient absolute-center"
                          />
                        )}
                      </div>
                    )}

                    {state.doneCooking && (
                      <div>
                        <div id="dialog-interact">
                          <div id="dialogos">
                            <div id="dialog-box">
                              <span lang="pt-br">
                                Parabéns! Parece bom, mas você não vai me servir
                                na panela, né? Escolha <strong>três</strong>{" "}
                                utensílios adequados para servir seu prato! Nem
                                mais, nem menos.
                              </span>
                              <span lang="en">
                                Congratulations! It looks good, but you`re not
                                going to serv me in the pan, are you? Choose{" "}
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
                        {state.wrongCombiantionNotification && (
                          <div className="overlay-error-notification">
                            <div className="overlay-error-notification-content">
                              <img
                                src={blobLaranja}
                                alt=""
                                className="error-notification-blob absolute-center"
                              />
                              <div className="error-notification-message absolute-center">
                                <span>Esse não é o nome desse item.</span>
                                <button
                                  className="btn"
                                  onClick={() =>
                                    setState({
                                      ...state,
                                      tablewareImagePick: true,
                                      tablewareImageSelected: null,
                                      wrongCombiantionNotification: false,
                                    })
                                  }
                                >
                                  Continuar
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {state.tutorialTablewareSelectionNotification && (
                          <div>
                            <img
                              src={blobLaranja}
                              alt=""
                              className="smaller-tutorial-notification-blob"
                            />
                            <div className="smaller-tutorial-notification-message">
                              <span>Quais 3 utensilios você vai escolher?</span>
                            </div>
                          </div>
                        )}

                        {state.tableTablewares.length === 3 && (
                          <img
                            onClick={() => checkTableware()}
                            src={silverCloche}
                            alt=""
                            className="serve-button"
                          />
                        )}
                        <Timer
                          run={state.runTimer}
                          seconds={state.remainingTime}
                          onStop={(remaining) => {
                            setState({
                              ...state,
                              remainingTime: remaining,
                            });
                          }}
                          onEnd={() => endGame(true)}
                        />
                        <div className="tableware-selection-div">
                          <div className="shuffled-tablewares">
                            {state.shuffledTablewares.map(
                              (tableware, index) => (
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
                                    width:
                                      (window.innerWidth * 0.6) /
                                      state.shuffledTablewares.length,
                                  }}
                                  onClick={() =>
                                    setState({
                                      ...state,
                                      tutorialTablewareSelectionNotification: false,
                                      tablewareImagePick: false,
                                      tablewareImageSelected: tableware,
                                    })
                                  }
                                  className={
                                    (state.tablewareImageSelected
                                      ? tableware.name ===
                                        state.tablewareImageSelected.name
                                        ? "selected-tableware"
                                        : ""
                                      : "") + " ingredient-selection-img"
                                  }
                                  alt=""
                                />
                              )
                            )}
                          </div>
                          <div className="shuffled-tableware-names">
                            {state.shuffledTablewaresNames.map(
                              (tableware, index) => (
                                <span
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
                                    width:
                                      (window.innerWidth * 0.6) /
                                      state.shuffledTablewares.length,
                                  }}
                                  onClick={addTableware(tableware)}
                                >
                                  {tableware.name}
                                </span>
                              )
                            )}
                          </div>
                        </div>

                        <div className="conter">
                          {state.tableTablewares.map((tableware, index) => (
                            <img
                              key={index}
                              src={tableware.image}
                              alt=""
                              style={{
                                width: (window.innerWidth * 0.6) / 3,
                                height: (window.innerWidth * 0.6) / 3,
                              }}
                              className="table-tableware-space"
                            />
                          ))}
                          {console.log(Array(3 - state.tableTablewares.length))}
                          {[...Array(3 - state.tableTablewares.length)].map(
                            (item, index) => (
                              <div
                                style={{
                                  width: (window.innerWidth * 0.6) / 3,
                                  height: (window.innerWidth * 0.6) / 3,
                                }}
                                className="table-tableware-space"
                              ></div>
                            )
                          )}
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
                              onClick={() => {
                                endGame(false);
                              }}
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
                          Cozinhar pode ser mais complicado do que parece.
                        </p>
                        <p lang="en">
                          Time is up! Cooking might be harder than it looks.
                        </p>
                      </div>
                    ) : (
                      <div>
                        <img src={hourglassFull} alt="" />
                        <p lang="pt-br">Você finalizou em:</p>
                        <div>
                          {state.wrongIngredientSelected.length ? (
                            <div>
                              <p lang="pt-br">
                                <img
                                  src={error}
                                  alt=""
                                  className="shop-list-item-check"
                                />
                                Você se confundiu um pouco, mas conseguiu
                                preparar os ingredientes na ordem certa!
                              </p>
                            </div>
                          ) : (
                            <div>
                              <p lang="pt-br">
                                <img
                                  src={right}
                                  alt=""
                                  className="shop-list-item-check"
                                />
                                Você pegou os ingredientes certos de primeira!
                              </p>
                            </div>
                          )}
                          {state.wrongIngredientNameOrder.length ? (
                            <div>
                              <p lang="pt-br">
                                <img
                                  src={error}
                                  alt=""
                                  className="shop-list-item-check"
                                />
                                Dar nomes aos ingredientes te deu algum
                                trabalho!
                              </p>
                            </div>
                          ) : (
                            <div>
                              <p lang="pt-br">
                                <img
                                  src={right}
                                  alt=""
                                  className="shop-list-item-check"
                                />
                                Acertar os nomes foi moleza para você!
                              </p>
                            </div>
                          )}
                          {state.wrongTablewarePairSelected.length ? (
                            <div>
                              <p lang="pt-br">
                                <img
                                  src={error}
                                  alt=""
                                  className="shop-list-item-check"
                                />
                                Você teve um pouco de dificuldade em ligar os
                                utensílios aos seus nomes.
                              </p>
                            </div>
                          ) : (
                            <div>
                              <p lang="pt-br">
                                <img
                                  src={right}
                                  alt=""
                                  className="shop-list-item-check"
                                />
                                Ligar os utensílios aos seus nomes foi fácil
                                para você!
                              </p>
                            </div>
                          )}
                          {state.wrongTablewareSelected.length ? (
                            <div>
                              <p lang="pt-br">
                                <img
                                  src={error}
                                  alt=""
                                  className="shop-list-item-check"
                                />
                                E você tem alguns problemas sobre como servir
                                sua comida...
                              </p>
                            </div>
                          ) : (
                            <div>
                              <p lang="pt-br">
                                <img
                                  src={right}
                                  alt=""
                                  className="shop-list-item-check"
                                />
                                E você sabe exatamente onde servir sua comida!
                              </p>
                            </div>
                          )}
                        </div>
                        <p lang="en">Finished in:</p>
                        <div>
                          {state.wrongIngredientSelected.length ? (
                            <div>
                              <p lang="en">
                                <img
                                  src={error}
                                  alt=""
                                  className="shop-list-item-check"
                                />
                                You messed it up a bit but managed to preper the
                                ingredients in the right order!
                              </p>
                            </div>
                          ) : (
                            <div>
                              <p lang="en">
                                <img
                                  src={right}
                                  alt=""
                                  className="shop-list-item-check"
                                />
                                You picked the right ingredients on your first
                                try!
                              </p>
                            </div>
                          )}
                          {state.wrongIngredientNameOrder.length ? (
                            <div>
                              <p lang="en">
                                <img
                                  src={error}
                                  alt=""
                                  className="shop-list-item-check"
                                />
                                Naming the ingredients gave you some trouble!
                              </p>
                            </div>
                          ) : (
                            <div>
                              <p lang="en">
                                <img
                                  src={right}
                                  alt=""
                                  className="shop-list-item-check"
                                />
                                Getting the names right was a piece of cake for
                                you!
                              </p>
                            </div>
                          )}
                          {state.wrongTablewarePairSelected.length ? (
                            <div>
                              <p lang="en">
                                <img
                                  src={error}
                                  alt=""
                                  className="shop-list-item-check"
                                />
                                Matching the kitchen utensils with their names
                                was a bit tough for you.
                              </p>
                            </div>
                          ) : (
                            <div>
                              <p lang="en">
                                <img
                                  src={right}
                                  alt=""
                                  className="shop-list-item-check"
                                />
                                Matching the kitchen utensils with their names
                                was pretty easy for you!
                              </p>
                            </div>
                          )}
                          {state.wrongTablewareSelected.length ? (
                            <div>
                              <p lang="en">
                                <img
                                  src={error}
                                  alt=""
                                  className="shop-list-item-check"
                                />
                                And you've got some problems with how to serve
                                your food...
                              </p>
                            </div>
                          ) : (
                            <div>
                              <p lang="en">
                                <img
                                  src={right}
                                  alt=""
                                  className="shop-list-item-check"
                                />
                                And you know exactly where to serve your food!
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    <div
                      className="feedback-painel-2-content"
                      style={{
                        backgroundImage: "url(" + blobLaranja + ")",
                      }}
                    >
                      {state.timeUp ? (
                        <div>0:00</div>
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
      ) : (
        <div>Loading..</div>
      )}
    </div>
  );
};

export default Game4;
