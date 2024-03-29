import React from "react";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
// import { Link, Redirect } from "react-router-dom";
import { Redirect } from "react-router-dom";

import {
  gameActions,
  headerActions,
  musicActions,
  playSessionControlActions,
} from "../../_actions";
import { headerConstants } from "../../_constants";

import Init from "../../_components/Init";
import Intro from "./components/Intro";
import ChefDialog from "../Game3/components/ChefDialog";
import Timer from "../../_components/Timer";
import Recipe from "../../_components/Recipe";
import {
  Button,
  ButtonConfigs,
  Iniciar,
  Voltar,
} from "../../_components/Button";

import initialState from "./initialState";

import { zeroFill, shuffle } from "../../_helpers";
import {
  // listIcon,
  silverCloche,
  hourglassEmpty,
  hourglassFull,
  right,
  blobLaranja,
  error,
  tomato,
  kitchen,
  notepad,
  tableware,
  chefHat,
} from "../../img";
import FeedbackPanel from "./components/FeedbackPanel";
import Tutorial from "./components/Tutorial";

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
  const timesPlayed = useSelector((state) => state.game.items.resultsCount);
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
      let initTime = missionData.seconds;
      let remainingTime = initTime;

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
          initTime,
        };
      });
    }
  }, [missionData, state.ingredientsList, state.tablewares, timesPlayed, lang]);

  const onStartGame = () => setState({ ...state, scene: "INTRO" });

  const checkRightIngredient = () => {
    let currentIngredient = state.ingredientsList.find(
      (ingredient) => !ingredient.done
    );

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
        sortNameIngredient: state.selectedIngredient,
        selectedIngredient: null,
        shuffledName: state.selectedIngredient.nameShuffled.map((letter) => {
          return {
            letter: letter,
            selected: false,
          };
        }),
      };

      if (
        state.ingredientsList.findIndex(
          (ingredient) => ingredient.name === currentIngredient.name
        ) === 0
      ) {
        updatedState.tutorialIngredientNameSelectionNotification = true;
        // updatedState.runTimer = false;
      }

      if (state.blobToShow < 2) updatedState.showBlob = true;

      setState({
        ...state,
        ...updatedState,
      });
    }
  };

  const checkIngredientName = () => {
    if (
      state.sortNameIngredient.shuffleName ===
      state.userLetterOrder.reduce((acc, letter) => acc + letter.letter, "")
    ) {
      let updateIngredientsList = state.ingredientsList.map((ingredient) => {
        if (ingredient.name === state.sortNameIngredient.name)
          return {
            ...ingredient,
            done: true,
          };
        return ingredient;
      });

      let updateShuffledIngredients = state.shuffledIngredients.map(
        (ingredient) => {
          if (ingredient.name === state.sortNameIngredient.name)
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
          sortNameIngredient: null,
          ingredientsList: updateIngredientsList,
          shuffledIngredients: updateShuffledIngredients,
          showIngredients: true,
          userLetterOrder: [],
          tableIngredients: [
            ...state.tableIngredients,
            state.sortNameIngredient,
          ],
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
            writeOrderName: state.sortNameIngredient.shuffleName,
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
      shuffledName: state.sortNameIngredient.nameShuffled.map((letter) => {
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

  const restart = () => {
    setState({ ...initialState(false) });
    dispatch(headerActions.setState(headerConstants.STATES.HIDDEN));
  };

  const endGame = (timeUp, saveResult = true) => {
    setState({
      ...state,
      scene: "END_GAME",
      timeUp: timeUp,
      feedbackMessages: [
        {
          image: tomato,
          message: state.wrongIngredientSelected.length
            ? "Você se atrapalhou um pouco, mas conseguiu pegar as quantidades certas de ingredientes no final!"
            : "Você pegou os ingredientes certos de primeira!",
          messageTranslate: state.wrongIngredientSelected.length
            ? "You messed it up a bit but managed to get the right ingredientes!"
            : "You picked the right ingredients on your first try!",
        },
        {
          image: notepad,
          message: state.wrongIngredientNameOrder.length
            ? "Dar nomes aos ingredientes te deu algum trabalho!"
            : "Acertar os nomes foi moleza para você!",
          messageTranslate: state.wrongIngredientNameOrder.length
            ? "Naming the ingredients gave you some trouble!"
            : "Getting the names right was a piece of cake for you!",
        },
        {
          image: tableware,
          message: state.wrongTablewarePairSelected.length
            ? "Você teve um pouco de dificuldade em ligar os utensílios aos seus nomes."
            : "Ligar os utensílios aos seus nomes foi fácil para você!",
          messageTranslate: state.wrongTablewarePairSelected.length
            ? "Matching the kitchen utensils with their names was a bit tough for you."
            : "Matching the kitchen utensils with their names was pretty easy for you!",
        },
        {
          image: chefHat,
          message: state.wrongTablewareSelected.length
            ? "E você tem alguns problemas sobre como servir sua comida..."
            : "E você sabe exatamente onde servir sua comida!",
          messageTranslate: state.wrongTablewareSelected.length
            ? "And you've got some problems with how to serve your food..."
            : "And you know exactly where to serve your food!",
        },
      ],
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

    dispatch(playSessionControlActions.ended(true));

    if (saveResult)
      dispatch(
        gameActions.create("results", {
          user: userId,
          mission: mission.id,
          secondsTaken: timeUp
            ? state.initTime + 1
            : state.initTime - state.remainingTime,
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
    <React.Fragment>
      {process.env.NODE_ENV === "development" && (
        <div style={{ position: "absolute", zIndex: 100000000, top: 0 }}>
          <button
            onClick={() => setState({ ...state, runTimer: !state.runTimer })}
          >
            {state.runTimer ? "Stop timer" : "Continue timer"}
          </button>
          <button onClick={restart}>Restart</button>
          <button onClick={() => endGame(false, false)}>End game win</button>
          <button onClick={() => endGame(true, false)}>End game lose</button>
          <button
            onClick={() =>
              setState({
                ...state,
                scene: "COOK",
                tutorialIngredientSelectionNotification: true,
              })
            }
          >
            Cooking
          </button>
          <button onClick={moveToServing}>Serving</button>
        </div>
      )}
      {mission ? (
        //verificar se é possível generalizar esses gameX-wrapper
        <React.Fragment>
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
                    goToTutorial={() =>
                      setState({
                        ...state,
                        scene: "COOK",
                      })
                    }
                    seconds={state.remainingTime}
                  />
                );
              case "COOK":
                return (
                  <React.Fragment>
                    <img
                      id="dialog-interact"
                      src={kitchen}
                      style={{
                        position: "absolute",
                        zIndex: -1,
                        width: "100%",
                        height: "100%",
                      }}
                      alt=""
                    />
                    {state.showBlob && (
                      <Tutorial
                        blobToShow={state.blobToShow}
                        onClickToEnd={() =>
                          setState((s) => ({
                            ...s,
                            blobToShow: s.blobToShow + 1,
                            showBlob: s.blobToShow + 1 === 2 ? false : true,
                          }))
                        }
                      />
                    )}
                    <Timer
                      style={{
                        position: "absolute",
                        top: "5%",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                      run={state.runTimer && !state.showBlob}
                      seconds={state.remainingTime}
                      onStop={(remaining) => {
                        setState({
                          ...state,
                          remainingTime: remaining,
                        });
                      }}
                      onEnd={() => endGame(true)}
                    />

                    {!state.doneCooking && state.showIngredients && (
                      <Recipe
                        ingredientsList={state.ingredientsList}
                        hasImage={false}
                        showCheck={(ingredient) => ingredient.done}
                        iconShouldShow={!state.recipeContinue}
                      />
                    )}

                    {!state.doneCooking &&
                      (state.showIngredients ? (
                        <div className="shuffled-ingredients">
                          {state.shuffledIngredients.map(
                            (ingredient, index) => (
                              <img
                                key={"suffled-ingredient-" + index}
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
                                  width: "12%",
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
                            )
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
                        {/* <img
                          src={blobLaranja}
                          alt=""
                          className="error-notification-blob absolute-center"
                        /> */}
                        <div className="error-notification-message absolute-center">
                          <span lang="pt-br">
                            Esse item não é o que você precisa agora.
                          </span>
                          <span lang="en">
                            This is not the item that you need now.
                          </span>
                          <Iniciar
                            label="Continuar"
                            onClick={() =>
                              setState({
                                ...state,
                                selectedIngredient: null,
                                wrongIngredientNotification: false,
                              })
                            }
                          />
                        </div>
                      </div>
                    )}

                    {state.wrongIngredientNameNotification && (
                      <div className="overlay-error-notification">
                        <div className="overlay-error-notification-content">
                          <div className="error-notification-message absolute-center">
                            <span lang="pt-br">
                              {state.userLetterOrder.reduce(
                                (acc, letter) => acc + letter.letter,
                                ""
                              )}
                              {" não serve para sua receita."}
                            </span>
                            <span lang="en">
                              {state.userLetterOrder.reduce(
                                (acc, letter) => acc + letter.letter,
                                ""
                              )}
                              {" doesn't work for your recipe."}
                            </span>
                            <Iniciar
                              label="Continuar"
                              onClick={clearIngredientName}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {!state.doneCooking &&
                      (state.showIngredients ? (
                        <div className="counter">
                          {state.tableIngredients.map((ingredient, index) => (
                            <img
                              src={ingredient.image}
                              alt={ingredient.name}
                              key={ingredient.name}
                              className="counter-ingredient"
                              style={{
                                width:
                                  (
                                    100 / state.shuffledIngredients.length
                                  ).toString() + "%",
                              }}
                            />
                          ))}
                          {state.selectedIngredient && (
                            <Button
                              id="btn-add-bancada"
                              blink
                              onClick={checkRightIngredient}
                            >
                              Adicionar à bancada
                            </Button>
                          )}
                        </div>
                      ) : (
                        <div>
                          <div className="counter"></div>
                          <img
                            src={state.sortNameIngredient.image}
                            alt=""
                            className="counter-ingredient-solo absolute-center"
                          />
                        </div>
                      ))}

                    {state.doneCooking && (
                      <ChefDialog
                        chef={missionData.character}
                        onContinue={moveToServing}
                        text={
                          "Parabéns! Parece bom, mas você não vai me servir na panela, né? Escolha <strong>três</strong> utensílios adequados para servir seu prato! Nem mais, nem menos."
                        }
                        translation={
                          "Congratulations! It looks good, but you're not going to serve me in the pan, are you? Choose <strong>three</strong> approppriate utensils to serve your dish! No more, no less."
                        }
                      />
                    )}
                  </React.Fragment>
                );
              case "SERVE":
                return (
                  <React.Fragment>
                    <Timer
                      style={{
                        position: "absolute",
                        top: "5%",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                      run={state.runTimer}
                      seconds={state.remainingTime}
                      onStop={(remaining) =>
                        setState((s) => ({ ...s, remainingTime: remaining }))
                      }
                      onEnd={() => endGame(true)}
                    />
                    {!state.endConfirmation && (
                      <React.Fragment>
                        {state.wrongCombiantionNotification && (
                          <div className="overlay-error-notification">
                            <div className="overlay-error-notification-content">
                              <img
                                src={blobLaranja}
                                alt=""
                                className="error-notification-blob absolute-center"
                              />
                              <div className="error-notification-message absolute-center">
                                <span lang="pt-br">
                                  Esse não é o nome desse item.
                                </span>
                                <span lang="en">
                                  That isn't the name of this item.
                                </span>
                                <Iniciar
                                  label={"Continuar"}
                                  onClick={() =>
                                    setState((s) => ({
                                      ...s,
                                      tablewareImagePick: true,
                                      tablewareImageSelected: null,
                                      wrongCombiantionNotification: false,
                                    }))
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {state.tutorialTablewareSelectionNotification && (
                          <div className="smaller-tutorial-notification-message">
                            Quais 3 utensilios você vai escolher?
                          </div>
                        )}

                        {state.tableTablewares.length === 3 && (
                          <div className="serve-button">
                            <img
                              onClick={() => checkTableware()}
                              src={silverCloche}
                              alt=""
                            />
                            <span>Servir! / Serve!</span>
                          </div>
                        )}
                        <div id="shuffled-stuff">
                          <div className="shuffled-tablewares">
                            {state.shuffledTablewares.map(
                              (tableware, index) => {
                                let tablewarePicked =
                                  state.tablewareImageSelected;
                                let amountChoosen =
                                  state.tableTablewares.length;

                                let wasThisPicked =
                                  tablewarePicked === tableware;
                                let canBePicked =
                                  wasThisPicked ||
                                  (amountChoosen < 3 &&
                                    !tablewarePicked &&
                                    !tableware.choosen);
                                let shouldDim =
                                  tablewarePicked && !wasThisPicked;

                                let width =
                                  100 / (state.shuffledTablewares.length + 1);
                                let classes = "tableware-selection-img";
                                if (canBePicked)
                                  classes += " pickable-tableware";
                                if (shouldDim) classes += " dim-tableware";
                                if (tableware.choosen)
                                  classes += " choosen-tableware";
                                if (wasThisPicked)
                                  classes += " selected-tableware";

                                return (
                                  <img
                                    key={index}
                                    src={tableware.image}
                                    style={{ width: width + "%" }}
                                    onClick={() =>
                                      setState((s) => ({
                                        ...s,
                                        tutorialTablewareSelectionNotification: false,
                                        tablewareImageSelected: tablewarePicked
                                          ? null
                                          : tableware,
                                        tablewareImagePick: !!tablewarePicked,
                                      }))
                                    }
                                    className={classes}
                                    alt=""
                                  />
                                );
                              }
                            )}
                          </div>
                          <div className="shuffled-tableware-names">
                            {state.shuffledTablewaresNames.map(
                              (tableware, index) => {
                                let classes = "tableware-selection-name";
                                if (!!state.tablewareImageSelected)
                                  classes += " pickable-tableware-name";
                                if (tableware.choosen)
                                  classes += " choosen-tableware";

                                return (
                                  <span
                                    key={index}
                                    className={classes}
                                    onClick={addTableware(tableware)}
                                  >
                                    {tableware.name}
                                  </span>
                                );
                              }
                            )}
                          </div>
                        </div>

                        <div
                          className="counter"
                          style={{ justifyContent: "space-evenly" }}
                        >
                          {state.tableTablewares.map((tableware, index) => (
                            <img
                              key={index}
                              src={tableware.image}
                              alt=""
                              className="table-tableware-space"
                            />
                          ))}
                          {[...Array(3 - state.tableTablewares.length)].map(
                            (item, index) => (
                              <div
                                key={index}
                                className="table-tableware-space"
                              ></div>
                            )
                          )}
                        </div>
                      </React.Fragment>
                    )}

                    {state.endConfirmation && (
                      <ChefDialog
                        chef={missionData.character}
                        onContinue={() => endGame(false)}
                        text={
                          "Parabéns! Você é o mais novo finalista do MestreCuca! Agora, aguarde a deliberação dos jurados."
                        }
                        translation={
                          "Congrats! You are the brand new finalist of MestreCuca! Now, wait while the judges decide."
                        }
                      />
                    )}
                  </React.Fragment>
                );
              case "END_GAME":
                return (
                  <div>
                    <div className="game-4-feedback absolute-center">
                      {state.timeUp ? (
                        <div className="game-4-feedback-lose-wrapper">
                          <div className="game-4-feedback-lose">
                            <div className="game-4-feedback-lose-content">
                              <img src={hourglassEmpty} alt="hourglass-empty" />
                              <span className="abril-fatface game-4-time-up-title">
                                O tempo acabou!
                              </span>
                              <div className="game-4-time-up-text">
                                <span lang="pt-br">
                                  Preparar o prato perfeito não é uma tarefa
                                  fácil!
                                </span>
                                <span
                                  lang="en"
                                  className="italic white-line-before"
                                >
                                  Time is up! Making the perfect dish is not an
                                  easy task.
                                </span>
                              </div>
                            </div>
                            <div
                              className="big-time-shower"
                              style={{
                                backgroundImage: "url(" + blobLaranja + ")",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain",
                                backgroundPosition: "center",
                              }}
                            >
                              <span className="absolute-center abril-fatface">
                                0:00
                              </span>
                            </div>
                          </div>
                          <div className="jogo4-end-no-time-btns">
                            <Voltar
                              label={"Tentar novamente"}
                              colorScheme={ButtonConfigs.COLOR_SCHEMES.COR_6}
                              onClick={restart}
                            />
                            <Iniciar
                              label={"Sair do jogo"}
                              colorScheme={ButtonConfigs.COLOR_SCHEMES.COR_3}
                              onClick={() => setState({ ...state, back: true })}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="game-4-feedback-win">
                          <div className="game-4-feedback-left">
                            <div className="game-4-finished-in">
                              <img src={hourglassFull} alt="hourglass-full" />
                              <div className="game-4-finished-in-text">
                                <span lang="pt-br" className="abril-fatface">
                                  Você finalizou em:
                                </span>
                                <span
                                  lang="en"
                                  className="salmon-line-before italic line-before-margin-top-5"
                                >
                                  Finished in:
                                </span>
                              </div>
                            </div>
                            <div
                              className="time-shower"
                              style={{
                                backgroundImage: "url(" + blobLaranja + ")",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain",
                                backgroundPosition: "center",
                              }}
                            >
                              <span className="absolute-center abril-fatface">
                                {zeroFill(
                                  Math.floor(
                                    (state.initTime - state.remainingTime) / 60
                                  ).toString(),
                                  2
                                )}
                                :
                                {zeroFill(
                                  (
                                    (state.initTime - state.remainingTime) %
                                    60
                                  ).toString(),
                                  2
                                )}
                              </span>
                            </div>
                          </div>
                          <FeedbackPanel
                            feedback={state.feedbackMessages}
                            restart={restart}
                            leave={() => setState({ ...state, back: true })}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              default:
                return <div>Error</div>;
            }
          })()}
          {state.back && <Redirect to="/userspace" />}
        </React.Fragment>
      ) : (
        <div>Loading..</div>
      )}
    </React.Fragment>
  );
};

export default Game4;
